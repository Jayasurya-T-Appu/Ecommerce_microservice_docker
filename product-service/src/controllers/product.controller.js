const productService = require('../services/product.service')

// Controller to handle adding a single product or multiple products
exports.addProduct = async (req, res) => {
    try {
        // Check if the request body is an array for bulk insert
        const isArray = Array.isArray(req.body)

        // Call the appropriate service function for bulk or single insert
        const product = isArray
            ? await productService.bulkInsertProduct(req.body)
            : await productService.addProduct(req.body)

        // Respond with success message and the created product(s)
        res.status(201).json({
            message: isArray ? 'Products added successfully' : 'Product added successfully',
            product
        })
    } catch (error) {
        // Handle service or validation errors
        res.status(error.statusCode || 400).json({
            error: error.message
        })
    }
}

// Controller to fetch all products
exports.getAllProducts = async (req, res) => {
    try {
        // Fetch all products from the database (with populated category info)
        const products = await productService.getAllProducts()
        res.status(200).json({
            message: 'Products fetched successfully',
            products
        })
    } catch (error) {
        // Handle unexpected errors during fetch
        res.status(error.statusCode || 500).json({
            error: error.message
        })
    }
}

// Controller to fetch a single product by its ID
exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.id

        // Fetch product from DB using the provided ID
        const product = await productService.getProductById(productId)

        res.status(200).json({
            message: 'Product fetched successfully',
            product
        })
    } catch (error) {
        // Handle errors (e.g., invalid ID, not found)
        res.status(error.statusCode || 500).json({
            error: error.message
        })
    }
}

// Controller to update a product by ID
exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id

        // Update the product with new data
        const updatedProduct = await productService.updateProduct(productId, req.body)

        res.status(200).json({
            message: 'Product updated successfully',
            updatedProduct
        })
    } catch (error) {
        // Handle validation errors, missing product, etc.
        res.status(error.statusCode || 500).json({
            error: error.message
        })
    }
}

// Controller to delete a product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id

        // Delete the product from the database
        await productService.deleteProduct(productId)

        res.status(200).json({
            message: 'Product deleted successfully'
        })
    } catch (error) {
        // Handle deletion errors (e.g., not found)
        res.status(error.statusCode || 500).json({
            error: error.message
        })
    }
}
