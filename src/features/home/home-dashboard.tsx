import { HomeHeader } from "./home-header";
import { OverviewCards } from "./overview-cards";
import { CategoryStatistics, Category } from "./category-statistics";
import { VocabularySection, VocabularyWord } from "./vocabulary-section";
import { AppHeader } from "@/components/layout/app-layout";

interface HomeDashboardProps {
  userName: string;
  totalWords: number;
  totalCategories: number;
  categories: Category[];
  words: VocabularyWord[];
}

export function HomeDashboard({
  userName,
  totalWords,
  totalCategories,
  categories,
  words,
}: HomeDashboardProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <AppHeader userName={userName} />

      <main className="px-6 py-8 md:px-10">
        <div className="mx-auto max-w-7xl space-y-8">
          <HomeHeader />

          <OverviewCards
            totalWords={totalWords}
            totalCategories={totalCategories}
          />

          <CategoryStatistics categories={categories} />

          <VocabularySection words={words} />
        </div>
      </main>
    </div>
  );
}
