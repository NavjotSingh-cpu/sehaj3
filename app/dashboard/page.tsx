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
      <section className="mx-auto w-full max-w-lg px-4 sm:max-w-xl sm:rounded-3xl sm:border sm:border-line sm:bg-card sm:px-10 sm:shadow-card sm:my-10 lg:max-w-2xl py-8">
        <h1 className="font-display text-[24px] font-bold text-ink">Your applications</h1>
        <p className="mt-1 text-[14.5px] text-ink/60">Logged in as {session.mobile}</p>

        <div className="mt-6 space-y-3">
          {applications.length === 0 && (
            <div className="card p-5 text-center">
              <p className="text-[14.5px] text-ink/60">You don&rsquo;t have any applications yet.</p>
            </div>
          )}
          {applications.map((a) => (
            <Link
              key={a.id}
              href={`/status/${a.id}`}
              className="card flex items-center justify-between p-4"
            >
              <div>
                <p className="font-mono text-[13px] font-semibold text-ink/50">{a.id}</p>
                <p className="text-[15px] font-semibold text-ink">{a.serviceType}</p>
                <p className="text-[13.5px] text-ink/60">{STAGE_LABEL[a.stage]}</p>
              </div>
              <span aria-hidden className="text-ink/30">
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
