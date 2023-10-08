import { likeModel } from "../../../../db/models/like.model.js";
import { postModel } from "../../../../db/models/post.model.js";
import { AppError } from "../../../utils/AppError.js";
import { handleAsyncError } from "../../../utils/handleAsyncError.js";



const addLike = handleAsyncError(async (req, res, next) => {

    const { postId } = req.body

    //NOTE - check post availability
    const postExist = await postModel.findById(postId);
    if (!postExist) return next(new AppError('post is not found ', 404))

    //NOTE - check user made like before or not 
    const exitingLike = await likeModel.findOne({ postId, userId: req.user._id })
    if (exitingLike) return next(new AppError('You have already liked this post', 400))

    const like = new likeModel({
        postId,
        userId: req.user._id
    });


    //NOTE - increase number of likes for post
    await postModel.findByIdAndUpdate(postId, {
        $inc: {
            likeCount: 1
        }
    })

    await like.save()

    res.status(201).json({ message: 'like added successfully', like })
})




const getPostLikes = handleAsyncError(async (req, res, next) => {

    const { postId } = req.body

    const likes = await likeModel.find({ postId }).populate('userId')

    res.status(200).json({ message: 'success', likes })
})



const removeLike = handleAsyncError(async (req, res, next) => {

    const { postId } = req.body

    const deletedLike = await likeModel.findOneAndDelete({ postId, userId: req.user._id })

    if (!deletedLike) return next(new AppError('Like not found or you are not allowed to delete it', 404));

    await postModel.findByIdAndUpdate(postId, {
        $inc: {
            likeCount: -1
        }
    })


    res.status(200).json({ message: 'like deleted successfully', deletedLike })
})

export {
    addLike,
    getPostLikes,
    removeLike
}