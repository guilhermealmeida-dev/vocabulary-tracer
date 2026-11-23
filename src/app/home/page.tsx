import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/home" className="text-xl font-bold">
            Vocabulary<span className="text-indigo-400">Tracer</span>
          </Link>

          <Link
            href="/login"
            className="text-sm text-slate-400 transition hover:text-white"
          >
            Sign out
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <section>
          <h1 className="text-3xl font-bold">Welcome back!</h1>

          <p className="mt-2 text-slate-400">
            Keep learning and expanding your English vocabulary.
          </p>
        </section>

        <section className="mt-10 grid gap-5 sm:grid-cols-3">
          {[
            { title: "Total Words", value: "0" },
            { title: "Recognized", value: "0" },
            { title: "Known Words", value: "0" },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-slate-800 bg-slate-900 p-6"
            >
              <p className="text-sm text-slate-400">{item.title}</p>
              <p className="mt-3 text-3xl font-bold">{item.value}</p>
            </div>
          ))}
        </section>

        <section className="mt-10 rounded-xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">My Vocabulary</h2>

              <p className="mt-1 text-sm text-slate-400">
                Manage and review your English words.
              </p>
            </div>

            <button
              type="button"
              className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium transition hover:bg-indigo-500"
            >
              + Add Word
            </button>
          </div>

          <div className="py-16 text-center">
            <p className="text-lg font-medium">No words yet</p>

            <p className="mt-2 text-sm text-slate-400">
              Start building your vocabulary by adding your first word.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}