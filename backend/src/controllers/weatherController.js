const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/ApiError')
const { fetchCurrentWeather, fetchFiveDayForecast } = require('../services/weatherService')

const getWeather = asyncHandler(async (req, res) => {
  const { city, lat, lon } = req.query
  const normalizedCity = typeof city === 'string' ? city.trim() : ''
  const hasCoords = lat !== undefined && lon !== undefined

  if (!normalizedCity && !hasCoords) {
    throw new ApiError(400, 'Please provide either city or lat and lon query params.')
  }

  const numericLat = hasCoords ? Number(lat) : undefined
  const numericLon = hasCoords ? Number(lon) : undefined

  if (hasCoords && (Number.isNaN(numericLat) || Number.isNaN(numericLon))) {
    throw new ApiError(400, 'lat and lon query params must be valid numbers.')
  }

  const weather = await fetchCurrentWeather({
    city: normalizedCity || undefined,
    lat: numericLat,
    lon: numericLon
  })

  res.json({
    success: true,
    data: weather
  })
})

const getForecast = asyncHandler(async (req, res) => {
  const { city } = req.query

  if (!city) {
    throw new ApiError(400, 'Please provide city query param for forecast.')
  }

  const forecast = await fetchFiveDayForecast(city)

  res.json({
    success: true,
    data: forecast
  })
})

module.exports = {
  getWeather,
  getForecast
}
