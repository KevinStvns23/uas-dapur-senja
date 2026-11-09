import Link from "next/link";

export default function AuthShell({ title, subtitle, footer, children }) {
  return (
    <main className="min-h-screen lg:grid lg:grid-cols-[1.05fr_1fr]">
      <aside className="relative flex min-h-32 flex-col justify-between overflow-hidden bg-gradient-to-b from-sun via-[#f2701a] to-ember px-6 py-6 text-white lg:min-h-screen lg:px-14 lg:py-12">
        <svg
          aria-hidden="true"
          viewBox="0 0 600 400"
          preserveAspectRatio="xMidYMax slice"
          className="absolute inset-0 h-full w-full"
        >
          <circle cx="430" cy="245" r="92" fill="#ffd27a" />
          <path d="M0 330 C120 270 220 300 320 280 S520 250 600 290 V400 H0Z" fill="#2e7d4f" />
          <path d="M0 372 C150 322 260 360 380 336 S540 330 600 352 V400 H0Z" fill="#173f2e" />
        </svg>

        <Link href="/" className="relative z-10 font-display text-2xl font-bold tracking-tight">
          Dapur Senja
        </Link>

        <div className="relative z-10 hidden max-w-md lg:block">
          <h2 className="font-display text-5xl font-bold leading-[1.05]">
            Masakan rumah, hangat sampai senja.
          </h2>
          <p className="mt-5 text-lg text-white/90">
            Masuk untuk memesan menu favoritmu dan menyimpan alamat antar.
          </p>
        </div>
        <div className="hidden lg:block" />
      </aside>

      <section className="flex items-center justify-center px-6 py-10 lg:px-16">
        <div className="w-full max-w-md">
          <h1 className="font-display text-3xl font-bold text-forest">{title}</h1>
          <p className="mt-2 text-ink/70">{subtitle}</p>
          <div className="mt-8">{children}</div>
          {footer && <p className="mt-8 text-sm text-ink/70">{footer}</p>}
        </div>
      </section>
    </main>
  );
}
