'use client'

import { mockData } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'

interface PortfolioProgress {
  status: 'ACTIVE' | 'OVERDUE' | 'COMPLETED'
  count: number
  color: string
  total: number
}

export default function PortfolioSummaryCard() {
  const { kpis } = mockData

  const portfolioData: PortfolioProgress[] = [
    {
      status: 'ACTIVE',
      count: kpis.totalActiveLoans,
      color: 'bg-[var(--color-accent)]',
      total: kpis.totalActiveLoans + kpis.overdueCount + kpis.completedLoans
    },
    {
      status: 'OVERDUE',
      count: kpis.overdueCount,
      color: 'bg-[var(--color-destructive)]',
      total: kpis.totalActiveLoans + kpis.overdueCount + kpis.completedLoans
    },
    {
      status: 'COMPLETED',
      count: kpis.completedLoans,
      color: 'bg-[var(--color-text-disabled)]',
      total: kpis.totalActiveLoans + kpis.overdueCount + kpis.completedLoans
    }
  ]

  const totalDisbursed = kpis.totalOutstandingBalance + (kpis.totalActiveLoans * 50) // Assuming average loan amount

  return (
    <div className="p-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
      <h3 className="text-h3 mb-4">Portfolio at a glance</h3>

      <div className="space-y-4">
        {portfolioData.map((item) => (
          <div key={item.status}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-body font-medium">{item.status}</span>
              <span className="font-mono text-sm">
                {item.count} / {item.total}
              </span>
            </div>
            <div className="w-full bg-[var(--color-surface-muted)] rounded-full h-2">
              <div
                className={`h-2 rounded-full ${item.color}`}
                style={{
                  width: `${(item.count / item.total) * 100}%`
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-[var(--color-border)]">
        <div className="flex justify-between items-center">
          <span className="text-caption">Total disbursed (book)</span>
          <span className="font-mono">
            {formatCurrency(totalDisbursed)}
          </span>
        </div>
      </div>
    </div>
  )
}