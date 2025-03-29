const Joi = require('joi')

const registerSchema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).max(30).required(),
    role: Joi.string().valid('customer', 'admin', 'seller').default('customer')
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).required()
  });

const addressSchema = Joi.object({
    fullName: Joi.string().min(2).max(50).required(),
    houseName: Joi.string().min(2).max(50).required(),
    street: Joi.string().min(2).max(100).required(),
    city: Joi.string().min(2).max(50).required(),
    state: Joi.string().min(2).max(50).required(),
    country: Joi.string().min(2).max(50).required(),
    zipCode: Joi.string().min(3).max(10).required(),
    phone: Joi.string().min(10).max(15).required(),
    isDefault: Joi.boolean().optional()
})

module.exports = { loginSchema, registerSchema, addressSchema }