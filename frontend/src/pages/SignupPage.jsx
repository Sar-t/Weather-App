import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthPageShell from './AuthPageShell'
import { useAuth } from '../context/AuthContext'

function SignupPage() {
  const navigate = useNavigate()
  const { signup } = useAuth()

  const [form, setForm] = useState({ name: '', email: '', password: '' })
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
      await signup(form)
      navigate('/dashboard')
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Signup failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthPageShell
      title="Create Account"
      subtitle="Start using your personalized weather assistant"
      footerText="Already have an account?"
      footerLink="/login"
      footerLabel="Login"
    >
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          name="name"
          required
          minLength={2}
          value={form.name}
          onChange={onChange}
          placeholder="Full Name"
          className="w-full rounded-2xl border border-white/25 bg-white/10 px-4 py-3 text-sm outline-none focus:border-cyan-300"
        />
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
          placeholder="Password (min 8 chars)"
          className="w-full rounded-2xl border border-white/25 bg-white/10 px-4 py-3 text-sm outline-none focus:border-cyan-300"
        />

        {error ? <p className="text-sm text-rose-200">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-cyan-300/90 px-4 py-3 font-semibold text-slate-900 transition hover:bg-cyan-200 disabled:opacity-70"
        >
          {loading ? 'Creating account...' : 'Sign up'}
        </button>
      </form>
    </AuthPageShell>
  )
}

export default SignupPage
