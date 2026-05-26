# J&S Micro Finance — UI Reference Screenshots

These screenshots are paired references for rebuilding the dashboard manually in VS Code. Every image is captured at **2× device pixel ratio** so it stays crisp when zoomed in for inspection. Desktop captures use a 1440×900 viewport (the comfortable default for the admin product), tablet uses 900×1100, and mobile uses 390×844.

## Index

| # | File | What it shows |
|---|---|---|
| 01 | `01-dashboard-main.png` | Full dashboard — sidebar, KPI strip, payout table, recent activity, portfolio panel |
| 02 | `02-dashboard-kpi-strip.png` | The five-metric hairline-divided KPI strip in isolation |
| 03 | `03-dashboard-recent-activity.png` | The Recent Activity panel cropped from the right column |
| 04 | `04-modal-new-customer-empty.png` | New Customer modal — initial empty state |
| 05 | `05-modal-new-customer-filled.png` | New Customer modal — fully filled with sample data |
| 06 | `06-modal-new-loan-default.png` | New Loan modal — default principal / 7% tier |
| 07 | `07-modal-new-loan-1500-tier.png` | New Loan modal at SBD 1,500 — shows the 5% interest tier kick-in |
| 08 | `08-modal-new-loan-3000-tier.png` | New Loan modal at SBD 3,000 — upper-band schedule preview |
| 09 | `09-drawer-loan-detail.png` | Right-side Loan detail drawer — summary, schedule preview, action buttons |
| 10 | `10-dashboard-filter-overdue.png` | Payout table with the "Overdue" filter chip active |
| 11 | `11-customers-page.png` | Customers directory page |
| 12 | `12-loans-page.png` | Loans page |
| 13 | `13-payouts-weekly.png` | Payouts page — weekly view |
| 14 | `14-payouts-monthly.png` | Payouts page — monthly view |
| 15 | `15-dashboard-sidebar-collapsed.png` | Dashboard with the sidebar collapsed to its icon-rail state |
| 16 | `16-dashboard-tablet.png` | Tablet breakpoint (900 px wide) |
| 17 | `17-dashboard-mobile.png` | Mobile breakpoint (390 px wide) — hamburger header |
| 18 | `18-dashboard-mobile-sidebar.png` | Mobile drawer-style sidebar opened |

## How to use them in VS Code

1. Drop the entire folder into your project at `docs/ui-reference/` (or anywhere outside `client/public/`).
2. Open the file you're rebuilding (e.g. `client/src/pages/Dashboard.tsx`) and use **View → Editor Layout → Split Right**.
3. Open the matching screenshot in the right pane — VS Code renders PNGs natively. You now have the reference and the code side by side.
4. Optional: install the **Image preview** extension to get inline thumbnails when you hover over an image filename inside Markdown comments.
