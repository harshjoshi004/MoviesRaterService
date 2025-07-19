const express = require("express")
const {
    getAllMovies,
    getMovieById,
    addMovie,
    rateMovie,
    getMovieRatings,
} = require("../controllers/movieController")
const { authenticateToken } = require("../middleware/auth")

const router = express.Router()

router.get("/", getAllMovies)
router.get("/:id", getMovieById)
router.post("/", authenticateToken, addMovie)
router.post("/:id/rate", authenticateToken, rateMovie)
router.get("/:id/ratings", getMovieRatings)

module.exports = router
