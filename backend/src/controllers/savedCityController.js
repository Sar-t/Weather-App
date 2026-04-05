const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/ApiError')
const User = require('../models/User')

const saveCity = asyncHandler(async (req, res) => {
  const { city, country = '' } = req.body
  const normalizedCity = city.trim()

  const user = await User.findById(req.user._id)

  const alreadySaved = user.savedCities.some(
    (entry) => entry.name.toLowerCase() === normalizedCity.toLowerCase()
  )

  if (alreadySaved) {
    throw new ApiError(409, 'City already saved.')
  }

  user.savedCities.push({ name: normalizedCity, country })
  await user.save()

  res.status(201).json({
    success: true,
    data: user.savedCities
  })
})

const getSavedCities = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('savedCities')

  res.json({
    success: true,
    data: user.savedCities
  })
})

const removeCity = asyncHandler(async (req, res) => {
  const { cityId } = req.params

  const user = await User.findById(req.user._id)
  const existingLength = user.savedCities.length

  user.savedCities = user.savedCities.filter((city) => city._id.toString() !== cityId)

  if (user.savedCities.length === existingLength) {
    throw new ApiError(404, 'Saved city not found.')
  }

  await user.save()

  res.json({
    success: true,
    data: user.savedCities
  })
})

module.exports = {
  saveCity,
  getSavedCities,
  removeCity
}
