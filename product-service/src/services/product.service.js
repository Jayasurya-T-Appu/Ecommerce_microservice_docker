const Product = require('../models/product.model')

class ProductError extends Error {
    constructor(message, status) {
        super(message)
        this.statusCode = status
    }
}

exports.addProduct = async(productData) =>{
    
    const { sku } = productData

    const existingProduct = await Product.findOne({sku})
    if(existingProduct) throw new ProductError( 'Product SKU already exist', 409 )
    
    const product = new Product(productData)
    await product.save()

    return product
}