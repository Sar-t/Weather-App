const express = require('express')
const { body, param } = require('express-validator')
const { saveCity, getSavedCities, removeCity } = require('../controllers/savedCityController')
const authMiddleware = require('../middlewares/authMiddleware')
const validateRequest = require('../middlewares/validateRequest')

const router = express.Router()

router.use(authMiddleware)

router.post(
  '/save-city',
  [body('city').trim().isLength({ min: 2, max: 80 }), body('country').optional().trim().isLength({ max: 10 })],
  validateRequest,
  saveCity
)

router.get('/saved-cities', getSavedCities)

router.delete('/remove-city/:cityId', [param('cityId').isMongoId()], validateRequest, removeCity)

module.exports = router
