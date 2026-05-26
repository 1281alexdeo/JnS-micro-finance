export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'CUSTOMER';
  accentColor: string;
}

export interface Customer {
  id: string;
  referenceCode: string;
  firstName: string;
  lastName: string;
  phone?: string;
  email: string;
  activeLoans: number;
  totalLoans: number;
  status: 'ACTIVE' | 'OVERDUE' | 'COMPLETED';
  createdAt: string;
}

export interface Loan {
  id: string;
  loanReference: string;
  customerId: string;
  principalAmount: number;
  processingFee: number;
  interestRate: number;
  totalInterest: number;
  loanRepayment: number;
  collateralValue: number;
  weeklyInstalment: number;
  outstandingBalance: number;
  totalPaid: number;
  status: 'ACTIVE' | 'OVERDUE' | 'COMPLETED' | 'DEFAULTED';
  startDate: string;
  endDate: string;
  customer: Customer;
  installments?: Installment[];
}

export interface Installment {
  id: string;
  loanId: string;
  weekNumber: number;
  dueDate: string;
  baseAmount: number;
  penaltyAdded: number;
  amountDue: number;
  amountPaid: number;
  status: 'UPCOMING' | 'PAID' | 'OVERDUE';
  paidAt?: string;
  paymentRef?: string;
}

export interface RecentActivity {
  id: string;
  type: 'LOAN_CREATED' | 'PAYMENT_RECORDED' | 'PENALTY_APPLIED' | 'CUSTOMER_CREATED';
  description: string;
  amount?: number;
  customerName: string;
  loanReference?: string;
  timestamp: string;
}

export interface DashboardData {
  user: User;
  kpis: {
    totalActiveLoans: number;
    totalOutstandingBalance: number;
    thisWeeksExpectedCollections: number;
    thisMonthsExpectedCollections: number;
    overdueCount: number;
  };
  weeklyPayouts: {
    id: string;
    customerName: string;
    loanReference: string;
    weeklyAmount: number;
    dueDate: string;
    status: 'UPCOMING' | 'PAID' | 'OVERDUE';
  }[];
  recentActivity: RecentActivity[];
}

export const mockData: DashboardData = {
  user: {
    id: 'user-1',
    name: 'John Admin',
    email: 'john.admin@jsfinance.sb',
    role: 'ADMIN',
    accentColor: 'teal'
  },
  kpis: {
    totalActiveLoans: 24,
    totalOutstandingBalance: 42560.00,
    thisWeeksExpectedCollections: 3420.00,
    thisMonthsExpectedCollections: 13680.00,
    overdueCount: 3
  },
  weeklyPayouts: [
    {
      id: 'wp-1',
      customerName: 'Emily Johnson',
      loanReference: 'LOAN-00123',
      weeklyAmount: 17.83,
      dueDate: '2026-05-27',
      status: 'UPCOMING'
    },
    {
      id: 'wp-2',
      customerName: 'Michael Chen',
      loanReference: 'LOAN-00124',
      weeklyAmount: 21.88,
      dueDate: '2026-05-27',
      status: 'UPCOMING'
    },
    {
      id: 'wp-3',
      customerName: 'Sarah Williams',
      loanReference: 'LOAN-00125',
      weeklyAmount: 15.75,
      dueDate: '2026-05-27',
      status: 'UPCOMING'
    },
    {
      id: 'wp-4',
      customerName: 'David Brown',
      loanReference: 'LOAN-00126',
      weeklyAmount: 43.75,
      dueDate: '2026-05-27',
      status: 'PAID'
    },
    {
      id: 'wp-5',
      customerName: 'Lisa Garcia',
      loanReference: 'LOAN-00127',
      weeklyAmount: 19.88,
      dueDate: '2026-05-28',
      status: 'OVERDUE'
    },
    {
      id: 'wp-6',
      customerName: 'Robert Davis',
      loanReference: 'LOAN-00128',
      weeklyAmount: 65.63,
      dueDate: '2026-05-28',
      status: 'UPCOMING'
    },
    {
      id: 'wp-7',
      customerName: 'Jennifer Martinez',
      loanReference: 'LOAN-00129',
      weeklyAmount: 13.63,
      dueDate: '2026-05-29',
      status: 'UPCOMING'
    },
    {
      id: 'wp-8',
      customerName: 'William Wilson',
      loanReference: 'LOAN-00130',
      weeklyAmount: 87.50,
      dueDate: '2026-05-29',
      status: 'UPCOMING'
    }
  ],
  recentActivity: [
    {
      id: 'ra-1',
      type: 'LOAN_CREATED',
      description: 'New loan created for Emily Johnson',
      customerName: 'Emily Johnson',
      loanReference: 'LOAN-00131',
      timestamp: '2026-05-26T10:30:00Z'
    },
    {
      id: 'ra-2',
      type: 'PAYMENT_RECORDED',
      description: 'Payment recorded for David Brown',
      amount: 43.75,
      customerName: 'David Brown',
      loanReference: 'LOAN-00126',
      timestamp: '2026-05-26T09:15:00Z'
    },
    {
      id: 'ra-3',
      type: 'PENALTY_APPLIED',
      description: 'Late penalty applied for Lisa Garcia',
      amount: 9.94,
      customerName: 'Lisa Garcia',
      loanReference: 'LOAN-00127',
      timestamp: '2026-05-26T08:45:00Z'
    },
    {
      id: 'ra-4',
      type: 'CUSTOMER_CREATED',
      description: 'New customer registered: Robert Davis',
      customerName: 'Robert Davis',
      timestamp: '2026-05-25T16:20:00Z'
    },
    {
      id: 'ra-5',
      type: 'LOAN_CREATED',
      description: 'New loan created for Jennifer Martinez',
      customerName: 'Jennifer Martinez',
      loanReference: 'LOAN-00129',
      timestamp: '2026-05-25T14:10:00Z'
    }
  ]
};