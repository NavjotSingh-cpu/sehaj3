# Sahaj — a clearer Learner's Licence journey

An independent hackathon prototype for **Build What Moves India**, rethinking the Learner's
Licence flow on Parivahan/Sarathi. Not affiliated with the Government of India, MoRTH, or any RTO.

Real complaints this addresses (sourced from Trustpilot and consumer-complaint boards for
sarathi.parivahan.gov.in, not invented): money debited with payment stuck "pending" for days
with no way to retry or get a refund; documents rejected for reasons never stated upfront
("signature is optional" until it silently isn't); a helpline that just reads the same on-screen
status back to the caller. See `/about-this-build` in the running app for the full real-vs-mocked
disclosure.

## Stack

Next.js 16 (App Router, TypeScript) · Tailwind CSS · Zustand (client-owned state, no DB — see
`/about-this-build` for why) · OpenAI API (GPT-4o-mini) for document pre-check and the
"Application Advocate" status explainer, with a deterministic simulated fallback so the full
journey works even with zero API keys configured.

## Run it locally

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open http://localhost:3000. Everything works immediately in **Demo mode** — no API key needed.
To turn on real GPT-4o-mini calls for the document check and Application Advocate:

```bash
cp .env.example .env.local
# edit .env.local and set OPENAI_API_KEY=sk-...
npm run dev
```

## Deploy to get your live public link (Vercel, free tier)

The hackathon requires a live public browser link that opens with no login. Fastest path:

```bash
npm install -g vercel
vercel login
vercel          # first deploy — accept the defaults
vercel --prod   # promote to your production URL
```

Then, in the Vercel dashboard for this project → Settings → Environment Variables, add
`OPENAI_API_KEY` (optional) and redeploy so it takes effect.

Alternative (recommended if you want commit history that shows Codex's contribution — see
below): push this folder to a new GitHub repo, then import it at vercel.com/new. Every push to
`main` auto-deploys.

## Important — the hackathon requires Codex to be meaningfully involved

Confirmed from the official FAQ (buildwhatmovesindia.com/faq): *"Is Codex mandatory? Yes...
Codex should be meaningfully involved in the build... your submission should explain how Codex
contributed."* This scaffold was architected and written in a Claude session. To make your Codex
involvement real (not just claimed), have Codex genuinely extend or refactor a scoped, real part
of the app before you submit — the two AI routes are a good, honest fit because they're small,
self-contained, and Codex's changes will be visible in your git diff.

Suggested handoff prompt for Codex (CLI or in your IDE), run from the project root:

> This is a Next.js 16 App Router project. Open `app/api/ai/check-document/route.ts` and
> `app/api/ai/explain-status/route.ts`. Both call GPT-4o-mini with a simulated fallback when
> `OPENAI_API_KEY` is unset. Improve the real (non-simulated) path: tighten the system prompts
> using few-shot examples from `lib/mock.ts`'s seed data, add input validation on the request
> body, and add a retry with exponential backoff (max 2 retries) if the OpenAI call fails before
> falling back to simulated mode. Keep the response shape identical so the frontend doesn't
> need to change. Explain each change you make.

Keep whatever Codex produces (even if you cherry-pick parts) — that diff is what you point to
in minute two of your demo video ("Codex built the retry/backoff logic and hardened our OpenAI
prompts, here's the commit").

## What's mocked

See `/about-this-build` inside the running app — it's written to double as your submission's
required "what's real vs. mocked" disclosure. Don't delete or rewrite it out of the final
submission; the brief scores honesty explicitly.

## Demo script (for your 2-minute video)

1. Land on `/` — 5 seconds on the reported-complaint vs. fix cards.
2. `/login` — show the on-screen demo OTP banner, log in.
3. `/apply/eligibility` → `/apply/details` → `/apply/documents` — upload any photo/signature,
   show the live AI check passing.
4. `/apply/payment/[id]` — use the Demo controls panel, pick "Debited but not matched," show the
   automatic refund message (this is the single most direct fix to the most common real complaint).
5. `/apply/slot/[id]` → confirmation.
6. Open `/status/LL-2026-4471209` (seeded demo application) — click "Ask what's going on" to show
   the Application Advocate giving a specific answer instead of a canned one, then re-upload the
   signature to show the loop closing.
7. Second minute: explain the stack, the stateless-by-design architecture, and the Codex diff.
