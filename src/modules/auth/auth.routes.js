

import express from 'express'
import * as Auth from './controller/auth.controller.js'
const router = express.Router()


router.route('/')
    .post(Auth.signUp)




export default router
