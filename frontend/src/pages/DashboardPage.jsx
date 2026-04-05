import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Plus } from 'lucide-react'
import SearchBar from '../components/SearchBar'
import WeatherCard from '../components/WeatherCard'
import WeatherInsights from '../components/WeatherInsights'
import { fetchSavedCities, fetchWeatherByCity, fetchWeatherByCoords, saveCity } from '../services/api'
import { getWeatherTheme } from '../utils/weatherTheme'
import { useAuth } from '../context/AuthContext'
import { useWeatherContext } from '../context/WeatherContext'

function DashboardPage() {
  const { user } = useAuth()
  const { selectedCity, updateSelectedCity } = useWeatherContext()

  const [cityInput, setCityInput] = useState(selectedCity)
  const [weather, setWeather] = useState(null)
  const [savedCities, setSavedCities] = useState([])
  const [loadingWeather, setLoadingWeather] = useState(false)
  const [geoLoading, setGeoLoading] = useState(false)
  const [error, setError] = useState('')

  const weatherTheme = useMemo(() => getWeatherTheme(weather?.condition), [weather?.condition])

  const refreshSavedCities = async () => {
    try {
      const cities = await fetchSavedCities()
      setSavedCities(cities)
    } catch {
      setSavedCities([])
    }
  }

  const loadWeatherByCity = async (city) => {
    setLoadingWeather(true)
    setError('')
    try {
      const weatherData = await fetchWeatherByCity(city)
      setWeather(weatherData)
      setCityInput(weatherData.city)
      updateSelectedCity(weatherData.city)
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to load weather data.')
    } finally {
      setLoadingWeather(false)
    }
  }

  const handleSearch = async (event) => {
    event.preventDefault()
    if (!cityInput.trim()) {
      return
    }

    await loadWeatherByCity(cityInput.trim())
  }

  const handleGeolocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported in this browser.')
      return
    }

    setGeoLoading(true)
    setError('')

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        try {
          const weatherData = await fetchWeatherByCoords(latitude, longitude)
          setWeather(weatherData)
          setCityInput(weatherData.city)
          updateSelectedCity(weatherData.city)
        } catch (requestError) {
          setError(requestError.response?.data?.message || 'Unable to load local weather.')
        } finally {
          setGeoLoading(false)
        }
      },
      () => {
        setError('Location permission denied. Search by city instead.')
        setGeoLoading(false)
      }
    )
  }

  const handleSaveCity = async () => {
    if (!weather?.city) {
      return
    }

    try {
      await saveCity(weather.city, weather.country)
      await refreshSavedCities()
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to save city.')
    }
  }

  useEffect(() => {
    refreshSavedCities()

    if (selectedCity) {
      loadWeatherByCity(selectedCity)
      return
    }

    handleGeolocation()
  }, [])

  return (
    <div className="space-y-4">
      <section className={`glass-panel relative overflow-hidden rounded-3xl p-5`}> 
        <div className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${weatherTheme.gradient} opacity-70`} />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-white/80">Hello {user?.name || 'there'}</p>
            <h1 className="font-display text-3xl font-bold tracking-tight">Your Weather Dashboard</h1>
          </div>

          <div className="flex gap-2">
            <Link
              to="/forecast"
              className="rounded-2xl border border-white/25 bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/20"
            >
              Check Forecast
            </Link>
            <Link
              to="/chat"
              className="rounded-2xl bg-cyan-300/90 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-cyan-200"
            >
              Ask AI
            </Link>
          </div>
        </div>

        <div className="mt-4">
          <SearchBar
            city={cityInput}
            onCityChange={setCityInput}
            onSearch={handleSearch}
            onLocate={handleGeolocation}
            loading={loadingWeather || geoLoading}
          />
        </div>
      </section>

      {error ? <p className="rounded-2xl border border-rose-300/50 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">{error}</p> : null}

      <section className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4">
          <WeatherCard weather={weather} loading={loadingWeather} error={error} />

          <button
            type="button"
            onClick={handleSaveCity}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/20"
          >
            <Plus size={16} />
            Save Current City
          </button>
        </div>

        <WeatherInsights city={weather?.city || selectedCity} />
      </section>

      <section className="glass-panel rounded-3xl p-5">
        <div className="mb-3 inline-flex items-center gap-2 text-sm text-white/85">
          <Sparkles size={16} />
          Saved Cities Preview
        </div>

        <div className="flex flex-wrap gap-2">
          {savedCities.length ? (
            savedCities.slice(0, 6).map((city) => (
              <button
                key={city._id}
                type="button"
                onClick={() => loadWeatherByCity(city.name)}
                className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-sm text-white transition hover:bg-white/20"
              >
                {city.name}
              </button>
            ))
          ) : (
            <p className="text-sm text-white/70">No saved cities yet.</p>
          )}
        </div>
      </section>
    </div>
  )
}

export default DashboardPage
