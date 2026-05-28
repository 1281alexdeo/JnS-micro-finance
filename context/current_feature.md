# Current Feature

<!-- Feature name and short description -->
Customer Management UI - Phase 2: Customer Detail View

## Status
In Progress

## Goals
- [x] Create page header with back navigation, customer name, status badge, reference code, and action buttons (Edit, New Loan)
- [x] Implement Profile Information card with responsive grid layout
- [x] Add Customer KPI strip showing active loans, total outstanding, and total paid
- [x] Build Loan History table with loan reference, amount, term, start date, and status columns
- [x] Make layout fully responsive (3 columns desktop, 2 columns tablet, 1 column mobile)
- [x] Disable "New Loan" button when customer status is OVERDUE
- [x] Handle empty states for customers with no loan history
- [x] Display placeholder text for optional fields (Email, National ID, Address)
- [x] Implement `/customers/[id]` route with dynamic customer ID parameter
- [x] Fetch customer data and associated loans server-side

## Notes
This is Phase 2 of 3 for the Customer Management Module. This phase focuses on building the individual customer profile view at the `/customers/[id]` route. The implementation must maintain pixel-perfect standards established in Phase 1, utilizing the layout patterns from the dashboard and data structures from `mock-data.ts`.

## Design Requirements
- Header area with back navigation, customer name, status badge, and reference code
- Profile Information card with responsive grid layout
- Customer KPI strip showing relevant metrics
- Loan History table with consistent styling from dashboard
- Fully responsive layout that stacks on mobile devices

## Technical Requirements
- Create dynamic route `/customers/[id]` with Next.js App Router
- Implement server-side data fetching using customer ID from URL parameters
- Calculate customer-specific KPIs (active loans, total outstanding, total paid)
- Display associated loans in a table with TanStack Table v8
- Handle empty states for customers with no loan history
- Implement proper disabled states for "New Loan" button when customer is overdue
- Use consistent styling from dashboard components
- Ensure responsive grid layouts for all sections
- Optional fields should display placeholders when null

## History
<!-- Keep this updated. Earliest to latest-->
- 2026-05-27: Completed Main Dashboard UI - Phase 4: Recent Activity & Portfolio Summary with interactive cards and responsive layout
- 2026-05-27: Started Main Dashboard UI - Phase 4: Recent Activity & Portfolio Summary
- 2026-05-27: Completed Main Dashboard UI - Phase 3: Payout Schedule Table with interactive table, filtering, search, and status badges
- 2026-05-27: Started Main Dashboard UI - Phase 3: Payout Schedule Table
- 2026-05-27: Completed Main Dashboard UI - Phase 2: KPI Strip & Action Buttons with responsive layout, action buttons, and formatted KPI metrics
- 2026-05-27: Completed Main Dashboard UI - Phase 1: Layout & Core Structure with responsive sidebar, header, and main content area
- 2026-05-22: Initial Next.js project setup with TypeScript, Tailwind CSS v4, ESLint configuration, and basic project structure