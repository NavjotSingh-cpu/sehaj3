"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { ProgressStepper } from "@/components/ProgressStepper";
import { useStore } from "@/lib/store";
import type { PaymentRecord } from "@/lib/types";
import { SuccessFeedback } from "@/components/SuccessFeedback";

const AMOUNT = 350;

export default function PaymentPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const application = useStore((s) => s.getApplication(id));
  const recordPayment = useStore((s) => s.recordPayment);

  const [method, setMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [demoOutcome, setDemoOutcome] = useState<"success" | "pending" | "failed_debited">("success");
  const [paying, setPaying] = useState(false);
  const [latest, setLatest] = useState<PaymentRecord | null>(null);

  useEffect(() => {
    if (application?.payments.length) {
      setLatest(application.payments[application.payments.length - 1]);
    }
  }, [application]);

  // Auto-resolve a "pending bank confirmation" the way a real bank webhook would —
  // never leaves the citizen staring at "pending" indefinitely.
  useEffect(() => {
    if (latest?.status === "pending_bank_confirmation") {
      const t = setTimeout(() => {
        const resolved: PaymentRecord = {
          ...latest,
          status: "success",
          updatedAt: new Date().toISOString(),
          note: `Confirmed by your bank. ₹${latest.amount} matched to this application.`,
        };
        recordPayment(id, resolved);
        setLatest(resolved);
      }, 3500);
      return () => clearTimeout(t);
    }
  }, [latest, id, recordPayment]);

  async function pay() {
    setPaying(true);
    if ("vibrate" in navigator) navigator.vibrate(10);
    try {
      const res = await fetch("/api/payment/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: AMOUNT, method, demoOutcome }),
      });
      const record: PaymentRecord = await res.json();
      recordPayment(id, record);
      setLatest(record);
    } finally {
      setPaying(false);
    }
  }

  if (!application) return null;

  return (
    <main className="min-h-dvh">
      <TopBar back={{ href: `/apply/documents`, label: "Back" }} />
      <ProgressStepper current="payment" />
      <section className="task-shell flow-content">
        <p className="section-eyebrow">Step 4 · payment</p>
        <h1 className="task-heading mt-2">Pay application fee</h1>
        <div className="card mt-5 flex items-center justify-between p-4">
          <span className="text-[14.5px] text-ink/60">Learner&rsquo;s Licence fee</span>
          <span className="font-mono text-[20px] font-bold text-ink">₹{AMOUNT}</span>
        </div>

        {!latest || latest.status === "failed_debited" ? (
          <>
            <div className="mt-5">
              <p className="field-label">Pay using</p>
              <div className="grid grid-cols-3 gap-2">
                {(["upi", "card", "netbanking"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMethod(m)}
                    className={`rounded-stamp border py-2.5 text-[13.5px] font-semibold capitalize ${
                      method === m ? "border-trust bg-trust-light text-trust-dark" : "border-line bg-white text-ink/60"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="card mt-5 border-dashed p-4">
              <p className="text-[12px] font-bold uppercase tracking-wide text-marigold-dark">
                Demo controls — for judges only
              </p>
              <p className="mt-1 text-[12.5px] text-ink/55">
                Real payments aren&rsquo;t possible in this prototype. Pick which real-world outcome to
                simulate — this is exactly the range of outcomes reported on the live portal.
              </p>
              <div className="mt-2 space-y-1.5">
                {[
                  { v: "success", l: "Success — confirmed instantly" },
                  { v: "pending", l: "Bank confirmation delay — resolves automatically" },
                  { v: "failed_debited", l: "Debited but not matched — auto-refund path" },
                ].map((o) => (
                  <label key={o.v} className="flex items-center gap-2 text-[13px] text-ink/70">
                    <input
                      type="radio"
                      name="demoOutcome"
                      checked={demoOutcome === o.v}
                      onChange={() => setDemoOutcome(o.v as typeof demoOutcome)}
                    />
                    {o.l}
                  </label>
                ))}
              </div>
            </div>

            <button onClick={pay} disabled={paying} className="btn-primary mt-5 w-full">
              {paying ? "Processing…" : `Pay ₹${AMOUNT}`}
            </button>
            {paying && <div className="mt-3" role="status" aria-live="polite"><p className="text-center text-[13px] font-medium text-trust">Securely checking the payment response…</p><div className="inline-progress mt-2" /></div>}
          </>
        ) : null}

        {latest && (
          <div
            className={`card mt-5 p-4 ${
              latest.status === "success"
                ? "border-go/30"
                : latest.status === "pending_bank_confirmation"
                ? "border-marigold-dark/30"
                : "border-stop/30"
            }`}
          >
            <p className="font-mono text-[12px] text-ink/45">Ref: {latest.referenceId}</p>
            <p className="mt-1 text-[14.5px] font-semibold text-ink">
              {latest.status === "success" && "Payment confirmed"}
              {latest.status === "pending_bank_confirmation" && "Confirming with your bank…"}
              {latest.status === "failed_debited" && "Payment not matched — refund started"}
            </p>
            <p className="mt-1 text-[13.5px] leading-snug text-ink/65">{latest.note}</p>
            {latest.status === "success" && <SuccessFeedback className="mt-3" title="Payment confirmed" description="Your fee is recorded. You can now choose a test slot." />}
            {latest.status === "pending_bank_confirmation" && <div className="mt-3" role="status" aria-live="polite"><p className="text-[13px] font-medium text-marigold-dark">Your bank is confirming this payment. You do not need to pay again.</p><div className="inline-progress mt-2" /></div>}
            {latest.status === "failed_debited" && <SuccessFeedback className="mt-3" title="Refund started" description="We could not match this payment, so the refund path is already underway." />}
          </div>
        )}

        {latest?.status === "success" && (
          <button onClick={() => router.push(`/apply/slot/${id}`)} className="btn-primary mt-5 w-full">
            Continue to slot booking
          </button>
        )}
      </section>
    </main>
  );
}
