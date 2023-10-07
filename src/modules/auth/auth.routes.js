

import express from 'express'
import * as Auth from './controller/auth.controller.js'
const router = express.Router()


router.route('/')
    .post(Auth.signUp)

router.post('/signIn', Auth.signIn)

router.get("/verify/:token", Auth.verifyEmail)



export default router
