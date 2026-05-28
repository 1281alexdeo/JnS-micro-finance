# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**LoanTrack** is a microfinance loan management system built with Next.js 16, React 19, and TypeScript. The system allows administrators to manage loans, customers, and repayments, while providing customers with a self-service portal to view their payment schedules. The project uses a stepped interest rate model, weekly repayment schedules (48 installments over 12 months), and a penalty system for late payments.

## Context
Read the following to get the full context of the project
-@context/project_overview.md - Product requirements, features, and business rules
-@context/coding_standards.md - Architecture patterns, TypeScript guidelines, and best practices
-@context/ai_interactions.md - Development workflow and AI collaboration guidelines
-@context/current_feature.md - Current feature being developed

## Screenshots
Read this folder to refference screenshots for the UI of the application we're building.
-@context/screenshots

## Development Commands

### Core Commands
- `npm run dev` - Start the development server (runs on http://localhost:3000)
- `npm run build` - Build the production application
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check for code issues

### Database Commands (when implemented)
- `npx prisma migrate dev` - Create and run new database migrations
- `npx prisma migrate deploy` - Apply migrations in production
- `npx prisma studio` - Open Prisma Studio for database browsing

### Testing
No test configuration is currently set up. When adding tests, consider:
- Jest for unit tests (common with React)
- React Testing Library for component tests
- Playwright for E2E testing

## Architecture

### Tech Stack
- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Database**: Supabase (PostgreSQL) with Prisma ORM
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS v4 + Stylus CSS Modules
- **State Management**: Zustand (global) + nuqs (URL state)
- **Forms**: React Hook Form + Zod validation
- **Tables**: TanStack Table v8
- **Components**: Radix UI + shadcn/ui

### File Structure
- `src/app/` - App Router directory
  - `layout.tsx` - Root layout with font configuration and metadata
  - `page.tsx` - Home page component
  - `globals.css` - Global CSS with Tailwind imports and theme configuration
  - `favicon.ico` - Site favicon
- `src/components/` - Reusable components
  - Organized by feature (e.g., `components/auth`, `components/loans`)
- `src/actions/` - Server Actions for form submissions and mutations
- `src/types/` - TypeScript type definitions
- `src/lib/` - Utility functions and helpers

### Configuration
- **TypeScript**: Strict mode enabled with path aliases (`@/*` maps to `src/*`)
- **Tailwind CSS**: Using v4 with PostCSS and CSS-based configuration
- **ESLint**: Next.js recommended config with core web vitals rules
- **Next.js**: App Router with standard configuration

### Styling Approach
- **Tailwind CSS v4**: Used for utilities, layout, and rapid development
  - Configuration done via `@theme` directive in `globals.css`
  - No JavaScript-based config files
- **Stylus CSS Modules**: Component-specific styles
  - `.module.styl` files alongside components
  - CamelCase class names, no `@apply` directive
- **Design System**: Professional financial UI with deliberate whitespace
  - Color tokens in CSS custom properties
  - Dark mode first, light mode as option
  - Customizable accent colors and density settings

## Development Workflow

### 10-Step Development Process
1. **Document** - Update `@context/current_feature.md` with feature requirements
2. **Branch** - Create `feature/[name]` or `fix/[name]` branch
3. **Implement** - Write code following project standards
4. **Test** - Verify in browser, run `npm run build`
5. **Iterate** - Refine based on testing
6. **Commit** - Get permission before committing, use conventional commits
7. **Merge** - Merge to main branch
8. **Delete Branch** - Clean up feature branch
9. **Review** - Code audit for security, performance, and logic
10. **Complete** - Update feature status in `@context/current_feature.md`

### Key Constraints
- No AI auto-commits without explicit permission
- Build must pass before committing
- No "nice to have" features outside PRD scope
- Follow existing patterns, don't refactor unless asked

## Financial Model

### Core Calculations
- **Interest Rates**: Stepped tiers (SBD 500-1000: 10%, 1000+: 5%)
- **Processing Fee**: 30% of principal
- **Weekly Installments**: Loan Repayment ÷ 48 (Week 48 absorbs rounding)
- **Penalties**: 5% of current outstanding balance per missed week
- **Collateral**: Equal to Loan Repayment total

### Data Models
- User (ADMIN/CUSTOMER roles)
- Customer (with reference code)
- Loan (principal, interest, schedule)
- Installment (48 weekly records)
- Penalty (per late payment event)
- Transaction (audit log)

## Development Notes

- Use React Server Components by default
- Server Actions for mutations, API routes only for specific cases
- Zod validation for all inputs
- Early returns for error conditions, happy path last
- Financial values calculated once at creation, stored as Decimal
- Minimal re-renders with `React.memo`, `useCallback`, `useMemo`
- Component specificity: BEM-like with Stylus modules
- CSS classes: left-aligned text, right-aligned currency (monospace)

## Prompt Shortcuts
- whenever I input "clear @context/current_feature.md" :I want you to clear information under headings Curent Feature, Goals, and Notes, while while preserving the history section and comments for the other section.
