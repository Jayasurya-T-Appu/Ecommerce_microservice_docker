const Joi = require('joi')
const mongoose = require('mongoose')

const objectId = (value, helpers) =>{
    if(!mongoose.Types.ObjectId.isValid(value)){
        return helpers.message(`"${value}" is not a valid ObjectId`)
    }
    return value
}


const categorySchema = Joi.object({
    name:  Joi.string().trim().required(),
    description: Joi.string().trim().required(),
})

const flexibleCategorySchema = Joi.alternatives().try(
    categorySchema,
    Joi.array().items(categorySchema).min(1)
)

const paramIdSchema = Joi.object({
    id: Joi.string().custom(objectId).required()
  });

module.exports = {flexibleCategorySchema, paramIdSchema};