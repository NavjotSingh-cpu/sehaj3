"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { useStore } from "@/lib/store";
import { generateOtp } from "@/lib/mock";

export default function LoginPage() {
  const router = useRouter();
  const login = useStore((s) => s.login);

  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [demoOtp, setDemoOtp] = useState("");
  const [entered, setEntered] = useState("");
  const [error, setError] = useState("");

  function requestOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    setDemoOtp(generateOtp());
    setStep("otp");
  }

  function verifyOtp(e: React.FormEvent) {
    e.preventDefault();
    if (entered !== demoOtp) {
      setError("That OTP doesn't match. Check the demo banner below and try again.");
      return;
    }
    login(mobile);
    router.push("/dashboard");
  }

  return (
    <main className="min-h-dvh">
      <TopBar back={{ href: "/", label: "Back" }} />
      <section className="mx-auto w-full max-w-lg px-4 sm:max-w-xl sm:rounded-3xl sm:border sm:border-line sm:bg-card sm:px-10 sm:shadow-card sm:my-10 lg:max-w-2xl py-8">
        <h1 className="font-display text-[24px] font-bold text-ink">Log in to continue</h1>
        <p className="mt-1.5 text-[14.5px] text-ink/60">
          No account yet? Logging in creates one automatically — this is a demo, not a real Aadhaar or
          DigiLocker login.
        </p>

        {step === "mobile" && (
          <form onSubmit={requestOtp} className="mt-6 space-y-4">
            <div>
              <label htmlFor="mobile" className="field-label">
                Mobile number
              </label>
              <input
                id="mobile"
                inputMode="numeric"
                maxLength={10}
                className="field-input"
                placeholder="10-digit mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
              />
            </div>
            {error && <p className="text-[13.5px] font-medium text-stop">{error}</p>}
            <button type="submit" className="btn-primary w-full">
              Send OTP
            </button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={verifyOtp} className="mt-6 space-y-4">
            <div className="card flex items-start gap-2.5 bg-marigold-light p-3.5">
              <span aria-hidden>🛈</span>
              <p className="text-[13.5px] leading-snug text-ink/80">
                <strong>Demo mode:</strong> no real SMS is sent. Your one-time code is{" "}
                <span className="font-mono text-[15px] font-semibold text-ink">{demoOtp}</span>
              </p>
            </div>
            <div>
              <label htmlFor="otp" className="field-label">
                Enter OTP sent to {mobile}
              </label>
              <input
                id="otp"
                inputMode="numeric"
                maxLength={6}
                className="field-input tracking-[0.3em]"
                placeholder="······"
                value={entered}
                onChange={(e) => setEntered(e.target.value.replace(/\D/g, ""))}
              />
            </div>
            {error && <p className="text-[13.5px] font-medium text-stop">{error}</p>}
            <button type="submit" className="btn-primary w-full">
              Verify &amp; continue
            </button>
            <button
              type="button"
              onClick={() => setStep("mobile")}
              className="w-full text-center text-[13.5px] font-medium text-ink/50"
            >
              Change mobile number
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
