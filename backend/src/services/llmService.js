const axios = require('axios')
const ApiError = require('../utils/ApiError')

const askGemini = async (prompt) => {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new ApiError(500, 'Missing GEMINI_API_KEY in environment variables.')
  }

  const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash'

  try {
    const { data } = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.7
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 'I could not generate a response right now.'
  } catch (error) {
    throw new ApiError(502, 'Gemini request failed. Please verify API key, model, or quota.')
  }
}

const generateAssistantResponse = async (prompt) => {
  return askGemini(prompt)
}

module.exports = {
  generateAssistantResponse
}
