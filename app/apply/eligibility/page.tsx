"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { ProgressStepper } from "@/components/ProgressStepper";

function ageOn(dobStr: string): number {
  const dob = new Date(dobStr);
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const m = now.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age--;
  return age;
}

export default function EligibilityPage() {
  const router = useRouter();
  const [dob, setDob] = useState("");
  const [holdsLicence, setHoldsLicence] = useState<null | boolean>(null);
  const [error, setError] = useState("");

  function checkAndContinue() {
    if (!dob) {
      setError("Enter your date of birth.");
      return;
    }
    const age = ageOn(dob);
    if (age < 16) {
      setError(`You need to be at least 16 to apply. Based on this date of birth, you are ${age}.`);
      return;
    }
    if (holdsLicence === null) {
      setError("Let us know if you already hold a driving licence.");
      return;
    }
    if (holdsLicence) {
      setError("A Learner's Licence isn't needed if you already hold a driving licence.");
      return;
    }
    router.push("/apply/details");
  }

  return (
    <main className="min-h-dvh">
      <TopBar back={{ href: "/dashboard", label: "Cancel" }} />
      <ProgressStepper current="eligibility" />
      <section className="mx-auto w-full max-w-lg px-4 sm:max-w-xl sm:rounded-3xl sm:border sm:border-line sm:bg-card sm:px-10 sm:shadow-card sm:my-10 lg:max-w-2xl py-6">
        <h1 className="font-display text-[22px] font-bold text-ink">Quick eligibility check</h1>
        <p className="mt-1 text-[14.5px] text-ink/60">
          Two questions before we start — this avoids filling a long form only to find out later that you
          don&rsquo;t qualify.
        </p>

        <div className="mt-6 space-y-5">
          <button
            type="button"
            onClick={() => {
              const d = new Date();
              d.setFullYear(d.getFullYear() - 19);
              setDob(d.toISOString().slice(0, 10));
              setHoldsLicence(false);
              setError("");
            }}
            className="w-full rounded-stamp border border-dashed border-marigold-dark/40 bg-marigold-light py-2.5 text-[13px] font-semibold text-marigold-dark"
          >
            Fill with test data
          </button>

          <div>
            <label htmlFor="dob" className="field-label">
              Date of birth
            </label>
            <input
              id="dob"
              type="date"
              className="field-input"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              max={new Date().toISOString().slice(0, 10)}
            />
          </div>

          <fieldset>
            <legend className="field-label">Do you already hold a driving licence?</legend>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setHoldsLicence(false)}
                className={`flex-1 rounded-stamp border px-4 py-3 text-[14.5px] font-semibold ${
                  holdsLicence === false ? "border-trust bg-trust-light text-trust-dark" : "border-line bg-white text-ink/60"
                }`}
              >
                No
              </button>
              <button
                type="button"
                onClick={() => setHoldsLicence(true)}
                className={`flex-1 rounded-stamp border px-4 py-3 text-[14.5px] font-semibold ${
                  holdsLicence === true ? "border-trust bg-trust-light text-trust-dark" : "border-line bg-white text-ink/60"
                }`}
              >
                Yes
              </button>
            </div>
          </fieldset>

          {error && <p className="text-[13.5px] font-medium text-stop">{error}</p>}

          <button onClick={checkAndContinue} className="btn-primary w-full">
            Continue
          </button>
        </div>
      </section>
    </main>
  );
}
