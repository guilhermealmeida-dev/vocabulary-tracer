
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { GetSessionUseCase } from "@/features/auth/session/get-session.use-case";
import { UserRepository } from "@/features/repositories/user.repository";
import { VocabularyRepository } from "@/features/repositories/vocabulary.repository";

import { HomeDashboard } from "@/features/home/home-dashboard";
import type { Category } from "@/features/home/category-statistics";
import type { VocabularyWord } from "@/features/home/vocabulary-section";

import { PartOfSpeechType } from "@/generated/prisma/enums";

const CATEGORY_DETAILS: Record<
  PartOfSpeechType,
  Omit<Category, "count">
> = {
  NOUN: {
    name: "Nouns",
    translation: "Substantivos",
    color: "bg-blue-500",
  },
  VERB: {
    name: "Verbs",
    translation: "Verbos",
    color: "bg-violet-500",
  },
  ADJECTIVE: {
    name: "Adjectives",
    translation: "Adjetivos",
    color: "bg-amber-500",
  },
  ADVERB: {
    name: "Adverbs",
    translation: "Advérbios",
    color: "bg-emerald-500",
  },
  PRONOUN: {
    name: "Pronouns",
    translation: "Pronomes",
    color: "bg-cyan-500",
  },
  PREPOSITION: {
    name: "Prepositions",
    translation: "Preposições",
    color: "bg-pink-500",
  },
  CONJUNCTION: {
    name: "Conjunctions",
    translation: "Conjunções",
    color: "bg-orange-500",
  },
  DETERMINER: {
    name: "Determiners",
    translation: "Determinantes",
    color: "bg-indigo-500",
  },
  AUXILIARY_VERB: {
    name: "Auxiliary verbs",
    translation: "Verbos auxiliares",
    color: "bg-rose-500",
  },
  INTERJECTION: {
    name: "Interjections",
    translation: "Interjeições",
    color: "bg-teal-500",
  },
};

export const instant = false;

export default async function HomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  const userRepository = new UserRepository();
  const getSessionUseCase = new GetSessionUseCase(userRepository);

  const user = await getSessionUseCase.execute(token);

  if (!user) {
    redirect("/auth/login");
  }

  const vocabularyRepository = new VocabularyRepository();

  const [totalWords, categoryCounts, userWords] = await Promise.all([
    vocabularyRepository.countByUserId(user.id),
    vocabularyRepository.countCategoriesByUserId(user.id),
    vocabularyRepository.findByUserId(user.id),
  ]);

  const countsByCategory = new Map(
    categoryCounts.map((item) => [
      item.category,
      item._count._all,
    ]),
  );

  const categories: Category[] = Object.values(PartOfSpeechType).map(
    (category) => ({
      ...CATEGORY_DETAILS[category],
      count: countsByCategory.get(category) ?? 0,
    }),
  );

  const totalCategories = Object.values(PartOfSpeechType).length;

  const words: VocabularyWord[] = userWords.map(({ word }) => ({
    id: word.id,
    name: word.name,

    categories: word.partsOfSpeech.map((item) => ({
      category: item.category,

      meanings: item.meanings.map((meaning) => meaning.meaning),

      variations: item.variations.map((variation) => ({
        id: variation.id,
        type: variation.type,
        form: variation.form,
        translations: variation.translations,
      })),
    })),
  }));

  return (
    <HomeDashboard
      userName={user.name}
      totalWords={totalWords}
      totalCategories={totalCategories}
      categories={categories}
      words={words}
    />
  );
}
