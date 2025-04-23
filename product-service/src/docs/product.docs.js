/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API for product management
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - stock
 *               - category
 *               - image
 *               - sku
 *             properties:
 *               name:
 *                 type: string
 *                 example: iPhone 14
 *               description:
 *                 type: string
 *                 example: Latest Apple iPhone 14 with A16 Bionic chip
 *               price:
 *                 type: number
 *                 example: 999.99
 *               stock:
 *                 type: number
 *                 example: 50
 *               category:
 *                 type: string
 *                 example: 643d9fe11c14a12fd9e8c1ab
 *               image:
 *                 type: string
 *                 example: https://example.com/images/iphone14.png
 *               brand:
 *                 type: string
 *                 example: Apple
 *               sku:
 *                 type: string
 *                 example: IPHN14-256GB
 *               rating:
 *                 type: number
 *                 example: 4.5
 *               reviews:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: string
 *                       example: 643da0fa1c14a12fd9e8c2c5
 *                     rating:
 *                       type: number
 *                       example: 5
 *                     comment:
 *                       type: string
 *                       example: Amazing product!
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Product successfully created
 *       400:
 *         description: Bad request, invalid data
 *       409:
 *         description: Product SKU already exists
 */
