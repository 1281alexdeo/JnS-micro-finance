# Main Dashboard UI - Phase 2: KPI Strip & Action Buttons

## Overview
This is Phase 2 of 4 for the Main Dashboard UI feature. Building upon the layout established in Phase 1, this phase introduces the primary action buttons and the KPI Strip, which displays critical real-time metrics. The design emphasizes clarity, structured data presentation, and strict adherence to the project's typography and spacing guidelines.

## Requirements
This phase requires the implementation of the page title and timestamp at the top of the main content area. The primary and secondary action buttons must be created and aligned to the top right. 

The core requirement is the development of the KPI Strip, which consists of five distinct metric cards. This strip must be fully responsive, displaying as 4 columns on desktop, 2 columns on tablet, and 1 column on mobile viewports. The data for these KPIs must be fetched and displayed using the `DashboardData.kpis` mock data structure.

## UI Components

### Page Header Area
The page header area introduces the context and primary actions for the dashboard. The title "Dashboard" utilizes the `h1` typography token, while the timestamp ("Updated X minutes ago") uses the `caption` token. 

Three action buttons are positioned in this area. All buttons must have a height of 36px and a border radius of 6px.

| Button | Type | Styling |
| :--- | :--- | :--- |
| **Export Week** | Secondary | White background, 1px `--color-border-strong` border, hover state `--color-surface-muted`. |
| **New Customer** | Secondary | White background, 1px `--color-border-strong` border, hover state `--color-surface-muted`. |
| **New Loan** | Primary | Teal background (`--color-accent`), white text, hover state (`--color-accent-hover`). |

### KPI Strip
The KPI Strip acts as a container for five metric cards. The container is styled with a white background (`--color-surface`), a 1px border (`--color-border`), and an 8px border radius.

Each individual card follows a strict structure. The label is uppercase, 12px, weight 500, using `--color-text-secondary`. The main value utilizes the large `display` token (36px, weight 700). Currency values must be formatted as `SBD X,XXX.XX` and use `font-variant-numeric: tabular-nums` for proper alignment. Contextual subtext is placed below the value using the `caption` token.

| KPI Card | Value | Subtext |
| :--- | :--- | :--- |
| **ACTIVE LOANS** | Count of active loans | Total loans in book |
| **OUTSTANDING BALANCE** | Total outstanding balance | Customer count context |
| **THIS WEEK'S COLLECTIONS**| Expected collections (current week) | Date range |
| **THIS MONTH'S COLLECTIONS**| Expected collections (current month) | Month and year |
| **OVERDUE** | Count of overdue loans | "needs follow-up" |

## Data Models
This phase relies on the `kpis` object within the `DashboardData` interface from `mock-data.ts`:

```typescript
kpis: {
  totalActiveLoans: number;
  totalOutstandingBalance: number;
  thisWeeksExpectedCollections: number;
  thisMonthsExpectedCollections: number;
  overdueCount: number;
}
```

## API Endpoints
The data should be fetched using a Next.js Server Action or directly within a Server Component. For this development phase, the `mockData.kpis` object will be used to populate the components.

## Validation Rules
The visual state of the "OVERDUE" card requires dynamic validation. If the overdue count is greater than 0, the text color must change to `--color-destructive` (red). All currency values must be validated to ensure they are formatted correctly with commas for thousands and exactly two decimal places.

## Edge Cases
If a KPI value is 0, it must display "0" or "0.00" appropriately, rather than rendering an empty string. Specifically for the "OVERDUE" card, the text color must revert to the standard text color if the count reaches 0. The layout must also be robust enough to accommodate very large numbers (e.g., millions) without breaking the card layout or causing text overlap.

## Screenshot References
- `01-dashboard-main.png`: Shows the KPI strip in context.
- `02-dashboard-kpi-strip.png`: Detailed view of the KPI cards and their typography.
- `16-dashboard-tablet.png`: Shows the 2-column stacking behavior on tablet screens.
- `17-dashboard-mobile.png`: Shows the 1-column stacking behavior on mobile screens.
