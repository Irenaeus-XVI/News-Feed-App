import express from 'express'
import * as Like from './controller/like.controller.js'
import { protectedRoutes } from '../auth/controller/auth.controller.js'
const router = express.Router()


router.route('/')
    .post(protectedRoutes, Like.addLike)
    .get(protectedRoutes, Like.getPostLikes)
    .delete(protectedRoutes, Like.removeLike)


export default router
