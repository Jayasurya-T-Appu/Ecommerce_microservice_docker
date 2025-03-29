const User = require("../models/user.model")

class UserError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

exports.registerUser = async (userData) => {

    const existingUser = await User.findOne({ email: userData.email })
    if (existingUser) throw new UserError( 'User already exist', 409 )

    const user = new User(userData)
    await user.save()

    return user.generateAuthToken()
}

exports.loginUser = async({ email, password }) => {
    const user = await User.findOne({ email })
    if(!user) throw new Error( 'Invalid email or password' )
    
    const isPasswordValid = await user.comparePassword(password)
    if(!isPasswordValid) throw new Error( 'Invalid email or password' )
    
    user.lastLogin = new Date()

    return user.generateAuthToken()
}

exports.getUserById = async(userId) => {
    if (!userId) throw new Error('User ID is required');
    const user = await User.findById(userId).select('-password') // select all fields except password
    if(!user) throw new UserError( 'User not found', 404 )
    return user
}

exports.updateUser = async(userId, userData) =>{
    if (!userId) throw new Error('User ID is required');
    const user = await User.findOneAndUpdate({ _id: userId }, userData, { new: true }).select('-password')
    if(!user) throw new Error('User not found')
    return user
}

exports.addAddress = async(userId, address) =>{
    const user = await User.findById(userId)
    if(!user) throw new Error('User not found')

    user.addresses.push(address)
    if(address.isDefault){
        user.addresses.forEach((addr) => (addr.isDefault = false))
        user.addresses[user.addresses.length - 1].isDefault = true
    }
    
    await user.save()

    return user
}

exports.updateAddress = async (userId, addressId, updatedAddress) =>{
    const user = await User.findById(userId)

    if(!user) throw new Error('User not found')
    
    const addressIndex = user.addresses.findIndex((addr) => addr._id.toString() === addressId)
    if(addressIndex === -1) throw new UserError('Address not found', 404)
    
    user.addresses[addressIndex] = {...user.addresses[addressIndex], ...updatedAddress}

    if(updatedAddress.isDefault){
        user.addresses.forEach((addr) => (addr.isDefault = false))
        user.addresses[user.addressses.length - 1].isDefault = true
    }
    
    await user.save()
    return user
}

exports.deleteAddress = async (userId, addressId) => {
    const user = await User.findById(userId)

    if(!user) throw new UserError('User not found', 404)

    user.addresses = user.addresses.filter((addr) => addr._id.toString() !== addressId)

    await user.save()
    return user
}