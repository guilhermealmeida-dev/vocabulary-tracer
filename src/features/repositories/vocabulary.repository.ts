import "server-only";

import { getDb } from "@/lib/prisma";
import { ImportVocabularyInput } from "../vocabulary/import/import-vocabulary.schema";

export class VocabularyRepository {
  async countByUserId(userId: string) {
    const db = getDb();

    const { total } = await db.orm.public.UserWord
      .where({ userId })
      .aggregate((aggregate) => ({ total: aggregate.count() }));

    return total;
  }

  async countCategoriesByUserId(userId: string) {
    const db = getDb();

    const rows = await db.orm.public.WordCategory
      .where((category) =>
        category.word.some((word) =>
          word.users.some((userWord) => userWord.userId.eq(userId)),
        ),
      )
      .groupBy("category")
      .aggregate((aggregate) => ({ total: aggregate.count() }));

    return rows.map((row) => ({
      category: row.category,
      _count: { _all: row.total },
    }));
  }

  async findByUserId(userId: string) {
    const db = getDb();

    return db.orm.public.UserWord
      .where({ userId })
      .include("word", (word) =>
        word
          .select("id", "name")
          .include("partsOfSpeech", (category) =>
            category
              .select("category")
              .include("meanings", (meaning) => meaning.select("meaning")),
          ),
      )
      .orderBy((userWord) => userWord.createdAt.desc())
      .all();
  }

  async importWords(userId: string, words: ImportVocabularyInput) {
    const db = getDb();

    return db.transaction(async (tx) => {
      for (const item of words) {
        // Reutiliza a palavra se ela já existir.
        await tx.orm.public.Word.createAll(
          [{ name: item.name }],
          { onConflict: "skip" },
        );

        const word = await tx.orm.public.Word
          .where((candidate) => candidate.name.eq(item.name))
          .first();

        if (!word) {
          throw new Error(`Word "${item.name}" could not be stored.`);
        }

        // Associa a palavra ao usuário sem duplicar a associação.
        await tx.orm.public.UserWord.createAll(
          [{ userId, wordId: word.id }],
          { onConflict: "skip" },
        );

        for (const categoryInput of item.categories) {
          await tx.orm.public.WordCategory.createAll(
            [{ wordId: word.id, category: categoryInput.category }],
            { onConflict: "skip" },
          );

          const wordCategory = await tx.orm.public.WordCategory
            .where({ wordId: word.id, category: categoryInput.category })
            .first();

          if (!wordCategory) {
            throw new Error(
              `Category "${categoryInput.category}" could not be stored.`,
            );
          }

          for (const meaning of categoryInput.meanings) {
            await tx.orm.public.WordMeaning.createAll(
              [{ wordCategoryId: wordCategory.id, meaning }],
              { onConflict: "skip" },
            );
          }

          for (const variation of categoryInput.variations) {
            const updated = await tx.orm.public.WordVariation
              .where({
                wordCategoryId: wordCategory.id,
                form: variation.form,
              })
              .update({
                type: variation.type,
                translations: variation.translations,
              });

            if (!updated) {
              await tx.orm.public.WordVariation.create({
                wordCategoryId: wordCategory.id,
                form: variation.form,
                type: variation.type,
                translations: variation.translations,
              });
            }
          }

          if (categoryInput.irregularForm) {
            const irregular = categoryInput.irregularForm;

            const updated = await tx.orm.public.IrregularVerbForm
              .where({ wordCategoryId: wordCategory.id })
              .update({
                pastSimple: irregular.pastSimple,
                pastSimpleTranslations: irregular.pastSimpleTranslations,
                pastParticiple: irregular.pastParticiple,
                pastParticipleTranslations:
                  irregular.pastParticipleTranslations,
              });

            if (!updated) {
              await tx.orm.public.IrregularVerbForm.create({
                wordCategoryId: wordCategory.id,
                pastSimple: irregular.pastSimple,
                pastSimpleTranslations: irregular.pastSimpleTranslations,
                pastParticiple: irregular.pastParticiple,
                pastParticipleTranslations:
                  irregular.pastParticipleTranslations,
              });
            }
          }
        }
      }

      return {
        imported: words.length,
      };
    });
  }
}
