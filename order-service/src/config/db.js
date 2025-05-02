const mongoose = require('mongoose')

const conenctDB = async() =>{
    try {
        const MONGO_URL = process.env.MONGO_URI || "mongodb://order-db:27017/order";
        await mongoose.connect(MONGO_URL)
        console.log("order DB connected")
    } catch (error) {
        console.error("Mongo DB connection failed", error);
        process.exit(1)
        
    }
}

module.exports = conenctDB