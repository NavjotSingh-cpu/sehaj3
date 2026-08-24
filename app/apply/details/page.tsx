"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { ProgressStepper } from "@/components/ProgressStepper";
import { useStore } from "@/lib/store";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function DetailsPage() {
  const router = useRouter();
  const session = useStore((s) => s.session);
  const draft = useStore((s) => s.draft);
  const setDraftApplicant = useStore((s) => s.setDraftApplicant);

  const [fullName, setFullName] = useState(draft.applicant.fullName ?? "");
  const [guardianName, setGuardianName] = useState(draft.applicant.guardianName ?? "");
  const [address, setAddress] = useState(draft.applicant.address ?? "");
  const [bloodGroup, setBloodGroup] = useState(draft.applicant.bloodGroup ?? "");
  const [error, setError] = useState("");
  const fullNameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!session) router.replace("/login");
  }, [session, router]);

  useEffect(() => {
    fullNameInput.current?.focus();
  }, []);

  function continueNext() {
    if (!fullName.trim() || !guardianName.trim() || !address.trim() || !bloodGroup) {
      setError("All fields are required to proceed — this is checked now, not after payment.");
      return;
    }
    setDraftApplicant({ fullName, guardianName, address, bloodGroup });
    router.push("/apply/documents");
  }

  return (
    <main className="min-h-dvh">
      <TopBar back={{ href: "/apply/eligibility", label: "Back" }} />
      <ProgressStepper current="details" />
      <section className="flow-content mx-auto w-full max-w-lg px-4 sm:max-w-xl sm:rounded-3xl sm:border sm:border-line sm:bg-card sm:px-10 sm:shadow-card sm:my-10 lg:max-w-2xl py-6">
        <h1 className="font-display text-[22px] font-bold text-ink">Your details</h1>
        <p className="mt-1 text-[14.5px] text-ink/60">Exactly as they should appear on your licence.</p>

        <form onSubmit={(e) => { e.preventDefault(); continueNext(); }} className="mt-6 space-y-4">
          <button
            type="button"
            onClick={() => {
              setFullName("Ramandeep Kaur");
              setGuardianName("Balwinder Singh");
              setAddress("House 214, Model Town, Patiala, Punjab 147001");
              setBloodGroup("B+");
              setError("");
            }}
            className="w-full rounded-stamp border border-dashed border-marigold-dark/40 bg-marigold-light py-2.5 text-[13px] font-semibold text-marigold-dark"
          >
            Fill with test data
          </button>

          <div>
            <label className="field-label">Full name</label>
            <input ref={fullNameInput} className="field-input" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div>
            <label className="field-label">Father&rsquo;s / Guardian&rsquo;s name</label>
            <input className="field-input" value={guardianName} onChange={(e) => setGuardianName(e.target.value)} />
          </div>
          <div>
            <label className="field-label">Address</label>
            <textarea
              className="field-input"
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label className="field-label">Blood group</label>
            <div className="grid grid-cols-4 gap-2">
              {BLOOD_GROUPS.map((bg) => (
                <button
                  key={bg}
                  type="button"
                  onClick={() => setBloodGroup(bg)}
                  className={`rounded-stamp border py-2.5 text-[14px] font-semibold ${
                    bloodGroup === bg ? "border-trust bg-trust-light text-trust-dark" : "border-line bg-white text-ink/60"
                  }`}
                >
                  {bg}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-[13.5px] font-medium text-stop">{error}</p>}

          <button type="submit" className="btn-primary w-full">
            Continue to documents
          </button>
        </form>
      </section>
    </main>
  );
}
