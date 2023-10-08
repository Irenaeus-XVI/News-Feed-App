import mongoose, { Schema, model } from "mongoose";

const likeSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user', // Reference the 'User' model
        required: true,
    },
    postId: {
        type: mongoose.Types.ObjectId,
        ref: 'post', // Reference the 'Post' model
        required: true,
    },
}, { timestamps: true });

export const likeModel = model('Like', likeSchema);
