# Coding Standards: LoanTrack Microfinance System

This document outlines the coding standards, architectural patterns, and best practices for the LoanTrack Microfinance System project. It synthesizes general modern web development guidelines with specific requirements for this application.

## 1. Architecture and Tech Stack

LoanTrack is built on a modern, server-centric architecture using Next.js (App Router) as the primary framework. The application is written in TypeScript with strict mode enabled to ensure type safety across the codebase. Data persistence is handled by a Supabase PostgreSQL database, accessed via the Prisma ORM. Authentication is managed through Supabase Auth. For styling, the project employs a hybrid approach utilizing Tailwind CSS v4, Shadcn UI, Radix UI, and Stylus for CSS Modules. State management relies on Zustand for global state and `nuqs` for URL search parameters, while Zod is used for robust schema validation.

## 2. TypeScript Guidelines

TypeScript strict mode must be enabled and enforced throughout the project. The use of `any` is strictly prohibited; developers must use proper typing or `unknown` when the type is not immediately clear. Interfaces should be defined for all component props, API responses, and data models to maintain a clear contract between different parts of the application. While type inference should be relied upon where it is obvious, explicit types should be used when they improve readability or prevent errors. Naming conventions require PascalCase for Types and Interfaces without any prefixes (e.g., `Loan`, not `ILoan` or `TLoan`).

## 3. React Best Practices

The project strictly uses functional components defined with the `function` keyword; class components are not allowed. Hooks must be used for state and side effects, strictly following the Rules of Hooks (calling them only at the top level and only from React functions). Reusable component logic should be extracted into custom hooks. Performance optimization is crucial, so `React.memo()`, `useCallback`, and `useMemo` should be used judiciously, particularly for expensive computations or when passing functions as props. Inline function definitions in the render method must be avoided to prevent unnecessary re-renders. 

Developers should prefer composition over inheritance, utilizing the `children` prop and render props pattern for flexible, reusable components. Code splitting should be implemented using `React.lazy()` and `Suspense`, wrapping client components in `Suspense` with a fallback. Refs should be used sparingly and primarily for direct DOM access. Controlled components are preferred over uncontrolled components, especially for forms. Error boundaries must be implemented to catch and handle errors gracefully, and cleanup functions must always be used in `useEffect` to prevent memory leaks.

## 4. Next.js and Server Actions

React Server Components (RSC) should be used by default. The `'use client'` directive must be limited and only used when absolutely necessary for interactivity, hooks, or browser APIs; it should be avoided for data fetching or state management. Server Actions are the standard for form submissions and simple mutations. API routes should only be used when necessary, such as for webhooks, file uploads with progress tracking, long-running operations, specific HTTP status codes/headers, or third-party integrations. Otherwise, data should be fetched directly in server components. The project follows Next.js documentation for data fetching, rendering, and routing, with server components fetching directly using Prisma and client components using Server Actions. Dynamic routes should be used for item or collection pages (e.g., `/customers/[id]`).

## 5. Styling: Tailwind v4 and Stylus

The project uses a hybrid styling approach, balancing utility classes with component-specific styles.

**Tailwind CSS v4 (CRITICAL):** We are using Tailwind CSS v4, which relies on CSS-based configuration. **DO NOT** create `tailwind.config.ts` or `tailwind.config.js` files. All theme configuration must be done using the `@theme` directive in `src/app/globals.css`. CSS custom properties should be used for colors, spacing, etc. No JavaScript-based configuration is allowed. Tailwind should be used for rapid development, consistent spacing/sizing, common utilities, and layout.

**Stylus (CSS Modules):** Stylus is used as CSS Modules for complex, component-specific styles. A `.module.styl` file should be created next to each component that requires custom styling (e.g., `Button.js` and `Button.module.styl`). CamelCase must be used for class names within Stylus files. Developers should leverage Stylus features like variables (for colors, fonts), mixins, and the parent selector (`&`) for nesting and pseudo-classes, while keeping specificity low by avoiding deep nesting. A consistent naming convention (e.g., BEM) should be implemented within Stylus modules. The `@apply` directive must **never** be used.

Stylus modules should be imported into React components (`import styles from './ComponentName.module.styl'`) and classes applied using the `styles` object. Shadcn UI and Radix UI provide the component foundations. Responsive design must be implemented using a mobile-first approach. The UI should be professional, structured, with deliberate whitespace and zero decoration, prioritizing trust and precision. The application should be designed for dark mode first, with light mode as an option.

## 6. Database and ORM

Prisma is the ORM for all database operations. Schema changes must always use `prisma migrate dev`; `db push` is not allowed. Before committing, `prisma migrate status` must be run to verify migrations are in sync. Production deployments must run `prisma migrate deploy` before the application starts. Financial figures (principal, processing fee, interest, total repayment, weekly installment) must be calculated once at creation and stored as `Decimal`. These values must not be recalculated on read.

## 7. State Management and URL State

Zustand is used for global state management, while `nuqs` manages state in URL search parameters (e.g., for filtering and pagination on the customer directory). Local state should be lifted up when needed to share between components, or context should be used for intermediate state sharing to avoid excessive prop drilling.

## 8. Forms, Validation, and Error Handling

Zod is the standard for schema validation (both client-side and server-side), and all inputs must be validated. Error handling and edge cases should be prioritized at the beginning of functions. Early returns (guard clauses) must be used for error conditions to avoid deeply nested `if` statements, placing the happy path last in the function. Server Actions should return a structured response pattern: `{ success, data, error }`, with expected errors modeled as return values. `try/catch` blocks must be used in Server Actions. User-friendly error messages should be displayed via toast notifications, and proper error logging must be implemented.

## 9. JavaScript Standard.js Rules

JavaScript and TypeScript code should be concise and technical, following Standard.js rules. Functional and declarative programming patterns should be used, avoiding classes. Iteration and modularization are preferred over code duplication. Descriptive variable names with auxiliary verbs (e.g., `isLoading`, `hasError`) are required. Code should use 2 space indentation, single quotes for strings (except to avoid escaping), and no semicolons (unless required to disambiguate statements). Unused variables are not allowed. Strict equality (`===`) must always be used instead of loose equality (`==`). CamelCase is required for variables and functions, while PascalCase is used for React components.

## 10. File Organization and Naming Conventions

The project follows specific naming conventions and file organization structures.

| Type | Path / Naming Convention | Example |
| :--- | :--- | :--- |
| **Components** | `src/components/[feature]/ComponentName.tsx` (PascalCase, favor named exports) | `ItemCard.tsx` |
| **Pages** | `src/app/[route]/page.tsx` | `page.tsx` |
| **Server Actions** | `src/actions/[feature].ts` | `customerActions.ts` |
| **Types** | `src/types/[feature].ts` | `loanTypes.ts` |
| **Lib/Utils** | `src/lib/[utility].ts` | `formatCurrency.ts` |
| **Directories** | Lowercase with dashes | `components/auth-wizard` |
| **Files** | Match component name or use kebab-case | `auth-wizard.tsx` |
| **Constants** | SCREAMING_SNAKE_CASE | `MAX_LOAN_AMOUNT` |

## 11. Security and Accessibility

User inputs must be sanitized to prevent XSS attacks. The `dangerouslySetInnerHTML` property should be used sparingly and only with sanitized content. For accessibility (a11y), semantic HTML elements must be used, proper ARIA attributes implemented, and robust keyboard navigation support ensured.

## 12. Code Quality and Testing

Clean code is essential; commented-out code is not allowed unless explicitly specified, and unused imports or variables must be removed. Functions should be kept under 50 lines when possible. Unit tests for components should be written using Jest and React Testing Library. Integration tests are required for critical user flows, such as loan creation and penalty application. Snapshot testing should be used judiciously. Performance optimization includes optimizing Web Vitals (LCP, CLS, FID), images (WebP format, size data, lazy loading), and implementing route-based code splitting. Global styles should be minimized, and PurgeCSS should be used with Tailwind in production.
