const express = require('express')
const productController = require('../controllers/product.controller')
const { validateSchema } = require('../middlewares/validate.middleware')
const { productSchema } = require('../utils/validators/product.validator')

const router = express.Router()

router.post('/create', validateSchema(productSchema), productController.addProduct)

module.exports = router