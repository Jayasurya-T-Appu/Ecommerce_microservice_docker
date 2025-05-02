const categoryService = require('../services/category.service');

// Controller to add a single category or bulk insert categories
exports.addCategory = async (req, res) => {
    try {
        // Determine if the request body contains an array
        const isArray = Array.isArray(req.body);

        // Use appropriate service based on input type
        const category = isArray
            ? await categoryService.bulkInsertCategory(req.body)
            : await categoryService.addCategory(req.body);

        // Respond with appropriate success message
        res.status(201).json({
            message: isArray ? 'Categories added successfully' : 'Category added successfully',
            category
        });
    } catch (error) {
        // Handle and respond to errors
        res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
}

// Controller to fetch all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json({
            message: 'Categories fetched successfully',
            categories
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
}

// Controller to fetch a single category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;

        const category = await categoryService.getCategoryById(categoryId);
        res.status(200).json({
            message: 'Category fetched successfully',
            category
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
}

// Controller to update a category by ID
exports.updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        const updatedCategory = await categoryService.updateCategory(categoryId, req.body);
        res.status(200).json({
            message: 'Category updated successfully',
            updatedCategory
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
}

// Controller to delete a category by ID
exports.deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        await categoryService.deleteCategory(categoryId);
        res.status(200).json({
            message: 'Category deleted successfully'
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
}
