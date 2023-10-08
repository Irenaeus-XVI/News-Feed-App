import Joi from "joi";



const addCommentValidation =
    Joi.object({
        comment: Joi.string().min(2).required(),
        postId: Joi.string().hex().length(24).required()
    })




const updateCommentValidation =
    Joi.object({
        comment: Joi.string().min(2).required(),
        postId: Joi.string().hex().length(24).required(),
        id: Joi.string().hex().length(24).required(),

    })


const deleteCommentValidation =
    Joi.object({
        postId: Joi.string().hex().length(24).required(),
        id: Joi.string().hex().length(24).required()

    })



export {
    addCommentValidation,
    updateCommentValidation,
    deleteCommentValidation
}