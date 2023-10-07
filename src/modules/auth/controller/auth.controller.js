import { handleAsyncError } from '../../../utils/handleAsyncError.js';
import { userModel } from '../../../../db/models/user.model.js';
import { AppError } from '../../../utils/AppError.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { sendEmail } from '../../../email/sendEmail.js';


const signUp = handleAsyncError(async (req, res, next) => {
    const { email } = req.body

    //NOTE - Check i user exist 
    const existUser = await userModel.findOne({ email });
    if (existUser) return next(new AppError('User Already Exist', 409));

    //NOTE - add user to database 
    const user = new userModel(req.body);
    await user.save();


    //NOTE - Create token to verify email
    const verifyToken = jwt.sign({ id: user._id }, process.env.verifyToken)

    //NOTE - Send verify email
    sendEmail({ email, api: `${process.env.API}/${verifyToken}` })
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



export {
    signUp,
    signIn,
    verifyEmail
}