import Joi from "joi";



const addPostValidation =
    Joi.object({
        content: Joi.string().min(2).required(),
        privacy: Joi.string().valid('public', 'private')
    })




const updatePostValidation =
    Joi.object({
        content: Joi.string().min(2).required(),
        id: Joi.string().hex().length(24).required(),
        privacy: Joi.string().valid('public', 'private')
    })


const deletePostValidation =
    Joi.object({
        id: Joi.string().hex().length(24).required()
    })



export {
    addPostValidation,
    updatePostValidation,
    deletePostValidation
}