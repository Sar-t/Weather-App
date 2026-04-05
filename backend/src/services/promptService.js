const buildAssistantPrompt = ({ message, city, weather, weatherError }) => {
  const weatherContext = weather
    ? `Current weather for ${weather.city}, ${weather.country}: ${weather.temperature} C, ${weather.description}, humidity ${weather.humidity}%, wind ${weather.windSpeed} m/s.`
    : `Weather context is unavailable. Reason: ${weatherError || 'No city selected.'}`

  return [
    'You are AI Weather Assistant, a helpful and concise weather-savvy assistant.',
    city ? `User selected city: ${city}.` : 'User did not provide a city.',
    weatherContext,
    'If weather context is available, treat it as source-of-truth and answer the user question using that data first.',
    'Give practical recommendations (umbrella, clothing, walk timing, safety) when relevant.',
    'Do not claim missing weather data when weather context is present.',
    'If weather context is unavailable, clearly ask the user to confirm a valid city name.',
    `User message: ${message}`
  ].join('\n')
}

module.exports = {
  buildAssistantPrompt
}
