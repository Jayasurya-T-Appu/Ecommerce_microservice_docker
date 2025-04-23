const userService = require("../services/user.service")

exports.register = async (req, res) => {
    try {
        const token = await userService.registerUser(req.body)
        res.status(201).json({
            message: "User registered successfully",
            token
        })
    }
    catch (error) {
        res.status(error.statusCode || 400).json({
            error: error.message
        })
    }
}

exports.login = async (req, res) => {
    try {
        const token = await userService.loginUser(req.body)
        res.status(201).json({
            message: "User logged in successfully",
            token
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await userService.getUserById(req.user.id)
        res.json(user)
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

exports.updateUser = async (req, res) =>{
    try {
        const updatedUser = await userService.updateUser(req.user.id, req.body)
        res.json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.addAddress = async (req, res)=>{
    try {
        const userId = req.user.id
        const address = req.body

        const updatedUser = await userService.addAddress(userId, address)
        res.status(200).json({
            message: 'Address added successfully',
            user: updatedUser
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateAddress = async(req, res) =>{
    try {
        const userId = req.user.id
        const addressId = req.params.addressId
        const updatedAddress = req.body

        const updatedUser = await userService.updateAddress(userId, addressId, updatedAddress)
        res.status(200).json({ message: 'Address updated successfully', user: updatedUser });
    } catch (error) {
        res.status(error.statusCode || 400).json({
            error: error.message
        })
    }
}

exports.deleteAddress = async(req, res) =>{
    try {
        const userId = req.user.id
        const addressId = req.params.addressId

        const updatedUser = await userService.deleteAddress(userId, addressId)
        res.status(200).json({ message: 'Address deleted successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}