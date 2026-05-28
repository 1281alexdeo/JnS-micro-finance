# Customer Management UI - Phase 2: Customer Detail View

## Overview
This is Phase 2 of 3 for the Customer Management Module. This phase focuses on building the individual customer profile view, located at the `/customers/[id]` route. While a specific screenshot for this view was not provided, this specification is derived from the project's established design DNA, utilizing the layout patterns from the dashboard and the data structures from `mock-data.ts`. The implementation must maintain the pixel-perfect standards established in Phase 1.

## Requirements
The Customer Detail View must provide a comprehensive overview of a single customer. It requires a header area with navigation back to the list view, the customer's name, status, and primary actions (Edit, New Loan).

The main content area must be divided into logical sections: a Profile Information card, a KPI summary specific to the customer, and a historical data table showing their associated loans and payment history. The layout must be fully responsive, stacking cleanly on mobile devices.

## UI Components & Design Specs

### Page Header Area
The header provides context and navigation.

| Component | Property | Value | Visual Specification |
| :--- | :--- | :--- | :--- |
| **Back Navigation** | Styling | Text: 14px, weight 500, Color: `#666666` | Left-aligned arrow icon, text "Back to Customers". |
| **Header Layout** | Layout | Flex, `space-between`, align-items flex-end | Title group on left, actions on right. |
| **Title Group** | Layout | Flex, gap 16px, align-items center | |
| **Customer Name** | Typography | `h1` token (24px, weight 600, Sora) | E.g., "Mavis Ngava". |
| **Status Badge** | Styling | Matches list view badges | E.g., OVERDUE (Red text on light red). |
| **Reference Badge** | Styling | Monospace, 13px, light gray background | E.g., "MF-00042". |
| **Header Spacing** | Margin Bottom | 32px | Space below the header area. |
| **Action Buttons Group** | Layout | Flex, gap 12px, right-aligned | |
| **Edit Button** | Styling | Secondary | Background: `#FFFFFF`, Border: 1px solid `#D0D0D0`, Text: 14px weight 500. |
| **New Loan Button** | Styling | Primary | Background: `#1B7B6B` (Teal), Text: 14px weight 500 (White). |

### Profile Information Card
This card displays the customer's static data. It uses the standard card styling established in the dashboard.

| Component | Property | Value | Visual Specification |
| :--- | :--- | :--- | :--- |
| **Card Container** | Styling | Background: `#FFFFFF`, Border: 1px solid `#E5E5E5`, Radius: 8px | |
| **Card Padding** | Padding | 24px | Internal spacing. |
| **Section Title** | Typography | `h2` token (18px, weight 600, Sora) | "Profile Information" |
| **Grid Layout** | Layout | Grid | 3 columns (Desktop), 2 columns (Tablet), 1 column (Mobile). Gap: 24px. |
| **Data Label** | Typography | 12px, weight 500, uppercase | Color: `#888888`. Margin-bottom: 4px. |
| **Data Value** | Typography | 14px, weight 400 | Color: `#000000`. |
| **Monospace Values** | Typography | 14px, monospace | Used for Phone and National ID. |

### Customer KPI Strip
A condensed version of the dashboard KPI strip, showing metrics specific to this customer.

| Component | Property | Value | Visual Specification |
| :--- | :--- | :--- | :--- |
| **Strip Container** | Styling | Background: `#FFFFFF`, Border: 1px solid `#E5E5E5`, Radius: 8px | |
| **Grid Layout** | Layout | Grid | 3 columns (Desktop), 1 column (Mobile). |
| **KPI Card (Individual)**| Padding | 24px | Border-right: 1px solid `#E5E5E5` (except last). |
| **KPI Label** | Typography | 12px, weight 500, uppercase | Color: `#888888`. E.g., "ACTIVE LOANS". |
| **KPI Value** | Typography | 28px, weight 700, Sora | Color: `#000000`. Currency uses tabular-nums. |

### Loan History Table
A data table displaying the customer's loans. Styled identically to the Payout Schedule table from the dashboard.

| Component | Property | Value | Visual Specification |
| :--- | :--- | :--- | :--- |
| **Table Container** | Styling | Background: `#FFFFFF`, Border: 1px solid `#E5E5E5`, Radius: 8px | |
| **Section Title** | Typography | `h2` token (18px, weight 600, Sora) | "Loan History" |
| **Table Header Row** | Styling | Background: `#F5F5F5`, Height: 40px | Padding: 12px 24px. |
| **Columns** | Headers | LOAN REF, AMOUNT, TERM, START DATE, STATUS | |
| **Data Row** | Styling | Height: 48px, Border Bottom: 1px solid `#E5E5E5` | Hover: `#F9F9F9`. |

## Data Models
This view utilizes a single `Customer` object and requires fetching their associated loans (which would be a subset of the `loans` data structure).

```typescript
// Required Data
customer: {
  id: string;
  reference: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  nationalId?: string;
  address?: string;
  status: 'ACTIVE' | 'OVERDUE' | 'COMPLETED' | 'NO_LOAN';
  createdAt: string;
}
// Derived/Associated Data
customerKPIs: {
  activeLoans: number;
  totalOutstanding: number;
  totalPaid: number;
}
customerLoans: Loan[] // Array of associated loans
```

## API Endpoints
Data must be fetched server-side using the customer's `id` from the URL parameter. The query must join or separately fetch the associated loans and calculate the customer-specific KPIs.

## Validation Rules
The "New Loan" button must be disabled if the customer's status is "OVERDUE", preventing the issuance of new credit to delinquent accounts. The UI must clearly indicate this disabled state (e.g., opacity 50%, cursor not-allowed).

## Edge Cases
If the customer has no loan history (status "NO_LOAN"), the Loan History table must display a clear empty state message (e.g., "This customer has no loan history.") rather than rendering an empty table header. Optional fields (Email, National ID, Address) that are null must display a placeholder like "—" or "Not provided" in the Profile Information card to maintain grid structure.

## Design DNA References
- Layout structure derived from `01-dashboard-main.png`.
- Table styling derived from `11-customers-page.png` and `13-payouts-weekly.png`.
- Typography and spacing strictly adhere to the established design system.
