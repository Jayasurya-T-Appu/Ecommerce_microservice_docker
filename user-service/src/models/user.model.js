const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AddressSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    houseName: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: String, required: true },
    phone: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
});

const UserSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        username: { type: String, required: true, unique: true, trim: true },
        password: { type: String, required: true, minlength: 6 },

        role: {
            type: String,
            enum: ["admin", "customer", "seller"],
            default: "customer",
        },
        addresses: [AddressSchema],
        wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],

        lastLogin: { type: Date },
    },
    { timestamps: true }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// Compare password
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// Generate JWT Token
UserSchema.methods.generateAuthToken = function () {
    return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

const User = mongoose.model('User', UserSchema)
module.exports = User