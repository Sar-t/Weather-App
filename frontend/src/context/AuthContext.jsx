import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { fetchCurrentUser, loginUser, signupUser, TOKEN_STORAGE_KEY } from '../services/api'

const USER_STORAGE_KEY = 'ai-weather-user'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_STORAGE_KEY))
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(USER_STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  })
  const [authLoading, setAuthLoading] = useState(Boolean(token))

  useEffect(() => {
    const hydrateAuth = async () => {
      if (!token) {
        setAuthLoading(false)
        return
      }

      try {
        const currentUser = await fetchCurrentUser()
        setUser(currentUser)
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(currentUser))
      } catch {
        setToken(null)
        setUser(null)
        localStorage.removeItem(TOKEN_STORAGE_KEY)
        localStorage.removeItem(USER_STORAGE_KEY)
      } finally {
        setAuthLoading(false)
      }
    }

    hydrateAuth()
  }, [token])

  const persistAuth = (nextToken, nextUser) => {
    setToken(nextToken)
    setUser(nextUser)
    localStorage.setItem(TOKEN_STORAGE_KEY, nextToken)
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser))
  }

  const signup = async (payload) => {
    const data = await signupUser(payload)
    persistAuth(data.token, data.user)
    return data.user
  }

  const login = async (payload) => {
    const data = await loginUser(payload)
    persistAuth(data.token, data.user)
    return data.user
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    localStorage.removeItem(USER_STORAGE_KEY)
  }

  const value = useMemo(
    () => ({
      token,
      user,
      authLoading,
      isAuthenticated: Boolean(token && user),
      signup,
      login,
      logout
    }),
    [token, user, authLoading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}
