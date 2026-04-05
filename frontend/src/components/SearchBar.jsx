import { MapPin, Search } from 'lucide-react'

function SearchBar({ city, onCityChange, onSearch, onLocate, loading, showLocate = true }) {
  return (
    <form
      onSubmit={onSearch}
      className="glass-panel flex flex-col gap-3 rounded-3xl p-4 sm:flex-row sm:items-center"
    >
      <div className="relative w-full">
        <input
          value={city}
          onChange={(event) => onCityChange(event.target.value)}
          type="text"
          placeholder="Search a city..."
          className="w-full rounded-2xl border border-white/30 bg-white/15 py-3 pl-4 pr-10 text-sm text-white placeholder:text-white/70 outline-none transition focus:border-cyan-200/70 focus:bg-white/20 dark:border-white/20 dark:bg-slate-900/30"
        />
        <Search className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/70" size={18} />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-2xl bg-cyan-300/85 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Loading...' : 'Search'}
        </button>
        {showLocate ? (
          <button
            type="button"
            onClick={onLocate}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/40 bg-white/20 px-3 py-3 text-sm font-medium text-white transition hover:bg-white/30"
          >
            <MapPin size={16} />
            Detect
          </button>
        ) : null}
      </div>
    </form>
  )
}

export default SearchBar
