'use client'

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  RowSelectionState,
} from '@tanstack/react-table'
import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { mockData } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'

interface PayoutData {
  id: string
  customerName: string
  loanReference: string
  weekNumber: number
  dueDate: string
  weeklyAmount: number
  status: 'UPCOMING' | 'PAID' | 'OVERDUE'
  penaltyAmount?: number
}

export default function PayoutScheduleTable() {
  const searchParams = useSearchParams()
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    id: false,
  })
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  // Get view type from URL params
  const viewType = searchParams.get('view') || 'weekly'

  // Transform mock data to table format
  const data: PayoutData[] = useMemo(() => {
    return mockData.weeklyPayouts.map((payout, index) => ({
      id: payout.id,
      customerName: payout.customerName,
      loanReference: payout.loanReference,
      weekNumber: index + 1,
      dueDate: payout.dueDate,
      weeklyAmount: payout.weeklyAmount,
      status: payout.status,
      penaltyAmount: payout.penaltyAmount
    }))
  }, [])

  // Get filter counts
  const filterCounts = useMemo(() => {
    const all = data.length
    const overdue = data.filter(item => item.status === 'OVERDUE').length
    const upcoming = data.filter(item => item.status === 'UPCOMING').length
    return { all, overdue, upcoming }
  }, [data])

  // Filter data based on active filter
  const filteredData = useMemo(() => {
    const activeFilter = columnFilters.find(f => f.id === 'status')?.value
    if (activeFilter && activeFilter !== 'all') {
      return data.filter(item => item.status === activeFilter)
    }
    return data
  }, [data, columnFilters])

  // Columns
  const columns = useMemo<ColumnDef<PayoutData>[]>(() => [
    {
      accessorKey: 'customerName',
      header: 'CUSTOMER',
      cell: ({ row }) => row.getValue('customerName'),
    },
    {
      accessorKey: 'loanReference',
      header: 'LOAN REF',
      cell: ({ row }) => (
        <span className="font-mono bg-[var(--color-surface-muted)] px-2 py-1 rounded">
          {row.getValue('loanReference')}
        </span>
      ),
    },
    {
      accessorKey: 'weekNumber',
      header: 'WK',
      cell: ({ row }) => `Week ${row.getValue('weekNumber')}`,
    },
    {
      accessorKey: 'dueDate',
      header: 'DUE DATE',
      cell: ({ row }) => {
        const date = new Date(row.getValue('dueDate'))
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })
      },
    },
    {
      accessorKey: 'weeklyAmount',
      header: 'AMOUNT DUE',
      align: 'right',
      cell: ({ row }) => {
        const amount = row.getValue('weeklyAmount') as number
        const penaltyAmount = row.original.penaltyAmount

        return (
          <div className="text-right">
            <div className="font-mono">{formatCurrency(amount)}</div>
            {penaltyAmount && (
              <div className="text-[var(--color-destructive)] text-sm">
                + penalty {formatCurrency(penaltyAmount)}
              </div>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'STATUS',
      align: 'right',
      cell: ({ row }) => {
        const status = row.getValue('status') as string
        const getStatusBadge = (status: string) => {
          switch (status) {
            case 'UPCOMING':
              return (
                <span className="px-2 py-1 rounded text-[var(--color-warning)] bg-[var(--color-warning-bg)]">
                  UPCOMING
                </span>
              )
            case 'OVERDUE':
              return (
                <span className="px-2 py-1 rounded text-[var(--color-destructive)] bg-[var(--color-destructive-bg)]">
                  OVERDUE
                </span>
              )
            case 'PAID':
              return (
                <span className="px-2 py-1 rounded text-[var(--color-success)] bg-[var(--color-success-bg)]">
                  PAID
                </span>
              )
            default:
              return status
          }
        }

        return <div className="text-right">{getStatusBadge(status)}</div>
      },
    },
  ], [])

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  // Calculate totals
  const totalAmount = filteredData.reduce((sum, item) => {
    return sum + item.weeklyAmount + (item.penaltyAmount || 0)
  }, 0)

  return (
    <div className="space-y-4">
      {/* View Toggle */}
      <div className="flex gap-2">
        <button
          className={`px-4 py-2 rounded-lg transition-colors ${
            viewType === 'weekly'
              ? 'bg-[var(--color-accent)] text-white'
              : 'bg-[var(--color-surface)] hover:bg-[var(--color-surface-muted)]'
          }`}
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString())
            params.set('view', 'weekly')
            window.location.href = `/dashboard?${params.toString()}`
          }}
        >
          Weekly
        </button>
        <button
          className={`px-4 py-2 rounded-lg transition-colors ${
            viewType === 'monthly'
              ? 'bg-[var(--color-accent)] text-white'
              : 'bg-[var(--color-surface)] hover:bg-[var(--color-surface-muted)]'
          }`}
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString())
            params.set('view', 'monthly')
            window.location.href = `/dashboard?${params.toString()}`
          }}
        >
          Monthly
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              columnFilters.find(f => f.id === 'status')?.value === 'all' || !columnFilters.length
                ? 'bg-[var(--color-accent-subtle)] text-[var(--color-accent)] border border-[var(--color-accent)]'
                : 'bg-[var(--color-surface)] hover:bg-[var(--color-surface-muted)] border border-[var(--color-border)]'
            }`}
            onClick={() => setColumnFilters([{ id: 'status', value: 'all' }])}
          >
            All ({filterCounts.all})
          </button>
          <button
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              columnFilters.find(f => f.id === 'status')?.value === 'OVERDUE'
                ? 'bg-[var(--color-destructive-bg)] text-[var(--color-destructive)] border border-[var(--color-destructive)]'
                : 'bg-[var(--color-surface)] hover:bg-[var(--color-surface-muted)] border border-[var(--color-border)]'
            }`}
            onClick={() => setColumnFilters([{ id: 'status', value: 'OVERDUE' }])}
          >
            Overdue ({filterCounts.overdue})
          </button>
          <button
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              columnFilters.find(f => f.id === 'status')?.value === 'UPCOMING'
                ? 'bg-[var(--color-warning-bg)] text-[var(--color-warning)] border border-[var(--color-warning)]'
                : 'bg-[var(--color-surface)] hover:bg-[var(--color-surface-muted)] border border-[var(--color-border)]'
            }`}
            onClick={() => setColumnFilters([{ id: 'status', value: 'UPCOMING' }])}
          >
            Upcoming ({filterCounts.upcoming})
          </button>
        </div>

        <input
          type="text"
          placeholder="Search customer or ref"
          className="px-3 py-1 border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)] text-body"
          value={(columnFilters.find(f => f.id === 'search')?.value as string) || ''}
          onChange={(e) => {
            const value = e.target.value
            setColumnFilters(prev =>
              value
                ? [...prev.filter(f => f.id !== 'search'), { id: 'search', value }]
                : prev.filter(f => f.id !== 'search')
            )
          }}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[var(--color-surface-muted)]">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      className={`text-left text-label uppercase px-4 py-3 ${header.column.getCanSort() ? 'cursor-pointer hover:bg-[var(--color-surface)]' : ''}`}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-2">
                        {header.column.columnDef.header as string}
                        {{ asc: '↑', desc: '↓' }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr
                key={row.id}
                className="border-b border-[var(--color-border)] hover:bg-[var(--color-surface-muted)]"
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-4 py-3 text-body">
                    {cell.getValue() as React.ReactNode}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="text-center py-8 text-body">
          No instalments found for this period.
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-[var(--color-border)]">
        <span className="text-body">
          {filteredData.length} instalments
        </span>
        <span className="font-mono text-right">
          Total: {formatCurrency(totalAmount)}
        </span>
      </div>
    </div>
  )
}