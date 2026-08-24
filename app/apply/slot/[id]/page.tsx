"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { ProgressStepper } from "@/components/ProgressStepper";
import { useStore } from "@/lib/store";

function nextWeekdays(n: number): string[] {
  const days: string[] = [];
  const d = new Date();
  while (days.length < n) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0) days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

const TIMES = ["9:30 AM", "11:00 AM", "1:30 PM", "3:00 PM"];
const RTO = "RTO Patiala";

export default function SlotPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const bookSlot = useStore((s) => s.bookSlot);
  const application = useStore((s) => s.getApplication(id));

  const days = useMemo(() => nextWeekdays(6), []);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);

  if (!application) return null;

  function confirm() {
    if (!date || !time) return;
    bookSlot(id, { date, time, rtoName: RTO });
    router.push(`/apply/confirmation/${id}`);
  }

  return (
    <main className="min-h-dvh pb-28">
      <TopBar back={{ href: `/apply/payment/${id}`, label: "Back" }} />
      <ProgressStepper current="slot" />
      <section className="mx-auto w-full max-w-lg px-4 sm:max-w-xl sm:rounded-3xl sm:border sm:border-line sm:bg-card sm:px-10 sm:shadow-card sm:my-10 lg:max-w-2xl py-6">
        <h1 className="font-display text-[22px] font-bold text-ink">Book your test slot</h1>
        <p className="mt-1 text-[14.5px] text-ink/60">
          Slots stay reserved for 10 minutes once you pick them — no racing other applicants for the same
          slot.
        </p>

        <p className="field-label mt-5">Date</p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {days.map((d) => {
            const label = new Date(d).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
            return (
              <button
                key={d}
                onClick={() => setDate(d)}
                className={`shrink-0 rounded-stamp border px-3.5 py-2.5 text-[13px] font-semibold ${
                  date === d ? "border-trust bg-trust-light text-trust-dark" : "border-line bg-white text-ink/60"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <p className="field-label mt-5">Time</p>
        <div className="grid grid-cols-2 gap-2">
          {TIMES.map((t) => (
            <button
              key={t}
              onClick={() => setTime(t)}
              className={`rounded-stamp border py-2.5 text-[13.5px] font-semibold ${
                time === t ? "border-trust bg-trust-light text-trust-dark" : "border-line bg-white text-ink/60"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="card mt-5 p-4">
          <p className="text-[13.5px] text-ink/60">Test centre</p>
          <p className="text-[15px] font-semibold text-ink">{RTO}</p>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 border-t border-line bg-paper/95 p-4 backdrop-blur">
        <div className="mx-auto max-w-lg sm:max-w-xl lg:max-w-2xl">
          <button onClick={confirm} disabled={!date || !time} className="btn-primary w-full">
            Confirm slot
          </button>
        </div>
      </div>
    </main>
  );
}
