'use client'

import { mockData } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import { enUS } from 'date-fns/locale'

interface RecentActivityItem {
  id: string
  type: 'LOAN_CREATED' | 'PAYMENT_RECORDED' | 'PENALTY_APPLIED' | 'CUSTOMER_CREATED'
  description: string
  amount?: number
  customerName: string
  loanReference?: string
  timestamp: string
}

const getActivityColor = (type: string) => {
  switch (type) {
    case 'LOAN_CREATED':
    case 'PAYMENT_RECORDED':
      return 'bg-[var(--color-success)]'
    case 'PENALTY_APPLIED':
      return 'bg-[var(--color-destructive)]'
    case 'CUSTOMER_CREATED':
      return 'bg-[var(--color-accent)]'
    default:
      return 'bg-[var(--color-text-secondary)]'
  }
}

const getActivityTypeLabel = (type: string) => {
  switch (type) {
    case 'LOAN_CREATED':
      return 'LOAN'
    case 'PAYMENT_RECORDED':
      return 'PAYMENT'
    case 'PENALTY_APPLIED':
      return 'PENALTY'
    case 'CUSTOMER_CREATED':
      return 'CUSTOMER'
    default:
      return type
  }
}

export default function RecentActivityCard() {
  const recentActivities = mockData.recentActivity.slice(0, 5)

  return (
    <div className="p-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-h3 mb-1">Recent Activity</h3>
          <p className="text-caption">Last 5 portfolio events</p>
        </div>
        <a href="#" className="text-[var(--color-accent)] text-sm hover:underline">
          View all
        </a>
      </div>

      <div className="space-y-4">
        {recentActivities.length > 0 ? (
          recentActivities.map((activity) => (
            <div key={activity.id} className="flex gap-3">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-2 ${getActivityColor(activity.type)}`} />
              <div className="flex-1 min-w-0">
                <p className="text-body mb-1">
                  {activity.description}
                  {activity.amount && (
                    <span className="font-mono ml-1">{formatCurrency(activity.amount)}</span>
                  )}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-caption">
                    {getActivityTypeLabel(activity.type)}
                  </span>
                  <span className="text-caption">
                    {formatDistanceToNow(new Date(activity.timestamp), {
                      addSuffix: true,
                      locale: enUS
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-body">
            No recent activity to display.
          </div>
        )}
      </div>
    </div>
  )
}