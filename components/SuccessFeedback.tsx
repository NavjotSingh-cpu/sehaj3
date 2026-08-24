import { Stamp } from "@/components/Stamp";

export function SuccessFeedback({
  title,
  description,
  className = "",
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={`success-feedback ${className}`} role="status" aria-live="polite">
      <Stamp state="done" animate />
      <div>
        <p className="font-semibold text-go">{title}</p>
        {description && <p className="mt-0.5 text-[13px] leading-snug text-ink/60">{description}</p>}
      </div>
    </div>
  );
}
