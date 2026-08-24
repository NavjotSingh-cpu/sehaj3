const rows = [
  ["Identity details", "Ready"],
  ["Photo & signature", "Checked"],
  ["Application fee", "₹350"],
];

export function ApplicationPreview() {
  return (
    <aside className="licence-record" aria-label="Sample application record">
      <div className="licence-record__band">
        <div><p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/60">Application record</p><p className="mt-2 font-mono text-[13px] font-semibold text-white">LL-2026-4471209</p></div>
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl text-white" aria-hidden>✓</span>
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-3 border-b border-line pb-5">
          <span className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-trust-light text-xl text-trust" aria-hidden>↗</span>
          <div><p className="text-[15px] font-bold text-ink">Learner&rsquo;s Licence</p><p className="mt-0.5 text-[12px] text-ink/55">Your service journey, in one place.</p></div>
        </div>
        <dl className="divide-y divide-line">
          {rows.map(([label, value]) => <div key={label} className="flex items-center justify-between gap-3 py-3.5"><dt className="text-[13px] text-ink/60">{label}</dt><dd className={`text-[12px] font-bold ${value === "₹350" ? "text-ink" : "text-go"}`}>{value === "Ready" || value === "Checked" ? <span className="inline-flex items-center gap-1"><span aria-hidden>✓</span>{value}</span> : value}</dd></div>)}
        </dl>
        <div className="mt-4 flex items-center gap-3 rounded-stamp bg-trust-light p-3.5"><span className="text-trust" aria-hidden>i</span><p className="text-[12px] leading-snug text-ink/70">Every change is visible. You will always know what to do next.</p></div>
      </div>
    </aside>
  );
}
