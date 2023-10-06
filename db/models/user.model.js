import { Schema } from "mongoose";



const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: "user"
    },
    verified: {
        type: Boolean,
        default: false
    },
    changePasswordAt: {
        type: Date,
        default: 0
    },

}, { timestamps: true })


export const userModel = model('user', userSchema);
