const express = require('express')
const productController = require('../controllers/product.controller')
const { validateSchema } = require('../middlewares/validate.middleware')
const { flexibleProductSchema, paramIdSchema } = require('../utils/validators/product.validator')

const router = express.Router()

router.post('/', validateSchema(flexibleProductSchema, 'body'), productController.addProduct)
router.get('/', productController.getAllProducts)
router.get('/:id', validateSchema(paramIdSchema, 'params'), productController.getProductById)
router.put('/:id', validateSchema(paramIdSchema, 'params'), validateSchema(flexibleProductSchema, 'body'), productController.updateProduct)
router.delete('/:id', validateSchema(paramIdSchema, 'params'), productController.deleteProduct)

module.exports = router