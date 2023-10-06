import { userModel } from "../../../../db/models/user.model.js";
import { AppError } from "../../../utils/AppError.js";
import { handleAsyncError } from "../../../utils/handleAsyncError.js";
import bcrypt from 'bcrypt'








const addUser = handleAsyncError(async (req, res, next) => {
    const user = new userModel(req.body)
    await user.save()
    res.status(201).json({ message: "user added successfully", user })

});




const updateUser = handleAsyncError(async (req, res, next) => {
    let { id } = req.params;

    const updatedUser = await userModel.findByIdAndUpdate(id, req.body, { new: true })
    !updatedUser && next(new AppError('user  Not Found.', 404));
    updatedUser && res.status(201).json({ message: "success", updatedUser });

});




const changeUserPassword = handleAsyncError(async (req, res, next) => {
    let { id } = req.params;
    const { oldPassword, password, rePassword } = req.body
    //NOTE - Check the old password 
    const user = await userModel.findById(id)
    const isOldPassword = bcrypt.compareSync(oldPassword, user.password)
    !isOldPassword && next(new AppError('Old Password Is Not Correct '), 401)

    //NOTE - Check new password is not the old one  
    const newPassword = bcrypt.compareSync(password, user.password)
    newPassword && next(new AppError('New Password Can`t be the same as the old one '), 401)

    //NOTE - Check new password match rePassword
    password != rePassword && next(new AppError('rePassword Must match Password  '), 401)

    //NOTE - update the password 
    req.body.changeUserPasswordAt = Date.now()
    const updatedUser = await userModel.findByIdAndUpdate(id, req.body, { new: true })
    !updatedUser && next(new AppError('user  Not Found.', 404));
    updatedUser && res.status(201).json({ message: "success", updatedUser });

});





const getAllUsers = handleAsyncError(async (req, res, next) => {

    const users = await userModel.find()
    res.status(200).json({ message: "success", users })
})

const getSpecificUser = handleAsyncError(async (req, res, next) => {

    const { id } = req.params
    const user = await userModel.findById(id)
    res.status(200).json({ message: "success", user })
})




const deleteUser = handleAsyncError(async (req, res, next) => {
    const { id } = req.params
    const deletedUser = await userModel.findByIdAndDelete(id)
    res.status(200).json({ message: "success", deletedUser })

})

export {
    addUser,
    updateUser,
    changeUserPassword,
    getAllUsers,
    getSpecificUser,
    deleteUser
}