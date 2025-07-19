const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    director: { type: String, required: true },
    year: { type: Number, required: true },
    genre: [String],
    description: String,
    averageRating: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Movie", movieSchema)
