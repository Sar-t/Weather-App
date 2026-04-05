const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/ApiError')
const { fetchCurrentWeather } = require('../services/weatherService')
const { generateAssistantResponse } = require('../services/llmService')
const { buildAssistantPrompt } = require('../services/promptService')

const chatWithAssistant = asyncHandler(async (req, res) => {
  const { message, city } = req.body
  const normalizedCity = typeof city === 'string' ? city.trim() : ''

  if (!message || !message.trim()) {
    throw new ApiError(400, 'message is required in request body.')
  }

  let weatherContext = null
  let weatherContextError = null

  if (normalizedCity) {
    try {
      weatherContext = await fetchCurrentWeather({ city: normalizedCity })
    } catch (error) {
      weatherContext = null
      weatherContextError = error.message || 'Weather context fetch failed.'
    }
  }

  const prompt = buildAssistantPrompt({
    message,
    city: normalizedCity,
    weather: weatherContext,
    weatherError: weatherContextError
  })

  const response = await generateAssistantResponse(prompt)

  res.json({
    success: true,
    data: {
      reply: response,
      weatherContextUsed: Boolean(weatherContext),
      weatherContextError
    }
  })
})

module.exports = {
  chatWithAssistant
}
