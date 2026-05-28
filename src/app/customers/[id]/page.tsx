'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  type ColumnDef
} from '@tanstack/react-table'
import Link from 'next/link'
import { customers, loans, type Customer, type Loan } from '@/lib/mock-data'

// Status badge colors
const statusColors = {
  ACTIVE: 'text-green-600 bg-green-50',
  OVERDUE: 'text-red-600 bg-red-50',
  COMPLETED: 'text-gray-600 bg-gray-50',
  DEFAULTED: 'text-red-600 bg-red-50',
  NO_LOAN: 'text-gray-400 bg-gray-100'
}

// Status display text
const statusText = {
  ACTIVE: 'Active',
  OVERDUE: 'Overdue',
  COMPLETED: 'Completed',
  DEFAULTED: 'Defaulted',
  NO_LOAN: 'No Loan'
}

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [customerLoans, setCustomerLoans] = useState<Loan[]>([])
  const [loading, setLoading] = useState(true)

  // Find customer and associated loans
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const { id } = await params
        console.log('Loading customer with id:', id)
        const foundCustomer = customers.find(c => c.id === id)
        console.log('Found customer:', foundCustomer)
        if (foundCustomer) {
          setCustomer(foundCustomer)
          const associatedLoans = loans.filter(loan => loan.customerId === id)
          console.log('Associated loans:', associatedLoans)
          setCustomerLoans(associatedLoans)
        }
      } catch (error) {
        console.error('Error loading customer:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [params])

  // Calculate customer KPIs
  const customerKPIs = useMemo(() => {
    if (!customer) {
      return {
        activeLoans: 0,
        totalOutstanding: 0,
        totalPaid: 0
      }
    }

    return {
      activeLoans: customerLoans.filter(loan => loan.status === 'ACTIVE').length,
      totalOutstanding: customerLoans
        .filter(loan => loan.status === 'ACTIVE')
        .reduce((sum, loan) => sum + loan.outstandingBalance, 0),
      totalPaid: customerLoans
        .filter(loan => loan.status === 'COMPLETED')
        .reduce((sum, loan) => sum + loan.totalPaid, 0)
    }
  }, [customer, customerLoans])

  // Table columns for loan history
  const columns = useMemo<ColumnDef<Loan, unknown>[]>(
    () => [
      {
        id: 'loanReference',
        header: 'LOAN REF',
        cell: ({ row }) => (
          <span className="text-sm font-medium">
            {row.original.loanReference}
          </span>
        )
      },
      {
        id: 'amount',
        header: 'AMOUNT',
        cell: ({ row }) => (
          <span className="text-sm font-medium">
            ${(row.original.loanRepayment / 100).toFixed(2)}
          </span>
        )
      },
      {
        id: 'term',
        header: 'TERM',
        cell: ({ row }) => (
          <span className="text-sm">
            {row.original.term} weeks
          </span>
        )
      },
      {
        id: 'startDate',
        header: 'START DATE',
        cell: ({ row }) => {
          const date = new Date(row.original.startDate)
          return (
            <span className="text-sm">
              {date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          )
        }
      },
      {
        id: 'status',
        header: 'STATUS',
        cell: ({ row }) => (
          <span className={`text-xs px-2 py-1 rounded-full ${statusColors[row.original.status]}`}>
            {statusText[row.original.status]}
          </span>
        )
      }
    ],
    []
  )

  // Initialize table
  const table = useReactTable({
    data: customerLoans,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {}
  })

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading customer details...</p>
        </div>
      </div>
    )
  }

  if (!customer) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Customer Not Found</h1>
          <p className="text-gray-600 mt-2">The requested customer could not be found.</p>
          <Link
            href="/customers"
            className="mt-4 inline-flex items-center text-teal-600 hover:text-teal-700"
          >
            ← Back to Customers
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/customers"
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-800"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Customers
          </Link>
        </div>

        <div className="flex justify-between items-end">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold text-sora">
              {customer.firstName} {customer.lastName}
            </h1>
            <span className={`text-sm px-3 py-1 rounded-full ${statusColors[customer.status]}`}>
              {statusText[customer.status]}
            </span>
            <span className="text-xs font-mono bg-gray-100 px-3 py-1 rounded">
              {customer.referenceCode}
            </span>
          </div>

          <div className="flex gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium hover:bg-gray-50">
              Edit
            </button>
            <button
              className={`px-4 py-2 text-white rounded-md text-sm font-medium ${
                customer.status === 'OVERDUE'
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-teal-600 hover:bg-teal-700'
              }`}
              disabled={customer.status === 'OVERDUE'}
            >
              New Loan
            </button>
          </div>
        </div>
      </div>

      {/* Profile Information Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-6">Profile Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase mb-1">Full Name</div>
            <div className="text-sm">{customer.firstName} {customer.lastName}</div>
          </div>
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase mb-1">Email</div>
            <div className="text-sm">{customer.email || '—'}</div>
          </div>
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase mb-1">Phone</div>
            <div className="text-sm font-mono">{customer.phone || '—'}</div>
          </div>
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase mb-1">National ID</div>
            <div className="text-sm font-mono">{customer.nationalId || '—'}</div>
          </div>
          <div className="lg:col-span-2">
            <div className="text-xs font-medium text-gray-500 uppercase mb-1">Address</div>
            <div className="text-sm">{customer.address || '—'}</div>
          </div>
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase mb-1">Status</div>
            <div className="text-sm">{statusText[customer.status]}</div>
          </div>
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase mb-1">Date Added</div>
            <div className="text-sm">
              {new Date(customer.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
            </div>
          </div>
        </div>
      </div>

      {/* Customer KPI Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-xs font-medium text-gray-500 uppercase mb-2">Active Loans</div>
          <div className="text-2xl font-bold text-sora">{customerKPIs.activeLoans}</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 border-l-0 border-r-0">
          <div className="text-xs font-medium text-gray-500 uppercase mb-2">Total Outstanding</div>
          <div className="text-2xl font-bold text-sora font-tabular-nums">
            ${customerKPIs.totalOutstanding.toFixed(2)}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-xs font-medium text-gray-500 uppercase mb-2">Total Paid</div>
          <div className="text-2xl font-bold text-sora font-tabular-nums">
            ${customerKPIs.totalPaid.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Loan History */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-6">Loan History</h2>

        {customerLoans.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    {table.getHeaderGroups().map(headerGroup => (
                      headerGroup.headers.map(header => (
                        <th
                          key={header.id}
                          className="text-left text-xs font-medium text-gray-600 uppercase tracking-wider px-6 py-3"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </th>
                      ))
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {table.getRowModel().rows.map(row => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className="px-6 py-3 whitespace-nowrap">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500">
              {customer.status === 'NO_LOAN'
                ? 'This customer has no loan history.'
                : 'No loans found for this customer.'
              }
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

