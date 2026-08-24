import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import { ApplicationPreview } from "@/components/ApplicationPreview";

export default function Home() {
  return (
    <main className="min-h-dvh bg-paper">
      <TopBar />
      <section className="hero-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-20 lg:py-20">
          <div className="flow-content">
            <p className="hero-kicker"><span className="h-2 w-2 rounded-full bg-marigold" aria-hidden />A clearer learner&rsquo;s licence service</p>
            <h1 className="mt-5 max-w-[11ch] font-display text-[43px] font-bold leading-[1.01] tracking-[-0.06em] text-white sm:text-[58px] lg:text-[66px]">Your application should not leave you guessing.</h1>
            <p className="mt-6 max-w-[37rem] text-[16px] leading-[1.65] text-white/70 sm:text-[18px]">A guided service for your learner&rsquo;s licence. Check documents before payment, see clear status at every step, and keep one reference for your RTO visit.</p>
            <div className="mt-8 grid gap-3 sm:flex">
              <Link href="/login" className="btn-hero">Start my application <span aria-hidden>→</span></Link>
              <Link href="/status/LL-2026-4471209" className="btn-hero-secondary">View sample status</Link>
            </div>
            <p className="mt-6 text-[12px] text-white/45">Demo only · No Aadhaar, SMS, payment or government system is used</p>
          </div>
          <div className="flow-content mx-auto w-full max-w-[405px] lg:justify-self-end"><ApplicationPreview /></div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="grid gap-px overflow-hidden rounded-[18px] border border-line bg-line sm:grid-cols-3">
          {[
            ["01", "Know before you begin", "See the documents, fee and steps first — not after you fill a form."],
            ["02", "Fix issues early", "Get a document check before you reach payment or the RTO visit."],
            ["03", "Track every update", "Your reference number makes every status clear and traceable."],
          ].map(([number, title, detail]) => <article key={number} className="bg-white p-5 sm:p-6"><p className="font-mono text-[11px] font-bold text-trust">{number}</p><h2 className="mt-5 text-[17px] font-bold tracking-[-0.02em] text-ink">{title}</h2><p className="mt-2 text-[13.5px] leading-relaxed text-ink/60">{detail}</p></article>)}
        </div>
      </section>
      <section className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 border-t border-line px-5 py-10 sm:px-8 lg:flex-row lg:items-end"><div><p className="section-eyebrow">Built for the citizen, not the portal</p><h2 className="mt-2 max-w-xl font-display text-[29px] font-bold leading-tight tracking-[-0.04em] text-ink">A service that explains itself at every step.</h2></div><Link href="/about-this-build" className="btn-secondary">See how the demo works</Link></section>
    </main>
  );
}
