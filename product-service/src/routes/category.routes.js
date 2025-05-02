const express = require('express')
const { validateSchema } = require('../middlewares/validate.middleware')
const {flexibleCategorySchema, paramIdSchema} = require('../utils/validators/category.validator')
const categoryController = require('../controllers/category.controller')
const router = express.Router()

router.post('/', validateSchema(flexibleCategorySchema, 'body'), categoryController.addCategory)
router.get('/', categoryController.getAllCategories)
router.get('/:id', validateSchema(paramIdSchema, 'params'), categoryController.getCategoryById)
router.put('/:id', validateSchema(paramIdSchema, 'params'), validateSchema(flexibleCategorySchema, 'body'), categoryController.updateCategory)
router.delete('/:id', validateSchema(paramIdSchema, 'params'), categoryController.deleteCategory)

module.exports = router