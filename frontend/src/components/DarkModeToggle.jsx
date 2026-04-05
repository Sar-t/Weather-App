import { Moon, Sun } from 'lucide-react'

function DarkModeToggle({ isDark, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/30 dark:border-white/20 dark:bg-white/10 dark:hover:bg-white/20"
      aria-label="Toggle dark mode"
    >
      <span className="transition group-hover:scale-105">{isDark ? 'Dark' : 'Light'}</span>
      {isDark ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  )
}

export default DarkModeToggle
