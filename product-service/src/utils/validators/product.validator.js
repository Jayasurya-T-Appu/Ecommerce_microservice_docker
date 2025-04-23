const Joi = require('joi')
const mongoose = require('mongoose')

const objectId = (value, helpers) =>{
    if(!mongoose.Types.ObjectId.isValid(value)){
        return helpers.message(`"${value}" is not a valid ObjectId`)
    }
    return value
}

const reviewSchema = Joi.object({
    user: Joi.string().custom(objectId),
    rating: Joi.number().min(0).max(5).default(0),
    comment: Joi.string().trim().allow('', null),
})

const productSchema = Joi.object({
    name: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    price: Joi.number().required(),
    stock: Joi.number().required(),
    category: Joi.string().custom(objectId).required(),
    image: Joi.string().uri().required(),
    brand: Joi.string().trim().optional(),
    sku: Joi.string().required(),
    rating: Joi.number().min(0).max(5).optional(),
    reviews: Joi.array().items(reviewSchema).optional(),
    isActive: Joi.boolean().optional(),
    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional()
  })

  module.exports = {productSchema};
  