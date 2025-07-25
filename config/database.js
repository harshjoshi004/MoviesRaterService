const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(
            process.env.MONGODB_URI || "mongodb://localhost:27017/movierating",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
        console.log("Connected to Mongo!")
    } catch (error) {
        console.error("MongoDB can not connect:", error)
        process.exit(1)
    }
}

module.exports = connectDB
