# Sahaj — video & submission guide

Grounded in the official brief (buildwhatmovesindia.com/brief) and FAQ (buildwhatmovesindia.com/faq),
fetched directly, not paraphrased from secondary blog coverage.

## 1. Original problem → what changed → why (for your "product thinking" narration)

| Reported on the real portal | What Sahaj does instead | Why this way, not just a redesign |
|---|---|---|
| "Photo mandatory, signature optional" — then blocked at submission for a missing signature. | Both marked **Required** upfront; live AI check before the Continue button even unlocks. | Fixes it at the interaction level (system state is visible before you commit), not just by rewording a label. A cosmetic fix would still let you get surprised at the end. |
| Money debited, status stuck on "payment pending" for 9 days, no refund route, no way to retry. | Payment always resolves to one of three named states with a permanent reference ID; a debited-but-unmatched outcome auto-starts a refund and says so in plain language; a pending state auto-resolves instead of hanging. | This is the actual reported harm (money in limbo), not a UI polish issue — fixing it required a real state machine, which is also your strongest evidence for the "end-to-end thinking" judging criterion. |
| Filed a complaint, called the helpline, got told to check the portal; checked the portal, got told to call — reported as a closed loop that resolves nothing. | The Application Advocate reads the *specific* application's real state (documents, payments, flags) and returns a specific answer + next action. | This is the one feature that's a genuine, non-decorative use of an LLM: it reasons over structured JSON state, not a canned FAQ. That's the difference between "OpenAI-powered" as a checkbox and as a real fix. |
| Infinite loading states / "technical problem, try again" with no explanation, one report of 6 hours to submit one application. | Every action resolves within a couple of seconds with a definite, worded outcome. Images are compressed client-side before anything is submitted. | Directly caught in your own testing — the app hit a real `QuotaExceededError` crash. Fixed by compressing uploads before storage instead of masking the symptom. Worth mentioning in the video that you found and fixed this yourself; it's a concrete, honest engineering story. |
| (Brief's own stated requirement, not a specific review) — needs to work for people on mobile, slower connections, limited digital experience. | Mobile-first single column, one step at a time, large tap targets, zero external network dependency in Demo mode, small inline SVG instead of photo assets. | Called out explicitly in the builder brief's "what we want you to build" section — treated as a hard constraint, not a nice-to-have. |

## 2. Judging criteria → where it's proven (brief's own six criteria)

- **Problem** — real, sourced from Trustpilot/consumer-complaint boards for sarathi.parivahan.gov.in, not invented. Say this on camera; don't assume the judges checked your sources.
- **Working build** — the full journey runs start to finish with zero required setup (Demo mode). FAQ: *"Every feature you demo must work... show it working; do not rely on an explanation."* Do not narrate over anything you don't click.
- **Usability** — mandatory-fields-upfront, plain-language status, large tap targets.
- **Product thinking** — the Application Advocate and the three-outcome payment ledger are deliberate answers to specific complaints, not generic AI garnish.
- **End-to-end thinking** — `/about-this-build` states the architecture trade-off (client-owned state, stateless serverless functions) and what a production version would need (real DB, real bank webhooks, human-review fallback for the AI checks). Show this screen; don't just say "we thought about scale."
- **Honesty** — same page lists exactly what's real vs. simulated. FAQ explicitly scores this; say 2–3 of the mocked items out loud in the video rather than assuming judges will click through to the page.

## 3. The Codex requirement — do not skip this

FAQ, verbatim in substance: *"Is Codex mandatory? Yes... Codex should be meaningfully involved in
the build... your submission should explain how Codex contributed."* This is about the **build
process**, not a product feature. Before recording minute two:

1. Run the Codex handoff prompt in the project's `README.md` against the two `app/api/ai/*` routes.
2. Keep the resulting diff/commit — you will show it on screen.
3. In the video, name the specific thing Codex did ("Codex added retry-with-backoff and hardened
   our prompts on the two AI routes") — not a vague "we used AI tools to help."

## 4. Video structure (hard limit: 2:00, per FAQ)

**Minute 1 — citizen demo. Screen recording, narrated. No face required.**

Use the phone in portrait if you can screen-record it directly (reinforces "this is a mobile
product" without saying it). Use the **Fill with test data** and **Use a sample document**
buttons throughout — this is exactly why they're built in, so you never fumble a file picker on
camera.

0:00–0:07 *(face, see §5)* — state the problem in one sentence, first person.
0:07–0:20 — landing page → login → point out the on-screen demo OTP banner (proves it's honestly mocked).
0:20–0:35 — eligibility → details → documents, using the test-data/sample buttons; show the AI check passing.
0:35–0:50 — payment step: pick **"Debited but not matched"** from the demo controls, show the refund message appear. This is your single highest-value 15 seconds — it's the most specific, most-repeated real complaint, fixed on screen.
0:50–1:00 — jump to the seeded flagged application (`/status/LL-2026-4471209`), tap **"Ask what's going on,"** show the Advocate's specific answer, re-upload the signature, watch it resolve.

**Minute 2 — how you built it and why. Mix of face and screen.**

1:00–1:08 *(face)* — name the stack in one breath (Next.js, TypeScript, Tailwind) and the specific Codex contribution, by name.
1:08–1:35 *(screen)* — show the Codex diff/commit, then scroll `/about-this-build`'s real-vs-mocked list.
1:35–1:55 *(face)* — one sentence on the stateless/client-owned-state trade-off and what production would add (real DB, real bank webhooks, human review on top of the AI checks).
1:55–2:00 *(face)* — close: names, and say plainly that this is an independent hackathon prototype, not affiliated with the government. FAQ requires this disclosure; say it out loud, don't rely on the on-screen badge alone.

If you're a team of two, FAQ confirms both may present — a natural split is one of you carrying
minute 1 (citizen voice) and the other carrying minute 2 (technical voice).

## 5. On-camera guidance — where to show your face, vibe, expression

**Show your face:** opening 5–7 seconds, and the technical explanation beats in minute two
(1:00–1:08, 1:35–2:00). These are the moments where a judge is evaluating *you*, not the product —
credibility and ownership read better face-to-camera than as a voiceover.

**Don't show your face:** during the actual demo (0:07–1:00 of minute one, and the code/diff shot
in minute two). A talking head over a demo competes for attention with the thing you're supposed
to be proving works — cut to full-screen capture instead.

**Setup:** plain, tidy background; soft front-facing light (a window facing you, not behind you);
camera at eye level, not looking down a phone propped on a desk. Look at the lens, not your own
preview window.

**Vibe:** calm, competent, quietly confident — closer to an engineer walking a colleague through a
fix than a pitch-deck hype reel. Your panel includes engineers, investors, *and* government
officials (FAQ: officials "may be invited"). That mix rewards measured and constructive over
dramatic or sarcastic.

**Specifically avoid:** mocking or ridiculing the existing government site, even though the
reviews you sourced from are themselves angry — the brief's own framing is "start a constructive
conversation," not "own the government." State the problem factually ("citizens report X"), not
as a punchline. Also avoid startup-hype phrasing ("this will revolutionize..."); a technical panel
reads that as inexperience, not ambition.

**Pace and expression:** natural pace, not rushed (rushed reads as anxious) and not slow (reads as
unrehearsed). A brief natural smile at the open and close is fine and humanizing; keep a neutral,
attentive expression during the problem statement — you're describing something that wastes
people's time, not something funny.

**Audio matters more than you'd think:** a lav mic or wired earbuds' mic will out-perform a
laptop's built-in mic by a wide margin, and audio clarity reads as production value faster than
video resolution does. Record 2–3 takes of the face segments; you'll only need the best one.

**Captions:** add on-screen text for the specific proof points as they happen — the ₹350 reference
number, the refund message, the reference ID — so a judge skimming without sound still catches
the evidence.

## 6. Before you record — checklist

- [ ] Deployed to a live public URL that opens with no login (Vercel — see main README.md).
- [ ] Tested that exact URL on a phone over mobile data, not just Wi-Fi.
- [ ] Ran the Codex handoff and kept the diff/commit to show on screen.
- [ ] Confirmed every feature you plan to show on camera actually works live — FAQ is explicit that unproven features shouldn't be narrated over.
- [ ] Practiced the demo path once end-to-end with a stopwatch; trim, don't rush, if you're over 2:00.
- [ ] Project summary written, under 250 words, naming the real problem and citing that it's sourced from public reviews (don't claim it's your own anecdote if it isn't).
- [ ] Both teammates' registered emails cross-entered in the submission form, if you're a team of two.
