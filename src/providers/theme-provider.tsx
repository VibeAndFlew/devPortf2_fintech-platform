'use client'

import React, { createContext, useContext } from 'react'

type Theme = 'dark'

const ThemeContext = createContext<Theme>('dark')

function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeContext.Provider value="dark">{children}</ThemeContext.Provider>
}

function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}

export { ThemeProvider, useTheme }
