import { handleAsyncError } from '../../../utils/handleAsyncError.js';
import { userModel } from '../../../../db/models/user.model.js';
import { AppError } from '../../../utils/AppError.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { sendEmail } from '../../../email/sendEmail.js';
import cloundinary from '../../../utils/cloundinary.js';
import { emailTemplate } from '../../../email/emailTemplate.js';
import { emailTemplateForgetPassword } from '../../../email/emailTemplateForgetPassword.js';
import { nanoid } from 'nanoid'
const signUp = handleAsyncError(async (req, res, next) => {
    const { email } = req.body

    //NOTE - Check i user exist 
    const existUser = await userModel.findOne({ email });
    if (existUser) return next(new AppError('User Already Exist', 409));

    //NOTE - upload user profile image 
    const { secure_url } = await cloundinary.uploader.upload(req.file.path, { folder: 'News-Feed-App/imgCover' });
    req.body.profileImg = secure_url
    //NOTE - add user to database 

    const user = new userModel(req.body);
    await user.save();


    //NOTE - Create token to verify email
    const verifyToken = jwt.sign({ id: user._id }, process.env.verifyToken)

    //NOTE - Send verify email
    sendEmail({ email, api: `${process.env.verify}/${verifyToken}`, emailTemplate })

    res.status(201).json({ message: "success", user });
});



const signIn = handleAsyncError(async (req, res, next) => {
    let { email, password } = req.body;

    //NOTE - Check user found or not
    const userFounded = await userModel.findOne({ email });
    //NOTE - Check user verified or not

    if (userFounded.verified) {
        if (userFounded) {
            const hashedPassword = bcrypt.compareSync(password, userFounded.password);
            console.log(userFounded);
            //NOTE - Check user password is correct or not 
            if (hashedPassword) {
                const tokenPayload = {
                    id: userFounded._id,
                    name: userFounded.name,
                }

                //NOTE - create user token
                jwt.sign(tokenPayload, process.env.SECRET_KEY_TOKEN, (err, decoded) => {

                    return res.json({ Message: "Welcome.", token: decoded });
                });

            } else {
                return next(new AppError('Wrong password', 400));
            }
        }
        else {
            return next(new AppError('You Have To Register First.', 401));

        }
    } else {
        return next(new AppError('You Have To Verify Your Account First.', 401));
    }
});



const verifyEmail = handleAsyncError(async (req, res, next) => {

    const { token } = req.params

    const verifyToken = jwt.verify(token, process.env.verifyToken, async (err, decoded) => {
        if (!err) {
            const user = await userModel.findByIdAndUpdate(decoded.id, { verified: true }, { new: true })
            return res.json({ message: "verified successfully" })
        }
        return next(new AppError(err, 500))
    })
})





const forgetPassword = handleAsyncError(async (req, res, next) => {
    const { email } = req.body;
    const user = await userModel.findOne({ email });

    // Check user found
    if (!user) return next(new AppError('User not found'), 404);

    // Generate OTP
    const otp = nanoid(); // Implement a function to generate OTPs securely

    // Set an expiration time for the OTP (e.g., 15 minutes)
    const otpExpiration = new Date();
    otpExpiration.setMinutes(otpExpiration.getMinutes() + 15);

    // Update the user with the OTP and its expiration time
    user.otp = otp;
    user.otpExpiration = otpExpiration;

    // Save the user with the new OTP and expiration time
    await user.save();

    // Send verify email with OTP
    sendEmail({ email, otp, emailTemplate: emailTemplateForgetPassword });

    res.status(200).json({ message: 'Email sent successfully', user });
});

const resetPassword = handleAsyncError(async (req, res, next) => {
    const { otp, newPassword } = req.body;
    const { token } = req.headers;

    const decoded = jwt.verify(token, process.env.SECRET_KEY_TOKEN);

    // Check user OTP and expiration time
    const user = await userModel.findOne({
        _id: decoded.id,
        otp,
        otpExpiration: { $gte: new Date() }, // Ensure OTP is not expired
    });

    if (!user) {
        return next(new AppError('OTP is not correct or has expired'), 400);
    }

    // Reset password and hash it with model middleware
    user.password = newPassword;

    // Clear the OTP and expiration time
    user.otp = undefined;
    user.otpExpiration = undefined;

    //NOTE - change the changePasswordAt to handle the token
    user.changePasswordAt = Date.now()
    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'Password reset successfully👍' });
});




export {
    signUp,
    signIn,
    verifyEmail,
    forgetPassword,
    resetPassword
}