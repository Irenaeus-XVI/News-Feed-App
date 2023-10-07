

import express from 'express'
import * as Auth from './controller/auth.controller.js'
import { fileUpload } from '../../utils/multer.js'
const router = express.Router()


router.route('/')
    .post(fileUpload(), Auth.signUp)

router.post('/signIn', Auth.signIn)

router.get("/verify/:token", Auth.verifyEmail)



export default router
