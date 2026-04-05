import { useEffect, useState } from 'react'
import { Trash2, Plus } from 'lucide-react'
import { fetchSavedCities, removeSavedCity, saveCity } from '../services/api'
import { useWeatherContext } from '../context/WeatherContext'

function SavedCitiesPage() {
  const { updateSelectedCity } = useWeatherContext()
  const [cities, setCities] = useState([])
  const [newCity, setNewCity] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadSavedCities = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchSavedCities()
      setCities(data)
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to load saved cities.')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!newCity.trim()) {
      return
    }

    try {
      await saveCity(newCity.trim())
      setNewCity('')
      await loadSavedCities()
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to save city.')
    }
  }

  const handleDelete = async (cityId) => {
    try {
      await removeSavedCity(cityId)
      await loadSavedCities()
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to remove city.')
    }
  }

  useEffect(() => {
    loadSavedCities()
  }, [])

  return (
    <div className="space-y-4">
      <section className="glass-panel rounded-3xl p-5">
        <h1 className="font-display text-3xl font-bold">Saved Cities</h1>
        <p className="mt-1 text-sm text-white/75">Save favorite places and load them instantly across your dashboard and chat.</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <input
            value={newCity}
            onChange={(event) => setNewCity(event.target.value)}
            placeholder="Add a city"
            className="min-w-[220px] flex-1 rounded-2xl border border-white/25 bg-white/10 px-4 py-3 text-sm outline-none focus:border-cyan-300"
          />
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-2xl bg-cyan-300/90 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-cyan-200"
          >
            <Plus size={16} />
            Save City
          </button>
        </div>
      </section>

      {error ? <p className="rounded-2xl border border-rose-300/50 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">{error}</p> : null}
      {loading ? <p className="text-sm text-white/75">Loading saved cities...</p> : null}

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((city) => (
          <article key={city._id} className="glass-panel rounded-2xl p-4">
            <p className="font-semibold text-white">{city.name}</p>
            <p className="text-xs text-white/70">{city.country || 'Saved location'}</p>

            <div className="mt-4 flex items-center gap-2">
              <button
                type="button"
                onClick={() => updateSelectedCity(city.name)}
                className="rounded-xl border border-white/25 bg-white/10 px-3 py-2 text-xs text-white transition hover:bg-white/20"
              >
                Use City
              </button>
              <button
                type="button"
                onClick={() => handleDelete(city._id)}
                className="inline-flex items-center gap-1 rounded-xl border border-rose-300/50 bg-rose-400/10 px-3 py-2 text-xs text-rose-100 transition hover:bg-rose-400/20"
              >
                <Trash2 size={14} /> Remove
              </button>
            </div>
          </article>
        ))}

        {!loading && !cities.length ? <p className="text-sm text-white/70">No saved cities yet.</p> : null}
      </section>
    </div>
  )
}

export default SavedCitiesPage
