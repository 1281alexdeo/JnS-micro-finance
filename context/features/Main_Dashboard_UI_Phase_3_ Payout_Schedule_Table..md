# Main Dashboard UI - Phase 3: Payout Schedule Table

## Overview
This is Phase 3 of 4 for the Main Dashboard UI feature. This phase involves implementing the core interactive component of the dashboard: the Payout Schedule table. This table displays the weekly or monthly expected collections and includes filtering, search, and specific visual indicators for loan statuses and penalties.

## Requirements
The primary requirement is the implementation of the "Payout Schedule" section, complete with its title and descriptive subtext. This section requires several interactive controls: a toggle to switch between "Weekly" and "Monthly" views, a filter tab group for "All", "Overdue", and "Upcoming" statuses (including counts), and a search input field for customer names or loan references.

The data table itself must be built using TanStack Table v8, strictly adhering to the project's styling guidelines. It must display penalty information dynamically beneath the amount due for relevant rows. To ensure usability on smaller screens, the table must scroll horizontally on mobile devices.

## UI Components

### Section Header and Controls
The section header features the title "Payout Schedule" and the subtext "Instalments due in the current period". A segmented control allows the user to toggle between "Weekly" and "Monthly" views.

Below the header, the controls row contains the filter tabs and the search input. The filter tabs ("All", "Overdue", and "Upcoming") must display the count for each category. The active tab must have a distinct visual state, such as teal text and a background tint. The search input is a standard text field with a search icon and the placeholder "Search customer or ref".

### Data Table
The data table is the central element of this section. The header row uses a `--color-surface-muted` background with 12px uppercase labels. Standard rows have a height of 48px, a 1px bottom border, and change background color on hover.

| Column | Alignment | Formatting / Styling |
| :--- | :--- | :--- |
| **CUSTOMER** | Left | Standard text. |
| **LOAN REF** | Left | Monospace font (`mono` token) with a light gray background. |
| **WK** | Left | Number indicating the instalment week. |
| **DUE DATE** | Left | Date string. |
| **AMOUNT DUE** | Right | Monospace font, formatted as `SBD X,XXX.XX`. If a penalty exists, "+ penalty SBD XX.XX" is displayed in red text directly below. |
| **STATUS** | Right | Status badge. |

### Status Badges
Status badges provide quick visual identification of the instalment's state.

| Status | Text Color | Background Color |
| :--- | :--- | :--- |
| **UPCOMING** | Yellow (`--color-warning`) | Light Yellow (`--color-warning-bg`) |
| **OVERDUE** | Red (`--color-destructive`) | Light Red (`--color-destructive-bg`) |
| **PAID** | Green (`--color-success`) | Light Green (`--color-success-bg`) |

### Table Footer
The table footer displays summary information regarding the current view. It shows the total number of instalments expected in the period and the total expected amount, which is right-aligned.

## Data Models
This phase utilizes the `weeklyPayouts` array from the `DashboardData` interface:

```typescript
weeklyPayouts: {
  id: string;
  customerName: string;
  loanReference: string;
  weeklyAmount: number;
  dueDate: string;
  status: 'UPCOMING' | 'PAID' | 'OVERDUE';
  penaltyAmount?: number; // Inferred from requirements
}[]
```

## API Endpoints
Data should be fetched and passed to the client component. The search and filtering logic should ideally be handled via URL parameters using the `nuqs` library. This approach maintains state across reloads and aligns with the project's coding standards.

## Validation Rules
The total expected amount displayed in the table footer must accurately reflect the sum of the currently filtered rows. Additionally, the counts displayed within the filter tabs must update dynamically based on the current data set.

## Edge Cases
If a search query or filter selection yields no results, the table must display a clear empty state message, such as "No instalments found for this period." To prevent the table layout from breaking, excessively long customer names must be truncated with an ellipsis.

## Screenshot References
- `01-dashboard-main.png`: Shows the complete Payout Schedule table.
- `10-dashboard-filter-overdue.png`: Shows the table filtered by the "Overdue" status.
- `13-payouts-weekly.png`: Detailed view of the weekly layout.
- `14-payouts-monthly.png`: Detailed view of the monthly layout.
