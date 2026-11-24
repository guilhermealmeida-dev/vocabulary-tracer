import type { ImportVocabularyInput } from "@/features/vocabulary/import/import-vocabulary.schema";

interface ImportVocabularyResponse {
  message: string;
  data: {
    imported: number;
  };
}

export async function importVocabulary(
  words: ImportVocabularyInput,
): Promise<ImportVocabularyResponse> {
  const response = await fetch("/api/vocabulary/import", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(words),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ?? "Unable to import vocabulary.",
    );
  }

  return result;
}
