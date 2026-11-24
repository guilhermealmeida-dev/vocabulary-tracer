import { z } from "zod";
import { PartOfSpeechType } from "@/generated/prisma/enums";

const wordVariationSchema = z.object({
  form: z.string().trim().min(1),
  type: z.string().trim().min(1),
  translations: z.array(z.string().trim().min(1)).min(1),
});

const irregularFormSchema = z.object({
  pastSimple: z.string().trim().min(1),
  pastSimpleTranslations: z.array(z.string().trim().min(1)).min(1),
  pastParticiple: z.string().trim().min(1),
  pastParticipleTranslations: z.array(z.string().trim().min(1)).min(1),
});

const wordCategorySchema = z.object({
  category: z.nativeEnum(PartOfSpeechType),
  meanings: z.array(z.string().trim().min(1)).min(1),
  variations: z.array(wordVariationSchema).default([]),
  irregularForm: irregularFormSchema.optional(),
}).superRefine((category, context) => {
  if (
    category.irregularForm &&
    category.category !== PartOfSpeechType.VERB
  ) {
    context.addIssue({
      code: "custom",
      message: "Irregular forms are only allowed for verbs.",
      path: ["irregularForm"],
    });
  }
});

const vocabularyWordSchema = z.object({
  name: z.string().trim().min(1),
  categories: z.array(wordCategorySchema).min(1),
}).superRefine((word, context) => {
  const categories = word.categories.map((item) => item.category);

  if (new Set(categories).size !== categories.length) {
    context.addIssue({
      code: "custom",
      message: "A word cannot contain duplicate categories.",
      path: ["categories"],
    });
  }
});

export const importVocabularySchema = z.array(
  vocabularyWordSchema,
).min(1, "At least one word is required.");

export type ImportVocabularyInput = z.infer<
  typeof importVocabularySchema
>;
