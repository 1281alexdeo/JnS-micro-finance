# LoanTrack — Microfinance Loan Management System
## Product Requirements Document


## 1. Problem

Microfinance businesses operating with a growing customer base face significant operational strain when managing loan disbursements, weekly repayment schedules, tiered interest calculations, and penalty enforcement manually. As the customer base scales, tracking individual loan balances, applying the correct interest tier per loan amount, and communicating upcoming weekly payments to borrowers becomes error-prone and time-consuming. The current process is managed in spreadsheets covering only 6 months — the system must extend this to 12 months (48 weekly instalments) and give both administrators and customers real-time visibility into loan status, payment schedules, and outstanding balances.

---

## 2. Goals & Non-Goals

### Goals
- Auto-calculate and apply stepped interest rates based on loan amount at loan creation
- Generate a 12-month (48-week) weekly repayment schedule per loan
- Enable admins to record per-event late payment penalties, each applied to the missed weekly payment amount
- Give customers a self-service portal showing their next weekly payment amount, due date, and full 48-week schedule
- Track payout obligations by week and by month across all active loans
- Record collateral value against each loan

### Non-Goals
- In-app payment processing — all transactions are handled externally; admin records them manually
- Loan approval workflows or credit scoring — admin decides externally
- SMS or push notification reminders — out of scope for this version
- Multi-currency support — single currency (SBD) only
- Mobile native applications — web-responsive only
- Customer self-registration — admin creates all accounts

---

## 3. Users & Use Cases

### 3.1 Business Admin

**Who they are:** The internal operator managing the microfinance business — responsible for issuing loans, recording weekly payments, applying penalties, and monitoring the loan portfolio.

**What they need:** A clear interface to manage customers and loans without spreadsheets. Visibility into who owes what each week and month, and the ability to flag missed payments quickly.

**Success looks like:** Admin can onboard a new customer and generate their full 48-week repayment schedule in under three minutes. Weekly and monthly payout views are accurate and exportable.

### 3.2 Customer

**Who they are:** A borrower with one or more active loans. Needs a simple view of their weekly repayment obligations.

**What they need:** Quick access to their next weekly payment amount and exact due date, and a full forward schedule.

**Success looks like:** Customer logs in, sees their next weekly payment amount and due date prominently, and can review all 48 instalments in their schedule.

---

### 3.3 Use Cases

1. Admin adds a customer and creates a loan of SBD 800 — system applies 7% interest, calculates Loan Repayment = SBD 856, records Collateral = SBD 856, and generates 48 weekly instalments of SBD 17.83 (with Week 48 absorbing any rounding remainder)
2. Admin views the weekly payout view and sees every customer with a payment due this week, their weekly amount, and current status
3. A customer with a SBD 800 loan misses their Week 6 payment — their outstanding balance at that point is SBD 749.17; admin flags it as late; system applies 5% of SBD 749.17 = SBD 37.46 penalty added to Week 6's amount due
4. The same customer misses Week 7 — outstanding balance is now SBD 731.34 (balance after Week 6 penalty was added); admin flags it; another 5% of SBD 731.34 = SBD 36.57 added to Week 7 independently — each event uses the balance at that moment
5. Admin issues a second loan to a customer who still has an overdue loan — system allows it and auto-applies a 5% penalty on the overdue loan's current outstanding balance before creating the new loan
6. Admin exports the weekly payout list to CSV — columns match the on-screen table exactly
7. Customer logs in and sees their next payment is SBD 18.72 due on Friday (because a penalty was previously applied)
8. Admin searches the customer list and filters to Overdue accounts for collections follow-up

---

## 4. Features

### 4.1 Authentication **[P0]**

Role-based access using Supabase Auth. Two roles: `ADMIN` and `CUSTOMER`. Enforced at route, middleware, and data layer. All accounts created by admin.

- [ ] Admin logs in with email and password
- [ ] Customer logs in with email and password or unique customer reference code
- [ ] Unauthenticated users redirected to login page
- [ ] Customers cannot access admin routes or other customers' data
- [ ] Sessions persist with secure refresh tokens
- [ ] Admin creates Supabase Auth account for customer from the Add Customer form

---

### 4.2 Customer Management **[P0]**

- [ ] Admin creates a customer record: full name, phone, email, national ID / reference, address
- [ ] Creating a customer simultaneously creates their Supabase Auth login
- [ ] Paginated customer directory: Name, Reference, Active Loans, Status, Date Added
- [ ] Searchable by name or reference code; filterable by loan status (All / Active / Overdue / Completed)
- [ ] Click-through to customer detail page
- [ ] Admin can edit customer profile at any time

---

### 4.3 Loan Management **[P0]**

Admin specifies the principal amount and start date. The system derives all other figures automatically.

- [ ] Admin can create a loan for any customer regardless of their existing loan status
- [ ] If the customer has an existing overdue loan, the system auto-applies a 5% penalty to that loan's outstanding balance before creating the new loan, and shows a confirmation notice to admin
- [ ] System applies the correct stepped interest rate based on principal (see §4.3.1)
- [ ] Processing fee = 30% of principal, added to total payable (not deducted from disbursement)
- [ ] Loan Repayment total = Principal + Processing Fee + Interest
- [ ] Collateral value = Loan Repayment total (recorded on the loan record)
- [ ] Weekly instalment = Loan Repayment ÷ 48, rounded to 2 decimal places
- [ ] Week 48 instalment absorbs any rounding remainder
- [ ] System generates exactly 48 weekly instalment records with due dates from start date
- [ ] Admin can view all loans on a central Loans page: principal, rate, processing fee, collateral, total repayable, paid to date, outstanding balance, status

#### 4.3.1 Interest Rate Schedule (stepped, not interpolated)

Derived directly from the Revolving Fund table. Rates apply to the exact principal bands:

| Principal | Processing Fee (30%) | Interest Rate | Total Interest | Loan Repayment | Weekly Payment (÷48) |
|---|---|---|---|---|---|
| SBD 500 | SBD 150 | 10% | SBD 50 | SBD 550 | SBD 11.46 |
| SBD 600 | SBD 180 | 9% | SBD 54 | SBD 654 | SBD 13.63 |
| SBD 700 | SBD 210 | 8% | SBD 56 | SBD 756 | SBD 15.75 |
| SBD 800 | SBD 240 | 7% | SBD 56 | SBD 856 | SBD 17.83 |
| SBD 900 | SBD 270 | 6% | SBD 54 | SBD 954 | SBD 19.88 |
| SBD 1,000 | SBD 300 | 5% | SBD 50 | SBD 1,050 | SBD 21.88 |
| SBD 2,000 | SBD 600 | 5% | SBD 100 | SBD 2,100 | SBD 43.75 |
| SBD 3,000 | SBD 900 | 5% | SBD 150 | SBD 3,150 | SBD 65.63 |
| SBD 4,000 | SBD 1,200 | 5% | SBD 200 | SBD 4,200 | SBD 87.50 |
| SBD 5,000 | SBD 1,500 | 5% | SBD 250 | SBD 5,250 | SBD 109.38 |

**For principal amounts not in the table above**, the system applies the rate of the nearest lower band (floor), e.g. SBD 1,500 → 5% (SBD 1,000 band). Admin is shown the applied rate on the loan creation form before confirming.

**Rate lookup logic:**
```
if      principal >= 1000  → rate = 5%
else if principal >= 900   → rate = 6%
else if principal >= 800   → rate = 7%
else if principal >= 700   → rate = 8%
else if principal >= 600   → rate = 9%
else if principal >= 500   → rate = 10%
else                       → INVALID (block submission)
```

**Loan total calculation (simple interest on principal):**
```
processingFee      = principal × 0.30
totalInterest      = principal × rate
loanRepayment      = principal + processingFee + totalInterest
collateral         = loanRepayment                          // 100% + interest worth of asset
weeklyInstalment   = ROUND(loanRepayment / 48, 2)
week48Instalment   = loanRepayment - (weeklyInstalment × 47) // absorbs rounding
```

---

### 4.4 Penalty Management **[P0]**

The 5% late payment penalty is applied to the **current outstanding loan balance** at the exact moment the penalty is applied. This is the single consistent rule for all penalty events — there is no distinction based on trigger type. Each missed week is an independent event: the outstanding balance at the time of each flag will differ because earlier penalties increase the outstanding balance, meaning later penalties compound in value.

- [ ] Admin can flag any Upcoming or Overdue weekly instalment as late
- [ ] Flagging triggers: `penaltyAmount = currentOutstandingBalance × 0.05`
- [ ] Penalty amount is added to that week's `amountDue`: `amountDue = baseWeeklyAmount + penaltyAmount`
- [ ] Outstanding loan balance is immediately increased by the penalty amount: `outstandingBalance += penaltyAmount`
- [ ] If a customer misses two consecutive weeks, admin flags each independently — two separate Penalty records, each calculated on the outstanding balance at the moment of that flag (the second will be higher because the first penalty has already been added to the balance)
- [ ] If a new loan is issued to a customer with an existing overdue loan, the system auto-applies a 5% penalty on the overdue loan's current outstanding balance — same calculation rule, no exception
- [ ] Manual penalty requires a two-step confirmation modal showing the outstanding balance and calculated penalty amount before confirming — irreversible
- [ ] Penalty history per loan: week number, due date, outstanding balance at time of penalty, penalty amount (5%), resulting amount due, trigger (Manual / Auto — New Loan)

**Penalty calculation example:**
```
Loan: SBD 800 | loanRepayment: SBD 856 | weeklyBase: SBD 17.83
Outstanding balance at Week 6 (5 payments made): SBD 749.17

Week 6 missed →
  penaltyAmount    = SBD 749.17 × 0.05 = SBD 37.46
  week6AmountDue   = SBD 17.83 + SBD 37.46 = SBD 55.29
  outstandingBalance becomes SBD 749.17 + SBD 37.46 = SBD 786.63

Week 7 missed (balance now SBD 786.63) →
  penaltyAmount    = SBD 786.63 × 0.05 = SBD 39.33
  week7AmountDue   = SBD 17.83 + SBD 39.33 = SBD 57.16
  outstandingBalance becomes SBD 786.63 + SBD 39.33 = SBD 825.96
```

---

### 4.5 Payout Dashboard **[P0]**

- [ ] KPI row: Total Active Loans, Total Outstanding Balance, This Week's Expected Collections, This Month's Expected Collections, Overdue Count
- [ ] **Weekly payout view (primary):** all instalments due in the current calendar week — Customer Name, Loan Reference, Weekly Amount Due, Due Date, Status
- [ ] **Monthly payout view:** all instalments due within the selected month — same columns — with total expected collection at the bottom
- [ ] Toggle between Weekly and Monthly views; month selector in Monthly view
- [ ] CSV export — columns match the on-screen table exactly **[P1]**

---

### 4.6 Customer Portal **[P0]**

- [ ] Prominent "Next Payment" widget: weekly amount and exact due date in large display type
- [ ] Weeks remaining shown below the widget
- [ ] Loan summary row: Principal, Processing Fee, Total Repayable, Collateral, Paid to Date, Outstanding Balance
- [ ] Full 48-week repayment schedule table: Week #, Due Date, Amount Due (base + any penalty), Status (Upcoming / Paid / Overdue)
- [ ] Rows with a penalty show a sub-line: "Includes penalty: SBD X.XX applied DD MMM YYYY"
- [ ] Multi-loan selector if customer has more than one loan
- [ ] Customer cannot access any other customer's data

---

### 4.7 Transaction Recording **[P1]**

- [ ] Admin marks a weekly instalment as Paid: enters payment reference and actual payment date
- [ ] Outstanding balance updates automatically
- [ ] Transaction log per loan: date, amount, type, reference code, recorded by
- [ ] Transactions cannot be deleted — correction notes can be added

---

## 5. UI/UX Design Requirements

### 5.1 Design Philosophy

Professional financial tool — structured data, deliberate whitespace, zero decoration. The interface communicates trust and precision. Every element exists because it serves the user's task.

---

### 5.2 Layout & Structure

- **Admin layout:** Fixed left sidebar (240px). Top header (56px): breadcrumb + current user. Content area fluid, max-width 1280px, 32px horizontal padding.
- **Customer portal:** Top nav only. Single-column, max-width 860px, centred. Linear scroll: Next Payment → Loan Summary → 48-Week Schedule.
- **Grid:** 12-column, 24px gutters.
- **Breakpoints:** Desktop ≥ 1024px | Tablet 768–1023px (sidebar collapses to 56px rail) | Mobile < 768px (sidebar drawer, forms stack)

---

### 5.3 Navigation

**Admin sidebar:**
1. Dashboard
2. Customers
3. Loans
4. Payouts
5. ─── divider ───
6. Settings

- Active: 2px left accent border + 8% accent fill
- Hover: 5% accent fill, no underline
- Text-only nav labels, weight 500, no icons
- Footer: user name + role badge + logout
- Header breadcrumb on deep pages

**Customer portal:** Business name left — logout right. No secondary nav.

---

### 5.4 Typography

- **Headings:** [Sora](https://fonts.google.com/specimen/Sora)
- **Body / UI:** [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)

| Token | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| `display` | 36px | 700 | 1.1 | Next Payment amount |
| `h1` | 24px | 600 | 1.3 | Page titles |
| `h2` | 18px | 600 | 1.4 | Section headings |
| `h3` | 15px | 600 | 1.4 | Card headings |
| `body` | 14px | 400 | 1.6 | Tables, forms, descriptions |
| `caption` | 12px | 400 | 1.5 | Metadata, timestamps |
| `label` | 12px | 500 | 1.0 | Form labels, column headers |
| `mono` | 13px | 400 | 1.5 | Reference codes, all amounts |

All monetary values: `font-variant-numeric: tabular-nums`.

---

### 5.5 Color System

```css
:root {
  --color-bg:             #F7F6F3;
  --color-surface:        #FFFFFF;
  --color-surface-muted:  #F0EEE9;
  --color-border:         #E4E1D9;
  --color-border-strong:  #C9C5BC;
  --color-text-primary:   #1C1917;
  --color-text-secondary: #6B6560;
  --color-text-disabled:  #A8A39D;
  --color-accent:         #1D6A63;
  --color-accent-hover:   #165550;
  --color-accent-subtle:  #EAF3F2;
  --color-success:        #2E7D52;
  --color-success-bg:     #EDFAF3;
  --color-warning:        #92600A;
  --color-warning-bg:     #FEF5E4;
  --color-destructive:    #B52A2A;
  --color-destructive-bg: #FDF0F0;
}
```

---

### 5.6 Component Specifications

**Primary Button:** Height 36px | Padding 0 16px | Border-radius 6px | `--color-accent` bg | White text 14px 500 | Hover `--color-accent-hover` | No shadow

**Secondary Button:** Height 36px | 1px `--color-border-strong` border | White bg | Hover `--color-surface-muted`

**Data Table:** Header `--color-surface-muted`, 12px label uppercase | Row height 48px (comfortable) / 36px (compact) | 1px `--color-border` row dividers | Text left-aligned, currency right-aligned monospace | Row hover `--color-surface-muted` | No outer border-radius

**Status Badge:** Height 22px | Padding 0 8px | Border-radius 4px | 11px weight 500 uppercase
- Paid: `--color-success` / `--color-success-bg`
- Upcoming: `--color-warning` / `--color-warning-bg`
- Overdue: `--color-destructive` / `--color-destructive-bg`

**Cards:** `--color-surface` | 1px `--color-border` | Border-radius 8px | Padding 24px | No shadow

**KPI Row:** 4-col desktop, 2-col tablet, 1-col mobile | Label above value | No icons, no coloured borders

**Forms:** Label 12px 500 `--color-text-secondary`, 6px below | Input 36px, 1px `--color-border`, radius 6px, padding 0 12px | Focus: `--color-accent` border | Error: `--color-destructive` border + 12px message below

**Confirmation Modal:** Max-width 480px | Overlay `rgba(0,0,0,0.35)` | Radius 10px | Padding 32px | Buttons right-aligned

---

### 5.7 Anti-Patterns — EXPLICITLY PROHIBITED

- [ ] Gradient backgrounds on any section, hero, card, or header
- [ ] Decorative icons used without functional purpose
- [ ] Cards with coloured left-border accents as a primary pattern
- [ ] Animated gradient or shimmer text effects
- [ ] Emoji in navigation, headers, or labels
- [ ] Glassmorphism / blur on content areas
- [ ] More than two font weights competing in a single component
- [ ] Neon or oversaturated colours
- [ ] Box-shadow on every card — borders only
- [ ] Purple / indigo / blue-purple gradients as brand identity
- [ ] Decorative illustrations in empty states

---

### 5.8 Customization

- Light / Dark mode via CSS class on `<html>`, stored in `localStorage`
- Accent colour presets: Deep Teal (default), Slate Blue, Warm Amber, Charcoal — stored in user record
- Density: Comfortable (48px rows) / Compact (36px rows) — stored in `localStorage`

---

### 5.9 Alignment & Spacing Standards

- Form labels share a consistent left edge
- Text columns left-aligned; currency and number columns right-aligned, monospace
- Page title and KPI row share the same left margin
- Primary action buttons right-aligned in section header rows
- All buttons in the same row: 36px height
- Section spacing: 32px between major sections, 16px between related elements
- Currency format: `SBD 1,250.00` throughout

---

## 6. Technical Requirements

| Concern | Decision |
|---|---|
| Frontend | Next.js 14+ (App Router) |
| UI Library | React 18+ |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui — Dialog, Select, Popover, Toast, DropdownMenu only |
| Database | Supabase (PostgreSQL) |
| ORM | Prisma |
| Auth | Supabase Auth — email/password; roles in `User` table |
| Tables | TanStack Table v8 |
| Forms | React Hook Form + Zod |
| Deployment | Vercel or Node-compatible Linux VPS |
| State | React Server Components + React Context |
| Performance | LCP < 2.5s | bundle < 300kb |
| Accessibility | WCAG 2.1 AA |
| Browsers | Last 2 versions: Chrome, Firefox, Safari, Edge |

---

## 7. Data

### 7.1 Confirmed Business Rules

| Rule | Value |
|---|---|
| Minimum loan amount | SBD 500 |
| Maximum defined tier | SBD 5,000 (admin may enter higher; 5% rate applies) |
| Interest tiers | Stepped: $500=10%, $600=9%, $700=8%, $800=7%, $900=6%, $1,000+=5% |
| Interest method | Simple (flat rate × principal, calculated once at creation) |
| Processing fee | 30% of principal, added to total payable |
| Collateral | Equal to Loan Repayment total (principal + fee + interest) |
| Repayment term | 12 months = 48 weekly instalments |
| Weekly instalment | Loan Repayment ÷ 48, Week 48 absorbs rounding |
| Late penalty basis | 5% × **current outstanding loan balance** at the moment the penalty is applied |
| Penalty per event | Each missed week penalised independently; balance increases after each penalty, so consecutive missed weeks compound |
| Concurrent loans | Allowed; overdue loan receives auto-penalty (5% of outstanding balance) on new loan issuance |
| Account creation | Admin only |
| CSV export | Columns match on-screen table exactly |

### 7.2 Financial Calculation Reference

```
// Step 1 — Rate lookup
if      principal >= 1000  → rate = 0.05
else if principal >= 900   → rate = 0.06
else if principal >= 800   → rate = 0.07
else if principal >= 700   → rate = 0.08
else if principal >= 600   → rate = 0.09
else if principal >= 500   → rate = 0.10
else                       → INVALID

// Step 2 — Loan totals
processingFee    = principal × 0.30
totalInterest    = principal × rate
loanRepayment    = principal + processingFee + totalInterest
collateral       = loanRepayment

// Step 3 — Weekly schedule
weeklyBase       = ROUND(loanRepayment / 48, 2)
week48Amount     = loanRepayment - (weeklyBase × 47)

// Step 4 — Penalty (per missed week, applied to current outstanding balance)
penaltyAmount      = currentOutstandingBalance × 0.05
outstandingBalance = outstandingBalance + penaltyAmount  // balance grows immediately
weekAmountDue      = weeklyBase + penaltyAmount          // added to that week's instalment

// Note: consecutive missed weeks compound because each penalty increases
// the outstanding balance before the next penalty is calculated.
```

---

### 7.3 Prisma Data Models

```prisma
// schema.prisma — LoanTrack v1.2
// Repayment cadence: weekly (48 instalments over 12 months)

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── Enums ────────────────────────────────────────────────────────────────────

enum Role {
  ADMIN
  CUSTOMER
}

enum LoanStatus {
  ACTIVE      // Repayments ongoing
  OVERDUE     // One or more weekly instalments past due
  COMPLETED   // All 48 instalments paid
  DEFAULTED   // Admin-marked for write-off
}

enum InstallmentStatus {
  UPCOMING
  PAID
  OVERDUE
}

enum TransactionType {
  REPAYMENT    // Admin records external payment
  PENALTY      // System records penalty charge
  ADJUSTMENT   // Admin correction with note
}

enum PenaltyTrigger {
  MANUAL           // Admin flagged a missed weekly payment
  AUTO_NEW_LOAN    // System auto-applied at new loan issuance on overdue account
}

// ─── User ─────────────────────────────────────────────────────────────────────

model User {
  id           String   @id @default(cuid())
  supabaseId   String   @unique
  email        String   @unique
  role         Role     @default(CUSTOMER)
  accentColor  String   @default("teal")
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  customer     Customer?
}

// ─── Customer ─────────────────────────────────────────────────────────────────

model Customer {
  id               String   @id @default(cuid())
  userId           String   @unique
  user             User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  referenceCode    String   @unique        // e.g. "MF-00042"
  firstName        String
  lastName         String
  phone            String?
  nationalId       String?
  address          String?

  loans            Loan[]

  createdByAdminId String
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt

  @@index([referenceCode])
}

// ─── Loan ─────────────────────────────────────────────────────────────────────
// All financial figures stored as Decimal.
// Calculated once at creation and stored — never recalculated on read.

model Loan {
  id                  String     @id @default(cuid())
  loanReference       String     @unique           // e.g. "LOAN-00088"
  customerId          String
  customer            Customer   @relation(fields: [customerId], references: [id])

  // ── Locked financials (set at creation) ──────────────────────────────────
  principalAmount     Decimal    @db.Decimal(12, 2)
  processingFee       Decimal    @db.Decimal(12, 2)  // principal × 0.30
  interestRate        Decimal    @db.Decimal(6, 4)   // e.g. 0.0700
  totalInterest       Decimal    @db.Decimal(12, 2)  // principal × rate
  loanRepayment       Decimal    @db.Decimal(12, 2)  // principal + fee + interest
  collateralValue     Decimal    @db.Decimal(12, 2)  // = loanRepayment
  weeklyInstalment    Decimal    @db.Decimal(12, 2)  // loanRepayment / 48, rounded
  week48Instalment    Decimal    @db.Decimal(12, 2)  // absorbs rounding remainder

  // ── Running balance (mutated as payments recorded) ───────────────────────
  outstandingBalance  Decimal    @db.Decimal(12, 2)  // starts at loanRepayment
  totalPaid           Decimal    @db.Decimal(12, 2)  @default(0)
  penaltiesTotal      Decimal    @db.Decimal(12, 2)  @default(0)

  status              LoanStatus @default(ACTIVE)
  startDate           DateTime
  endDate             DateTime                         // startDate + 48 weeks

  installments        Installment[]
  penalties           Penalty[]
  transactions        Transaction[]

  createdByAdminId    String
  createdAt           DateTime   @default(now())
  updatedAt           DateTime   @updatedAt

  @@index([customerId])
  @@index([status])
  @@index([endDate])
}

// ─── Installment ──────────────────────────────────────────────────────────────
// 48 records generated per loan (weekly). Week 48 absorbs rounding.

model Installment {
  id             String            @id @default(cuid())
  loanId         String
  loan           Loan              @relation(fields: [loanId], references: [id])

  weekNumber     Int               // 1 through 48
  dueDate        DateTime
  baseAmount     Decimal           @db.Decimal(12, 2)  // weekly instalment base
  penaltyAdded   Decimal           @db.Decimal(12, 2)  @default(0)
  amountDue      Decimal           @db.Decimal(12, 2)  // baseAmount + penaltyAdded
  amountPaid     Decimal           @db.Decimal(12, 2)  @default(0)
  status         InstallmentStatus @default(UPCOMING)

  paidAt         DateTime?
  paymentRef     String?

  penalties      Penalty[]

  createdAt      DateTime          @default(now())
  updatedAt      DateTime          @updatedAt

  @@unique([loanId, weekNumber])
  @@index([dueDate])               // core index for weekly/monthly payout queries
  @@index([status])
}

// ─── Penalty ──────────────────────────────────────────────────────────────────
// Immutable. One record per penalty event.
// All triggers use the same rule: penaltyAmount = currentOutstandingBalance × 0.05
// MANUAL: admin flags a missed weekly instalment — balance at that moment is used
// AUTO_NEW_LOAN: system fires at new loan issuance on overdue account — same rule

model Penalty {
  id                String         @id @default(cuid())
  loanId            String
  loan              Loan           @relation(fields: [loanId], references: [id])
  installmentId     String?        // null for AUTO_NEW_LOAN trigger
  installment       Installment?   @relation(fields: [installmentId], references: [id])

  outstandingAtTime Decimal        @db.Decimal(12, 2)  // outstanding balance at moment of penalty
  penaltyRate       Decimal        @db.Decimal(6, 4)   // always 0.0500
  penaltyAmount     Decimal        @db.Decimal(12, 2)  // outstandingAtTime × 0.05
  trigger           PenaltyTrigger
  notes             String?

  appliedByAdminId  String
  appliedAt         DateTime       @default(now())

  @@index([loanId])
  @@index([appliedAt])
}

// ─── Transaction ──────────────────────────────────────────────────────────────
// Append-only audit log.

model Transaction {
  id                String          @id @default(cuid())
  loanId            String
  loan              Loan            @relation(fields: [loanId], references: [id])

  type              TransactionType
  amount            Decimal         @db.Decimal(12, 2)
  referenceCode     String?
  description       String?
  correctionNote    String?

  recordedByAdminId String
  transactionDate   DateTime
  createdAt         DateTime        @default(now())

  @@index([loanId])
  @@index([transactionDate])
}
```

### 7.4 Entity Relationships

```
User         (1) ──────────── (0..1) Customer
Customer     (1) ──────────── (many) Loan
Loan         (1) ──────────── (  48) Installment
Loan         (1) ──────────── (many) Penalty
Loan         (1) ──────────── (many) Transaction
Installment  (1) ──────────── (many) Penalty       ← per-week penalty tracking
```

---

## 8. API / Integration Requirements

| Service | Purpose | Notes |
|---|---|---|
| Supabase Auth | Authentication, session management | JWTs verified in Next.js middleware |
| Supabase PostgreSQL | Primary database | Accessed via Prisma only |
| Prisma ORM | Type-safe query layer | `prisma migrate deploy` for migrations |
| Next.js Server Actions | All mutations | Replaces separate REST API |
| CSV Export | Weekly/monthly payout download | Server-side; columns match on-screen table |

---

## 9. Error States & Edge Cases

| Scenario | Handling |
|---|---|
| Principal below SBD 500 | Zod blocks submission: "Minimum loan amount is SBD 500." |
| Principal not a round number aligned to a tier (e.g. SBD 650) | System applies floor-band rate (SBD 600 = 9%). Admin sees: "Interest rate applied: 9% (SBD 600 band)" before confirming |
| New loan issued to customer with overdue loan | Allowed. Auto-penalty of 5% on outstanding balance of overdue loan applied first. Admin sees confirmation: "Penalty of SBD X.XX applied to Loan #XXXXX." |
| Admin flags a Paid instalment as late | Penalty button disabled on Paid rows. Direct URL access returns HTTP 400. |
| Two consecutive missed weekly payments | Admin flags each week separately. Two Penalty records, each = weeklyBase × 5%. Penalties are independent. |
| Payment recorded that exceeds outstanding balance | System caps at outstanding balance and shows warning toast: "Payment exceeds outstanding balance — please verify." |
| Customer account exists with no loan issued | Portal shows: "No active loan on your account. Please contact your loan officer." No error. |
| Concurrent admin payment recording | Optimistic lock via `updatedAt` — second write returns conflict error; admin prompted to refresh. |
| Week 48 rounding check | System verifies sum of all 48 instalments = loanRepayment before saving. Any discrepancy absorbed in Week 48 amount. |
| Customer has multiple active loans | Loan selector (dropdown) appears above Next Payment widget. Each loan's schedule is fully independent. |

---

## 10. Success Metrics

| Category | Metric | Target |
|---|---|---|
| Engagement | % of customers logging in within 30 days of loan issue | ≥ 60% |
| Performance | LCP on customer portal | < 2.5 seconds |
| Business | Time to onboard + issue loan (trained admin) | < 3 minutes |
| Accuracy | Weekly instalment calculation error rate (spot audit, first 50 loans) | 0% |
| Reliability | Uptime during business hours | ≥ 99.5% |
| Adoption | Admin weekly payout view opened ≥ once per week | Within 30 days of launch |

---

## 11. Open Questions & Assumptions

### All Previously Open Questions — Resolved

| Question | Decision |
|---|---|
| Loan amount floor | SBD 500 minimum |
| Interest tiers | Stepped per Revolving Fund table — not interpolated |
| Repayment cadence | Weekly — 48 instalments over 12 months |
| Processing fee treatment | Added to total payable |
| Interest method | Simple flat interest on principal |
| Penalty basis | 5% of current outstanding loan balance at the moment of the penalty event — uniform rule for all trigger types |
| Penalty compounding | Per-event — each missed week independent |
| Concurrent loans | Allowed with auto-penalty on overdue loan |
| Account creation | Admin only |
| CSV export | Match on-screen columns exactly |
| Collateral | Recorded as equal to Loan Repayment total |

### Remaining Assumptions (flag before build if incorrect)

| Assumption | Risk if Wrong |
|---|---|
| **Weekly due dates are the same day of the week as the loan start date** (e.g. if a loan starts on a Tuesday, all 48 instalments fall on Tuesdays) | Date generation logic changes; schedule display may need a day-of-week selector |
| **The 30% processing fee is non-refundable** on early settlement | Early settlement logic required if refundable |
| **For principal amounts between defined tier bands** (e.g. SBD 1,500), the floor band rate applies (5%) | A different interpolation rule would change all mid-band calculations |
| **Outstanding balance starts at `loanRepayment`** and decrements as weekly payments are recorded | If balance tracks principal-only, penalty and display logic differs |
