import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import { ApplicationPreview } from "@/components/ApplicationPreview";

export default function Home() {
  return (
    <main className="min-h-dvh">
      <TopBar />
      <section className="hero-shell mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,.92fr)] lg:items-center lg:gap-20 lg:py-24">
        <div className="max-w-2xl flow-content">
          <p className="inline-flex items-center gap-2 rounded-full bg-trust-light px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.045em] text-trust"><span className="h-1.5 w-1.5 rounded-full bg-trust" aria-hidden /> Learner&rsquo;s licence, made clear</p>
          <h1 className="mt-6 font-display text-[42px] font-bold leading-[0.99] tracking-[-0.055em] text-ink sm:text-[58px] lg:text-[66px]">A calmer way to get your learner&rsquo;s licence.</h1>
          <p className="mt-6 max-w-xl text-[16px] leading-[1.65] text-ink/65 sm:text-[18px]">Sahaj replaces confusing status screens with a step-by-step journey that tells you what you need, why you need it, and what happens next.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/login" className="btn-primary sm:min-w-52">Start my application <span aria-hidden className="ml-2 text-base">→</span></Link>
            <Link href="/status/LL-2026-4471209" className="btn-secondary sm:min-w-48">View a real example</Link>
          </div>
          <p className="mt-5 text-[12px] text-ink/45">Demo only · No Aadhaar, SMS, payment or government system is used</p>
        </div>
        <div className="flow-content lg:justify-self-end"><ApplicationPreview /></div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-6 border-t border-line/80 px-5 py-8 sm:grid-cols-3 sm:px-8 lg:py-10">
        {[["Clear before you start", "Know the documents, fee and next step before you invest your time."], ["No silent waiting", "Every application gets a real explanation, not a generic status line."], ["Help when it matters", "A guided path for payments, documents and your RTO visit."]].map(([title, detail]) => <div key={title}><p className="text-[15px] font-bold text-ink">{title}</p><p className="mt-2 max-w-xs text-[13.5px] leading-relaxed text-ink/60">{detail}</p></div>)}
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-12 pt-4 sm:px-8 lg:pb-16"><p className="section-eyebrow">Built for a better citizen journey</p><h2 className="mt-2 max-w-xl font-display text-[27px] font-bold tracking-[-0.03em] text-ink sm:text-[34px]">No surprise rejections. No status black hole.</h2><Link href="/about-this-build" className="mt-5 inline-flex text-[14px] font-bold text-trust underline underline-offset-4">How this prototype works →</Link></section>
    </main>
  );
}
