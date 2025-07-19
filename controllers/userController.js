const User = require("../models/User")
const Rating = require("../models/Rating")

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password")
        const userRatings = await Rating.find({ userId: req.user.userId })
            .populate("movieId", "title")
            .sort({ createdAt: -1 })

        res.json({
            user,
            ratingsCount: userRatings.length,
            recentRatings: userRatings.slice(0, 5),
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { getUserProfile }
