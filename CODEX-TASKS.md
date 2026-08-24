# Codex task: interaction & input-ergonomics pass

Goal: the judges evaluate this by using it as a citizen, not by reading the spec — so every point
of friction in actually operating the app with your thumbs matters more than anything visual.
This pass is scoped to input ergonomics and interaction polish. See `AGENTS.md` for what not to
touch.

## 1. Autofocus the first input on screen entry

Screens whose primary interaction is a text field should focus that field on mount, so the
citizen can start typing immediately with no initial tap:
- `app/login/page.tsx` — the mobile-number field on load; the OTP field the moment the OTP step
  appears.
- `app/apply/details/page.tsx` — the full-name field on load.

Do not autofocus screens whose primary interaction is a button/select (`apply/eligibility`,
`apply/payment/[id]`, `apply/slot/[id]`) — there's nothing to type into on load, and stealing
focus onto a button provides no benefit.

## 2. OTP input: 6 auto-advancing boxes instead of one text field

Replace the single 6-digit input in `app/login/page.tsx` with 6 individual single-character
boxes. Behavior:
- Typing a digit moves focus to the next box automatically.
- Backspace on an empty box moves focus to the previous box and clears it.
- Pasting a 6-digit string fills all 6 boxes at once (handle the paste event on any box).
- When the 6th digit is entered, auto-run the existing verify logic — but keep a visible
  "Verify & continue" button too, both for users who don't trigger auto-submit and for
  accessibility (screen reader users shouldn't depend on an implicit action).

This is the standard pattern in essentially every Indian consumer app with OTP login (UPI apps,
banking apps); matching it reads as trustworthy through familiarity.

## 3. Replace the date-of-birth `<input type="date">` with Day / Month / Year selects

Location: `app/apply/eligibility/page.tsx`. Do **not** touch the slot-booking date picker in
`app/apply/slot/[id]/page.tsx` — that's picking a near-term appointment date, where a calendar
widget is the right tool. A birth date requires jumping back 16–100 years, which is exactly what
calendar/wheel pickers are bad at — that's the actual complaint being fixed here.

Implementation:
- Three native `<select>` elements: Day, Month, Year.
- **Year options: only list `(currentYear - 100)` through `(currentYear - 16)`, inclusive, ordered
  most-recent-first.** This is a validation-by-construction fix, not validation-by-rejection: a
  `<select>` cannot receive freeform text, so a nonsense value (an unreasonably old year, a
  malformed year, anything outside a real human lifespan) is never a reachable state — there's no
  code path left for it to occur, regardless of what the person tries to type or paste. Ordering
  most-recent-first also means the common 16–25 applicant age range needs the least scrolling.
- **Day options depend on the selected Month/Year** — populate 1 through the actual number of
  days in that specific month/year (accounting for leap years), so a nonexistent date like
  30 February is never selectable in the first place, rather than being caught after the fact.
- Combine the three selections into an ISO date string and feed it into the existing `ageOn()`
  function unchanged. Keep the "must be at least 16" check at submit time as a defense-in-depth
  safety net even though the Year range already makes under-16 birth years unreachable through
  the normal path — this covers clock skew and future edits to the range.

## 4. Enter-to-submit, without auto-advancing between unrelated fields

Audit `app/login/page.tsx` and `app/apply/details/page.tsx`: pressing Enter on the last field
should submit/continue, matching a click on the primary button. **Do not** auto-advance focus
between the Full Name → Guardian's Name → Address → Blood Group fields the way OTP digits
auto-advance in Task 2 — those are distinct, separately-considered pieces of information, and
auto-yanking focus between them would feel like the form is rushing the person. Auto-advance is
for the OTP digit chain only; autofocus is for the first field of a fresh screen only.

## 5. Camera capture affordance on document upload

In `components/DocumentUploader.tsx`, add the HTML `capture` attribute to the file input:
`capture="user"` for the photo upload (opens the front/selfie camera directly — it's an ID-style
photo) and `capture="environment"` for the signature upload (opens the rear camera — it's
photographing a physical signed paper). On supporting mobile browsers this skips the generic
file-picker sheet and jumps straight to the camera. Desktop browsers simply ignore `capture` and
fall back to the existing file picker — verify this fallback still works.

## 6. Tactile/motion polish

- Add a pressed-state to `.btn-primary` / `.btn-secondary` in `app/globals.css` (e.g.
  `active:scale-[0.98]` with a short transition) so taps feel acknowledged.
- Add a short fade/slide-in on mount for the apply-flow step content (a plain CSS animation on
  the section wrapper is enough — don't add an animation library for this).
- On success states (OTP verified, a document check passing, payment confirmed, slot booked),
  reuse the existing `Stamp` component's "done" state for a brief confirming animation rather
  than inventing a new visual language.
- Optional, Android/Chrome only: `navigator.vibrate(10)` on primary CTA taps, behind a feature
  check (`if ('vibrate' in navigator)`) so it's a silent no-op on iOS Safari and desktop.

## Acceptance check before you call this done

- `npm run build` passes with zero TypeScript errors.
- Walk the full citizen journey on a 375px-wide viewport using only a thumb: login → eligibility
  → details → documents → payment → slot → confirmation → status. At no point should you need an
  initial tap into a text field before typing, and picking a birth year from decades back should
  take a few taps, not a long scroll.
- `/about-this-build` still accurately describes what's real vs. mocked — update it if any of the
  above changes what that page currently claims.
