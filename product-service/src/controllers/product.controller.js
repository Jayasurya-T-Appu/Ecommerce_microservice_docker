const productService = require('../services/product.service')

exports.addProduct = async (req, res) =>{
    try {
        const product = await productService.addProduct(req.body)

        res.status(201).json({
            message: 'Product added successfully',
            product
        })  
    } catch (error) {
        res.status(error.statusCode || 400).json({
            error: error.message
        })
    }
}