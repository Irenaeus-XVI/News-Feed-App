import express from 'express'
import * as User from './controller/user.controller.js'
import { validation } from '../../middleware/validation.js'
import { addUserValidation, changeUserPasswordValidation, updateUserValidation } from './user.validation.js'
import { protectedRoutes } from '../auth/controller/auth.controller.js'
const router = express.Router()


router.route('/')
    .post(validation(addUserValidation), User.addUser)
    .get(User.getAllUsers)
    .patch(protectedRoutes, validation(changeUserPasswordValidation), User.changeUserPassword)
    .put(protectedRoutes, validation(updateUserValidation), User.updateUser)


router.route('/:id')
    .get(User.getSpecificUser)
    .delete(User.deleteUser)



export default router
