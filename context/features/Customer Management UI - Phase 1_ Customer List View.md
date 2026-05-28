# Customer Management UI - Phase 1: Customer List View

## Overview
This is Phase 1 of 3 for the Customer Management Module of the LoanTrack Microfinance System. This phase focuses on building the main directory view for customers, located at the `/customers` route. The implementation must translate the provided design exactly, featuring a robust data table with filtering, search, and pagination, adhering strictly to the project's Tailwind CSS v4 and Shadcn UI standards.

## Requirements
The core requirement is to implement the full-page Customer List View. This includes a header area with a title, total count, and action buttons. Below the header, a control bar must be implemented containing status filter tabs and a search input.

The primary component is a data table displaying customer information. This table must be built using TanStack Table v8, as specified in the coding standards. It needs to present customer names (with email subtext and an avatar), reference codes, phone numbers, active loan counts, status badges, and the date added. The table must be responsive, scrolling horizontally on smaller screens, and include a pagination footer.

## UI Components & Design Specs

### Page Header Area
The header establishes the context and provides primary actions for the customer directory.

| Component | Property | Value | Visual Specification |
| :--- | :--- | :--- | :--- |
| **Page Title** | Typography | `h1` token (24px, weight 600, Sora) | "Customers" |
| **Subtitle** | Typography | `caption` token (12px, weight 400) | Color: `#666666`. "10 total customers in directory". |
| **Header Spacing** | Margin Bottom | 24px | Space below the header area. |
| **Action Buttons Group** | Layout | Flex, gap 12px, right-aligned | |
| **Export Button** | Styling | Secondary | Background: `#FFFFFF`, Border: 1px solid `#D0D0D0`, Text: 14px weight 500, Padding: 0 16px, Height: 36px. Left-aligned download icon. |
| **Add Customer Button**| Styling | Primary | Background: `#1B7B6B` (Teal), Text: 14px weight 500 (White), Padding: 0 16px, Height: 36px. Left-aligned plus icon. |

### Control Bar (Filter & Search)
The control bar sits directly above the table and provides tools to manipulate the data view.

| Component | Property | Value | Visual Specification |
| :--- | :--- | :--- | :--- |
| **Control Container** | Styling | Background: `#FFFFFF`, Border: 1px solid `#E5E5E5`, Radius: 8px (top only) | Connects visually to the table below. |
| **Control Container** | Padding | 16px 24px | Internal spacing. |
| **Control Layout** | Layout | Flex, `space-between`, align-items center | Filters on left, search on right. |
| **Filter Tabs Group** | Layout | Flex, gap 16px | |
| **Active Filter Tab** | Styling | Text: `#1B7B6B` (Teal), Underline: 2px solid `#1B7B6B` | E.g., "All (10)". Font: 14px, weight 500. |
| **Inactive Filter Tab** | Styling | Text: `#888888` (Gray), Underline: None | E.g., "Active (6)". Font: 14px, weight 500. |
| **Search Input** | Styling | Border: 1px solid `#D0D0D0`, Radius: 6px, Height: 36px | Width: ~300px. Left-aligned search icon. |
| **Search Placeholder** | Typography | 14px, weight 400, Color: `#A0A0A0` | "Search by name or reference" |

### Customer Data Table
The table displays the core customer information in a structured, readable format.

| Column / Element | Property | Value | Visual Specification |
| :--- | :--- | :--- | :--- |
| **Table Header Row** | Styling | Background: `#F5F5F5`, Height: 40px | Padding: 12px 24px. |
| **Table Header Text** | Typography | 12px, weight 500, uppercase | Color: `#666666`. |
| **Table Data Row** | Styling | Height: 64px, Border Bottom: 1px solid `#E5E5E5` | Padding: 12px 24px. Hover: `#F9F9F9`. |
| **NAME: Avatar** | Styling | 32x32px circle, Background: `#F0F0F0` | Text: 12px weight 500 (initials). |
| **NAME: Text Block** | Layout | Flex column, gap 2px | |
| **NAME: Full Name** | Typography | 14px, weight 500 | |
| **NAME: Email** | Typography | 12px, weight 400 | Color: `#666666`. Placed below name. |
| **REFERENCE Column** | Typography | 13px, monospace | Background: Light gray tint. E.g., "MF-00042". |
| **PHONE Column** | Typography | 13px, monospace | E.g., "+677 7421 668". |
| **LOANS Column** | Typography | 14px, center-aligned | Count of active loans. |
| **STATUS: ACTIVE** | Styling | Text: `#059669` (Green), Background: `#ECFDF5` | |
| **STATUS: OVERDUE** | Styling | Text: `#C41E3A` (Red), Background: `#FEE2E2` | |
| **STATUS: COMPLETED**| Styling | Text: `#666666` (Gray), Background: `#F0F0F0` | |
| **DATE ADDED Column** | Typography | 14px, right-aligned | E.g., "14 Jan 2026". |

### Pagination Footer
The footer provides navigation for large datasets.

| Component | Property | Value | Visual Specification |
| :--- | :--- | :--- | :--- |
| **Footer Container** | Styling | Background: `#FFFFFF`, Padding: 16px 24px | Border Top: 1px solid `#E5E5E5`. |
| **Footer Layout** | Layout | Flex, `space-between`, align-items center | |
| **Summary Text** | Typography | 14px, weight 400 | "Showing **1-10** of **10**" (numbers bolded). |
| **Pagination Buttons**| Styling | Secondary | Height: 32px. "Previous" and "Next". |

## Data Models
This phase relies on the `customers` array from the `mock-data.ts` file:

```typescript
customers: {
  id: string;
  reference: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  nationalId?: string;
  address?: string;
  status: 'ACTIVE' | 'OVERDUE' | 'COMPLETED' | 'NO_LOAN';
  activeLoansCount: number;
  createdAt: string;
}[]
```

## API Endpoints
Data should be fetched server-side. The filtering (status), search (name/reference), and pagination logic must be handled via URL search parameters using the `nuqs` library, ensuring the view is linkable and state is preserved across reloads.

## Validation Rules
The counts displayed in the filter tabs (e.g., "Active (6)") must dynamically reflect the total number of customers matching that status in the database, regardless of the current pagination state. The pagination summary text ("Showing X-Y of Z") must accurately calculate the current range based on the page size and total records.

## Edge Cases
If a customer does not have an email address, the email subtext in the NAME column should be omitted, and the name should be vertically centered within the cell. If a search yields no results, the table must display a clear empty state message (e.g., "No customers found matching your search.").

## Screenshot References
- `11-customers-page.png`: The complete design for the Customer List View in @context/screenshots
