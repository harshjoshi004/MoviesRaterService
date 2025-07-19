const mongoose = require("mongoose")

const ratingSchema = new mongoose.Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    rating: { type: Number, required: true, min: 1, max: 10 },
    review: String,
    createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Rating", ratingSchema)
