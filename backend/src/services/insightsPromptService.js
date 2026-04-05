const buildInsightsPrompt = ({ city, weather }) => {
  return [
    'You are an expert weather wellness assistant.',
    `City: ${city}.`,
    `Current weather: ${weather.temperature} C, ${weather.description}, humidity ${weather.humidity}%, wind ${weather.windSpeed} m/s.`,
    'Generate concise insights in 3 sections: Clothing, Travel, Health.',
    'Use practical bullets. Keep total output under 120 words.'
  ].join('\n')
}

module.exports = {
  buildInsightsPrompt
}
