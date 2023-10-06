import { handleAsyncError } from '../../../utils/handleAsyncError.js';
import { userModel } from '../../../../db/models/user.model.js';
import { AppError } from '../../../utils/AppError.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'


const signUp = handleAsyncError(async (req, res, next) => {

    const existUser = await userModel.findOne({ email: req.body.email });
    if (existUser) return next(new AppError('User Already Exist', 409));
    const user = new userModel(req.body);
    await user.save();
    res.status(201).json({ message: "success", user });
});



const signIn = handleAsyncError(async (req, res, next) => {

    const user = await userModel.findOne({ email: req.body.email })
    if (!user || !bcrypt.compareSync(req.body.password, user.password)) return next(new AppError("Email Is Incorrect or Password"), 409)

    const token = jwt.sign({ email: user.email, name: user.name, id: user._id, role: user.role }, process.env.SECRET_KEY_TOKEN)
    res.status(201).json({ message: "success", token });

});




export {
    signUp,
    signIn

}