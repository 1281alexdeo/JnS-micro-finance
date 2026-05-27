export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* KPI Strip */}
      <section>
        <h2 className="text-h2 mb-6">KPI Overview</h2>
        <div className="grid grid-cols-4 gap-6">
          <div className="p-6 rounded-lg border border-[var(--color-border)]">
            <div className="text-label mb-2">Total Active Loans</div>
            <div className="text-display font-mono">24</div>
          </div>
          <div className="p-6 rounded-lg border border-[var(--color-border)]">
            <div className="text-label mb-2">Total Outstanding Balance</div>
            <div className="text-display font-mono">SBD 42,560.00</div>
          </div>
          <div className="p-6 rounded-lg border border-[var(--color-border)]">
            <div className="text-label mb-2">This Week's Collections</div>
            <div className="text-display font-mono">SBD 3,420.00</div>
          </div>
          <div className="p-6 rounded-lg border border-[var(--color-border)]">
            <div className="text-label mb-2">Overdue Count</div>
            <div className="text-display font-mono">3</div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-2 gap-8">
        {/* Payout Schedule */}
        <section>
          <h2 className="text-h2 mb-6">Weekly Payout Schedule</h2>
          <div className="p-6 rounded-lg border border-[var(--color-border)]">
            <div className="text-body">Payout table will be implemented in Phase 2</div>
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h2 className="text-h2 mb-6">Recent Activity</h2>
          <div className="p-6 rounded-lg border border-[var(--color-border)]">
            <div className="text-body">Activity feed will be implemented in Phase 2</div>
          </div>
        </section>
      </div>

      {/* Portfolio Overview */}
      <section>
        <h2 className="text-h2 mb-6">Portfolio Overview</h2>
        <div className="p-6 rounded-lg border border-[var(--color-border)]">
          <div className="text-body">Portfolio charts will be implemented in Phase 3</div>
        </div>
      </section>
    </div>
  )
}