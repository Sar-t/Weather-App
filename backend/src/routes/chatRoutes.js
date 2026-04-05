const express = require('express')
const { chatWithAssistant } = require('../controllers/chatController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.post('/chat', authMiddleware, chatWithAssistant)

module.exports = router
