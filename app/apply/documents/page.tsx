"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { ProgressStepper } from "@/components/ProgressStepper";
import { DocumentUploader } from "@/components/DocumentUploader";
import { useStore } from "@/lib/store";
import type { DocumentRecord } from "@/lib/types";

export default function DocumentsPage() {
  const router = useRouter();
  const session = useStore((s) => s.session);
  const submitDetails = useStore((s) => s.submitDetails);

  const [photo, setPhoto] = useState<DocumentRecord | null>(null);
  const [signature, setSignature] = useState<DocumentRecord | null>(null);

  useEffect(() => {
    if (!session) router.replace("/login");
  }, [session, router]);

  const bothPassed = photo?.check?.passed && signature?.check?.passed;

  function continueNext() {
    if (!photo || !signature) return;
    useStore.getState().addDraftDocument(photo);
    useStore.getState().addDraftDocument(signature);
    const id = submitDetails();
    router.push(`/apply/payment/${id}`);
  }

  return (
    <main className="min-h-dvh pb-28">
      <TopBar back={{ href: "/apply/details", label: "Back" }} />
      <ProgressStepper current="documents" />
      <section className="task-shell flow-content">
        <p className="section-eyebrow">Step 3 · documents</p>
        <h1 className="task-heading mt-2">Upload documents</h1>
        <p className="task-intro">
          Both documents below are mandatory — there&rsquo;s no hidden requirement that appears later. Each
          is checked immediately so you can fix a problem now instead of after payment.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <DocumentUploader
            type="photo"
            label="Passport-style photo"
            hint="Plain light background, face clearly visible, no sunglasses or cap."
            onVerified={setPhoto}
          />
          <DocumentUploader
            type="signature"
            label="Signature"
            hint="Sign on plain white paper and photograph it straight-on, in good light."
            onVerified={setSignature}
          />
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 sticky-action">
        <div className="mx-auto max-w-lg sm:max-w-xl lg:max-w-2xl">
          <button onClick={continueNext} disabled={!bothPassed} className="btn-primary w-full">
            {bothPassed ? "Continue to payment" : "Upload and pass both checks to continue"}
          </button>
        </div>
      </div>
    </main>
  );
}
