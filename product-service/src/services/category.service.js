const Category = require('../models/category.model')

// Custom error class for category-related errors
class CategoryError extends Error {
    constructor(message, status) {
        super(message)
        this.statusCode = status
    }
}

// Add a new category
exports.addCategory = async (categoryData) => {
    const { name } = categoryData

    // Check if category with same name already exists
    const existingCategory = await Category.findOne({ name })
    if (existingCategory) throw new CategoryError('Category already exists', 409)

    // Create and save new category
    const category = new Category(categoryData)
    await category.save()

    return category
}

// Bulk insert categories with duplicate check
exports.bulkInsertCategory = async (categoriesData) => {
    // Extract all category names from input
    const extractedCategoryNames = categoriesData.map((category) => category.name);

    // Check for already existing category names in DB
    const existingCategories = await Category.find({ name: { $in: extractedCategoryNames } }).select('name');
    const existingCategoryNames = new Set(existingCategories.map((category) => category.name));

    // Filter out new and duplicate categories
    const newCategories = categoriesData.filter(category => !existingCategoryNames.has(category.name));
    const skippedCategories = categoriesData.filter(category => existingCategoryNames.has(category.name));

    let insertedCategories = [];
    try {
        if (newCategories.length > 0) {
            // Insert only non-duplicate categories
            insertedCategories = await Category.insertMany(newCategories, { ordered: false });
        }
    } catch (err) {
        throw new CategoryError('Error inserting categories: ' + err.message, 500);
    }

    return {
        insertedCategories,
        skippedCategories // Return the ones that were skipped (already existed)
    };
};

// Fetch all categories
exports.getAllCategories = async () => {
    const categories = await Category.find();
    return categories;
}

// Fetch category by ID
exports.getCategoryById = async (categoryId) => {
    const category = await Category.findById(categoryId);
    if (!category) throw new CategoryError('Category not found', 404);
    return category;
}

// Update category by ID
exports.updateCategory = async (categoryId, categoryData) => {
    const category = await Category.findByIdAndUpdate(categoryId, categoryData, { new: true });
    if (!category) throw new CategoryError('Category not found', 404);
    return category;
}

// Delete category by ID
exports.deleteCategory = async (categoryId) => {
    const category = await Category.findByIdAndDelete(categoryId);
    if (!category) throw new CategoryError('Category not found', 404);
    return category;
}
