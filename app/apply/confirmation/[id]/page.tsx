"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import { useStore } from "@/lib/store";
import { Stamp } from "@/components/Stamp";

export default function ConfirmationPage() {
  const { id } = useParams<{ id: string }>();
  const application = useStore((s) => s.getApplication(id));

  if (!application) return null;

  return (
    <main className="min-h-dvh">
      <TopBar back={{ href: "/dashboard", label: "Dashboard" }} />
      <section className="task-shell flow-content text-center">
        <div className="flex justify-center">
          <Stamp state="done" animate />
        </div>
        <h1 className="task-heading mt-4">Application submitted</h1>
        <p className="mt-1 font-mono text-[15px] font-semibold text-trust">{application.id}</p>

        <div className="card mt-6 space-y-2 p-4 text-left">
          <Row label="Applicant" value={application.applicant.fullName} />
          <Row label="Service" value={application.serviceType} />
          <Row label="Fee paid" value={`₹${application.payments[0]?.amount ?? "—"}`} />
          <Row
            label="Slot"
            value={application.slot ? `${application.slot.date}, ${application.slot.time} — ${application.slot.rtoName}` : "—"}
          />
        </div>

        <p className="mt-5 text-[13.5px] text-ink/55">
          Save this reference number. You&rsquo;ll use it to track every update — no separate login, no
          re-entering your details.
        </p>

        <Link href={`/status/${application.id}`} className="btn-primary mt-6 w-full">
          Track this application
        </Link>
      </section>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-line py-1.5 text-[13.5px] last:border-0">
      <span className="text-ink/55">{label}</span>
      <span className="font-medium text-ink">{value}</span>
    </div>
  );
}
