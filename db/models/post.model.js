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
    },
    privacy: {
        type: String,
        enum: ['public', 'private'],
        default: 'public'
    },
    likeCount: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
    //NOTE - To allow virtual
    toJSON: { virtuals: true },
    //NOTE - To allow console log
    toObject: { virtuals: true }
},)



//NOTE - Make Virtual populate for reviews in product (on the fly)
postSchema.virtual("comments", {
    ref: "comment",
    localField: "_id",//NOTE - Schema that want to make virtual populate on it 
    foreignField: "postId"
})


postSchema.pre('find', function () {
    this.populate('comments')
})





export const postModel = model('post', postSchema);
