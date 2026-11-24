import {
  importVocabularySchema,
  type ImportVocabularyInput,
} from "./import-vocabulary.schema";

export class ImportVocabularyUseCase {
  execute(json: string): ImportVocabularyInput {
    let data: unknown;

    try {
      data = JSON.parse(json);
    } catch {
      throw new Error("The provided content is not valid JSON.");
    }

    const result = importVocabularySchema.safeParse(data);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => {
        const path = issue.path.join(".");

        return path
          ? `${path}: ${issue.message}`
          : issue.message;
      });

      throw new Error(errors.join("\n"));
    }

    return result.data;
  }
}
