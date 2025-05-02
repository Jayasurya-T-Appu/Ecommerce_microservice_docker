const User = require("../models/user.model")
const redisClient = require('../config/redisClient')

// Custom Error class to handle user-related errors with HTTP status codes
class UserError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

// Register a new user
exports.registerUser = async (userData) => {
    // Check if a user with the given email already exists
    const existingUser = await User.findOne({ email: userData.email })
    if (existingUser) throw new UserError('User already exist', 409)

    // Create and save the new user
    const user = new User(userData)
    await user.save()

    // Generate and return JWT auth token
    return user.generateAuthToken()
}

// Login an existing user
exports.loginUser = async({ email, password }) => {
    // Find user by email
    const user = await User.findOne({ email })
    if (!user) throw new Error('Invalid email or password')

    // Compare passwords
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) throw new Error('Invalid email or password')

    // Update last login time
    user.lastLogin = new Date()

    // Generate and return JWT auth token
    return user.generateAuthToken()
}

// Fetch user by ID with Redis caching
exports.getUserById = async(userId) => {
    if (!userId) throw new Error('User ID is required')

    // Try to retrieve user from Redis cache
    const cachedUser = await redisClient.get(`user:${userId}`)
    if (cachedUser) return JSON.parse(cachedUser)

    // If not cached, fetch from DB (excluding password)
    const user = await User.findById(userId).select('-password')
    if (!user) throw new UserError('User not found', 404)

    // Cache user data in Redis
    await redisClient.set(`user:${userId}`, JSON.stringify(user))

    return user
}

// Update user details
exports.updateUser = async(userId, userData) => {
    if (!userId) throw new Error('User ID is required')

    // Find and update user, return new document excluding password
    const user = await User.findOneAndUpdate({ _id: userId }, userData, { new: true }).select('-password')
    if (!user) throw new Error('User not found')

    return user
}

// Add a new address to the user's address list
exports.addAddress = async(userId, address) => {
    const user = await User.findById(userId)
    if (!user) throw new Error('User not found')

    // Push new address to the user's address array
    user.addresses.push(address)

    // If new address is default, set others to false
    if (address.isDefault) {
        user.addresses.forEach((addr) => (addr.isDefault = false))
        user.addresses[user.addresses.length - 1].isDefault = true
    }

    await user.save()
    return user
}

// Update a specific address by its ID
exports.updateAddress = async (userId, addressId, updatedAddress) => {
    const user = await User.findById(userId)
    if (!user) throw new Error('User not found')

    // Find index of the address to update
    const addressIndex = user.addresses.findIndex((addr) => addr._id.toString() === addressId)
    if (addressIndex === -1) throw new UserError('Address not found', 404)

    // Merge existing and updated address fields
    user.addresses[addressIndex] = { ...user.addresses[addressIndex], ...updatedAddress }

    // If updated address is default, unset others and set this as default
    if (updatedAddress.isDefault) {
        user.addresses.forEach((addr) => (addr.isDefault = false))
        user.addresses[addressIndex].isDefault = true
    }

    await user.save()
    return user
}

// Delete an address by its ID
exports.deleteAddress = async (userId, addressId) => {
    const user = await User.findById(userId)
    if (!user) throw new UserError('User not found', 404)

    // Remove address with matching ID from the array
    user.addresses = user.addresses.filter((addr) => addr._id.toString() !== addressId)

    await user.save()
    return user
}
