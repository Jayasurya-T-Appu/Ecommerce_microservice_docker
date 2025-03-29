/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for user management
 */

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               username:
 *                 type: string
 *                 example: johndoe123
 *               password:
 *                 type: string
 *                 example: Password123!
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Bad request, invalid data
 *       409:
 *         description: User already exists
 */

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: No user found
 */

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: Password123!
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: No user found
 */

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Get user profile
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token for authentication (Format - "Bearer <token>")
 *     responses:
 *       200:
 *         description: Successful response
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 *       404:
 *         description: No user found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       required:
 *         - fullName
 *         - houseName
 *         - street
 *         - city
 *         - state
 *         - country
 *         - zipCode
 *         - phone
 *       properties:
 *         fullName:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           example: "John Doe"
 *         houseName:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           example: "Sunset Villa"
 *         street:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           example: "123 Main Street"
 *         city:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           example: "Los Angeles"
 *         state:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           example: "California"
 *         country:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           example: "United States"
 *         zipCode:
 *           type: string
 *           minLength: 3
 *           maxLength: 10
 *           example: "90001"
 *         phone:
 *           type: string
 *           minLength: 10
 *           maxLength: 15
 *           example: "+1234567890"
 *         isDefault:
 *           type: boolean
 *           example: true
 *
 * /api/user/address:
 *   post:
 *     summary: Add a new address
 *     tags:
 *       - Address
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       201:
 *         description: Address successfully added
 *       400:
 *         description: Invalid request data
 *
 * /api/user/address/{id}:
 *   put:
 *     summary: Update an existing address
 *     tags:
 *       - Address
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Address ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       200:
 *         description: Address successfully updated
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Address not found
 *
 *   delete:
 *     summary: Delete an address
 *     tags:
 *       - Address
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Address ID
 *     responses:
 *       200:
 *         description: Address successfully deleted
 *       404:
 *         description: Address not found
 */
