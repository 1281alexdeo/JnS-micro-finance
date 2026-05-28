import { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Customer Details | LoanTrack',
  description: 'Customer Profile Details - LoanTrack Microfinance System',
}

export default function CustomerLayout({ children }: { children: ReactNode }) {
  return <div>{children}</div>
}