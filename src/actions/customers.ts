'use server'

import { customers } from '@/lib/mock-data'
import type { Customer } from '@/lib/mock-data'

interface CreateCustomerInput {
  firstName: string
  lastName: string
  phone: string
  email?: string
  nationalId?: string
  address?: string
}

export async function createCustomer(data: CreateCustomerInput): Promise<Customer> {
  const nextId = Math.max(...customers.map(c => parseInt(c.id.split('-')[1]))) + 1
  const referenceCode = `MF-${String(nextId + 41).padStart(5, '0')}`

  const newCustomer: Customer = {
    id: `c-${nextId}`,
    referenceCode,
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    email: data.email,
    nationalId: data.nationalId,
    address: data.address,
    status: 'NO_LOAN',
    activeLoans: 0,
    totalLoans: 0,
    createdAt: new Date().toISOString().split('T')[0]
  }

  customers.push(newCustomer)
  return newCustomer
}

export async function updateCustomer(id: string, data: Partial<CreateCustomerInput>): Promise<Customer> {
  const customer = customers.find(c => c.id === id)
  if (!customer) {
    throw new Error('Customer not found')
  }

  Object.assign(customer, data)
  return customer
}
