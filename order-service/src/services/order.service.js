const Order = require('../models/order.model');
const productClient = require('../grpcClient')
class OrderError extends Error{
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

exports.createOrder = async (orderData) => {
    try { 
        const { items } = orderData;
        const orderItems = [];
        let totalPrice = 0;
        for (const item of items) {
            // 1. Get product by ID
            const product = await new Promise((resolve, reject) => {
                productClient.getProductById({ id: item.productId }, (err, response) => {
                    if (err) reject(err);
                    else resolve(response);
                });
            });

            if (!product) {
                throw new OrderError('Product not found', 404);
            }

            if (product.stock < item.quantity) {
                throw new OrderError(`Insufficient stock for product ${product.name}`, 400);
            }
            // 2. Update product quantity (decrease stock)
            await new Promise((resolve, reject) => {
                productClient.updateProductQuantity(
                    { productId: item.productId, quantity: item.quantity },
                    (err, response) => {
                        if (err || !response.success) {
                            reject(
                                new OrderError(response?.message || err.message, 500)
                            );
                        } else {
                            resolve();
                        }
                    }
                );
            });

            // 3. Prepare order item and add to list
            orderItems.push({
                productId: product.id,
                price: product.price,
                quantity: item.quantity
            });

            totalPrice += product.price * item.quantity;
        }

        // 4. Create Order
        const NewOrder = {
            userId: orderData.userId,
            items: orderItems,
            totalAmount: totalPrice,
            shippingAddress: orderData.shippingAddress
        };

        const order = await Order.create(NewOrder);
        return order;

    } catch (error) {
        throw new OrderError('Error creating order: ' + error.message, 500);
    }
};
