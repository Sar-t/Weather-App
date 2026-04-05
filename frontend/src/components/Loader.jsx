function Loader({ label = 'Loading...' }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm text-white">
      <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-cyan-300" />
      {label}
    </div>
  )
}

export default Loader
