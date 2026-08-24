import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import { ApplicationPreview } from "@/components/ApplicationPreview";

export default function Home() {
  return (
    <main className="min-h-dvh">
      <TopBar />
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-7 sm:px-6 sm:py-12 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-center lg:gap-16 lg:py-16">
        <div className="max-w-2xl">
          <p className="section-eyebrow">Learner&rsquo;s Licence service</p>
          <h1 className="mt-3 font-display text-[36px] font-bold leading-[1.06] tracking-[-0.03em] text-ink sm:text-[52px]">Your next step should always be clear.</h1>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink/65 sm:text-[17px]">Apply for a Learner&rsquo;s Licence with a simple, guided journey. Sahaj checks what you need first, explains each status, and gives you one reference to track every update.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/login" className="btn-primary w-full sm:w-auto">Start a new application <span aria-hidden className="ml-2">→</span></Link>
            <Link href="/status/LL-2026-4471209" className="btn-secondary w-full sm:w-auto">View a sample application</Link>
          </div>
          <div className="mt-8 grid max-w-xl grid-cols-3 border-y border-line py-4">
            {[['Before payment', 'Document check'], ['After payment', 'Clear status'], ['Any time', 'Reference tracking']].map(([label, value]) => (
              <div key={label} className="border-r border-line px-3 first:pl-0 last:border-r-0 last:pr-0">
                <p className="text-[11px] font-medium text-ink/45">{label}</p>
                <p className="mt-1 text-[12.5px] font-semibold leading-snug text-ink">{value}</p>
              </div>
            ))}
          </div>
        </div>
        <ApplicationPreview />
      </section>
      <section className="border-t border-line/80 bg-white/55">
        <div className="mx-auto grid max-w-6xl gap-3 px-4 py-6 sm:grid-cols-3 sm:px-6">
          {[
            ["Use your thumb", "Large tap targets and simple choices, built for a phone-first journey."],
            ["Keep control", "Plain-language guidance tells you what happened and what to do next."],
            ["Stay informed", "Payment, documents, and slot updates remain visible in one record."],
          ].map(([title, detail]) => <div key={title} className="rounded-stamp border border-line/80 bg-paper/45 p-4"><p className="text-[14px] font-semibold text-ink">{title}</p><p className="mt-1 text-[12.5px] leading-relaxed text-ink/60">{detail}</p></div>)}
        </div>
      </section>
      <p className="mx-auto max-w-4xl px-4 py-6 text-center text-[12px] leading-relaxed text-ink/50">Independent hackathon prototype; not affiliated with the Government of India, MoRTH, or Parivahan Sewa. All data is fictional. <Link href="/about-this-build" className="font-medium text-trust underline underline-offset-2">What&rsquo;s real and simulated</Link></p>
    </main>
  );
}
