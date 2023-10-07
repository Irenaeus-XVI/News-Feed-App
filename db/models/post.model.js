import mongoose, { Schema, model } from "mongoose";
import bcrypt from 'bcrypt'

const postSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true })





export const postModel = model('post', postSchema);
