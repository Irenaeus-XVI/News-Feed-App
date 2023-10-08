import mongoose, { Schema, model } from "mongoose";

const likeSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User', // Reference the 'User' model
        required: true,
    },
    postId: {
        type: mongoose.Types.ObjectId,
        ref: 'Post', // Reference the 'Post' model
        required: true,
    },
}, { timestamps: true });

export const Like = model('Like', likeSchema);
