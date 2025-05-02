const OrderService = require('../services/order.service');

exports.createOrder = async (req, res) => {
    try {
        const orderData = req.body;
        const order = await OrderService.createOrder(orderData);
        res.status(201).json({
            message: 'Order created successfully',
            order
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            error: error.message
        });
    }
}