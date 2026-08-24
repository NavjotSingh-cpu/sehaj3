import Link from "next/link";

export function TopBar({ back }: { back?: { href: string; label: string } }) {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
        {back ? (
          <Link href={back.href} className="flex items-center gap-1 text-[14px] font-medium text-ink/70">
            <span aria-hidden>←</span> {back.label}
          </Link>
        ) : (
          <Link href="/" className="font-display text-[19px] font-bold tracking-tight text-ink">
            Sahaj
          </Link>
        )}
        <Link
          href="/about-this-build"
          className="rounded-full border border-marigold-dark/30 bg-marigold-light px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-marigold-dark"
        >
          Hackathon prototype
        </Link>
      </div>
    </header>
  );
}
