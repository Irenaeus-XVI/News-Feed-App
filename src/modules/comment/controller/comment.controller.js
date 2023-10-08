import { commentModel } from "../../../../db/models/comment.model.js"
import { postModel } from "../../../../db/models/post.model.js"
import { AppError } from "../../../utils/AppError.js"
import { handleAsyncError } from "../../../utils/handleAsyncError.js"




const addComment = handleAsyncError(async (req, res, next) => {

    const { comment, postId } = req.body

    //NOTE - check post availability
    const post = await postModel.findById(postId)
    if (!post) return next(new AppError('post not fount', 404))

    const addedComment = new commentModel({
        comment,
        userId: req.user._id,
        postId: postId
    })

    addedComment.save()

    res.status(201).json({ message: 'comment added successfully', addedComment })
})



const updateComment = handleAsyncError(async (req, res, next) => {

    const { comment, postId } = req.body
    const { id } = req.params

    //NOTE - check post availability
    const post = await postModel.findById(postId)
    if (!post) return next(new AppError('post not fount', 404))

    const updateComment = await commentModel.findOneAndUpdate({ _id: id, userId: req.user._id, postId }, { comment }, { new: true })

    if (!updateComment) {
        return next(new AppError('comment is not found or you are not allowed to update it ', 404))
    }

    res.status(201).json({ message: 'comment updated successfully', updateComment })

})





const deleteComment = handleAsyncError(async (req, res, next) => {


    const { postId } = req.body
    const { id } = req.params
    const deleteComment = await commentModel.findOneAndDelete({ _id: id, userId: req.user._id, postId })

    if (!deleteComment) {
        return next(new AppError('comment is not found or you are not allowed to delete it ', 404))
    }

    res.status(201).json({ message: 'comment delete successfully', deleteComment })

})








export {
    addComment,
    updateComment,
    deleteComment,
}