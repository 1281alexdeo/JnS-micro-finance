# AI Interaction Guidelines: LoanTrack Microfinance System

This document establishes the guidelines and workflows for interacting with AI coding assistants during the development of the LoanTrack Microfinance System. These rules ensure consistency, code quality, and alignment with the project's specific requirements.

## 1. General Communication Principles

Interactions with AI should be concise and direct. When the AI makes non-obvious architectural or implementation decisions, it must explain them briefly. For large refactors or architectural changes, the AI must ask for explicit permission before proceeding. The AI is strictly prohibited from adding features that are not explicitly defined in the project specification (PRD), nor should it add "nice to have" features. Furthermore, the AI must never delete files without prior clarification and permission.

## 2. Standard Development Workflow

Every feature, fix, or task must follow a strict 10-step workflow to ensure traceability and quality control.

| Step | Action | Description |
| :--- | :--- | :--- |
| **1. Document** | Update Context | Document the upcoming feature or fix in `@context/current-feature.md`. |
| **2. Branch** | Create Branch | Create a new branch for the specific feature or fix (e.g., `feature/[feature-name]` or `fix/[fix-name]`). |
| **3. Implement** | Write Code | Implement the feature or fix exactly as defined in `@context/current-feature.md`. |
| **4. Test** | Verify & Build | Verify the implementation works in the browser. Run `npm run build` and resolve any errors. Unit testing can be implemented subsequently. |
| **5. Iterate** | Refine | Iterate and change things if needed based on testing and review. |
| **6. Commit** | Version Control | Commit the changes **only** after the build passes and everything functions correctly. |
| **7. Merge** | Integrate | Merge the branch into the `main` branch. |
| **8. Delete Branch** | Cleanup | Ask to delete the feature/fix branch once it has been successfully merged. |
| **9. Review** | Code Audit | Review AI-generated code periodically and on demand (see Code Review section). |
| **10. Complete** | Update Context | Mark the task as completed in `@context/current-feature.md` and add it to the history. |

**Critical Rule:** The AI must **not** commit code without explicit permission, and absolutely no commits should be made until the build passes successfully. If a build fails, the issues must be fixed first.

## 3. Branching and Commits

A new branch must be created for every feature or fix, following the naming convention `feature/[feature]` or `fix/[fix]`. The AI should ask to delete the branch once it is merged. 

When committing code, the AI must ask before committing and should never auto-commit. Commit messages must follow conventional commit standards (e.g., `feat:`, `fix:`, `chore:`). Commits should be kept focused, containing only one feature or fix per commit. The phrase "Generated With Claude" (or similar AI attribution) must never be included in the commit messages.

## 4. Problem Resolution (When Stuck)

If the AI encounters an issue and the implementation isn't working after 2-3 attempts, it must stop and explain the issue to the user. The AI should not keep trying random fixes. If the requirements are unclear at any point, the AI must ask for clarification before proceeding.

## 5. Code Modification Constraints

When making code changes, the AI should make the minimal changes necessary to accomplish the task. It should not refactor unrelated code unless explicitly asked to do so. Existing patterns in the codebase must be preserved to maintain consistency.

## 6. Code Review Focus Areas

AI-generated code must be reviewed periodically, with special attention paid to several critical areas.

Security is paramount; code must be checked for proper authentication checks (e.g., Supabase Auth role enforcement) and rigorous input validation (using Zod). Performance must be audited to prevent unnecessary re-renders in React components and to avoid N+1 query problems in Prisma database interactions. Logic errors, particularly edge cases related to financial calculations (like the penalty compounding logic in LoanTrack), must be thoroughly verified. Finally, the code must be reviewed to ensure it matches the existing patterns and architectural decisions of the codebase.
