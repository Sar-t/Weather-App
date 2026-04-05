import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function ForecastChart({ forecast }) {
  if (!forecast?.entries?.length) {
    return null
  }

  const chartData = forecast.entries.map((entry) => ({
    day: new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' }),
    temp: entry.temperature,
    min: entry.minTemperature,
    max: entry.maxTemperature
  }))

  return (
    <section className="glass-panel rounded-3xl p-5 text-white">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">5-Day Forecast</h3>
        <p className="text-xs text-white/70">{forecast.city}, {forecast.country}</p>
      </div>

      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7dd3fc" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#7dd3fc" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.15)" strokeDasharray="4 4" />
            <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.8)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.8)' }} axisLine={false} tickLine={false} width={28} />
            <Tooltip
              contentStyle={{
                background: 'rgba(15,23,42,0.8)',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: '0.9rem',
                color: '#fff'
              }}
            />
            <Area type="monotone" dataKey="temp" stroke="#67e8f9" fill="url(#tempGradient)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

export default ForecastChart
