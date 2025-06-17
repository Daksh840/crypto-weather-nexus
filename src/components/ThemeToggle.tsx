'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  return (
    <button
      className="mt-6 flex items-center gap-2 p-2 rounded-lg hover:bg-white/10"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
    </button>
  )
}
