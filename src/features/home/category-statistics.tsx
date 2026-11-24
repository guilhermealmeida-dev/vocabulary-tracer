
export interface Category {
  name: string;
  translation: string;
  count: number;
  color: string;
}

interface CategoryStatisticsProps {
  categories: Category[];
}

interface CategoryItemProps {
  category: Category;
  maxCount: number;
}

function CategoryItem({ category, maxCount }: CategoryItemProps) {
  const percentage =
    maxCount > 0 ? (category.count / maxCount) * 100 : 0;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4">
        <div>
          <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
            {category.name}
          </span>

          <span className="ml-2 text-xs text-slate-400">
            {category.translation}
          </span>
        </div>

        <span className="text-sm font-semibold tabular-nums text-slate-700 dark:text-slate-300">
          {category.count}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className={`h-full rounded-full ${category.color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export function CategoryStatistics({
  categories,
}: CategoryStatisticsProps) {
  const maxCount = Math.max(
    0,
    ...categories.map((category) => category.count),
  );

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Parts of Speech
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Your vocabulary distribution by grammatical category.
        </p>
      </div>

      <div className="grid gap-x-10 gap-y-5 md:grid-cols-2">
        {categories.map((category) => (
          <CategoryItem
            key={category.name}
            category={category}
            maxCount={maxCount}
          />
        ))}
      </div>
    </section>
  );
}
