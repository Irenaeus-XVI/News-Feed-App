import express from 'express'
import * as User from './controller/user.controller.js'
const router = express.Router()


router.route('/')
    .post(User.addUser)
    .get(User.getAllUsers)


router.route('/:id')
    .put(User.updateUser)
    .patch(User.changeUserPassword)
    .get(User.getSpecificUser)
    .delete(User.deleteUser)



export default router
