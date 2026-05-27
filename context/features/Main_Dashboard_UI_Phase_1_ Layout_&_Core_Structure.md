# Main Dashboard UI - Phase 1: Layout & Core Structure

## Overview
This is Phase 1 of 4 for the Main Dashboard UI feature of the LoanTrack Microfinance System. This phase focuses on establishing the core layout, navigation structure, and high-level responsive behavior across desktop, tablet, and mobile breakpoints. The implementation must strictly adhere to the project's coding standards, utilizing Next.js (App Router), Tailwind CSS v4, and Shadcn UI components.

## Requirements
The initial development phase requires the setup of the main dashboard layout at the `/dashboard` route. This involves implementing the global application shell, which includes the responsive sidebar navigation and the top header. The layout must be fully responsive across three specific breakpoints: Desktop (≥1024px), Tablet (768–1023px), and Mobile (<768px). 

The application must default to dark mode as specified in the project overview. The color system must be integrated using CSS custom properties within `globals.css`, strictly avoiding any JavaScript-based Tailwind configuration. Furthermore, the architecture must default to React Server Components, restricting the `'use client'` directive only to necessary interactive elements.

## UI Components

### Application Shell
The application shell consists of three primary areas: the Header, the Sidebar Navigation, and the Main Content Area.

| Component | Description | Responsive Behavior |
| :--- | :--- | :--- |
| **Header (Top Bar)** | A 56px high top bar. The left side contains the Logo and Business Name (J&S Micro Finance - Solomon Islands). The right side displays the current date and User profile indicator. | On mobile, the Logo and Business Name are hidden and replaced by a hamburger menu. |
| **Sidebar Navigation** | The primary navigation menu containing links to Dashboard, Customers, Loans, Payouts, and Settings. The active link features a teal left border. The footer contains the user name, role badge, and logout option. | **Desktop:** Fixed 240px width. **Tablet:** Collapses to a 56px icon rail. **Mobile:** Transforms into a hidden drawer accessible via the hamburger menu. When expanded, it must push the main content, not cover it. |
| **Main Content Area** | The central area for page content, featuring a fluid width with a maximum of 1280px, 32px horizontal padding, and a background color of `--color-bg` (#F7F6F3). | Adjusts fluidly based on the viewport and the state of the sidebar. |

### Placeholder Sections
During this phase, structural placeholders must be created for the KPI Strip, Payout Schedule, Recent Activity, and Portfolio overview. These sections will be fully implemented in subsequent phases. Basic `<h2>` tags should be used to temporarily identify these sections within the layout.

## Data Models
No specific data models from `mock-data.ts` are required for this phase, as it focuses purely on layout and navigation structure. The user profile information (name, initials, role) will eventually be populated from the `User` interface.

## API Endpoints
No specific API endpoints are required for this phase. The layout is static and structural.

## Validation Rules
The layout must be validated to ensure it breaks correctly at the specified pixel widths of 1024px and 768px. Additionally, the sidebar state (expanded, collapsed, drawer) must toggle correctly based on the viewport size, ensuring the main content is never obscured.

## Edge Cases
If the user's name or initials are unavailable, the header must gracefully handle the missing data by displaying a generic avatar or fallback text. Furthermore, the layout must remain functional and visually appealing on very large screens (e.g., ultra-wide monitors) by strictly adhering to the 1280px max-width constraint.

## Screenshot References
- `01-dashboard-main.png`: Full desktop view showing the complete layout structure.
- `15-dashboard-sidebar-collapsed.png`: Tablet view showing the collapsed 56px sidebar rail.
- `16-dashboard-tablet.png`: Tablet responsive layout.
- `17-dashboard-mobile.png`: Mobile responsive layout with the hamburger menu.
- `18-dashboard-mobile-sidebar.png`: Mobile drawer navigation.
