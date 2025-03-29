const mongoose = require('mongoose')

const conenctDB = async() =>{
    try {
        const MONGO_URL = process.env.MONGO_URI || "mongodb://user-db:27017users";
        await mongoose.connect(MONGO_URL)
        console.log("User DB connected")
    } catch (error) {
        console.error("Mongo DB connection failed", error);
        process.exit(1)
        
    }
}

module.exports = conenctDB