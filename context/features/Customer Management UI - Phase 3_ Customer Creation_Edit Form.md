# Customer Management UI - Phase 3: Customer Creation/Edit Form

## Overview
This is Phase 3 of 3 for the Customer Management Module. This phase focuses on the implementation of the "Add Customer" modal, which is used to create new customer records. The same form structure will be reused for editing existing customers. The implementation must match the provided modal screenshots exactly, ensuring proper form validation, state management, and pixel-perfect UI rendering.

## Requirements
The requirement is to build a modal overlay that contains a form for customer data entry. The modal must appear centered on the screen with a dark, semi-transparent backdrop.

The form must include fields for First Name, Last Name, Phone, Email, National ID, and Address. It must clearly distinguish between required and optional fields visually. The form must handle user input state, display focus states correctly, and provide "Cancel" and "Add Customer" (or "Save Changes" for edit mode) actions in the footer.

## UI Components & Design Specs

### Modal Overlay and Container
The modal acts as an interruption to the main workflow, requiring the user to complete the form or cancel.

| Component | Property | Value | Visual Specification |
| :--- | :--- | :--- | :--- |
| **Backdrop** | Styling | Background: `rgba(0,0,0,0.4)` (Black, 40% opacity) | Fixed position, covers entire viewport. |
| **Modal Container** | Width | ~600px | Centered vertically and horizontally. |
| **Modal Container** | Styling | Background: `#FFFFFF`, Radius: 8px | |
| **Modal Shadow** | Box Shadow | `0 20px 25px -5px rgba(0, 0, 0, 0.1)` | Creates depth above the backdrop. |

### Modal Header
The header provides the title and a close action.

| Component | Property | Value | Visual Specification |
| :--- | :--- | :--- | :--- |
| **Header Area** | Padding | 24px 24px 16px 24px | Border Bottom: 1px solid `#E5E5E5`. |
| **Header Layout** | Layout | Flex, `space-between`, align-items center | |
| **Title Group** | Layout | Flex, gap 12px, align-items center | |
| **Modal Title** | Typography | `h2` token (18px, weight 600, Sora) | "Add Customer" |
| **Reference Badge** | Styling | Monospace, 12px, Background: `#F5F5F5` | E.g., "MF-00075". |
| **Close Button** | Styling | 24x24px, Color: `#666666` | 'X' icon in top right. |

### Form Body
The form body contains the input fields arranged in a grid.

| Component | Property | Value | Visual Specification |
| :--- | :--- | :--- | :--- |
| **Body Area** | Padding | 24px | |
| **Helper Text** | Typography | 13px, weight 400, Color: `#666666` | "Reference code is auto-generated. New customers start with status No Loan." Margin-bottom: 24px. |
| **Form Grid** | Layout | Grid | 2 columns. Gap: 16px horizontal, 20px vertical. |
| **Field Label** | Typography | 12px, weight 500, uppercase | Color: `#666666`. Margin-bottom: 8px. |
| **Required Asterisk**| Styling | Color: `#C41E3A` (Red) | Placed immediately after the label text. |
| **Input Field (Base)**| Styling | Height: 40px, Border: 1px solid `#D0D0D0`, Radius: 6px | Padding: 0 12px. Font: 14px, weight 400. |
| **Input (Focus)** | Styling | Border: 1px solid `#1B7B6B`, Box Shadow: `0 0 0 1px #1B7B6B` | Teal focus ring. |
| **Placeholder Text** | Typography | Color: `#A0A0A0` | |

### Form Fields Specification
1. **FIRST NAME**: Required. Standard text input.
2. **LAST NAME**: Required. Standard text input.
3. **PHONE**: Required. Standard text input. Placeholder: `+677 7000 000`.
4. **EMAIL**: Optional. Standard text input. Placeholder: `optional`.
5. **NATIONAL ID**: Optional. Standard text input. Placeholder: `SB-0000-00`.
6. **ADDRESS**: Optional. Standard text input. Placeholder: `Town, Province`.

### Modal Footer
The footer contains the form actions.

| Component | Property | Value | Visual Specification |
| :--- | :--- | :--- | :--- |
| **Footer Area** | Padding | 16px 24px | Border Top: 1px solid `#E5E5E5`. |
| **Footer Layout** | Layout | Flex, `justify-content flex-end`, gap 12px | |
| **Cancel Button** | Styling | Secondary | Background: `#FFFFFF`, Border: 1px solid `#D0D0D0`, Text: 14px weight 500. |
| **Submit Button** | Styling | Primary | Background: `#1B7B6B` (Teal), Text: 14px weight 500 (White). "Add Customer". |

## Data Models
The form handles the creation or mutation of a `Customer` object.

```typescript
// Form Submission Payload
interface CustomerFormData {
  firstName: string; // Required
  lastName: string;  // Required
  phone: string;     // Required
  email?: string;    // Optional
  nationalId?: string; // Optional
  address?: string;  // Optional
}
```

## API Endpoints
Form submission should trigger a Server Action (`createCustomer` or `updateCustomer`). The action must handle server-side validation and return appropriate error states if the submission fails. Upon success, the modal should close, and the customer list should be revalidated to show the new data.

## Validation Rules
Client-side validation must be implemented using a library like Zod combined with React Hook Form. 
- **First/Last Name**: Must not be empty. Minimum 2 characters.
- **Phone**: Must not be empty. Should validate against standard phone number formats (specifically accommodating the +677 Solomon Islands prefix if possible).
- **Email**: If provided, must be a valid email format.
- **National ID**: If provided, should ideally match the expected format (e.g., `SB-XXXX-XX`).

## Edge Cases
If the user attempts to close the modal (via the 'X' button, 'Cancel' button, or clicking the backdrop) while there is unsaved data in the form, a confirmation prompt should appear to prevent accidental data loss. During form submission, the "Add Customer" button must enter a loading state (e.g., displaying a spinner and becoming disabled) to prevent duplicate submissions.

## Screenshot References
- @context/screenshots
- `04-modal-new-customer-empty.png`: Shows the modal structure and empty state placeholders.
- `05-modal-new-customer-filled.png`: Shows the modal with data entered and the focus state on the Address field.
