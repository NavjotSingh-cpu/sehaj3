"use client";

import { useMemo, useState } from "react";
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

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function EligibilityPage() {
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  const years = useMemo(() => Array.from({ length: 85 }, (_, i) => currentYear - 16 - i), [currentYear]);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [holdsLicence, setHoldsLicence] = useState<null | boolean>(null);
  const [error, setError] = useState("");
  const daysInMonth = month && year ? new Date(Number(year), Number(month), 0).getDate() : 31;
  const dob = day && month && year ? `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}` : "";

  function selectMonth(value: string) {
    setMonth(value);
    if (day && year && Number(day) > new Date(Number(year), Number(value), 0).getDate()) setDay("");
  }

  function selectYear(value: string) {
    setYear(value);
    if (day && month && Number(day) > new Date(Number(value), Number(month), 0).getDate()) setDay("");
  }

  function checkAndContinue() {
    if (!dob) return setError("Select your day, month, and year of birth.");
    const age = ageOn(dob);
    if (age < 16) return setError(`You need to be at least 16 to apply. Based on this date of birth, you are ${age}.`);
    if (holdsLicence === null) return setError("Let us know if you already hold a driving licence.");
    if (holdsLicence) return setError("A Learner's Licence isn't needed if you already hold a driving licence.");
    router.push("/apply/details");
  }

  return (
    <main className="min-h-dvh">
      <TopBar back={{ href: "/dashboard", label: "Cancel" }} />
      <ProgressStepper current="eligibility" />
      <section className="task-shell flow-content">
        <p className="section-eyebrow">Step 1 · eligibility</p>
        <h1 className="task-heading mt-2">Quick eligibility check</h1>
        <p className="task-intro">Two questions before we start — this avoids filling a long form only to find out later that you don&rsquo;t qualify.</p>
        <div className="mt-6 space-y-5">
          <button type="button" onClick={() => { setDay("15"); setMonth("8"); setYear(String(currentYear - 19)); setHoldsLicence(false); setError(""); }} className="w-full rounded-stamp border border-dashed border-marigold-dark/40 bg-marigold-light py-2.5 text-[13px] font-semibold text-marigold-dark">Fill with test data</button>
          <fieldset>
            <legend className="field-label">Date of birth</legend>
            <div className="grid grid-cols-3 gap-2">
              <select aria-label="Birth day" className="field-input px-2" value={day} onChange={(e) => setDay(e.target.value)}><option value="">Day</option>{Array.from({ length: daysInMonth }, (_, i) => i + 1).map((value) => <option key={value} value={value}>{value}</option>)}</select>
              <select aria-label="Birth month" className="field-input px-2" value={month} onChange={(e) => selectMonth(e.target.value)}><option value="">Month</option>{MONTHS.map((name, index) => <option key={name} value={index + 1}>{name}</option>)}</select>
              <select aria-label="Birth year" className="field-input px-2" value={year} onChange={(e) => selectYear(e.target.value)}><option value="">Year</option>{years.map((value) => <option key={value} value={value}>{value}</option>)}</select>
            </div>
          </fieldset>
          <fieldset>
            <legend className="field-label">Do you already hold a driving licence?</legend>
            <div className="flex gap-3">
              <button type="button" onClick={() => setHoldsLicence(false)} className={`flex-1 rounded-stamp border px-4 py-3 text-[14.5px] font-semibold ${holdsLicence === false ? "border-trust bg-trust-light text-trust-dark" : "border-line bg-white text-ink/60"}`}>No</button>
              <button type="button" onClick={() => setHoldsLicence(true)} className={`flex-1 rounded-stamp border px-4 py-3 text-[14.5px] font-semibold ${holdsLicence === true ? "border-trust bg-trust-light text-trust-dark" : "border-line bg-white text-ink/60"}`}>Yes</button>
            </div>
          </fieldset>
          {error && <p className="text-[13.5px] font-medium text-stop">{error}</p>}
          <button onClick={checkAndContinue} className="btn-primary w-full">Continue</button>
        </div>
      </section>
    </main>
  );
}
