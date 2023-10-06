import express from 'express'
import * as User from './controller/user.controller.js'
const router = express.Router()


router.route('/')
    .post(User.addUser)



export default router
