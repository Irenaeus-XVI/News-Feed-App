

import express from 'express'
import * as Auth from './controller/auth.controller.js'
import { fileUpload } from '../../utils/multer.js'
import { validation } from '../../middleware/validation.js'
import { signInValidation, signUpValidation } from './auth.validation.js'
const router = express.Router()


router.route('/')
    .post(fileUpload(), validation(signUpValidation), Auth.signUp)

router.post('/signIn', validation(signInValidation), Auth.signIn)

router.post('/forgetPassword', Auth.forgetPassword)

router.patch('/resetPassword/:token', Auth.resetPassword)

router.get("/verify/:token", Auth.verifyEmail)



export default router
