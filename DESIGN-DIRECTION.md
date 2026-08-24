# Codex task: visual direction — trusted utility, not marketing site

Run this as a **separate session from CODEX-TASKS.md**, after that one's diff is reviewed and
merged. Interaction ergonomics and visual direction are different kinds of change with different
risk levels — ergonomics fixes are close to objectively correct, visual direction is subjective
and deserves its own isolated diff so a bad call here doesn't block the ergonomics fixes.

## The problem with the current direction

The app currently reads as a startup landing page: a hero illustration, persuasive headline
copy ("...isn't an answer"), marketing-style "why we're better" cards. That register is wrong for
this product. Judges use this by playing a citizen applying for a licence, not by watching a
pitch — so the whole product should read like a tool you'd trust with your ID documents, closer
to a banking or UPI app than a SaaS homepage.

## Concrete changes

1. **Landing page copy**: replace persuasive framing with orienting framing. Say what the product
   does and what to do next, not why it's good. Cut it down — a returning/task-focused user should
   be able to find "Start your application" without reading marketing copy first.
2. **One illustration maximum.** Keep `HeroMark` or replace it with something simpler; don't add
   more decorative visuals anywhere else in the app.
3. **Reduce vertical whitespace/padding** in card sections roughly 20–30% versus current — utility
   apps in this category (banking, government, KYC) run denser than marketing sites. Do not
   shrink tap targets below 44px to achieve this; the density comes from spacing and copy length,
   never from control size.
4. **Keep the existing palette** (`ink`/`trust`/`marigold`/`go`/`stop` in `tailwind.config.ts`).
   Refine for polish if you want, but do not move toward a darker or moodier palette — the brief
   asks for "bright and trustworthy," and that constraint stands.
5. **Trust signals appropriate to this category**: visible reference numbers/IDs and timestamps on
   every state change (partially done already — extend the pattern everywhere an application's
   state changes). Keep the independent-prototype disclosure, but consider making it read as a
   plainly-stated fact rather than a badge shouting for attention — real trustworthy fintech/gov
   tools state disclaimers plainly, they don't decorate them.
6. **Motion stays subordinate to task completion**: motion should confirm that an action
   succeeded (see CODEX-TASKS.md #6), not add delight for its own sake. No confetti, no
   gamification, no progress badges — wrong register for a government-service tool.

## Explicitly do not

- Do not introduce a dark or moody palette.
- Do not add stock photography or additional illustrations.
- Do not add gamification (badges, streaks, celebratory animations beyond a brief success state).

## Acceptance check

- Ask someone unfamiliar with the project to look at it for 10 seconds and describe what kind of
  product it is. Target answer: "a banking or government app," not "a startup's homepage."
- `npm run build` passes with zero TypeScript errors.
- `/about-this-build` still accurately reflects anything you changed.
