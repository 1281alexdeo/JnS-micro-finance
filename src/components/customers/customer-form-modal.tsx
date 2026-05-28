'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { customerFormSchema, type CustomerFormData } from '@/lib/validations'
import type { Customer } from '@/lib/mock-data'
import { createCustomer } from '@/actions/customers'

interface CustomerFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  customer?: Customer
  referenceCode: string
}

export function CustomerFormModal({
  isOpen,
  onClose,
  onSuccess,
  customer,
  referenceCode
}: CustomerFormModalProps) {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  const isEditMode = Boolean(customer)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: customer ? {
      firstName: customer.firstName,
      lastName: customer.lastName,
      phone: customer.phone || '',
      email: customer.email || '',
      nationalId: customer.nationalId || '',
      address: customer.address || ''
    } : {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      nationalId: '',
      address: ''
    }
  })

  const formValues = watch()

  useEffect(() => {
    if (!isOpen) {
      reset()
      setHasChanges(false)
    }
  }, [isOpen, reset])

  useEffect(() => {
    const hasFormChanges = customer ? Object.keys(formValues).some(
      key => formValues[key as keyof CustomerFormData] !== (customer[key as keyof Customer] || '')
    ) : Object.values(formValues).some(v => v !== '')

    setHasChanges(hasFormChanges)
  }, [formValues, customer])

  const handleClose = () => {
    if (hasChanges) {
      setShowConfirmation(true)
    } else {
      onClose()
    }
  }

  const confirmClose = () => {
    setShowConfirmation(false)
    onClose()
  }

  const onSubmit = async (data: CustomerFormData) => {
    setIsSubmitting(true)
    try {
      const cleanData = {
        ...data,
        email: data.email || undefined,
        nationalId: data.nationalId || undefined,
        address: data.address || undefined
      }

      if (isEditMode && customer) {
        // TODO: Implement updateCustomer action
        console.log('Update customer:', customer.id, cleanData)
      } else {
        await createCustomer(cleanData as any)
      }

      reset()
      setHasChanges(false)
      onSuccess()
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/40" onClick={handleClose} />

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-[600px] bg-white rounded-lg shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold" style={{ fontFamily: 'Sora' }}>
              {isEditMode ? 'Edit Customer' : 'Add Customer'}
            </h2>
            <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-600">
              {referenceCode}
            </span>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-6">
          <p className="text-sm text-gray-600 mb-6">
            Reference code is auto-generated. New customers start with status No Loan.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-5">
            {/* First Name */}
            <div>
              <label className="block text-xs font-medium uppercase text-gray-600 mb-2">
                First Name <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                {...register('firstName')}
                placeholder="First name"
                className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700"
              />
              {errors.firstName && (
                <p className="text-xs text-red-600 mt-1">{errors.firstName.message}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-xs font-medium uppercase text-gray-600 mb-2">
                Last Name <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                {...register('lastName')}
                placeholder="Last name"
                className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700"
              />
              {errors.lastName && (
                <p className="text-xs text-red-600 mt-1">{errors.lastName.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-medium uppercase text-gray-600 mb-2">
                Phone <span className="text-red-700">*</span>
              </label>
              <input
                type="tel"
                {...register('phone')}
                placeholder="+677 7000 000"
                className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700"
              />
              {errors.phone && (
                <p className="text-xs text-red-600 mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium uppercase text-gray-600 mb-2">
                Email
              </label>
              <input
                type="email"
                {...register('email')}
                placeholder="optional"
                className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700"
              />
              {errors.email && (
                <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* National ID */}
            <div>
              <label className="block text-xs font-medium uppercase text-gray-600 mb-2">
                National ID
              </label>
              <input
                type="text"
                {...register('nationalId')}
                placeholder="SB-0000-00"
                className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700"
              />
              {errors.nationalId && (
                <p className="text-xs text-red-600 mt-1">{errors.nationalId.message}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-medium uppercase text-gray-600 mb-2">
                Address
              </label>
              <input
                type="text"
                {...register('address')}
                placeholder="Town, Province"
                className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700"
              />
              {errors.address && (
                <p className="text-xs text-red-600 mt-1">{errors.address.message}</p>
              )}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="px-4 py-2 bg-teal-700 text-white rounded-md text-sm font-medium hover:bg-teal-800 disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            {isSubmitting && (
              <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            )}
            {isEditMode ? 'Save Changes' : 'Add Customer'}
          </button>
        </div>
      </div>

      {/* Unsaved Changes Confirmation */}
      {showConfirmation && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40" />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 bg-white rounded-lg p-6 max-w-sm">
            <h3 className="text-lg font-semibold mb-2">Discard changes?</h3>
            <p className="text-sm text-gray-600 mb-6">
              You have unsaved changes. Are you sure you want to close without saving?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50"
              >
                Keep Editing
              </button>
              <button
                onClick={confirmClose}
                className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
              >
                Discard
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}
