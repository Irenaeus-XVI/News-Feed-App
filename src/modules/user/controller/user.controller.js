import { userModel } from "../../../../db/models/user.model.js";
import { handleAsyncError } from "../../../utils/handleAsyncError.js";









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



export {
    addUser,
    updateUser
}