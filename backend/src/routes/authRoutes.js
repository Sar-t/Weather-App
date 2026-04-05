const express = require('express')
const { body } = require('express-validator')
const { signup, login, getCurrentUser } = require('../controllers/authController')
const validateRequest = require('../middlewares/validateRequest')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.post(
  '/signup',
  [
    body('name').trim().isLength({ min: 2, max: 80 }),
    body('email').trim().isEmail(),
    body('password').isLength({ min: 8 })
  ],
  validateRequest,
  signup
)

router.post(
  '/login',
  [body('email').trim().isEmail(), body('password').isLength({ min: 8 })],
  validateRequest,
  login
)

router.get('/me', authMiddleware, getCurrentUser)

module.exports = router
