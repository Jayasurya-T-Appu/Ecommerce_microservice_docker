const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, unique: true },
  description: { type: String, required: true, trim: true }
}, { timestamps: true })

categorySchema.index({ name: 1 }, { unique: true })
const Category = mongoose.model('Category', categorySchema)
module.exports = Category
