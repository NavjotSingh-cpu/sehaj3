import { APPLY_STEPS } from "@/lib/stage";

export function ProgressStepper({ current }: { current: (typeof APPLY_STEPS)[number]["key"] }) {
  const currentIndex = APPLY_STEPS.findIndex((s) => s.key === current);

  return (
    <div className="mx-auto max-w-lg px-4 pb-3 pt-4 sm:max-w-xl lg:max-w-2xl">
      <div className="rounded-stamp border border-line/80 bg-white/70 px-3 py-2.5 shadow-sm">
      <div className="flex items-center">
        {APPLY_STEPS.map((step, i) => {
          const done = i < currentIndex;
          const active = i === currentIndex;
          return (
            <div key={step.key} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold shadow-sm transition-colors ${
                    done
                      ? "bg-go text-white"
                      : active
                      ? "bg-trust text-white"
                      : "bg-white text-ink/40 border border-line"
                  }`}
                >
                  {done ? "✓" : i + 1}
                </div>
                <span
                  className={`hidden text-[10px] font-semibold sm:block ${active ? "text-ink" : "text-ink/40"}`}
                >
                  {step.label}
                </span>
              </div>
              {i < APPLY_STEPS.length - 1 && (
                <div className={`mx-1 h-[2px] flex-1 rounded-full ${done ? "bg-go" : active ? "bg-trust/20" : "bg-line"}`} />
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-1.5 text-center text-[11px] font-medium text-ink/50 sm:hidden">Step {currentIndex + 1} of {APPLY_STEPS.length}: {APPLY_STEPS[currentIndex]?.label}</p>
      </div>
    </div>
  );
}
