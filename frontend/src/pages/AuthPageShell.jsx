import { Link } from 'react-router-dom'

function AuthPageShell({ title, subtitle, children, footerText, footerLink, footerLabel }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 text-white">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(135deg,#082f49,#0f172a,#155e75)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(103,232,249,0.22),transparent_30%),radial-gradient(circle_at_85%_5%,rgba(14,165,233,0.22),transparent_35%)]" />

      <div className="glass-panel w-full max-w-md rounded-3xl p-6 shadow-2xl">
        <h1 className="font-display text-3xl font-bold">{title}</h1>
        <p className="mt-1 text-sm text-white/75">{subtitle}</p>

        <div className="mt-6">{children}</div>

        <p className="mt-5 text-sm text-white/75">
          {footerText}{' '}
          <Link to={footerLink} className="font-semibold text-cyan-200 hover:text-cyan-100">
            {footerLabel}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AuthPageShell
