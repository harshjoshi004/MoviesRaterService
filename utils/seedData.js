const Movie = require("../models/Movie")

const defaultMovies = [
    {
        title: "The Amazing Spider-Man",
        director: "Marc Webb",
        year: 2012,
        genre: ["Action", "Romance", "Sci-Fi"],
        description:
            "After Peter Parker is bitten by a genetically altered spider, he gains newfound, spider-like powers and ventures out to save the city from the machinations of a mysterious reptilian foe.",
    },
    {
        title: "Man of Steel",
        director: "Zack Snyder",
        year: 2013,
        genre: ["Action", "Adventure", "Sci-Fi"],
        description:
            "An alien child is evacuated from his dying world and sent to Earth to live among humans. His peace is threatened when other survivors of his home planet invade Earth.",
    },
    {
        title: "Fight Club",
        director: "David Fincher",
        year: 1999,
        genre: ["Drama", "Thriller"],
        description:
            "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into an anarchist organization.",
    },
    {
        title: "The Dark Knight",
        director: "Christopher Nolan",
        year: 2008,
        genre: ["Action", "Crime", "Drama"],
        description:
            "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    },
    {
        title: "Inception",
        director: "Christopher Nolan",
        year: 2010,
        genre: ["Action", "Sci-Fi", "Thriller"],
        description:
            "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    },
    {
        title: "Pulp Fiction",
        director: "Quentin Tarantino",
        year: 1994,
        genre: ["Crime", "Drama"],
        description:
            "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    },
]

const initializeMovies = async () => {
    try {
        const movieCount = await Movie.countDocuments()
        if (movieCount === 0) {
            await Movie.insertMany(defaultMovies)
            console.log("- Default movies added to database")
        } else {
            console.log("- Movies already exist in database")
        }
    } catch (error) {
        console.error("- Error initializing movies:", error)
    }
}

module.exports = { initializeMovies }
