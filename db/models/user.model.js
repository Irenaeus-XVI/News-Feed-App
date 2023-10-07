import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt'

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
    profileImg: {
        type: String
    },
    otp: String,
    otpExpiration: Date

}, { timestamps: true })



//NOTE - Hash User Password Before Save
userSchema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, Number(process.env.SALT_ROUNDS));
    }

    next()
})



//NOTE - Hash Password When Update The User password 
userSchema.pre('findOneAndUpdate', function () {
    if (this._update.password) this._update.password = bcrypt.hashSync(this._update.password, Number(process.env.SALT_ROUNDS))
});



export const userModel = model('user', userSchema);
