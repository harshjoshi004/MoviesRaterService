const Movie = require("../models/Movie")
const Rating = require("../models/Rating")

const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find().sort({ createdAt: -1 })
        res.json(movies)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id)
        if (!movie) {
            return res.status(404).json({ error: "Movie not found" })
        }
        res.json(movie)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const addMovie = async (req, res) => {
    try {
        const { title, director, year, genre, description } = req.body

        const movie = new Movie({
            title,
            director,
            year,
            genre,
            description,
        })

        await movie.save()
        res.status(201).json({
            message: "Movie added successfully",
            movie,
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const rateMovie = async (req, res) => {
    try {
        const { rating, review } = req.body
        const movieId = req.params.id
        const userId = req.user.userId

        // Check if movie exists
        const movie = await Movie.findById(movieId)
        if (!movie) {
            return res.status(404).json({ error: "Movie not found" })
        }

        // Check if user already rated this movie
        const existingRating = await Rating.findOne({ movieId, userId })
        if (existingRating) {
            // Update existing rating
            existingRating.rating = rating
            existingRating.review = review
            await existingRating.save()
        } else {
            // Create new rating
            const newRating = new Rating({
                movieId,
                userId,
                rating,
                review,
            })
            await newRating.save()
        }

        // Update movie's average rating
        const ratings = await Rating.find({ movieId })
        const totalRatings = ratings.length
        const averageRating =
            ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings

        movie.averageRating = Math.round(averageRating * 10) / 10
        movie.totalRatings = totalRatings
        await movie.save()

        res.json({
            message: "Rating submitted successfully",
            movieRating: {
                averageRating: movie.averageRating,
                totalRatings: movie.totalRatings,
            },
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getMovieRatings = async (req, res) => {
    try {
        const ratings = await Rating.find({ movieId: req.params.id })
            .populate("userId", "username")
            .sort({ createdAt: -1 })

        res.json(ratings)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getAllMovies,
    getMovieById,
    addMovie,
    rateMovie,
    getMovieRatings,
}
