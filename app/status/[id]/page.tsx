"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { Stamp } from "@/components/Stamp";
import { DocumentUploader } from "@/components/DocumentUploader";
import { useStore } from "@/lib/store";
import type { DocumentRecord } from "@/lib/types";

type StampState = "done" | "current" | "waiting" | "flagged";

export default function StatusPage() {
  const { id } = useParams<{ id: string }>();
  const ensureDemoApplication = useStore((s) => s.ensureDemoApplication);
  const application = useStore((s) => s.getApplication(id));
  const fixSignature = useStore((s) => s.fixSignature);

  useEffect(() => {
    if (id === "LL-2026-4471209") ensureDemoApplication();
  }, [id, ensureDemoApplication]);

  const [advocate, setAdvocate] = useState<{ mode: string; explanation: string; nextAction: string } | null>(null);
  const [asking, setAsking] = useState(false);

  if (!application) {
    return (
      <main className="min-h-dvh">
        <TopBar back={{ href: "/dashboard", label: "Dashboard" }} />
        <p className="mx-auto w-full max-w-lg px-4 sm:max-w-xl sm:rounded-3xl sm:border sm:border-line sm:bg-card sm:px-10 sm:shadow-card sm:my-10 lg:max-w-2xl py-10 text-[14.5px] text-ink/60">
          No application found with reference {id}.
        </p>
      </main>
    );
  }

  const signatureFlagged = application.flags.length > 0 && application.stage === "flagged";
  const paid = application.payments.some((p) => p.status === "success");
  const lastPayment = application.payments[application.payments.length - 1];

  const rows: { key: string; label: string; state: StampState; detail: string }[] = [
    { key: "details", label: "Details submitted", state: "done", detail: "Personal details recorded." },
    {
      key: "documents",
      label: "Documents verified",
      state: signatureFlagged ? "flagged" : "done",
      detail: signatureFlagged
        ? "Signature needs to be re-uploaded — see below."
        : "Photo and signature both passed the check.",
    },
    {
      key: "payment",
      label: "Payment",
      state: paid ? "done" : lastPayment?.status === "pending_bank_confirmation" ? "current" : "waiting",
      detail: lastPayment?.note ?? "Not yet paid.",
    },
    {
      key: "review",
      label: "RTO review",
      state:
        application.stage === "under_review"
          ? "current"
          : application.stage === "confirmed" || application.stage === "completed"
          ? "done"
          : "waiting",
      detail: "Checked against the fee ledger and verified documents.",
    },
    {
      key: "slot",
      label: "Test slot",
      state: application.slot ? "done" : "waiting",
      detail: application.slot
        ? `${application.slot.date}, ${application.slot.time} — ${application.slot.rtoName}`
        : "Not booked yet.",
    },
  ];

  async function askAdvocate() {
    setAsking(true);
    const res = await fetch("/api/ai/explain-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ application }),
    });
    setAdvocate(await res.json());
    setAsking(false);
  }

  function onSignatureFixed(doc: DocumentRecord) {
    fixSignature(application!.id, doc);
    setAdvocate(null);
  }

  return (
    <main className="min-h-dvh pb-16">
      <TopBar back={{ href: "/dashboard", label: "Dashboard" }} />
      <section className="mx-auto w-full max-w-lg px-4 py-6 sm:max-w-xl sm:rounded-3xl sm:border sm:border-line sm:bg-card sm:px-10 sm:shadow-card sm:my-10 lg:max-w-4xl lg:grid lg:grid-cols-[1.3fr_1fr] lg:gap-10 lg:px-12">
        <div>
          <p className="font-mono text-[13px] font-semibold text-ink/45">{application.id}</p>
          <h1 className="font-display text-[22px] font-bold text-ink">{application.applicant.fullName || "Applicant"}</h1>
          <p className="text-[14.5px] text-ink/60">{application.serviceType}</p>

          {signatureFlagged && (
            <div className="card mt-5 border-stop/30 bg-stop-light/40 p-4">
              <p className="text-[14.5px] font-semibold text-stop">{application.flags[0]}</p>
            </div>
          )}

          <div className="mt-6 space-y-0">
            {rows.map((row, i) => (
              <div key={row.key} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <Stamp state={row.state} />
                  {i < rows.length - 1 && <div className="my-0.5 h-8 w-[2px] bg-line" />}
                </div>
                <div className="pb-6 pt-1">
                  <p className="text-[15px] font-semibold text-ink">{row.label}</p>
                  <p className="text-[13.5px] leading-snug text-ink/60">{row.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {signatureFlagged && (
            <div className="mt-2">
              <p className="mb-2 text-[14px] font-semibold text-ink">Re-upload your signature</p>
              <DocumentUploader
                type="signature"
                label="Signature"
                hint="Sign on plain white paper and photograph it straight-on, in good light."
                onVerified={onSignatureFixed}
              />
            </div>
          )}
        </div>

        <div className="card mt-6 h-fit p-4 lg:sticky lg:top-20 lg:mt-0">
          <p className="text-[15px] font-semibold text-ink">Application Advocate</p>
          <p className="mt-1 text-[13px] text-ink/55">
            Reads this specific application and tells you what&rsquo;s happening — not a generic script.
          </p>
          <button onClick={askAdvocate} disabled={asking} className="btn-secondary mt-3 w-full">
            {asking ? "Reading your application…" : "Ask what's going on"}
          </button>

          {advocate && (
            <div className="mt-3 rounded-stamp bg-trust-light p-3.5">
              <p className="text-[14px] leading-snug text-ink">{advocate.explanation}</p>
              <p className="mt-2 text-[13.5px] font-semibold text-trust-dark">{advocate.nextAction}</p>
              <p className="mt-2 text-[11px] uppercase tracking-wide text-ink/40">
                {advocate.mode === "live" ? "Answered live by GPT-4o-mini" : "Demo mode answer"}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
