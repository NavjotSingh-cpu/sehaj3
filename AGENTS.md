# Agent instructions for this repo

Sahaj is a Next.js 16 (App Router, TypeScript) hackathon prototype for "Build What Moves India."
It reimagines the Learner's Licence journey on Parivahan/Sarathi.

## Conventions to preserve

- Tailwind CSS with the design tokens in `tailwind.config.ts` (colors: `ink`, `paper`, `trust`,
  `marigold`, `go`, `stop`). Do not introduce new colors outside this palette without a stated
  reason.
- Client state lives in `lib/store.ts` (Zustand + a quota-safe localStorage adapter). Do not
  persist raw/uncompressed image data — see `lib/image.ts`'s `compressImage` and use it for any
  new image-handling code.
- `app/api/ai/*` routes must keep working with zero configuration: when `OPENAI_API_KEY` is
  unset, they fall back to a deterministic "simulated" response so the citizen journey never
  breaks. Any change to these routes must preserve that fallback behavior and the existing
  response shape (`{ mode, ... }`).
- `/about-this-build` is the submission's honesty disclosure page. If you change what's real vs.
  mocked anywhere in the app, update this page to match — it must stay accurate.
- Mobile-first. Test any new UI at a 375px viewport before a desktop one.
- **This is a citizen utility tool, not a marketing site.** Judges evaluate it by using it
  themselves as a citizen, not by watching a pitch. Every screen should read as "what do I do
  right now," not as persuasion copy. When in doubt, favor the pattern a banking/UPI app would
  use over the pattern a SaaS landing page would use.

## Commands

- `npm run dev` — local dev server
- `npm run build` — production build; must pass with zero TypeScript errors before you consider a
  task done
