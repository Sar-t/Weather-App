import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

function AppLayout() {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-white">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[conic-gradient(from_220deg_at_20%_10%,#0f172a,#164e63,#0f172a,#082f49)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(125,211,252,0.22),transparent_30%),radial-gradient(circle_at_90%_10%,rgba(56,189,248,0.18),transparent_35%)]" />

      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
