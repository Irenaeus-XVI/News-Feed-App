import { commentModel } from "../../../../db/models/comment.model.js"
import { likeModel } from "../../../../db/models/like.model.js"
import { postModel } from "../../../../db/models/post.model.js"
import { ApiFeatures } from "../../../utils/ApiFeatures.js"
import { AppError } from "../../../utils/AppError.js"
import { handleAsyncError } from "../../../utils/handleAsyncError.js"
import { getAll } from "../../../utils/helpers/refactor.js"




const addPost = handleAsyncError(async (req, res, next) => {

    const { content } = req.body

    const post = new postModel({
        content,
        userId: req.user._id
    })

    post.save()

    res.status(201).json({ message: 'post added successfully', post })
})



const updatePost = handleAsyncError(async (req, res, next) => {

    const { id } = req.params

    const updatePost = await postModel.findOneAndUpdate({ _id: id, userId: req.user._id }, req.body, { new: true })

    if (!updatePost) {
        return next(new AppError('post is not found or you are not allowed to update it ', 404))
    }

    res.status(201).json({ message: 'post updated successfully', updatePost })

})





const deletePost = handleAsyncError(async (req, res, next) => {

    const { id } = req.params

    const deletedPost = await postModel.findOneAndDelete({ _id: id, userId: req.user._id })

    if (!deletedPost) {
        return next(new AppError('post is not found or you are not allowed to delete it ', 404))
    }


    //NOTE - remove all likes from like model  after delete the post 
    await likeModel.bulkWrite([
        {
            deleteMany: {
                filter: { postId: id }
            }
        }
    ])


    //NOTE - remove all comments from comment model  after delete the post 
    await commentModel.bulkWrite([
        {
            deleteMany: {
                filter: { postId: id }
            }
        }
    ])


    res.status(201).json({ message: 'post deleted successfully', updatePost })
})



const getAllPosts = getAll(postModel, 'post', 'userId')


const getSpecificUserPosts = handleAsyncError(async (req, res, next) => {

    const userPosts = await postModel.find({ userId: req.user._id })

    if (!userPosts) return next(new AppError('no posts founded. ', 404))

    res.status(200).json({ message: "success", userPosts })

});

export {
    addPost,
    updatePost,
    deletePost,
    getAllPosts,
    getSpecificUserPosts
}