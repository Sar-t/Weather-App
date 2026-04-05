import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthPageShell from './AuthPageShell'
import { useAuth } from '../context/AuthContext'

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(form)
      navigate('/dashboard')
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthPageShell
      title="Welcome Back"
      subtitle="Sign in to your AI weather workspace"
      footerText="No account yet?"
      footerLink="/signup"
      footerLabel="Create one"
    >
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          name="email"
          type="email"
          required
          value={form.email}
          onChange={onChange}
          placeholder="Email"
          className="w-full rounded-2xl border border-white/25 bg-white/10 px-4 py-3 text-sm outline-none focus:border-cyan-300"
        />
        <input
          name="password"
          type="password"
          required
          minLength={8}
          value={form.password}
          onChange={onChange}
          placeholder="Password"
          className="w-full rounded-2xl border border-white/25 bg-white/10 px-4 py-3 text-sm outline-none focus:border-cyan-300"
        />

        {error ? <p className="text-sm text-rose-200">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-cyan-300/90 px-4 py-3 font-semibold text-slate-900 transition hover:bg-cyan-200 disabled:opacity-70"
        >
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </form>
    </AuthPageShell>
  )
}

export default LoginPage
