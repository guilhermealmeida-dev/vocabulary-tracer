import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
}

export function AuthLayout({
  children,
  title,
  description,
  footerText,
  footerLinkText,
  footerLinkHref,
}: AuthLayoutProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 text-white">
      <div className="w-full max-w-md">
        <header className="mb-8 text-center">
          <Link href="/" className="text-3xl font-bold tracking-tight">
            Vocabulary<span className="text-indigo-400">Tracer</span>
          </Link>

          <p className="mt-3 text-sm text-slate-400">
            Your personal English vocabulary tracker.
          </p>
        </header>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
          <div className="mb-7">
            <h1 className="text-2xl font-semibold">{title}</h1>
            <p className="mt-2 text-sm text-slate-400">{description}</p>
          </div>

          {children}

          <p className="mt-7 text-center text-sm text-slate-400">
            {footerText}{" "}
            <Link
              href={footerLinkHref}
              className="font-medium text-indigo-400 hover:text-indigo-300"
            >
              {footerLinkText}
            </Link>
          </p>
        </section>

        <p className="mt-6 text-center text-xs text-slate-600">
          Vocabulary Tracer © 2026
        </p>
      </div>
    </main>
  );
}