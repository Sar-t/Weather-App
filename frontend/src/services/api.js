import axios from 'axios'

const TOKEN_STORAGE_KEY = 'ai-weather-token'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export const signupUser = async (payload) => {
  const { data } = await apiClient.post('/signup', payload)
  return data.data
}

export const loginUser = async (payload) => {
  const { data } = await apiClient.post('/login', payload)
  return data.data
}

export const fetchCurrentUser = async () => {
  const { data } = await apiClient.get('/me')
  return data.data.user
}

export const fetchWeatherByCity = async (city) => {
  const { data } = await apiClient.get('/weather', {
    params: { city }
  })

  return data.data
}

export const fetchWeatherByCoords = async (lat, lon) => {
  const { data } = await apiClient.get('/weather', {
    params: { lat, lon }
  })

  return data.data
}

export const fetchForecastByCity = async (city) => {
  const { data } = await apiClient.get('/forecast', {
    params: { city }
  })

  return data.data
}

export const sendChatMessage = async (message, city) => {
  const { data } = await apiClient.post('/chat', {
    message,
    city
  })

  return data.data
}

export const fetchInsights = async (city) => {
  const { data } = await apiClient.post('/insights', {
    city
  })

  return data.data
}

export const saveCity = async (city, country = '') => {
  const { data } = await apiClient.post('/save-city', {
    city,
    country
  })

  return data.data
}

export const fetchSavedCities = async () => {
  const { data } = await apiClient.get('/saved-cities')
  return data.data
}

export const removeSavedCity = async (cityId) => {
  const { data } = await apiClient.delete(`/remove-city/${cityId}`)
  return data.data
}

export { TOKEN_STORAGE_KEY }
