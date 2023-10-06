import express from 'express'
import * as User from './controller/user.controller.js'
const router = express.Router()


router.route('/')
    .post(User.addUser)


router.route('/:id')
    .put(User.updateUser)
    .patch(User.changeUserPassword)



export default router
