const Joi = require('joi')
const mongoose = require('mongoose')

const objectId = (value, helpers) =>{
    if(!mongoose.Types.ObjectId.isValid(value)){
        return helpers.message(`"${value}" is not a valid ObjectId`)
    }
    return value
}

const orderItemSchema = Joi.object({
    productId: Joi.string().custom(objectId).required(),
    quantity: Joi.number().min(1).required(),
    price: Joi.number().required()
})
const orderSchema = Joi.object({
    userId: Joi.string().custom(objectId).required(),
    items: Joi.array().items(orderItemSchema).min(1).required(),
    totalAmount: Joi.number().required(),
    shippingAddress: Joi.object({
        fullName: Joi.string().trim().required(),
        addressLine1: Joi.string().trim().required(),
        addressLine2: Joi.string().trim().optional(),
        city: Joi.string().trim().required(),
        state: Joi.string().trim().required(),
        postalCode: Joi.string().trim().required(),
        country: Joi.string().trim().required()
    }).required(),
    paymentStatus: Joi.string().valid('pending', 'paid', 'failed').optional(),
    orderStatus: Joi.string().valid('placed', 'shipped', 'delivered', 'cancelled').optional()
})

module.exports = {orderSchema}
