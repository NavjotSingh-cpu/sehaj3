export function Stamp({
  state,
  animate = false,
}: {
  state: "done" | "current" | "waiting" | "flagged";
  animate?: boolean;
}) {
  const colors: Record<typeof state, { ring: string; fill: string; icon: string }> = {
    done: { ring: "#1E8A5F", fill: "#E3F5EC", icon: "#1E8A5F" },
    current: { ring: "#1D5FA3", fill: "#E8F0FA", icon: "#1D5FA3" },
    waiting: { ring: "#C9CCC9", fill: "#F5F6F5", icon: "#9A9D9A" },
    flagged: { ring: "#C23B3B", fill: "#FBEAEA", icon: "#C23B3B" },
  } as const;
  const c = colors[state];

  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      className={state === "current" ? "animate-pulse" : state === "done" && animate ? "stamp-done" : ""}
      aria-hidden
    >
      <circle cx="17" cy="17" r="15.5" stroke={c.ring} strokeWidth="2" fill={c.fill} strokeDasharray={state === "waiting" ? "3 3" : undefined} />
      {state === "done" && (
        <path d="M11 17.5 15 21.5 23 12.5" stroke={c.icon} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      )}
      {state === "current" && <circle cx="17" cy="17" r="4.5" fill={c.icon} />}
      {state === "flagged" && (
        <>
          <line x1="17" y1="10.5" x2="17" y2="18.5" stroke={c.icon} strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="17" cy="22.5" r="1.4" fill={c.icon} />
        </>
      )}
      {state === "waiting" && <circle cx="17" cy="17" r="2.2" fill={c.icon} />}
    </svg>
  );
}
