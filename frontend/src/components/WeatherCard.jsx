import { CloudRain, Droplets, Thermometer, Wind } from 'lucide-react'

const getIconUrl = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`

function WeatherSkeleton() {
  return (
    <div className="glass-panel animate-pulse rounded-3xl p-6">
      <div className="h-6 w-1/3 rounded-lg bg-white/20" />
      <div className="mt-4 h-16 w-1/2 rounded-lg bg-white/20" />
      <div className="mt-5 grid grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-16 rounded-2xl bg-white/20" />
        ))}
      </div>
    </div>
  )
}

function WeatherCard({ weather, loading, error }) {
  if (loading) {
    return <WeatherSkeleton />
  }

  if (error) {
    return (
      <div className="glass-panel rounded-3xl border border-rose-300/40 p-6 text-rose-100">
        {error}
      </div>
    )
  }

  if (!weather) {
    return (
      <div className="glass-panel rounded-3xl p-6 text-white/85">
        Search for a city to see the latest weather insights.
      </div>
    )
  }

  return (
    <article className="glass-panel rounded-3xl p-6 text-white shadow-xl transition duration-300 hover:translate-y-[-2px]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{weather.city}</h2>
          <p className="text-sm text-white/75">{weather.country}</p>
        </div>
        <img src={getIconUrl(weather.icon)} alt={weather.condition} className="h-20 w-20" />
      </div>

      <div className="mt-2 flex items-end gap-3">
        <p className="text-6xl font-bold leading-none">{weather.temperature}</p>
        <span className="pb-2 text-2xl text-white/80">C</span>
      </div>
      <p className="mt-1 text-white/80">{weather.description}</p>

      <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl border border-white/30 bg-white/10 p-4">
          <div className="mb-2 flex items-center gap-2 text-white/75">
            <Droplets size={16} /> Humidity
          </div>
          <p className="text-lg font-semibold">{weather.humidity}%</p>
        </div>
        <div className="rounded-2xl border border-white/30 bg-white/10 p-4">
          <div className="mb-2 flex items-center gap-2 text-white/75">
            <Wind size={16} /> Wind
          </div>
          <p className="text-lg font-semibold">{weather.windSpeed} m/s</p>
        </div>
        <div className="rounded-2xl border border-white/30 bg-white/10 p-4">
          <div className="mb-2 flex items-center gap-2 text-white/75">
            <Thermometer size={16} /> Feels like
          </div>
          <p className="text-lg font-semibold">{weather.feelsLike} C</p>
        </div>
        <div className="rounded-2xl border border-white/30 bg-white/10 p-4">
          <div className="mb-2 flex items-center gap-2 text-white/75">
            <CloudRain size={16} /> Condition
          </div>
          <p className="text-lg font-semibold">{weather.condition}</p>
        </div>
      </div>
    </article>
  )
}

export default WeatherCard
