import express from 'express'
import * as Comment from './controller/comment.controller.js'
import { validation } from '../../middleware/validation.js'
import { protectedRoutes } from '../auth/controller/auth.controller.js'
import { addCommentValidation, deleteCommentValidation, updateCommentValidation } from './comment.validation.js'
const router = express.Router()



router.route('/')
    .post(protectedRoutes, validation(addCommentValidation), Comment.addComment)


router.route('/:id')
    .put(protectedRoutes, validation(updateCommentValidation), Comment.updateComment)
    .delete(protectedRoutes, validation(deleteCommentValidation), Comment.deleteComment)

export default router
