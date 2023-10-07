import Joi from "joi";



const addUserValidation =
    Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','online'] } }).required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        phone: Joi.string().pattern(/^\d{11}$/).message('Invalid phone number. Must be a 10-digit number.')


    })




const updateUserValidation =
    Joi.object({
        name: Joi.string().min(2),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        phone: Joi.string().pattern(/^\d{11}$/).message('Invalid phone number. Must be a 10-digit number.'),
        id: Joi.string().hex().length(24).required()
    })


const deleteUserValidation =
    Joi.object({
        id: Joi.string().hex().length(24).required()
    })


const changeUserPasswordValidation =
    Joi.object({
        id: Joi.string().hex().length(24).required(),
        oldPassword: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        rePassword: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    })

export {
    addUserValidation,
    updateUserValidation,
    deleteUserValidation,
    changeUserPasswordValidation
}