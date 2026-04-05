import { useEffect, useState } from 'react'

const THEME_STORAGE_KEY = 'ai-weather-theme'

export const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY)

    if (storedTheme) {
      return storedTheme === 'dark'
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      localStorage.setItem(THEME_STORAGE_KEY, 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem(THEME_STORAGE_KEY, 'light')
    }
  }, [isDark])

  return {
    isDark,
    toggleTheme: () => setIsDark((prev) => !prev)
  }
}
