const express = require("express")
const cors = require("cors")
const connectDB = require("./config/database")
const authRoutes = require("./routes/auth")
const movieRoutes = require("./routes/movies")
const userRoutes = require("./routes/users")
const { initializeMovies } = require("./utils/seedData")
require("dotenv").config()

const app = express()

// Middleware
app.use(express.json())
app.use(cors())

// Connect to MongoDB
connectDB()

// Welcome route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Movie Rating API!",
        endpoints: {
            "POST /auth/register": "Register a new user",
            "POST /auth/login": "Login user",
            "GET /movies": "Get all movies",
            "GET /movies/:id": "Get movie by ID",
            "POST /movies": "Add new movie (protected)",
            "POST /movies/:id/rate": "Rate a movie (protected)",
            "GET /movies/:id/ratings": "Get movie ratings",
            "GET /profile": "Get user profile (protected)",
        },
    })
})

// API Routes
app.use("/auth", authRoutes)
app.use("/movies", movieRoutes)
app.use("/", userRoutes)

// Initialize default movies after DB connection
setTimeout(() => {
    initializeMovies()
}, 2000)

// Start server
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(` - Server running on port ${PORT}`)
    console.log(` - Visit http://localhost:${PORT}/`)
})
