const express = require('express')
const userController = require('../controllers/user.controller')
const { authMiddleware } = require('../middlewares/auth.middleware')
const { validateSchema } = require('../middlewares/validate.middleware')
const { registerSchema, addressSchema, loginSchema } = require('../utils/validators/user.validator')
const router = express.Router()

router.post('/register', validateSchema(registerSchema), userController.register)
router.post('/login', validateSchema(loginSchema), userController.login)
router.get('/profile', authMiddleware, userController.getUser)
router.put('/me', authMiddleware, userController.updateUser)
router.post('/address', authMiddleware, validateSchema(addressSchema), userController.addAddress)
router.put('/address/:addressId', authMiddleware, validateSchema(addressSchema), userController.updateAddress)
router.delete('/address/:addressId', authMiddleware, userController.deleteAddress)



module.exports = router