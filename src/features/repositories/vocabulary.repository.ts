import "server-only";

import { prisma } from "@/lib/prisma";
import { ImportVocabularyInput } from "../vocabulary/import/import-vocabulary.schema";

export class VocabularyRepository {
  async countByUserId(userId: string) {
    return prisma.userWord.count({
      where: { userId },
    });
  }

  async countCategoriesByUserId(userId: string) {
    return prisma.wordCategory.groupBy({
      by: ["category"],
      where: {
        word: {
          users: {
            some: { userId },
          },
        },
      },
      _count: {
        _all: true,
      },
    });
  }

  async findByUserId(userId: string) {
    return prisma.userWord.findMany({
      where: { userId },
      select: {
        word: {
          select: {
            id: true,
            name: true,
            partsOfSpeech: {
              select: {
                category: true,
                meanings: {
                  select: {
                    meaning: true,
                  },
                },
                variations: {
                  select: {
                    id: true,
                    type: true,
                    form: true,
                    translations: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async importWords(userId: string, words: ImportVocabularyInput) {
    return prisma.$transaction(
      async (tx) => {
        for (const item of words) {
          // Reutiliza a palavra se ela já existir.
          const word = await tx.word.upsert({
            where: { name: item.name },
            update: {},
            create: { name: item.name },
          });

          // Associa a palavra ao usuário sem duplicar a associação.
          await tx.userWord.upsert({
            where: {
              userId_wordId: {
                userId,
                wordId: word.id,
              },
            },
            update: {},
            create: {
              userId,
              wordId: word.id,
            },
          });

          for (const categoryInput of item.categories) {
            const wordCategory = await tx.wordCategory.upsert({
              where: {
                wordId_category: {
                  wordId: word.id,
                  category: categoryInput.category,
                },
              },
              update: {},
              create: {
                wordId: word.id,
                category: categoryInput.category,
              },
            });

            for (const meaning of categoryInput.meanings) {
              await tx.wordMeaning.upsert({
                where: {
                  wordCategoryId_meaning: {
                    wordCategoryId: wordCategory.id,
                    meaning,
                  },
                },
                update: {},
                create: {
                  wordCategoryId: wordCategory.id,
                  meaning,
                },
              });
            }

            for (const variation of categoryInput.variations) {
              await tx.wordVariation.upsert({
                where: {
                  wordCategoryId_form: {
                    wordCategoryId: wordCategory.id,
                    form: variation.form,
                  },
                },
                update: {
                  type: variation.type,
                  translations: variation.translations,
                },
                create: {
                  wordCategoryId: wordCategory.id,
                  form: variation.form,
                  type: variation.type,
                  translations: variation.translations,
                },
              });
            }

            if (categoryInput.irregularForm) {
              const irregular = categoryInput.irregularForm;

              await tx.irregularVerbForm.upsert({
                where: {
                  wordCategoryId: wordCategory.id,
                },
                update: {
                  pastSimple: irregular.pastSimple,
                  pastSimpleTranslations: irregular.pastSimpleTranslations,
                  pastParticiple: irregular.pastParticiple,
                  pastParticipleTranslations:
                    irregular.pastParticipleTranslations,
                },
                create: {
                  wordCategoryId: wordCategory.id,
                  pastSimple: irregular.pastSimple,
                  pastSimpleTranslations: irregular.pastSimpleTranslations,
                  pastParticiple: irregular.pastParticiple,
                  pastParticipleTranslations:
                    irregular.pastParticipleTranslations,
                },
              });
            }
          }
        }

        return {
          imported: words.length,
        };
      },
      {
        maxWait: 10000,
        timeout: 30000,
      },
    );
  }
}
