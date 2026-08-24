import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import { HeroMark } from "@/components/illustrations/HeroMark";

const ROWS = [
  {
    q: "Amount deducted, status still says pending, no way to retry or get a refund.",
    fix: "Every payment gets a permanent reference number and an honest status — including automatic refunds when a debit isn't matched.",
  },
  {
    q: "Told the signature was optional, then blocked at submission for missing it.",
    fix: "Every required document is listed upfront, with a live check before you can submit.",
  },
  {
    q: "Called the helpline, they just read out what the portal already says.",
    fix: "An Application Advocate reads your specific record and tells you exactly what's needed — not a script.",
  },
];

export default function Home() {
  return (
    <main className="min-h-dvh">
      <TopBar />

      <section className="mx-auto max-w-6xl px-4 pb-10 pt-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-10 lg:pb-16 lg:pt-16">
        <div>
          <p className="mb-3 font-mono text-[13px] font-semibold uppercase tracking-wider text-trust">
            Learner&rsquo;s Licence, reimagined
          </p>
          <h1 className="font-display text-[34px] font-bold leading-[1.15] text-ink sm:text-[42px] lg:text-[50px]">
            &ldquo;Application under process&rdquo; isn&rsquo;t an answer.
          </h1>
          <p className="mt-4 max-w-md text-[16px] leading-relaxed text-ink/70 lg:text-[17px]">
            On the real Parivahan portal, citizens report money deducted with no confirmation,
            documents rejected with no reason given, and a helpline that reads the same screen
            back to them. Sahaj is a working prototype of what the same journey looks like when
            every step tells you the truth.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:max-w-md">
            <Link href="/login" className="btn-primary w-full sm:flex-1">
              Start your application
            </Link>
            <Link href="/status/LL-2026-4471209" className="btn-secondary w-full sm:flex-1">
              See a live status example
            </Link>
          </div>
        </div>

        <HeroMark className="mx-auto mt-10 hidden w-full max-w-md sm:block lg:mt-0" />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 lg:py-12">
        <h2 className="mb-1 text-[13px] font-semibold uppercase tracking-wide text-ink/50">
          What citizens actually reported
        </h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {ROWS.map((row) => (
            <div key={row.q} className="card p-4">
              <p className="text-[14.5px] leading-snug text-ink/60">
                <span className="font-semibold text-stop">Reported: </span>
                {row.q}
              </p>
              <p className="mt-2 text-[14.5px] leading-snug text-ink">
                <span className="font-semibold text-go">In Sahaj: </span>
                {row.fix}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="card mx-auto flex max-w-2xl items-start gap-3 p-4">
          <span aria-hidden className="text-lg">
            ⚠
          </span>
          <p className="text-[13px] leading-relaxed text-ink/60">
            This is an independent hackathon prototype built for &ldquo;Build What Moves India.&rdquo; It is
            not affiliated with, endorsed by, or connected to the Government of India, MoRTH, or Parivahan
            Sewa. All data on this site is fictional.{" "}
            <Link href="/about-this-build" className="font-medium text-trust underline">
              Read what&rsquo;s real vs. simulated →
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
