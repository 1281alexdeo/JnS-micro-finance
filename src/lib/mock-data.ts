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
  email?: string;
  nationalId?: string;
  address?: string;
  status: 'ACTIVE' | 'OVERDUE' | 'COMPLETED' | 'NO_LOAN';
  activeLoans: number;
  totalLoans: number;
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
  term: number; // in weeks
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
    completedLoans: number;
  };
  weeklyPayouts: {
    id: string;
    customerName: string;
    loanReference: string;
    weeklyAmount: number;
    dueDate: string;
    status: 'UPCOMING' | 'PAID' | 'OVERDUE';
    penaltyAmount?: number;
  }[];
  recentActivity: RecentActivity[];
}

export const customers: Customer[] = [
  {
    id: 'c-1',
    referenceCode: 'MF-00042',
    firstName: 'John',
    lastName: 'Smith',
    phone: '+677 7421 668',
    email: 'john.smith@email.com',
    nationalId: 'SMI123456',
    address: '123 Main Street, Honiara',
    status: 'ACTIVE',
    activeLoans: 2,
    totalLoans: 3,
    createdAt: '2026-01-15'
  },
  {
    id: 'c-2',
    referenceCode: 'MF-00043',
    firstName: 'Emily',
    lastName: 'Johnson',
    phone: '+677 7421 669',
    email: 'emily.johnson@email.com',
    nationalId: 'JHO789012',
    address: '456 Oak Avenue, Honiara',
    status: 'ACTIVE',
    activeLoans: 1,
    totalLoans: 2,
    createdAt: '2026-01-20'
  },
  {
    id: 'c-3',
    referenceCode: 'MF-00044',
    firstName: 'Michael',
    lastName: 'Brown',
    phone: '+677 7421 670',
    email: 'michael.brown@email.com',
    nationalId: 'BRO345678',
    address: '789 Pine Street, Honiara',
    status: 'COMPLETED',
    activeLoans: 0,
    totalLoans: 1,
    createdAt: '2026-01-25'
  },
  {
    id: 'c-4',
    referenceCode: 'MF-00045',
    firstName: 'Sarah',
    lastName: 'Davis',
    phone: '+677 7421 671',
    email: 'sarah.davis@email.com',
    nationalId: 'DAV901234',
    address: '321 Elm Drive, Honiara',
    status: 'OVERDUE',
    activeLoans: 1,
    totalLoans: 1,
    createdAt: '2026-02-01'
  },
  {
    id: 'c-5',
    referenceCode: 'MF-00046',
    firstName: 'David',
    lastName: 'Wilson',
    phone: '+677 7421 672',
    email: 'david.wilson@email.com',
    nationalId: 'WIL567890',
    address: '654 Maple Road, Honiara',
    status: 'ACTIVE',
    activeLoans: 2,
    totalLoans: 2,
    createdAt: '2026-02-05'
  },
  {
    id: 'c-6',
    referenceCode: 'MF-00047',
    firstName: 'Lisa',
    lastName: 'Garcia',
    phone: '+677 7421 673',
    email: 'lisa.garcia@email.com',
    nationalId: 'GAR123456',
    address: '987 Cedar Lane, Honiara',
    status: 'OVERDUE',
    activeLoans: 1,
    totalLoans: 1,
    createdAt: '2026-02-10'
  },
  {
    id: 'c-7',
    referenceCode: 'MF-00048',
    firstName: 'Robert',
    lastName: 'Martinez',
    phone: '+677 7421 674',
    email: 'robert.martinez@email.com',
    nationalId: 'MAR789012',
    address: '147 Birch Boulevard, Honiara',
    status: 'COMPLETED',
    activeLoans: 0,
    totalLoans: 1,
    createdAt: '2026-02-15'
  },
  {
    id: 'c-8',
    referenceCode: 'MF-00049',
    firstName: 'Jennifer',
    lastName: 'Anderson',
    phone: '+677 7421 675',
    email: 'jennifer.anderson@email.com',
    nationalId: 'AND345678',
    address: '258 Spruce Way, Honiara',
    status: 'ACTIVE',
    activeLoans: 1,
    totalLoans: 1,
    createdAt: '2026-02-20'
  },
  {
    id: 'c-9',
    referenceCode: 'MF-00050',
    firstName: 'James',
    lastName: 'Taylor',
    phone: '+677 7421 676',
    email: 'james.taylor@email.com',
    nationalId: 'TAY901234',
    address: '369 Fir Terrace, Honiara',
    status: 'COMPLETED',
    activeLoans: 0,
    totalLoans: 2,
    createdAt: '2026-02-25'
  },
  {
    id: 'c-10',
    referenceCode: 'MF-00051',
    firstName: 'Mary',
    lastName: 'Thomas',
    phone: '+677 7421 677',
    email: 'mary.thomas@email.com',
    nationalId: 'THO567890',
    address: '741 Willow Court, Honiara',
    status: 'ACTIVE',
    activeLoans: 1,
    totalLoans: 1,
    createdAt: '2026-03-01'
  },
  {
    id: 'c-11',
    referenceCode: 'MF-00052',
    firstName: 'Mavis',
    lastName: 'Ngava',
    phone: '+677 7421 678',
    email: 'mavis.ngava@email.com',
    nationalId: 'NGA123456',
    address: '852 Ash Street, Honiara',
    status: 'OVERDUE',
    activeLoans: 0,
    totalLoans: 1,
    createdAt: '2026-03-05'
  },
  {
    id: 'c-12',
    referenceCode: 'MF-00053',
    firstName: 'John',
    lastName: 'Kola',
    phone: '+677 7421 679',
    email: 'john.kola@email.com',
    nationalId: 'KOL789012',
    address: '963 Birch Lane, Honiara',
    status: 'NO_LOAN',
    activeLoans: 0,
    totalLoans: 0,
    createdAt: '2026-03-10'
  }
];

export const loans: Loan[] = [
  {
    id: 'loan-1',
    loanReference: 'LOAN-00123',
    customerId: 'c-1',
    principalAmount: 500,
    processingFee: 150,
    interestRate: 10,
    totalInterest: 250,
    loanRepayment: 900,
    collateralValue: 900,
    weeklyInstalment: 18.75,
    outstandingBalance: 112.50,
    totalPaid: 787.50,
    status: 'ACTIVE',
    startDate: '2026-01-15',
    endDate: '2026-07-06',
    customer: customers[0],
    term: 48
  },
  {
    id: 'loan-2',
    loanReference: 'LOAN-00124',
    customerId: 'c-1',
    principalAmount: 1000,
    processingFee: 300,
    interestRate: 10,
    totalInterest: 500,
    loanRepayment: 1800,
    collateralValue: 1800,
    weeklyInstalment: 37.50,
    outstandingBalance: 1500,
    totalPaid: 300,
    status: 'ACTIVE',
    startDate: '2026-02-15',
    endDate: '2026-08-06',
    customer: customers[0],
    term: 48
  },
  {
    id: 'loan-3',
    loanReference: 'LOAN-00125',
    customerId: 'c-2',
    principalAmount: 750,
    processingFee: 225,
    interestRate: 10,
    totalInterest: 375,
    loanRepayment: 1350,
    collateralValue: 1350,
    weeklyInstalment: 28.13,
    outstandingBalance: 0,
    totalPaid: 1350,
    status: 'COMPLETED',
    startDate: '2026-01-20',
    endDate: '2026-07-11',
    customer: customers[1],
    term: 48
  },
  {
    id: 'loan-4',
    loanReference: 'LOAN-00126',
    customerId: 'c-2',
    principalAmount: 1200,
    processingFee: 360,
    interestRate: 10,
    totalInterest: 600,
    loanRepayment: 2160,
    collateralValue: 2160,
    weeklyInstalment: 45,
    outstandingBalance: 1980,
    totalPaid: 180,
    status: 'ACTIVE',
    startDate: '2026-02-20',
    endDate: '2026-08-11',
    customer: customers[1],
    term: 48
  },
  {
    id: 'loan-5',
    loanReference: 'LOAN-00127',
    customerId: 'c-4',
    principalAmount: 600,
    processingFee: 180,
    interestRate: 10,
    totalInterest: 300,
    loanRepayment: 1080,
    collateralValue: 1080,
    weeklyInstalment: 22.50,
    outstandingBalance: 1080,
    totalPaid: 0,
    status: 'OVERDUE',
    startDate: '2026-02-01',
    endDate: '2026-07-22',
    customer: customers[3],
    term: 48
  },
  {
    id: 'loan-6',
    loanReference: 'LOAN-00128',
    customerId: 'c-5',
    principalAmount: 800,
    processingFee: 240,
    interestRate: 10,
    totalInterest: 400,
    loanRepayment: 1440,
    collateralValue: 1440,
    weeklyInstalment: 30,
    outstandingBalance: 1140,
    totalPaid: 300,
    status: 'ACTIVE',
    startDate: '2026-02-05',
    endDate: '2026-08-16',
    customer: customers[4],
    term: 48
  },
  {
    id: 'loan-7',
    loanReference: 'LOAN-00129',
    customerId: 'c-5',
    principalAmount: 1500,
    processingFee: 450,
    interestRate: 10,
    totalInterest: 750,
    loanRepayment: 2700,
    collateralValue: 2700,
    weeklyInstalment: 56.25,
    outstandingBalance: 2250,
    totalPaid: 450,
    status: 'ACTIVE',
    startDate: '2026-03-05',
    endDate: '2026-09-16',
    customer: customers[4],
    term: 48
  },
  {
    id: 'loan-8',
    loanReference: 'LOAN-00130',
    customerId: 'c-6',
    principalAmount: 900,
    processingFee: 270,
    interestRate: 10,
    totalInterest: 450,
    loanRepayment: 1620,
    collateralValue: 1620,
    weeklyInstalment: 33.75,
    outstandingBalance: 1620,
    totalPaid: 0,
    status: 'OVERDUE',
    startDate: '2026-02-10',
    endDate: '2026-07-31',
    customer: customers[5],
    term: 48
  },
  {
    id: 'loan-9',
    loanReference: 'LOAN-00131',
    customerId: 'c-7',
    principalAmount: 700,
    processingFee: 210,
    interestRate: 10,
    totalInterest: 350,
    loanRepayment: 1260,
    collateralValue: 1260,
    weeklyInstalment: 26.25,
    outstandingBalance: 0,
    totalPaid: 1260,
    status: 'COMPLETED',
    startDate: '2026-02-15',
    endDate: '2026-08-05',
    customer: customers[6],
    term: 48
  },
  {
    id: 'loan-10',
    loanReference: 'LOAN-00132',
    customerId: 'c-8',
    principalAmount: 1100,
    processingFee: 330,
    interestRate: 10,
    totalInterest: 550,
    loanRepayment: 1980,
    collateralValue: 1980,
    weeklyInstalment: 41.25,
    outstandingBalance: 1650,
    totalPaid: 330,
    status: 'ACTIVE',
    startDate: '2026-02-20',
    endDate: '2026-08-11',
    customer: customers[7],
    term: 48
  },
  {
    id: 'loan-11',
    loanReference: 'LOAN-00133',
    customerId: 'c-9',
    principalAmount: 650,
    processingFee: 195,
    interestRate: 10,
    totalInterest: 325,
    loanRepayment: 1170,
    collateralValue: 1170,
    weeklyInstalment: 24.38,
    outstandingBalance: 0,
    totalPaid: 1170,
    status: 'COMPLETED',
    startDate: '2026-02-25',
    endDate: '2026-08-16',
    customer: customers[8],
    term: 48
  },
  {
    id: 'loan-12',
    loanReference: 'LOAN-00134',
    customerId: 'c-9',
    principalAmount: 850,
    processingFee: 255,
    interestRate: 10,
    totalInterest: 425,
    loanRepayment: 1530,
    collateralValue: 1530,
    weeklyInstalment: 31.88,
    outstandingBalance: 0,
    totalPaid: 1530,
    status: 'COMPLETED',
    startDate: '2026-03-15',
    endDate: '2026-09-16',
    customer: customers[8],
    term: 48
  },
  {
    id: 'loan-13',
    loanReference: 'LOAN-00135',
    customerId: 'c-10',
    principalAmount: 1000,
    processingFee: 300,
    interestRate: 10,
    totalInterest: 500,
    loanRepayment: 1800,
    collateralValue: 1800,
    weeklyInstalment: 37.50,
    outstandingBalance: 1425,
    totalPaid: 375,
    status: 'ACTIVE',
    startDate: '2026-03-01',
    endDate: '2026-09-12',
    customer: customers[9],
    term: 48
  },
  {
    id: 'loan-14',
    loanReference: 'LOAN-00136',
    customerId: 'c-11',
    principalAmount: 750,
    processingFee: 225,
    interestRate: 10,
    totalInterest: 375,
    loanRepayment: 1350,
    collateralValue: 1350,
    weeklyInstalment: 28.13,
    outstandingBalance: 0,
    totalPaid: 1350,
    status: 'COMPLETED',
    startDate: '2026-03-05',
    endDate: '2026-08-26',
    customer: customers[10],
    term: 48
  }
];

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
    overdueCount: 3,
    completedLoans: 156
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
      status: 'UPCOMING',
      penaltyAmount: 2.36
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
      status: 'OVERDUE',
      penaltyAmount: 9.94
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
      status: 'OVERDUE',
      penaltyAmount: 15.63
    },
    {
      id: 'wp-9',
      customerName: 'Maria Garcia',
      loanReference: 'LOAN-00131',
      weeklyAmount: 34.25,
      dueDate: '2026-05-30',
      status: 'UPCOMING'
    },
    {
      id: 'wp-10',
      customerName: 'James Taylor',
      loanReference: 'LOAN-00132',
      weeklyAmount: 28.50,
      dueDate: '2026-05-30',
      status: 'PAID'
    },
    {
      id: 'wp-11',
      customerName: 'Anna Miller',
      loanReference: 'LOAN-00133',
      weeklyAmount: 45.75,
      dueDate: '2026-05-31',
      status: 'UPCOMING',
      penaltyAmount: 5.88
    },
    {
      id: 'wp-12',
      customerName: 'Chris Wilson',
      loanReference: 'LOAN-00134',
      weeklyAmount: 52.25,
      dueDate: '2026-06-01',
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