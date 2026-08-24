"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { SuccessFeedback } from "@/components/SuccessFeedback";
import { useStore } from "@/lib/store";
import { generateOtp } from "@/lib/mock";

const TEST_MOBILE = "9876543210";

export default function LoginPage() {
  const router = useRouter();
  const login = useStore((s) => s.login);
  const mobileInput = useRef<HTMLInputElement>(null);
  const otpInputs = useRef<Array<HTMLInputElement | null>>([]);
  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [mobile, setMobile] = useState("");
  const [demoOtp, setDemoOtp] = useState("");
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState("");
  const entered = digits.join("");

  useEffect(() => {
    if (step === "mobile") mobileInput.current?.focus();
    else otpInputs.current[0]?.focus();
  }, [step]);

  function verifyCode(code: string) {
    if (code.length !== 6) return setError("Enter all 6 digits of the OTP.");
    if (code !== demoOtp) return setError("That OTP doesn't match. Check the demo banner below and try again.");
    setError("");
    login(mobile);
    window.setTimeout(() => router.push("/dashboard"), 520);
  }

  function requestOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(mobile)) return setError("Enter a valid 10-digit mobile number.");
    setError("");
    setDigits(Array(6).fill(""));
    setDemoOtp(generateOtp());
    setStep("otp");
  }

  function updateDigits(next: string[], focusIndex?: number) {
    setDigits(next);
    setError("");
    if (focusIndex !== undefined) otpInputs.current[focusIndex]?.focus();
    const code = next.join("");
    if (code.length === 6 && next.every(Boolean)) verifyCode(code);
  }

  return (
    <main className="min-h-dvh">
      <TopBar back={{ href: "/", label: "Back" }} />
      <section className="task-shell flow-content">
        <p className="section-eyebrow">Secure access</p>
        <h1 className="task-heading mt-2">Log in to continue</h1>
        <p className="task-intro">No account yet? Logging in creates one automatically — this is a demo, not a real Aadhaar or DigiLocker login.</p>

        {step === "mobile" && (
          <form noValidate onSubmit={requestOtp} className="mt-6 space-y-4">
            <button type="button" onClick={() => { setMobile(TEST_MOBILE); setError(""); }} className="w-full rounded-stamp border border-dashed border-marigold-dark/40 bg-marigold-light py-2.5 text-[13px] font-semibold text-marigold-dark">Fill with test mobile number</button>
            <div>
              <label htmlFor="mobile" className="field-label">Mobile number</label>
              <input ref={mobileInput} id="mobile" inputMode="numeric" maxLength={10} className="field-input" placeholder="10-digit mobile number" value={mobile} onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))} />
            </div>
            {error && <p className="text-[13.5px] font-medium text-stop">{error}</p>}
            <button type="submit" className="btn-primary w-full">Send OTP</button>
          </form>
        )}

        {step === "otp" && (
          <form noValidate onSubmit={(e) => { e.preventDefault(); verifyCode(entered); }} className="mt-6 space-y-4">
            <div className="card flex items-start gap-2.5 bg-marigold-light p-3.5"><span aria-hidden>🛈</span><p className="text-[13.5px] leading-snug text-ink/80"><strong>Demo mode:</strong> no real SMS is sent. Your one-time code is <span className="font-mono text-[15px] font-semibold text-ink">{demoOtp}</span></p></div>
            <div>
              <p id="otp-label" className="field-label">Enter OTP sent to {mobile}</p>
              <div className="flex justify-between gap-2" role="group" aria-labelledby="otp-label">
                {digits.map((digit, index) => (
                  <input key={index} ref={(element) => { otpInputs.current[index] = element; }} aria-label={`OTP digit ${index + 1}`} inputMode="numeric" autoComplete={index === 0 ? "one-time-code" : "off"} maxLength={1} className="field-input min-w-0 px-1 text-center text-[20px] font-semibold" value={digit}
                    onChange={(e) => { const value = e.target.value.replace(/\D/g, "").slice(-1); const next = [...digits]; next[index] = value; updateDigits(next, value && index < 5 ? index + 1 : undefined); }}
                    onKeyDown={(e) => { if (e.key === "Backspace" && !digits[index] && index > 0) { e.preventDefault(); const next = [...digits]; next[index - 1] = ""; updateDigits(next, index - 1); } }}
                    onPaste={(e) => { e.preventDefault(); const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6); if (!pasted) return; const next = Array(6).fill(""); pasted.split("").forEach((value, position) => { next[position] = value; }); updateDigits(next, Math.min(pasted.length, 5)); }} />
                ))}
              </div>
            </div>
            {error && <p className="text-[13.5px] font-medium text-stop">{error}</p>}
            {entered === demoOtp && entered.length === 6 && <SuccessFeedback title="OTP verified" description="Taking you to your applications…" />}
            <button type="submit" className="btn-primary w-full">Verify &amp; continue</button>
            <button type="button" onClick={() => setStep("mobile")} className="w-full text-center text-[13.5px] font-medium text-ink/50">Change mobile number</button>
          </form>
        )}
      </section>
    </main>
  );
}
