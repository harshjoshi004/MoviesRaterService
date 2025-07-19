const express = require("express")
const { getUserProfile } = require("../controllers/userController")
const { authenticateToken } = require("../middleware/auth")

const router = express.Router()

router.get("/profile", authenticateToken, getUserProfile)

module.exports = router
