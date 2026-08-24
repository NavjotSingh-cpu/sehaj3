import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import { HeroMark } from "@/components/illustrations/HeroMark";

export default function Home() {
  return (
    <main className="min-h-dvh">
      <TopBar />
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12">
        <div>
          <p className="section-eyebrow">Learner&rsquo;s Licence service</p>
          <h1 className="mt-2 font-display text-[31px] font-bold leading-[1.12] text-ink sm:text-[42px]">A clear path to your learner&rsquo;s licence.</h1>
          <p className="mt-3 max-w-xl text-[15.5px] leading-relaxed text-ink/65">Sahaj guides you through a Learner&rsquo;s Licence application, checks your documents before payment, and keeps each application update in one place.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:max-w-md">
            <Link href="/login" className="btn-primary w-full sm:flex-1">Start your application</Link>
            <Link href="/status/LL-2026-4471209" className="btn-secondary w-full sm:flex-1">Check application status</Link>
          </div>
          <p className="mt-4 text-[13px] text-ink/50">You&rsquo;ll receive a reference number after submitting your details.</p>
        </div>
        <div className="relative mx-auto mt-7 hidden w-full max-w-[340px] sm:block lg:mt-0">
          <div className="absolute inset-x-5 top-10 h-4/5 rounded-full bg-marigold-light/70 blur-3xl" aria-hidden />
          <HeroMark className="relative w-full" />
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6 sm:pb-16">
        <p className="section-eyebrow">What you can expect</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {[
            ["01", "Know what you need", "See every required detail before you begin."],
            ["02", "Check before you pay", "Fix document issues before the fee step."],
            ["03", "Track every update", "Use your reference number to see what happens next."],
          ].map(([number, title, description]) => (
            <div key={number} className="card p-4">
              <span className="font-mono text-[12px] font-bold text-trust">{number}</span>
              <p className="mt-3 text-[15px] font-semibold text-ink">{title}</p>
              <p className="mt-1 text-[13.5px] leading-relaxed text-ink/60">{description}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-5 max-w-2xl text-center text-[12.5px] leading-relaxed text-ink/50">Independent hackathon prototype; not affiliated with the Government of India, MoRTH, or Parivahan Sewa. All data is fictional. <Link href="/about-this-build" className="font-medium text-trust underline underline-offset-2">What&rsquo;s real and simulated</Link></p>
      </section>
    </main>
  );
}
