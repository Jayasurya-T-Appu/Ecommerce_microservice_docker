const Product = require('../models/product.model');
const Category = require('../models/category.model');

// Custom error class for product-related errors
class ProductError extends Error {
    constructor(message, status) {
        super(message);
        this.statusCode = status;
    }
}

// Add a single product with SKU and category validation
exports.addProduct = async (productData) => {
    const { sku, category } = productData;

    // Check if provided category exists in the database
    const categoryExists = await Category.findById(category);
    if (!categoryExists) throw new ProductError('Invalid category ID', 400);

    // Check for the uniqueness of SKU
    const existingProduct = await Product.findOne({ sku });
    if (existingProduct) throw new ProductError('Product SKU already exists', 409);

    // Create and save the new product to the database
    const product = new Product(productData);
    await product.save();

    return product;
}

// Bulk insert multiple products with duplicate and category validation
exports.bulkInsertProduct = async (productsData) => {
    // Extract SKUs from the incoming product list
    const extractedSkus = productsData.map((product) => product.sku);

    // Find existing products by SKU to filter out duplicates
    const existingProducts = await Product.find({ sku: { $in: extractedSkus } }).select('sku');
    const existingProductSkus = new Set(existingProducts.map((product) => product.sku));

    // Separate non-duplicate and duplicate products
    const nonDuplicateProducts = productsData.filter((product) => !existingProductSkus.has(product.sku));
    const skippedDueToDuplicates = productsData.filter((product) => existingProductSkus.has(product.sku));

    // Extract and validate unique category IDs from non-duplicate products
    const categoryIds = [...new Set(nonDuplicateProducts.map((p) => p.category))];
    const categories = await Category.find({ _id: { $in: categoryIds } }).select('_id');
    const validCategoryIds = new Set(categories.map((cat) => String(cat._id)));

    // Filter products into valid and invalid category groups
    const validProducts = nonDuplicateProducts.filter((p) => validCategoryIds.has(String(p.category)));
    const skippedDueToInvalidCategory = nonDuplicateProducts.filter((p) => !validCategoryIds.has(String(p.category)));

    let insertedProducts = [];
    try {
        // Insert only valid products into the database
        if (validProducts.length > 0) {
            insertedProducts = await Product.insertMany(validProducts, { ordered: false });
        }
    } catch (error) {
        // Handle insertion errors (e.g., database issues)
        throw new ProductError('Error inserting products: ' + error.message, 500);
    }

    return {
        insertedProducts,
        skippedProducts: {
            duplicateSkus: skippedDueToDuplicates,
            invalidCategories: skippedDueToInvalidCategory
        }
    };
};

// Get all products with their category details populated
exports.getAllProducts = async () => {
    const products = await Product.find().populate('category');
    return products;
};

// Get a single product by its ID with populated category information
exports.getProductById = async (productId) => {
    const product = await Product.findById(productId).populate('category');
    if (!product) throw new ProductError('Product not found', 404);

    return product;
};

// Update an existing product, with SKU and category validation
exports.updateProduct = async (productId, productData) => {
    const { sku, category } = productData;

    // Check if the category exists before updating
    const categoryExists = await Category.findById(category);
    if (!categoryExists) throw new ProductError('Invalid category ID', 400);

    // If SKU is provided, ensure it is unique, excluding the current product
    if (sku) {
        const existingProduct = await Product.findOne({ sku });
        if (existingProduct && existingProduct._id.toString() !== productId) {
            throw new ProductError('Product SKU already exists', 409);
        }
    }

    // Update the product data and return the updated product
    const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        productData,
        { new: true, runValidators: true }
    ).populate('category');

    if (!updatedProduct) {
        throw new ProductError('Product not found', 404);
    }

    return updatedProduct;
}

// Delete a product by its ID
exports.deleteProduct = async (productId) => {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) throw new ProductError('Product not found', 404);

    return deletedProduct;
}
