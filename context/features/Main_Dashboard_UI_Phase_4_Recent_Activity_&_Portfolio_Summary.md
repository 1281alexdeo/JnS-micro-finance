# Main Dashboard UI - Phase 4: Recent Activity & Portfolio Summary

## Overview
This is Phase 4 of 4 for the Main Dashboard UI feature. This final phase focuses on implementing the right sidebar components: the Recent Activity feed and the Portfolio at a glance summary. These components provide the administrator with a quick overview of recent actions and the overall health of the loan portfolio.

## Requirements
This phase requires the implementation of two specific cards in the right sidebar. The "Recent Activity" card must display a list of the last 5 portfolio events. The "Portfolio at a glance" card must show progress bars representing Active, Overdue, and Completed loans.

These components must be responsive. They are positioned in the right sidebar on desktop layouts, move below the main content on tablet layouts, and stack vertically on mobile layouts. The provided mock data must be used to populate these components.

## UI Components

### Recent Activity Card
The Recent Activity card is styled with a white background (`--color-surface`), a 1px border (`--color-border`), and an 8px border radius. The header contains the title "Recent Activity", the subtext "Last 5 portfolio events", and a "View all" link aligned to the right.

The activity list items are structured to provide clear information at a glance.

| Element | Description | Styling |
| :--- | :--- | :--- |
| **Indicator** | A small colored dot indicating the event type. | Green (`--color-success`) for payments and new loans. Red (`--color-destructive`) for penalties. |
| **Description** | Text describing the event. | Standard text, with amounts formatted correctly. |
| **Metadata** | The type label (e.g., "PAYMENT") and a relative timestamp (e.g., "Yesterday"). | Styled with the `caption` token. |

Adequate vertical spacing must be maintained between items, without using dividing lines.

### Portfolio at a glance Card
The Portfolio card shares the same base styling as the Recent Activity card. Its header simply contains the title "Portfolio at a glance".

The core of this card consists of three progress bar rows representing the loan statuses: Active, Overdue, and Completed. Each row contains a left-aligned label and a right-aligned fraction (e.g., "7 / 11"). Below the text, a horizontal progress bar visually represents this fraction.

| Status | Progress Bar Color |
| :--- | :--- |
| **Active** | Teal (`--color-accent`) |
| **Overdue** | Red (`--color-destructive`) |
| **Completed** | Gray (`--color-text-disabled`) |

The card footer features a divider line, the label "Total disbursed (book)", and the formatted currency value right-aligned in a monospace font.

## Data Models
This phase uses the `recentActivity` array and `kpis` object from the `DashboardData` interface:

```typescript
recentActivity: {
  id: string;
  type: 'LOAN_CREATED' | 'PAYMENT_RECORDED' | 'PENALTY_APPLIED' | 'CUSTOMER_CREATED';
  description: string;
  amount?: number;
  customerName: string;
  loanReference?: string;
  timestamp: string;
}[]
```

*Note: The Portfolio progress bars will calculate their fractions based on the `kpis` data (e.g., `totalActiveLoans`, `overdueCount`, and a derived or provided total completed count).*

## API Endpoints
Data should be fetched alongside the other dashboard data. The relative timestamps in the Recent Activity feed must be calculated dynamically based on the current time and the event's `timestamp`.

## Validation Rules
The progress bars in the Portfolio card must accurately reflect the mathematical fraction of the total loans. The relative timestamps in the activity feed must update correctly (e.g., automatically switching from a time like "08:42" to "Yesterday" as time passes).

## Edge Cases
If there is no recent activity, the feed must display a placeholder message, such as "No recent activity to display." If a category in the Portfolio card has a value of 0, the corresponding progress bar should be empty (or not rendered), but the row itself must remain visible.

## Screenshot References
- `01-dashboard-main.png`: Shows both cards in the right sidebar context.
- `03-dashboard-recent-activity.png`: Detailed view of the Recent Activity and Portfolio cards.
