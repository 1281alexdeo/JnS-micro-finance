import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import RecentActivityCard from '@/components/cards/recent-activity-card'
import PortfolioSummaryCard from '@/components/cards/portfolio-summary-card'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-[var(--color-bg)]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-1280 mx-auto flex gap-8">
            <div className="flex-1">
              {children}
            </div>
            <div className="hidden lg:block w-80 space-y-6">
              <RecentActivityCard />
              <PortfolioSummaryCard />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}