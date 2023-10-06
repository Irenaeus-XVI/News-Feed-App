import Joi from "joi";



const signUpValidation =
    Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        phone: Joi.string().pattern(/^\d{11}$/).message('Invalid phone number. Must be a 10-digit number.')
    })

const signInValidation =
    Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

    })

export {
    signUpValidation,
    signInValidation
}
