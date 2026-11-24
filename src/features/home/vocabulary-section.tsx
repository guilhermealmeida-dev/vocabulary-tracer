
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PartOfSpeechType } from "@/generated/prisma/enums";

type Category = PartOfSpeechType;

export type VocabularyWord = {
  id: string;
  name: string;
  categories: Category[];
  meanings: string[];
};

interface VocabularySectionProps {
  words: VocabularyWord[];
}

const categories: { value: Category; label: string }[] = [
  { value: "NOUN", label: "Nouns" },
  { value: "VERB", label: "Verbs" },
  { value: "ADJECTIVE", label: "Adjectives" },
  { value: "ADVERB", label: "Adverbs" },
  { value: "PRONOUN", label: "Pronouns" },
  { value: "PREPOSITION", label: "Prepositions" },
  { value: "CONJUNCTION", label: "Conjunctions" },
  { value: "DETERMINER", label: "Determiners" },
  { value: "INTERJECTION", label: "Interjections" },
  { value: "AUXILIARY_VERB", label: "Auxiliary verbs" },
];

const ITEMS_PER_PAGE = 6;

function getCategoryLabel(category: Category) {
  return categories.find((item) => item.value === category)?.label ?? category;
}

function WordCard({ word }: { word: VocabularyWord }) {
  return (
    <Link
      href={`/home/words/${word.id}`}
      className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:border-indigo-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-700"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          {word.name}
        </h3>

        <span className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-indigo-500">
          →
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {word.categories.map((category) => (
          <span
            key={category}
            className="rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"
          >
            {getCategoryLabel(category)}
          </span>
        ))}
      </div>

      <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {word.meanings.join(", ")}
        </p>
      </div>
    </Link>
  );
}

export function VocabularySection({ words }: VocabularySectionProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "ALL">("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredWords = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return words.filter((word) => {
      const matchesSearch =
        word.name.toLowerCase().includes(normalizedSearch) ||
        word.meanings.some((meaning) =>
          meaning.toLowerCase().includes(normalizedSearch),
        );

      const matchesCategory =
        selectedCategory === "ALL" ||
        word.categories.includes(selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [words, search, selectedCategory]);

  const totalPages = Math.ceil(filteredWords.length / ITEMS_PER_PAGE);

  const paginatedWords = filteredWords.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  function changeSearch(value: string) {
    setSearch(value);
    setCurrentPage(1);
  }

  function changeCategory(category: Category | "ALL") {
    setSelectedCategory(category);
    setCurrentPage(1);
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            My Vocabulary
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Browse and manage your vocabulary.
          </p>
        </div>

        <span className="text-sm text-slate-500 dark:text-slate-400">
          {filteredWords.length} words
        </span>
      </div>

      <div className="relative">
        <input
          type="search"
          value={search}
          onChange={(event) => changeSearch(event.target.value)}
          placeholder="Search words or meanings..."
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
        />

        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          ⌕
        </span>
      </div>

      <nav
        aria-label="Filter vocabulary by category"
        className="flex gap-2 overflow-x-auto pb-2"
      >
        <CategoryButton
          active={selectedCategory === "ALL"}
          onClick={() => changeCategory("ALL")}
        >
          All
        </CategoryButton>

        {categories.map((category) => (
          <CategoryButton
            key={category.value}
            active={selectedCategory === category.value}
            onClick={() => changeCategory(category.value)}
          >
            {category.label}
          </CategoryButton>
        ))}
      </nav>

      {paginatedWords.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedWords.map((word) => (
            <WordCard key={word.id} word={word} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 py-12 text-center dark:border-slate-700">
          <p className="font-medium text-slate-700 dark:text-slate-200">
            No words found
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Try another search or category.
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-5 dark:border-slate-800 sm:flex-row">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredWords.length)} of{" "}
            {filteredWords.length} words
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-800"
            >
              Previous
            </button>

            <span className="px-2 text-sm font-medium">
              {currentPage} / {totalPages}
            </span>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((page) => page + 1)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-800"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function CategoryButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition ${
        active
          ? "bg-indigo-600 text-white"
          : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
      }`}
    >
      {children}
    </button>
  );
}
