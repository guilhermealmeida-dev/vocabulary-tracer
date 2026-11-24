import "server-only";

import type { ImportVocabularyInput } from "./import-vocabulary.schema";
import { VocabularyRepository } from "@/features/repositories/vocabulary.repository";

export class SaveVocabularyImportUseCase {
  constructor(
    private readonly vocabularyRepository: VocabularyRepository,
  ) {}

  async execute(userId: string, words: ImportVocabularyInput) {
    return this.vocabularyRepository.importWords(userId, words);
  }
}
