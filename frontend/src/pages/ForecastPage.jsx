import { useEffect, useState } from 'react'
import ForecastChart from '../components/ForecastChart'
import SearchBar from '../components/SearchBar'
import { fetchForecastByCity } from '../services/api'
import { useWeatherContext } from '../context/WeatherContext'

function ForecastPage() {
  const { selectedCity, updateSelectedCity } = useWeatherContext()
  const [city, setCity] = useState(selectedCity)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadForecast = async (targetCity) => {
    if (!targetCity) {
      return
    }

    setLoading(true)
    setError('')

    try {
      const data = await fetchForecastByCity(targetCity)
      setForecast(data)
      setCity(data.city)
      updateSelectedCity(data.city)
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to load forecast.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (selectedCity) {
      loadForecast(selectedCity)
    }
  }, [selectedCity])

  return (
    <div className="space-y-4">
      <section className="glass-panel rounded-3xl p-5">
        <h1 className="font-display text-3xl font-bold">5-Day Forecast</h1>
        <p className="mt-1 text-sm text-white/75">Daily forecast cards and trend chart for your selected city.</p>

        <div className="mt-4">
          <SearchBar
            city={city}
            onCityChange={setCity}
            onSearch={(event) => {
              event.preventDefault()
              loadForecast(city.trim())
            }}
            onLocate={() => {}}
            loading={loading}
            showLocate={false}
          />
        </div>
      </section>

      {error ? <p className="rounded-2xl border border-rose-300/50 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">{error}</p> : null}

      <ForecastChart forecast={forecast} />

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {forecast?.entries?.map((entry) => (
          <article key={entry.date} className="glass-panel rounded-2xl p-4 text-white">
            <p className="text-xs text-white/70">{new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long' })}</p>
            <img
              src={`https://openweathermap.org/img/wn/${entry.icon}@2x.png`}
              alt={entry.condition}
              className="h-16 w-16"
            />
            <p className="text-lg font-semibold">{entry.temperature} C</p>
            <p className="text-xs text-white/75">{entry.description}</p>
            <p className="mt-2 text-xs text-white/70">H: {entry.maxTemperature} C | L: {entry.minTemperature} C</p>
          </article>
        ))}
      </section>
    </div>
  )
}

export default ForecastPage
