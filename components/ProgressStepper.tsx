import { APPLY_STEPS } from "@/lib/stage";

export function ProgressStepper({ current }: { current: (typeof APPLY_STEPS)[number]["key"] }) {
  const currentIndex = APPLY_STEPS.findIndex((s) => s.key === current);

  return (
    <div className="mx-auto max-w-lg px-4 pb-2 pt-3">
      <div className="flex items-center">
        {APPLY_STEPS.map((step, i) => {
          const done = i < currentIndex;
          const active = i === currentIndex;
          return (
            <div key={step.key} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-bold ${
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
                  className={`text-[10.5px] font-medium ${active ? "text-ink" : "text-ink/40"}`}
                >
                  {step.label}
                </span>
              </div>
              {i < APPLY_STEPS.length - 1 && (
                <div className={`mx-1 h-[2px] flex-1 ${done ? "bg-go" : "bg-line"}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
