const steps = [
  ["1", "Check eligibility", "A quick check before you spend time on a form."],
  ["2", "Verify documents", "Know what needs fixing before payment."],
  ["3", "Pay and book", "Keep a reference number for every update."],
];

export function ApplicationPreview() {
  return (
    <aside className="service-preview" aria-label="How the application journey works">
      <div className="flex items-start justify-between gap-4 border-b border-trust/10 pb-4">
        <div>
          <p className="font-mono text-[11px] font-semibold tracking-[0.12em] text-trust">APPLICATION JOURNEY</p>
          <p className="mt-1 text-[17px] font-semibold text-ink">One clear record, from start to slot.</p>
        </div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-go-light text-go" aria-hidden>✓</span>
      </div>
      <ol className="mt-4 space-y-0">
        {steps.map(([number, title, detail], index) => (
          <li key={number} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold ${index === 0 ? "bg-trust text-white" : "border border-line bg-white text-ink/50"}`}>{number}</span>
              {index < steps.length - 1 && <span className="h-8 w-px bg-line" aria-hidden />}
            </div>
            <div className="pb-4 pt-0.5">
              <p className="text-[14px] font-semibold text-ink">{title}</p>
              <p className="mt-0.5 text-[12.5px] leading-snug text-ink/60">{detail}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-1 rounded-stamp border border-go/15 bg-go-light/60 p-3">
        <p className="text-[12px] font-semibold text-go">Your reference stays with your application</p>
        <p className="mt-0.5 text-[11.5px] leading-snug text-ink/55">Use it to view payment, document, and slot updates without re-entering your details.</p>
      </div>
    </aside>
  );
}
