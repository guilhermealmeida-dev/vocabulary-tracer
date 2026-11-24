"use client";

import { useState } from "react";
import { ImportVocabularyUseCase } from "../vocabulary/import/import-vocabulary.use-case";
import { importVocabulary } from "@/services/vocabulary/vocabulary.service";

export function HomeHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");
  const [isImporting, setIsImporting] = useState(false);

  async function handleImport() {
    setError("");
    setIsImporting(true);

    try {
      const useCase = new ImportVocabularyUseCase();
      const data = useCase.execute(jsonInput);

      const result = await importVocabulary(data);

      console.log("Import result:", result);

      handleCloseModal();
      window.location.reload();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to import vocabulary.",
      );
    } finally {
      setIsImporting(false);
    }
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setJsonInput("");
    setError("");
  }

  return (
    <>
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
            VOCABULARY OVERVIEW
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Track your vocabulary progress and learning activities.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          <span className="text-lg leading-none">+</span>
          Add word
        </button>
      </header>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl dark:bg-slate-900">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Import vocabulary
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Paste your vocabulary JSON below.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleCloseModal}
                className="text-xl text-slate-400 hover:text-slate-600 dark:hover:text-white"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            <textarea
              value={jsonInput}
              onChange={(event) => setJsonInput(event.target.value)}
              placeholder={`[
  {
    "name": "went",
    "category": "VERB"
  }
]`}
              rows={12}
              className="mt-5 w-full resize-y rounded-lg border border-slate-300 bg-slate-50 p-4 font-mono text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />

            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => handleCloseModal()}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleImport}
                disabled={!jsonInput.trim() || isImporting}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isImporting ? "Importing..." : "Import vocabulary"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
