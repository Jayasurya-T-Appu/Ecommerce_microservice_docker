const express = require('express');
const orderController = require('../controllers/order.controller');
const { validateSchema } = require('../middlewares/validate.middleware');
const { orderSchema } = require('../utils/validators/order.validator');
const router = express.Router();

router.post('/', validateSchema(orderSchema, 'body'), orderController.createOrder);


module.exports = router;
