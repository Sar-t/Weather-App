export const weatherVisualMap = {
  Clear: {
    gradient: 'from-sky-500/70 via-cyan-400/40 to-amber-300/70',
    aura: 'bg-cyan-200/20'
  },
  Clouds: {
    gradient: 'from-slate-500/70 via-gray-400/45 to-blue-300/60',
    aura: 'bg-slate-200/20'
  },
  Rain: {
    gradient: 'from-blue-800/75 via-indigo-700/55 to-slate-700/70',
    aura: 'bg-blue-300/10'
  },
  Drizzle: {
    gradient: 'from-cyan-800/70 via-blue-600/50 to-slate-600/70',
    aura: 'bg-cyan-200/10'
  },
  Thunderstorm: {
    gradient: 'from-slate-900/80 via-zinc-800/70 to-indigo-900/80',
    aura: 'bg-indigo-300/10'
  },
  Snow: {
    gradient: 'from-slate-200/80 via-cyan-100/70 to-blue-200/75',
    aura: 'bg-white/30'
  },
  Mist: {
    gradient: 'from-zinc-500/70 via-stone-400/60 to-slate-300/65',
    aura: 'bg-zinc-100/20'
  },
  Haze: {
    gradient: 'from-neutral-500/70 via-stone-400/55 to-orange-200/70',
    aura: 'bg-stone-100/20'
  }
}

export const getWeatherTheme = (condition) => {
  if (!condition) {
    return {
      gradient: 'from-cyan-700/70 via-blue-600/55 to-slate-700/70',
      aura: 'bg-cyan-200/20'
    }
  }

  return weatherVisualMap[condition] || {
    gradient: 'from-blue-700/70 via-cyan-600/55 to-slate-700/70',
    aura: 'bg-cyan-200/20'
  }
}
