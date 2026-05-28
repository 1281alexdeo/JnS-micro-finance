import { mockData } from '@/lib/mock-data'
import PayoutScheduleTable from '@/components/tables/payout-schedule-table'
import RecentActivityCard from '@/components/cards/recent-activity-card'
import PortfolioSummaryCard from '@/components/cards/portfolio-summary-card'
import { Suspense } from 'react'

export default function DashboardPage() {
  const { kpis } = mockData

  // Format currency with SBD prefix and proper decimal places
  const formatCurrency = (amount: number) => {
    return `SBD ${amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      style: 'decimal'
    })}`
  }

  // Get current time for timestamp
  const getCurrentTimestamp = () => {
    const now = new Date()
    const minutesAgo = Math.floor((Date.now() - now.getTime()) / 60000)
    return `Updated ${minutesAgo} minutes ago`
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-h1 mb-2">Dashboard</h1>
          <p className="text-caption">{getCurrentTimestamp()}</p>
        </div>
        <div className="flex gap-3">
          <button className="h-9 px-4 rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-muted)] transition-colors text-body font-medium">
            Export Week
          </button>
          <button className="h-9 px-4 rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-muted)] transition-colors text-body font-medium">
            New Customer
          </button>
          <button className="h-9 px-4 rounded-md bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] transition-colors text-body font-medium text-white">
            New Loan
          </button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="text-label mb-2 uppercase">ACTIVE LOANS</div>
          <div className="text-display font-mono font-variant-numeric-tabular-nums">{kpis.totalActiveLoans}</div>
          <div className="text-caption mt-1">Total loans in book</div>
        </div>

        <div className="p-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="text-label mb-2 uppercase">OUTSTANDING BALANCE</div>
          <div className="text-display font-mono font-variant-numeric-tabular-nums">{formatCurrency(kpis.totalOutstandingBalance)}</div>
          <div className="text-caption mt-1">{mockData.user.name} customers</div>
        </div>

        <div className="p-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="text-label mb-2 uppercase">THIS WEEK'S COLLECTIONS</div>
          <div className="text-display font-mono font-variant-numeric-tabular-nums">{formatCurrency(kpis.thisWeeksExpectedCollections)}</div>
          <div className="text-caption mt-1">May 27 - Jun 2, 2026</div>
        </div>

        <div className="p-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="text-label mb-2 uppercase">OVERDUE</div>
          <div className={`text-display font-mono font-variant-numeric-tabular-nums ${kpis.overdueCount > 0 ? 'text-[var(--color-destructive)]' : ''}`}>
            {kpis.overdueCount}
          </div>
          <div className="text-caption mt-1">needs follow-up</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payout Schedule - takes full width on mobile, 2 columns on desktop */}
        <section className="lg:col-span-2">
          <h2 className="text-h2 mb-2">Payout Schedule</h2>
          <p className="text-caption mb-6">Instalments due in the current period</p>
          <div className="p-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
            <Suspense fallback={<div>Loading table...</div>}>
              <PayoutScheduleTable />
            </Suspense>
          </div>
        </section>

        {/* Sidebar Components - hidden on desktop, shown below on mobile/tablet */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <Suspense fallback={<div>Loading...</div>}>
            <RecentActivityCard />
          </Suspense>

          {/* Portfolio Summary */}
          <Suspense fallback={<div>Loading...</div>}>
            <PortfolioSummaryCard />
          </Suspense>
        </div>
      </div>

      {/* Mobile Sidebar Components - shown on mobile only, hidden on desktop */}
      <div className="lg:hidden space-y-6 mt-8">
        <Suspense fallback={<div>Loading...</div>}>
          <RecentActivityCard />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <PortfolioSummaryCard />
        </Suspense>
      </div>
    </div>
  )
}