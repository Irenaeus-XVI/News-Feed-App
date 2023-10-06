import { userModel } from "../../../../db/models/user.model.js";
import { handleAsyncError } from "../../../utils/handleAsyncError.js";









const addUser = handleAsyncError(async (req, res, next) => {


    const user = new userModel(req.body)
    await user.save()
    res.status(201).json({ message: "user added successfully", user })

});



export {
    addUser
}