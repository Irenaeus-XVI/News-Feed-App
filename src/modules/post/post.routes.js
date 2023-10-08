import express from 'express'
import * as Post from './controller/post.controller.js'
import { validation } from '../../middleware/validation.js'
import { protectedRoutes } from '../auth/controller/auth.controller.js'
import { addPostValidation, deletePostValidation, updatePostValidation } from './post.validation.js'
const router = express.Router()



router.route('/')
    .post(protectedRoutes, validation(addPostValidation), Post.addPost)
    .get(protectedRoutes, Post.getSpecificUserPosts)

router.get('/allPosts', Post.getAllPosts)

router.route('/:id')
    .put(protectedRoutes, validation(updatePostValidation), Post.updatePost)
    .delete(protectedRoutes, validation(deletePostValidation), Post.deletePost)

export default router
