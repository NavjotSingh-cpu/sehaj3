import Link from "next/link";

export function TopBar({ back }: { back?: { href: string; label: string } }) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ink text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        {back ? (
          <Link href={back.href} className="flex min-h-10 items-center gap-2 rounded-stamp px-2 text-[14px] font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white">
            <span aria-hidden className="text-lg leading-none">←</span> {back.label}
          </Link>
        ) : (
          <Link href="/" className="font-display text-[20px] font-bold tracking-[-0.05em] text-white">
            sahaj<span className="text-marigold">.</span>
          </Link>
        )}
        <Link
          href="/about-this-build"
          className="text-[12px] font-semibold text-white/60 transition-colors hover:text-white"
        >
          About this demo
        </Link>
      </div>
    </header>
  );
}
