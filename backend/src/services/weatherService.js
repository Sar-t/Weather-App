const axios = require('axios')
const ApiError = require('../utils/ApiError')

const OPEN_WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5'

const getApiKey = () => {
  const key = process.env.OPENWEATHER_API_KEY
  if (!key) {
    throw new ApiError(500, 'Missing OPENWEATHER_API_KEY in environment variables.')
  }
  return key
}

const toCurrentWeatherPayload = (data) => ({
  city: data.name,
  country: data.sys.country,
  coordinates: {
    lat: data.coord.lat,
    lon: data.coord.lon
  },
  temperature: Math.round(data.main.temp),
  feelsLike: Math.round(data.main.feels_like),
  condition: data.weather?.[0]?.main || 'Unknown',
  description: data.weather?.[0]?.description || 'No description',
  icon: data.weather?.[0]?.icon || '01d',
  humidity: data.main.humidity,
  windSpeed: data.wind.speed,
  pressure: data.main.pressure,
  visibility: data.visibility,
  timestamp: data.dt
})

const toForecastPayload = (cityData, list) => {
  const dailyByDate = new Map()

  list.forEach((item) => {
    const [date] = item.dt_txt.split(' ')
    const hour = Number(item.dt_txt.split(' ')[1].split(':')[0])

    if (!dailyByDate.has(date) || Math.abs(hour - 12) < Math.abs(dailyByDate.get(date).hour - 12)) {
      dailyByDate.set(date, {
        hour,
        item
      })
    }
  })

  const entries = Array.from(dailyByDate.values())
    .slice(0, 5)
    .map(({ item }) => ({
      date: item.dt_txt.split(' ')[0],
      temperature: Math.round(item.main.temp),
      minTemperature: Math.round(item.main.temp_min),
      maxTemperature: Math.round(item.main.temp_max),
      condition: item.weather?.[0]?.main || 'Unknown',
      description: item.weather?.[0]?.description || 'No description',
      icon: item.weather?.[0]?.icon || '01d',
      humidity: item.main.humidity,
      windSpeed: item.wind.speed
    }))

  return {
    city: cityData.name,
    country: cityData.country,
    entries
  }
}

const fetchCurrentWeather = async ({ city, lat, lon }) => {
  const apiKey = getApiKey()
  const params = {
    appid: apiKey,
    units: 'metric'
  }

  if (city) {
    params.q = city
  } else {
    params.lat = lat
    params.lon = lon
  }

  try {
    const { data } = await axios.get(`${OPEN_WEATHER_BASE_URL}/weather`, {
      params
    })

    return toCurrentWeatherPayload(data)
  } catch (error) {
    if (error.response?.status === 401) {
      throw new ApiError(401, 'OpenWeather API key is invalid or inactive. Update OPENWEATHER_API_KEY.')
    }
    if (error.response?.status === 404) {
      throw new ApiError(404, 'City not found. Please check the city name.')
    }
    if (error.response?.status === 429) {
      throw new ApiError(429, 'OpenWeather rate limit exceeded. Please retry in a moment.')
    }
    throw new ApiError(502, 'Failed to fetch weather data from OpenWeatherMap.')
  }
}

const fetchFiveDayForecast = async (city) => {
  const apiKey = getApiKey()

  try {
    const { data } = await axios.get(`${OPEN_WEATHER_BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric'
      }
    })

    return toForecastPayload(data.city, data.list)
  } catch (error) {
    if (error.response?.status === 401) {
      throw new ApiError(401, 'OpenWeather API key is invalid or inactive. Update OPENWEATHER_API_KEY.')
    }
    if (error.response?.status === 404) {
      throw new ApiError(404, 'City not found. Please check the city name.')
    }
    if (error.response?.status === 429) {
      throw new ApiError(429, 'OpenWeather rate limit exceeded. Please retry in a moment.')
    }
    throw new ApiError(502, 'Failed to fetch forecast data from OpenWeatherMap.')
  }
}

module.exports = {
  fetchCurrentWeather,
  fetchFiveDayForecast
}
