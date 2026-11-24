
"use client";

import { useState } from "react";
import Link from "next/link";
import { vocabularyGeneratorPrompt } from "./vocabulary-generator-prompt";

const features = [
  {
    icon: "📚",
    title: "Vocabulary Management",
    description:
      "Organize your English vocabulary and explore words by grammatical category.",
  },
  {
    icon: "📊",
    title: "Learning Progress",
    description:
      "Track your vocabulary collection and monitor your learning progress.",
  },
  {
    icon: "🔎",
    title: "Search and Filters",
    description:
      "Find words quickly using search and grammatical category filters.",
  },
  {
    icon: "📥",
    title: "Vocabulary Import",
    description:
      "Import multiple words at once using structured JSON data.",
  },
];

const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Prisma",
  "PostgreSQL",
];

export function AboutPage() {
  const [copied, setCopied] = useState(false);

  async function handleCopyPrompt() {
    try {
      await navigator.clipboard.writeText(vocabularyGeneratorPrompt);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-5xl space-y-12 px-6 py-12 md:px-10">

        {/* Header */}
        <header className="space-y-4">
          <Link
            href="/home"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            ← Back to Home
          </Link>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              About the project
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              About Vocabulary Tracer
            </h1>

            <p className="mt-4 max-w-2xl leading-relaxed text-slate-600 dark:text-slate-400">
              Vocabulary Tracer is a personal English vocabulary management
              application designed to help learners organize, track and
              expand their English vocabulary.
            </p>
          </div>
        </header>

        {/* Mission */}
        <section className="rounded-2xl border border-slate-200 bg-white p-7 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-semibold">Our purpose</h2>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-400">
            Learning a new language requires consistency and organization.
            Vocabulary Tracer provides a structured environment where
            learners can collect new words, understand their grammatical
            categories, explore meanings and follow their learning journey.
          </p>
        </section>

        {/* Features */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Main features</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Tools designed to support your vocabulary learning process.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
              >
                <span className="text-3xl">{feature.icon}</span>

                <h3 className="mt-4 font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Technologies */}
        <section>
          <h2 className="text-2xl font-bold">Technologies</h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Technologies used to build Vocabulary Tracer.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            {technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              >
                {technology}
              </span>
            ))}
          </div>
        </section>

        {/* AI Prompt */}
        <section
          id="vocabulary-generator"
          className="rounded-2xl border border-indigo-200 bg-white p-6 dark:border-indigo-900 dark:bg-slate-900 md:p-8"
        >
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <span className="text-3xl">🤖</span>

              <h2 className="mt-3 text-2xl font-bold">
                AI Vocabulary Generator
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                Use this prompt with an AI assistant to generate vocabulary
                data compatible with Vocabulary Tracer.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopyPrompt}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            >
              {copied ? "✓ Copied!" : "Copy prompt"}
            </button>
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-100 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Generator instructions
              </span>

              <span className="text-xs text-slate-400">
                {vocabularyGeneratorPrompt.length.toLocaleString()} characters
              </span>
            </div>

            <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap break-words bg-slate-50 p-5 text-xs leading-relaxed text-slate-700 dark:bg-slate-950 dark:text-slate-300">
              {vocabularyGeneratorPrompt}
            </pre>
          </div>

          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            Copy the prompt and paste it into your preferred AI assistant.
            Then request the quantity and topic of words you want to import.
          </p>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-200 pt-6 text-center dark:border-slate-800">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Vocabulary Tracer © 2026
          </p>

          <p className="mt-2 text-xs text-slate-500">
            Learn, organize and expand your vocabulary.
          </p>
        </footer>
      </div>
    </main>
  );
}
