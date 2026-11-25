
"use client";

import { useMemo, useState } from "react";
import { PartOfSpeechType } from "@/generated/prisma/enums";

type Category = PartOfSpeechType;

export interface VocabularyVariation {
  id: string;
  type: string;
  form: string;
  translations: string[];
}

export interface VocabularyWordCategory {
  category: PartOfSpeechType;
  meanings: string[];
  variations: VocabularyVariation[];
}

export interface VocabularyWord {
  id: string;
  name: string;
  categories: VocabularyWordCategory[];
}

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

const variationLabels: Record<string, string> = {
  PLURAL: "Plural",
  PAST: "Simple Past",
  PAST_PARTICIPLE: "Past Participle",
  PRESENT_PARTICIPLE: "Present Participle",
  THIRD_PERSON_SINGULAR: "Third Person Singular",
  COMPARATIVE: "Comparative",
  SUPERLATIVE: "Superlative",
};

function getCategoryLabel(category: Category) {
  return categories.find((item) => item.value === category)?.label ?? category;
}

function getVariationLabel(type: string) {
  return (
    variationLabels[type] ??
    type.replaceAll("_", " ").toLowerCase()
  );
}

interface WordCardProps {
  word: VocabularyWord;
  onSelect: (word: VocabularyWord) => void;
  onEdit: (word: VocabularyWord) => void;
  onDelete: (word: VocabularyWord) => void;
}

function WordCard({
  word,
  onSelect,
  onEdit,
  onDelete,
}: WordCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const meanings = word.categories.flatMap(
    (category) => category.meanings,
  );

  return (
    <article className="relative rounded-xl border border-slate-200 bg-white p-5 transition hover:border-indigo-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-700">
      <div className="flex items-start justify-between gap-3">
        <button
          type="button"
          onClick={() => onSelect(word)}
          className="min-w-0 flex-1 text-left"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {word.name}
          </h3>
        </button>

        <div className="relative">
          <button
            type="button"
            aria-label={`Options for ${word.name}`}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="rounded-lg px-2 py-1 text-xl font-bold text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            ⋯
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-full z-20 mt-1 w-36 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-800">
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  onEdit(word);
                }}
                className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  onDelete(word);
                }}
                className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => onSelect(word)}
        className="mt-3 block w-full text-left"
      >
        <div className="flex flex-wrap gap-2">
          {word.categories.map((category) => (
            <span
              key={category.category}
              className="rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"
            >
              {getCategoryLabel(category.category)}
            </span>
          ))}
        </div>

        <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {meanings.join(", ")}
          </p>
        </div>
      </button>
    </article>
  );
}

function WordDetailsModal({
  word,
  onClose,
}: {
  word: VocabularyWord;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="word-modal-title"
        className="flex max-h-[85vh] w-full max-w-lg flex-col rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
              Vocabulary details
            </p>

            <h2
              id="word-modal-title"
              className="mt-1 text-2xl font-bold text-slate-900 dark:text-white"
            >
              {word.name}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg px-2 py-1 text-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            ×
          </button>
        </div>

        <div className="mt-6 space-y-6 overflow-y-auto pr-1">
          <section>
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Categories
            </h3>

            <div className="mt-2 flex flex-wrap gap-2">
              {word.categories.map((category) => (
                <span
                  key={category.category}
                  className="rounded-md bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"
                >
                  {getCategoryLabel(category.category)}
                </span>
              ))}
            </div>
          </section>

          {word.categories.map((category) => (
            <section
              key={category.category}
              className="space-y-4 border-t border-slate-100 pt-5 dark:border-slate-800"
            >
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                {getCategoryLabel(category.category)}
              </h3>

              {category.meanings.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    Meanings
                  </h4>

                  <ul className="mt-2 space-y-2">
                    {category.meanings.map((meaning, index) => (
                      <li
                        key={`${meaning}-${index}`}
                        className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {meaning}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {category.variations.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    Variations
                  </h4>

                  <ul className="mt-2 space-y-2">
                    {category.variations.map((variation) => (
                      <li
                        key={variation.id}
                        className="rounded-lg bg-slate-50 px-3 py-3 dark:bg-slate-800"
                      >
                        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                          {getVariationLabel(variation.type)}
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-900 dark:text-white">
                          {variation.form}
                        </p>

                        {variation.translations.length > 0 && (
                          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            {variation.translations.join(", ")}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export function VocabularySection({
  words,
}: VocabularySectionProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    Category | "ALL"
  >("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedWord, setSelectedWord] =
    useState<VocabularyWord | null>(null);

  const filteredWords = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return words.filter((word) => {
      const matchesSearch =
        word.name.toLowerCase().includes(normalizedSearch) ||
        word.categories.some((category) => {
          const matchesMeaning = category.meanings.some((meaning) =>
            meaning.toLowerCase().includes(normalizedSearch),
          );

          const matchesVariation = category.variations.some(
            (variation) =>
              variation.form.toLowerCase().includes(normalizedSearch) ||
              variation.translations.some((translation) =>
                translation.toLowerCase().includes(normalizedSearch),
              ),
          );

          return matchesMeaning || matchesVariation;
        });

      const matchesCategory =
        selectedCategory === "ALL" ||
        word.categories.some(
          (category) => category.category === selectedCategory,
        );

      return matchesSearch && matchesCategory;
    });
  }, [words, search, selectedCategory]);

  const totalPages = Math.ceil(
    filteredWords.length / ITEMS_PER_PAGE,
  );

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

  function handleEdit(word: VocabularyWord) {
    console.log("Edit:", word.id);
  }

  function handleDelete(word: VocabularyWord) {
    console.log("Delete:", word.id);
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
            <WordCard
              key={word.id}
              word={word}
              onSelect={setSelectedWord}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
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
            {Math.min(
              currentPage * ITEMS_PER_PAGE,
              filteredWords.length,
            )}{" "}
            of {filteredWords.length} words
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((page) => page - 1)
              }
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none dark:disabled:bg-slate-800 dark:disabled:text-slate-500 dark:focus:ring-offset-slate-900"
            >
              <span aria-hidden="true">←</span>
              Previous
            </button>

            <span className="min-w-16 text-center text-sm font-semibold text-slate-700 dark:text-slate-200">
              {currentPage} / {totalPages}
            </span>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((page) => page + 1)
              }
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none dark:disabled:bg-slate-800 dark:disabled:text-slate-500 dark:focus:ring-offset-slate-900"
            >
              Next
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      )}

      {selectedWord && (
        <WordDetailsModal
          word={selectedWord}
          onClose={() => setSelectedWord(null)}
        />
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
