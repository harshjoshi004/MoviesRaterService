const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body

        // Check if user exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }],
        })

        if (existingUser) {
            return res.status(400).json({ error: "User already exists" })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create user
        const user = new User({
            username,
            email,
            password: hashedPassword,
        })

        await user.save()

        // Generate token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET || "your-secret-key",
            {
                expiresIn: "24h",
            }
        )

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        // Find user
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" })
        }

        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
            return res.status(400).json({ error: "Invalid credentials" })
        }

        // Generate token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET || "your-secret-key",
            {
                expiresIn: "24h",
            }
        )

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { register, login }
