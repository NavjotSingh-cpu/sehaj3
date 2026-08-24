# Deploy & Codex workflow

Order matters here mainly because of one constraint: Codex cloud (the ChatGPT-hosted agent) only
works against GitHub repos, and Vercel's easiest integration is "import from GitHub, auto-deploy
on every push." Doing GitHub first makes everything after it simpler, and gives you a clean
"before" commit so Codex's later changes show up as an honest, reviewable diff — which is exactly
what you'll point to in the video for the "how did Codex contribute" requirement.

## 1. GitHub first

```bash
cd sahaj
git init
git add -A
git commit -m "Initial scaffold: Next.js app, apply flow, AI routes, Demo mode"
gh repo create sahaj --public --source=. --push
# no GitHub CLI? create an empty repo on github.com instead, then:
# git remote add origin https://github.com/<you>/sahaj.git
# git branch -M main && git push -u origin main
```

## 2. Vercel second

Import the GitHub repo at vercel.com/new (not the CLI) — this wires it so every push to `main`
auto-deploys, which means once Codex's changes are pushed, your live link updates itself with no
manual redeploy step. Add `OPENAI_API_KEY` under Settings → Environment Variables if you want live
AI (optional — Demo mode works without it).

## 3. Codex third — two ways to run it, pick based on your situation

**Codex CLI, on your Mac, in this same folder — recommended, start here.** No extra setup beyond
installing it; it reads `AGENTS.md` automatically for project context.

```bash
curl -fsSL https://chatgpt.com/codex/install.sh | sh
cd sahaj
codex
```

Then paste the contents of `CODEX-TASKS.md` as your first task, review the diff Codex produces
(you can see it live in `npm run dev` since it's editing your actual local files), and once happy:

```bash
git add -A && git commit -m "Codex: interaction and input-ergonomics pass"
git push
```

Repeat with `DESIGN-DIRECTION.md` as a second, separate task/commit. Vercel redeploys
automatically on each push.

**ChatGPT Codex cloud (chatgpt.com/codex), connected to the GitHub repo — use instead if you'd
rather review changes as a GitHub pull request, or you're working from a phone/browser without
your laptop.** Requires a ChatGPT plan with Codex cloud access, connecting your GitHub account
(installs a GitHub App you scope to this repo), and configuring at least one environment before it
can run tasks. It clones the repo into an isolated sandbox, makes the change, and hands you a PR
to review and merge — no local terminal needed, but more setup than the CLI.

Either path produces the same result: a real, reviewable Codex diff on top of the current
baseline, on GitHub, auto-deployed by Vercel.
