# Current Feature

<!-- Feature name and short description -->
## Main Dashboard UI - Phase 1: Layout & Core Structure

## Status
In Progress

## Goals
- Setup responsive dashboard layout at `/dashboard` route
- Implement global application shell with sidebar navigation and top header
- Establish responsive behavior for Desktop (≥1024px), Tablet (768–1023px), and Mobile (<768px) breakpoints
- Integrate dark mode color system using CSS custom properties
- Create placeholder sections for KPI Strip, Payout Schedule, Recent Activity, and Portfolio overview

## Notes
- Must use Next.js (App Router), Tailwind CSS v4, and Shadcn UI components
- Default to React Server Components with minimal client-side JavaScript
- Sidebar must be 240px on desktop, collapse to 56px rail on tablet
- Mobile sidebar must be drawer-style that pushes content, not covers
- Main content area max-width: 1280px with 32px horizontal padding

## History
<!-- Keep this updated. Earliest to latest-->
- 2026-05-27: Started Main Dashboard UI - Phase 1: Layout & Core Structure