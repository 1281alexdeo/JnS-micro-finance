import { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Customer Details | LoanTrack',
  description: 'Customer Profile Details - LoanTrack Microfinance System',
}

interface CustomerLayoutProps {
  children: ReactNode
  params: Promise<{ id: string }>
}

export default function CustomerLayout({ children, params }: CustomerLayoutProps) {
  return <div>{children}</div>
}