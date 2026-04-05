import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'
import { fetchInsights } from '../services/api'

function WeatherInsights({ city }) {
  const [insights, setInsights] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadInsights = async () => {
      if (!city) {
        return
      }

      setLoading(true)
      setError('')
      try {
        const result = await fetchInsights(city)
        setInsights(result.insights)
      } catch (requestError) {
        setError(requestError.response?.data?.message || 'Unable to generate AI insights right now.')
      } finally {
        setLoading(false)
      }
    }

    loadInsights()
  }, [city])

  return (
    <section className="glass-panel rounded-3xl p-5">
      <div className="mb-3 inline-flex items-center gap-2 text-sm text-white/85">
        <Sparkles size={16} />
        Weather Insights
      </div>

      {loading ? <p className="text-sm text-white/75">Generating personalized suggestions...</p> : null}
      {error ? <p className="text-sm text-rose-200">{error}</p> : null}
      {!loading && !error && insights ? <p className="whitespace-pre-line text-sm leading-relaxed text-white/90">{insights}</p> : null}
      {!loading && !error && !insights ? <p className="text-sm text-white/70">Select a city to get AI recommendations.</p> : null}
    </section>
  )
}

export default WeatherInsights
