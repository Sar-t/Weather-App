const express = require('express')
const { body } = require('express-validator')
const { getWeatherInsights } = require('../controllers/insightsController')
const validateRequest = require('../middlewares/validateRequest')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.post(
  '/insights',
  authMiddleware,
  [body('city').trim().isLength({ min: 2, max: 80 })],
  validateRequest,
  getWeatherInsights
)

module.exports = router
