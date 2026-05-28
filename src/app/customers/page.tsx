'use client'

import { useState, useMemo } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef
} from '@tanstack/react-table'
import { customers, type Customer } from '@/lib/mock-data'

type Status = 'ALL' | 'ACTIVE' | 'OVERDUE' | 'COMPLETED' | 'NO_LOAN'

const statusColors = {
  ACTIVE: 'text-green-600 bg-green-50',
  OVERDUE: 'text-red-600 bg-red-50',
  COMPLETED: 'text-gray-600 bg-gray-50',
  NO_LOAN: 'text-gray-400 bg-gray-100'
}

const statusText = {
  ACTIVE: 'Active',
  OVERDUE: 'Overdue',
  COMPLETED: 'Completed',
  NO_LOAN: 'No Loan'
}

export default function CustomersPage() {
  const [statusValue, setStatusValue] = useState<Status>('ALL')
  const [searchValue, setSearchValue] = useState('')

  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      const matchesStatus = statusValue === 'ALL' || customer.status === statusValue
      const matchesSearch = searchValue === '' ||
        customer.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
        customer.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
        customer.referenceCode.toLowerCase().includes(searchValue.toLowerCase())
      return matchesStatus && matchesSearch
    })
  }, [statusValue, searchValue])

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })

  const columns = useMemo<ColumnDef<Customer, unknown>[]>(
    () => [
      {
        id: 'name',
        header: 'NAME',
        cell: ({ row }) => {
          const customer = row.original
          return (
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{customer.firstName} {customer.lastName}</span>
                {customer.email && (
                  <span className="text-xs text-gray-600">{customer.email}</span>
                )}
              </div>
            </div>
          )
        }
      },
      {
        id: 'reference',
        header: 'REFERENCE',
        cell: ({ row }) => (
          <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
            {row.original.referenceCode}
          </span>
        )
      },
      {
        id: 'phone',
        header: 'PHONE',
        cell: ({ row }) => (
          <span className="text-xs font-mono">
            {row.original.phone || '-'}
          </span>
        )
      },
      {
        id: 'loans',
        header: 'LOANS',
        cell: ({ row }) => (
          <span className="text-sm text-center">
            {row.original.activeLoans}
          </span>
        )
      },
      {
        id: 'status',
        header: 'STATUS',
        cell: ({ row }) => (
          <span className={`text-xs px-2 py-1 rounded-full ${statusColors[row.original.status]}`}>
            {statusText[row.original.status]}
          </span>
        )
      },
      {
        id: 'dateAdded',
        header: 'DATE ADDED',
        cell: ({ row }) => {
          const date = new Date(row.original.createdAt)
          return (
            <span className="text-xs text-right">
              {date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          )
        }
      }
    ],
    []
  )

  const table = useReactTable({
    data: filteredCustomers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination
    },
    onPaginationChange: setPagination,
    meta: {}
  })

  const counts = useMemo(() => ({
    all: customers.length,
    active: customers.filter(c => c.status === 'ACTIVE').length,
    overdue: customers.filter(c => c.status === 'OVERDUE').length,
    completed: customers.filter(c => c.status === 'COMPLETED').length
  }), [])

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-sora">Customers</h1>
        <p className="text-sm text-gray-600 mt-1">
          {filteredCustomers.length} total customers in directory
        </p>
        <div className="mt-4 flex gap-3 justify-end">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-md text-sm font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Customer
          </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-white rounded-t-md border border-gray-200 border-b-0 p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Status Filters */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setStatusValue('ALL')}
              className={`text-sm font-medium pb-1 ${
                statusValue === 'ALL'
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              All ({counts.all})
            </button>
            <button
              onClick={() => setStatusValue('ACTIVE')}
              className={`text-sm font-medium pb-1 ${
                statusValue === 'ACTIVE'
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Active ({counts.active})
            </button>
            <button
              onClick={() => setStatusValue('OVERDUE')}
              className={`text-sm font-medium pb-1 ${
                statusValue === 'OVERDUE'
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Overdue ({counts.overdue})
            </button>
            <button
              onClick={() => setStatusValue('COMPLETED')}
              className={`text-sm font-medium pb-1 ${
                statusValue === 'COMPLETED'
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Completed ({counts.completed})
            </button>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by name or reference"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full md:w-64 pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm"
            />
            <svg
              className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="border border-gray-200 rounded-b-md overflow-hidden">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead className="bg-gray-100 border-b border-gray-200">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      className="text-left text-xs font-medium text-gray-600 uppercase tracking-wider px-6 py-3"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-200">
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map(row => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {row.getVisibleCells().map(cell => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 whitespace-nowrap"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="text-gray-500">
                      No customers found matching your search.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</span> to{' '}
            <span className="font-medium">
              {Math.min(
                table.getState().pagination.pageIndex * table.getState().pagination.pageSize + table.getState().pagination.pageSize,
                filteredCustomers.length
              )}
            </span>{' '}
            of <span className="font-medium">{filteredCustomers.length}</span> results
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}