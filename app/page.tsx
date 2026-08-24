import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import { HeroMark } from "@/components/illustrations/HeroMark";

export default function Home() {
  return (
    <main className="min-h-dvh">
      <TopBar />
      <section className="mx-auto max-w-4xl px-4 py-8 sm:py-10 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-8">
        <div>
          <p className="font-mono text-[13px] font-semibold uppercase tracking-wider text-trust">Learner&rsquo;s Licence service</p>
          <h1 className="mt-2 font-display text-[30px] font-bold leading-tight text-ink sm:text-[38px]">Apply, pay, and book your driving test slot.</h1>
          <p className="mt-3 max-w-xl text-[15.5px] leading-relaxed text-ink/65">Sahaj guides you through a Learner&rsquo;s Licence application, checks your documents before payment, and keeps each application update in one place.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:max-w-md">
            <Link href="/login" className="btn-primary w-full sm:flex-1">Start your application</Link>
            <Link href="/status/LL-2026-4471209" className="btn-secondary w-full sm:flex-1">Check application status</Link>
          </div>
          <p className="mt-4 text-[13px] text-ink/50">You&rsquo;ll receive a reference number after submitting your details.</p>
        </div>
        <HeroMark className="mx-auto mt-7 hidden w-full max-w-[260px] sm:block lg:mt-0" />
      </section>
      <section className="mx-auto max-w-4xl px-4 pb-12">
        <div className="card p-4">
          <p className="text-[14px] font-semibold text-ink">Before you begin</p>
          <ul className="mt-2 space-y-1 text-[13.5px] leading-relaxed text-ink/60">
            <li>• Keep a passport-style photo and signature ready.</li>
            <li>• Document checks happen before the simulated payment step.</li>
            <li>• Your application reference lets you track every update.</li>
          </ul>
        </div>
        <p className="mx-auto mt-5 max-w-2xl text-center text-[12.5px] leading-relaxed text-ink/50">Independent hackathon prototype; not affiliated with the Government of India, MoRTH, or Parivahan Sewa. All data is fictional. <Link href="/about-this-build" className="font-medium text-trust underline underline-offset-2">What&rsquo;s real and simulated</Link></p>
      </section>
    </main>
  );
}
