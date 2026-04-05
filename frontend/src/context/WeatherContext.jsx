import { createContext, useContext, useMemo, useState } from 'react'

const CITY_STORAGE_KEY = 'ai-weather-selected-city'
const WeatherContext = createContext(null)

export function WeatherProvider({ children }) {
  const [selectedCity, setSelectedCity] = useState(() => localStorage.getItem(CITY_STORAGE_KEY) || '')

  const updateSelectedCity = (city) => {
    setSelectedCity(city)
    if (city) {
      localStorage.setItem(CITY_STORAGE_KEY, city)
    }
  }

  const value = useMemo(
    () => ({
      selectedCity,
      updateSelectedCity
    }),
    [selectedCity]
  )

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
}

export const useWeatherContext = () => {
  const context = useContext(WeatherContext)
  if (!context) {
    throw new Error('useWeatherContext must be used inside WeatherProvider')
  }
  return context
}
