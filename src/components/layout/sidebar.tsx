'use client'

import { useState } from 'react'
import Link from 'next/link'

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/customers', label: 'Customers' },
  { href: '/loans', label: 'Loans' },
  { href: '/payouts', label: 'Payouts' },
]

export function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <span className="text-xl">☰</span>
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full z-40 transition-all duration-300
        lg:w-60 lg:translate-x-0 lg:static lg:z-auto
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        bg-[var(--color-surface-muted)] border-r border-[var(--color-border)]
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
            <h1 className="text-xl font-semibold font-display">J&S Micro Finance</h1>
            <p className="text-sm text-[var(--color-text-secondary)]">Solomon Islands</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      block px-4 py-3 rounded-lg text-body font-medium transition-colors
                      hover:bg-[var(--color-surface-muted)]
                      ${item.href === '/dashboard'
                        ? 'bg-[var(--color-accent-subtle)] text-[var(--color-accent)]'
                        : ''
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Footer */}
          <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">John Admin</div>
                <div className="text-xs text-[var(--color-text-secondary)]">ADMIN</div>
              </div>
              <button className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">
                Logout
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-35 z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  )
}