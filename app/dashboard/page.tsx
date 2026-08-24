"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { useStore } from "@/lib/store";
import { STAGE_LABEL } from "@/lib/stage";

export default function DashboardPage() {
  const router = useRouter();
  const session = useStore((s) => s.session);
  const applications = useStore((s) => s.applications);

  useEffect(() => {
    if (!session) router.replace("/login");
  }, [session, router]);

  if (!session) return null;

  return (
    <main className="min-h-dvh">
      <TopBar />
      <section className="flow-content mx-auto w-full max-w-lg px-4 py-7 sm:my-10 sm:max-w-xl sm:rounded-3xl sm:border sm:border-line sm:bg-card sm:px-10 sm:shadow-card lg:max-w-2xl">
        <p className="section-eyebrow">Your account</p>
        <div className="mt-1 flex items-end justify-between gap-3">
          <div><h1 className="font-display text-[25px] font-bold text-ink">Your applications</h1><p className="mt-1 text-[14px] text-ink/60">Mobile {session.mobile}</p></div>
          <span className="rounded-full bg-go-light px-2.5 py-1 text-[11px] font-bold text-go">Verified</span>
        </div>

        <div className="mt-6 space-y-3">
          {applications.length === 0 && (
            <div className="card border-dashed p-6 text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-trust-light text-xl text-trust" aria-hidden>+</div>
              <p className="mt-3 text-[15px] font-semibold text-ink">No application yet</p>
              <p className="mt-1 text-[13.5px] text-ink/60">Start when you have your photo and signature ready.</p>
            </div>
          )}
          {applications.map((a) => (
            <Link
              key={a.id}
              href={`/status/${a.id}`}
              className="card flex items-center justify-between p-4 transition-all duration-150 hover:-translate-y-px hover:border-trust/30 hover:shadow-md"
            >
              <div>
                <p className="font-mono text-[13px] font-semibold text-ink/50">{a.id}</p>
                <p className="text-[15px] font-semibold text-ink">{a.serviceType}</p>
                <p className="text-[13.5px] text-ink/60">{STAGE_LABEL[a.stage]}</p>
              </div>
              <span aria-hidden className="flex h-8 w-8 items-center justify-center rounded-full bg-trust-light text-trust">
                →
              </span>
            </Link>
          ))}
        </div>

        <Link href="/apply/eligibility" className="btn-primary mt-6 w-full">
          Apply for Learner&rsquo;s Licence
        </Link>

        <button
          onClick={() => {
            useStore.getState().resetAll();
            router.replace("/");
          }}
          className="mx-auto mt-8 block text-[12.5px] font-medium text-ink/35 underline underline-offset-2"
        >
          Reset all demo data
        </button>
      </section>
    </main>
  );
}
