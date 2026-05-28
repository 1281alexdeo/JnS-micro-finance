# Dashboard UI - Implementation Fix Specification

## Overview
This specification details the exact corrections required to align the current dashboard implementation (Screenshot 2) with the approved target design (Screenshot 1). The current implementation deviates significantly in typography, component styling, layout spacing, and color palette. **Most critically, the current implementation is missing the "This Month's Collections" KPI card entirely**, which must be added to the dashboard. This document provides pixel-perfect instructions to resolve all discrepancies.

## Requirements
The primary requirement is to refactor the existing UI components to match the target design exactly. This involves stripping away incorrect shadows, adjusting border radii, correcting typography hierarchy, and fixing component-specific layouts (especially the Payout Schedule table and its controls).

## UI Components & Design Fixes

### 1. Global Layout & Theming
The foundational styling of the application needs adjustment.

| Component | Current State (Incorrect) | Target State (Correct) | Required Fix |
| :--- | :--- | :--- | :--- |
| **App Background** | Light Gray (`#F3F4F6`) | Warm Off-White (`#F7F6F3`) | Update the global background color variable to match the warmer tint of the target design. |
| **Typography** | Standard sans-serif, heavy weights | Sora (Headings), Plus Jakarta Sans (Body) | Ensure the correct font families are loaded and applied. Reduce the font weight on the main "Dashboard" `h1` title. |

### 2. Header & Navigation
The top navigation bar and the main page header require alignment and styling fixes.

| Component | Current State (Incorrect) | Target State (Correct) | Required Fix |
| :--- | :--- | :--- | :--- |
| **Top Right Profile** | Shows moon icon, full day name, "John Admin" | Clean date, Avatar, Name | Remove the moon icon. Format date as "22 May 2026". Align avatar and name to the right. |
| **Page Title Area** | Title is oversized; buttons pushed to far right | Balanced title; buttons vertically centered | Reduce `h1` font size. Ensure the title block and the action buttons block are flex-aligned to the center. |
| **Action Buttons** | Missing icons, incorrect styling | Include icons, proper primary/secondary styles | Add download icon to "Export Week". Add plus icon to "New Customer". Ensure "New Loan" uses the primary teal background (`#1B7B6B`). |
| **Sidebar Active Item** | Missing left border indicator | Solid teal left border | Add a 3px or 4px solid left border (`#1B7B6B`) to the active "Dashboard" navigation item. |
| **Sidebar Footer** | Red "2 Issues" button | User profile block | Replace the red button area with the user profile layout (Avatar, Name, Role, Logout icon) matching the top right style. |

### 3. KPI Strip (Metric Cards)
The KPI strip in the target design contains **five cards**, while the current implementation only displays **four cards**. The missing card is "This Month's Collections" which should display between "This Week's Collections" and "Overdue". Additionally, all cards have incorrect structural styling and typography.

| Component | Current State (Incorrect) | Target State (Correct) | Required Fix |
| :--- | :--- | :--- | :--- |
| **Card Count** | Four cards (ACTIVE LOANS, OUTSTANDING BALANCE, THIS WEEK'S COLLECTIONS, OVERDUE) | Five cards (ACTIVE LOANS, OUTSTANDING BALANCE, THIS WEEK'S COLLECTIONS, THIS MONTH'S COLLECTIONS, OVERDUE) | **Add the missing "This Month's Collections" card** between the "This Week's Collections" and "Overdue" cards. |
| **This Month's Collections Card** | Not present | Label: "THIS MONTH'S COLLECTIONS", Value: "1,927.41", Subtext: "May 2026" | Create a new card with the exact styling and layout matching the other KPI cards. The value should display the month's total collections amount. |
| **Card Container** | Heavy drop shadow, 8px radius, no border | No shadow, 4px radius, 1px border | Remove `box-shadow`. Set `border-radius` to 4px. Add `border: 1px solid #E5E5E5`. |
| **Card Values** | Too small, includes "SBD" prefix in same size | Large, bold, clean numbers | Increase font size for the main numbers (e.g., "10", "11,223.40"). Remove the "SBD" text from the Outstanding Balance card to match the target. |
| **Overdue Value** | Red, but too small | Large, Red (`#C41E3A`) | Ensure the "3" in the Overdue card matches the size of the other KPI values and uses the correct red hex code. |

### 4. Payout Schedule Section
This section contains the most significant deviations from the target design.

| Component | Current State (Incorrect) | Target State (Correct) | Required Fix |
| :--- | :--- | :--- | :--- |
| **Weekly/Monthly Toggle** | Solid teal button next to white button | Segmented control | Refactor into a single segmented control container with a light gray background. The active state ("Weekly") should have a white background and subtle shadow, not solid teal. |
| **Filter Tabs** | Pill-shaped with borders | Clean text with underline | Remove pill borders and backgrounds. Use plain text. The active tab ("All (10)") should have teal text (`#1B7B6B`) and a 2px teal bottom border/underline. |
| **Table Header Row** | White background, bottom border only | Solid gray background block | Apply a background color of `#F5F5F5` to the entire `<thead>` row. Ensure header text is 12px, uppercase, and gray (`#666666`). |
| **Table Columns** | Misaligned | Perfectly aligned | Fix grid/table column widths so CUSTOMER, LOAN REF, WK, DUE DATE, AMOUNT DUE, and STATUS align perfectly with their headers. |
| **Amount Due Cell** | Single line text | Main amount + penalty subtext | Implement a flex-col layout in this cell. Main amount on top. If a penalty exists, display "+ penalty SBD XX.XX" below it in a smaller, red font. |
| **Status Badges** | Plain text ("UPC", "PAID", "OVE") | Colored background badges | Replace text with full badges. OVERDUE: Red text on light red bg. UPCOMING: Orange/Yellow text on light yellow bg. Use full words, not abbreviations. |

### 5. Right Sidebar (Recent Activity & Portfolio)
The structural styling of these cards must match the corrected KPI cards.

| Component | Current State (Incorrect) | Target State (Correct) | Required Fix |
| :--- | :--- | :--- | :--- |
| **Card Containers** | Heavy drop shadow, rounded | No shadow, 1px border | Apply the exact same container fixes as the KPI cards (remove shadow, 4px radius, 1px solid `#E5E5E5` border). |
| **Activity List Items** | Cramped spacing | Breathable spacing | Increase the vertical gap between list items. Ensure clear hierarchy between the main action text and the secondary metadata (PAYMENT/PENALTY and time). |
| **Portfolio Progress Bars** | Thick (~8px) | Thin (~4px) | Reduce the height of the progress bar elements to approximately 4px. |

## Critical Missing Component
The current implementation is **missing the "This Month's Collections" KPI card** entirely. This is a critical omission that must be addressed immediately. The card should be positioned as the fourth card in the KPI strip, displaying:
- **Label**: "THIS MONTH'S COLLECTIONS" (12px, weight 500, uppercase, gray)
- **Value**: "1,927.41" (28px, weight 700, Sora, black)
- **Subtext**: "May 2026" (12px, weight 400, gray)

The card must use the same styling as the other KPI cards (no shadow, 4px radius, 1px border).

## Execution Strategy
1. **Add Missing Card**: First, add the "This Month's Collections" card to the KPI strip layout. Update the grid to accommodate five cards instead of four.
2. **Global Updates**: Fix the CSS variables for the background color and ensure the correct fonts are applied globally.
3. **Component Refactoring**: Update the base "Card" component to remove shadows and add the correct borders, which will instantly fix the KPI strip and right sidebar.
4. **Table Overhaul**: Rebuild the Payout Schedule table headers, tabs, and status badges to match the target design specifications exactly.
