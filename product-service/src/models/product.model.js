const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {type:String, required:true, trim: true},
    description: {type:String, required:true, trim: true},
    price: {type:Number, required:true},
    stock: {type:Number, required:true},
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    image: {type:String, required:true},
    brand: {type:String, trim:true},
    sku : {type:String, unique: true, required:true},
    rating: {type:Number, default:0, min:0, max:5},
    reviews: [{
        user: {type:mongoose.Schema.ObjectId, ref:'User'},
        rating: {type:Number, default:0, min:0, max:5},
        comment: {type:String, trim:true},
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema)

module.exports = Product