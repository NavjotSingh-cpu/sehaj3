# UX Contract

## Product context

- Audience: citizens applying for a Learner’s Licence on a phone.
- Primary jobs: login with demo OTP, establish eligibility, submit details/documents, understand payment state, book a slot, and track a reference.
- Accessibility target: WCAG 2.2 AA.

## Canonical UI Map

| Capability | Canonical owner | Allowed variant |
|---|---|---|
| Select/Listbox | Native `<select>` in application forms | Device-owned menu |
| Date | Day/month/year native selects | Valid dates only |
| Form | Page-owned controlled forms with shared `field-input` styles | Login and application steps |
| Scrollbar | Global browser default | None |
| Feedback | `SuccessFeedback`, inline error text, `inline-progress` | Success, error, pending |
| Application status | `Stamp` and status timeline | Done, current, waiting, flagged |

## Flow ledger

| Operation | Pending | Success | Failure recovery |
|---|---|---|---|
| OTP verification | Six input boxes remain visible | Animated confirmation then dashboard | Inline code mismatch message |
| Document check | Inline progress indicator | Check result and guidance | Keep selected file, offer retry |
| Payment simulation | Button disabled and inline progress | Permanent status/reference shown | Clear unmatched-payment/refund path |
| Slot booking | Confirmation state shown | Application confirmation page | Selection remains available |

## Responsive and accessibility behavior

- Phone-first single-column forms; action controls remain at least 48px tall.
- The step rail simplifies to a text label below 640px.
- Native labels, visible focus rings, live status messages, and reduced-motion CSS are mandatory.
- Sticky bottom actions include page bottom spacing and must not obscure focus.
