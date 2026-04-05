const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/ApiError')
const { fetchCurrentWeather } = require('../services/weatherService')
const { generateAssistantResponse } = require('../services/llmService')
const { buildInsightsPrompt } = require('../services/insightsPromptService')

const getWeatherInsights = asyncHandler(async (req, res) => {
  const { city } = req.body
  const normalizedCity = typeof city === 'string' ? city.trim() : ''

  if (!normalizedCity) {
    throw new ApiError(400, 'city is required in request body.')
  }

  const weather = await fetchCurrentWeather({ city: normalizedCity })
  const prompt = buildInsightsPrompt({ city: normalizedCity, weather })
  const insights = await generateAssistantResponse(prompt)

  res.json({
    success: true,
    data: {
      city: normalizedCity,
      weather,
      insights
    }
  })
})

module.exports = {
  getWeatherInsights
}
