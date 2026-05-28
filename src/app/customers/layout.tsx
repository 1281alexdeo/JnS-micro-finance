import { Metadata } from 'next'
import CustomersPage from './page'

export const metadata: Metadata = {
  title: 'Customers | LoanTrack',
  description: 'Customer Directory - LoanTrack Microfinance System',
}

export default function CustomersLayout() {
  return <CustomersPage />
}