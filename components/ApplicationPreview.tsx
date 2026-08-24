const nextSteps = ["Confirm application details", "Pay the ₹350 demo fee", "Choose your RTO visit"];

export function ApplicationPreview() {
  return (
    <aside className="application-card" aria-label="Sample Sahaj application status">
      <div className="application-card__header">
        <p className="text-[15px] font-bold">Your application</p>
        <p className="mt-1 text-[11.5px] text-white/75">LL-2026-4471209 · Demo application</p>
      </div>
      <div className="p-5 sm:p-6">
        <div className="rounded-stamp bg-trust-light p-3.5">
          <div className="flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-trust text-[17px] font-bold text-white" aria-hidden>✓</span>
            <div><p className="text-[14px] font-bold text-ink">Documents checked</p><p className="mt-0.5 text-[12px] leading-snug text-ink/65">Everything looks good. You can continue.</p></div>
          </div>
        </div>
        <p className="mt-6 font-mono text-[10px] font-bold tracking-[0.1em] text-ink/55">WHAT HAPPENS NEXT</p>
        <ol className="mt-3 space-y-2.5">
          {nextSteps.map((step, index) => <li key={step} className="flex items-center gap-3"><span className={`h-4 w-4 shrink-0 rounded-full border-2 ${index === 0 ? "border-trust bg-trust" : "border-trust/25 bg-white"}`} aria-hidden /><span className={`text-[12.5px] ${index === 0 ? "font-bold text-ink" : "text-ink/55"}`}>{step}</span></li>)}
        </ol>
        <div className="mt-5 flex items-center justify-between gap-3"><p className="text-[11.5px] leading-snug text-ink/50">A clear status at each step.</p><span className="btn-primary min-h-10 shrink-0 px-4 py-2 text-[12px]">Continue</span></div>
      </div>
    </aside>
  );
}
