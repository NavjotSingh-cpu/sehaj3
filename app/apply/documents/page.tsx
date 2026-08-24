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
      <section className="flow-content mx-auto w-full max-w-lg px-4 sm:max-w-xl sm:rounded-3xl sm:border sm:border-line sm:bg-card sm:px-10 sm:shadow-card sm:my-10 lg:max-w-2xl py-6">
        <h1 className="font-display text-[22px] font-bold text-ink">Upload documents</h1>
        <p className="mt-1 text-[14.5px] text-ink/60">
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

      <div className="fixed inset-x-0 bottom-0 border-t border-line bg-paper/95 p-4 backdrop-blur">
        <div className="mx-auto max-w-lg sm:max-w-xl lg:max-w-2xl">
          <button onClick={continueNext} disabled={!bothPassed} className="btn-primary w-full">
            {bothPassed ? "Continue to payment" : "Upload and pass both checks to continue"}
          </button>
        </div>
      </div>
    </main>
  );
}
