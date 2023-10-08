

import express from 'express'
import * as Auth from './controller/auth.controller.js'
import { fileUpload } from '../../utils/multer.js'
import { validation } from '../../middleware/validation.js'
import { signUpValidation } from './auth.validation.js'
const router = express.Router()


router.route('/')
    .post(fileUpload(), Auth.signUp)

router.post('/signIn', validation(signUpValidation), Auth.signIn)

router.post('/forgetPassword', Auth.forgetPassword)

router.patch('/resetPassword', Auth.resetPassword)

router.get("/verify/:token", Auth.verifyEmail)



export default router
