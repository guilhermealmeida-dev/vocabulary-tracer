
interface OverviewCardsProps {
  totalWords: number;
  totalCategories: number;
}

export function OverviewCards({
  totalWords,
  totalCategories,
}: OverviewCardsProps) {
  const cards = [
    {
      title: "Total words",
      value: totalWords,
      description: "Words in your vocabulary",
      icon: "📚",
    },
    {
      title: "Categories",
      value: totalCategories,
      description: "Grammatical categories",
      icon: "🗂️",
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2">
      {cards.map((card) => (
        <article
          key={card.title}
          className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {card.title}
            </p>
            <span className="text-xl">{card.icon}</span>
          </div>

          <p className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">
            {card.value}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            {card.description}
          </p>
        </article>
      ))}
    </section>
  );
}
