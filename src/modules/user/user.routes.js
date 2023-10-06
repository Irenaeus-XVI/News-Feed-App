import express from 'express'
import * as User from './controller/user.controller.js'
import { validation } from '../../middleware/validation.js'
import { addUserValidation, changeUserPasswordValidation, deleteUserValidation, updateUserValidation } from './user.validation.js'
const router = express.Router()


router.route('/')
    .post(validation(addUserValidation), User.addUser)
    .get(User.getAllUsers)


router.route('/:id')
    .put(validation(updateUserValidation), User.updateUser)
    .patch(validation(changeUserPasswordValidation), User.changeUserPassword)
    .get(User.getSpecificUser)
    .delete(validation(deleteUserValidation), User.deleteUser)



export default router
