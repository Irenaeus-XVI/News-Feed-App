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






export {
    signUp

}