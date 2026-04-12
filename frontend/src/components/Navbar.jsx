import { Link, NavLink, useNavigate } from 'react-router-dom'
import { LogOut, MapPin, MessageSquare, CloudSun, LayoutDashboard, CalendarDays } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/forecast', label: 'Forecast', icon: CalendarDays },
  { to: '/chat', label: 'Ask AI', icon: MessageSquare },
  { to: '/saved-cities', label: 'Saved Cities', icon: MapPin }
]

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/20 bg-slate-900/30 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link to="/dashboard" className="inline-flex items-center gap-2">
          <div className="rounded-xl bg-cyan-300/80 p-2 text-slate-900">
            <CloudSun size={18} />
          </div>
          <div>
            <p className="font-display text-base font-bold text-white">AI Weather Assistant</p>
            <p className="text-xs text-white/70">Welcome, {user?.name || 'User'}</p>
          </div>
        </Link>

        <nav className="flex flex-wrap items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition ${
                    isActive
                      ? 'bg-cyan-300/90 font-semibold text-slate-900'
                      : 'border border-white/25 bg-white/10 text-white hover:bg-white/20'
                  }`
                }
              >
                <Icon size={15} />
                {item.label}
              </NavLink>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-3 py-2 text-sm text-white transition hover:bg-white/20"
          >
            <LogOut size={15} />
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
