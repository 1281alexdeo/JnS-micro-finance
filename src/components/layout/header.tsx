'use client'

import { useState } from 'react'
import Link from 'next/link'

export function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (!isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Get current date
  const currentDate = new Date().toLocaleDateString('en-SB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <header className="h-14 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="max-w-1280 mx-auto px-8 h-full flex items-center justify-between">
        {/* Mobile Only - Logo */}
        <div className="lg:hidden">
          <h1 className="text-lg font-semibold font-display">J&S Micro Finance</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          <Link href="/dashboard" className="font-medium text-primary">
            Dashboard
          </Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Date */}
          <div className="hidden sm:block text-sm text-[var(--color-text-secondary)]">
            {currentDate}
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-[var(--color-surface-muted)]"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white text-sm font-medium">
              JA
            </div>
            <span className="hidden sm:block text-sm">John Admin</span>
          </div>
        </div>
      </div>
    </header>
  )
}

