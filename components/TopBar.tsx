import Link from "next/link";

export function TopBar({ back }: { back?: { href: string; label: string } }) {
  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {back ? (
          <Link href={back.href} className="flex min-h-10 items-center gap-2 rounded-stamp px-2 text-[14px] font-semibold text-ink/70 transition-colors hover:bg-white hover:text-ink">
            <span aria-hidden className="text-lg leading-none">←</span> {back.label}
          </Link>
        ) : (
          <Link href="/" className="flex items-center gap-2 font-display text-[19px] font-bold tracking-tight text-ink">
            <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-trust text-[15px] text-white shadow-sm" aria-hidden>✓</span>
            Sahaj
          </Link>
        )}
        <Link
          href="/about-this-build"
          className="rounded-full border border-marigold-dark/20 bg-marigold-light px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-marigold-dark sm:px-3 sm:text-[11px]"
        >
          Hackathon prototype
        </Link>
      </div>
    </header>
  );
}
