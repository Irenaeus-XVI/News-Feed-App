import mongoose, { Schema, model } from "mongoose";
import bcrypt from 'bcrypt'

const commentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    postId: {
        type: mongoose.Types.ObjectId,
        ref: 'post'
    }
}, { timestamps: true })





export const commentModel = model('comment', commentSchema);
