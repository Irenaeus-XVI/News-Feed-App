

import express from 'express'
import * as Auth from './controller/auth.controller.js'
const router = express.Router()


router.route('/')
    .post(Auth.signUp)

router.post('/signIn', Auth.signIn)



export default router
