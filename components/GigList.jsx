'use client';

import { formatRupee } from '@/lib/calculations';

function ratioColor(ratio) {
  if (ratio > 30) return '#EF4444';
  if (ratio > 15) return '#F97316';
  return '#22C55E';
}

export default function GigList({ gigStats }) {
  if (!gigStats.length) {
    return (
      <section aria-label="Your gigs" className="mb-5">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
          Your Gigs
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          No gigs yet. Add one via the Add Transaction modal.
        </p>
      </section>
    );
  }

  return (
    <section aria-label="Your gigs" className="mb-5">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
        Your Gigs
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {gigStats.map((gig) => (
          <article key={gig.id} className="bg-white dark:bg-[#1C1C1E] rounded-2xl border border-gray-200 dark:border-[#2C2C2E] p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ background: gig.color }} aria-hidden="true">
                {gig.initial}
              </div>
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white">{gig.name}</h3>
            </div>

            <div className="flex flex-wrap gap-2 text-xs mb-4">
              <span className="text-green-500 font-medium">{formatRupee(gig.earned)}</span>
              <span className="text-gray-300 dark:text-gray-600">−</span>
              <span className="text-red-500 font-medium">{formatRupee(gig.spent)}</span>
              <span className="text-gray-300 dark:text-gray-600">=</span>
              <span className="font-semibold text-gray-900 dark:text-white">{formatRupee(gig.net)}</span>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[10px] text-gray-400 dark:text-gray-500">Expense Ratio</span>
                <span className="text-[10px] font-semibold" style={{ color: ratioColor(gig.ratio) }}>{gig.ratio}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-gray-200 dark:bg-[#2C2C2E]">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(gig.ratio, 100)}%`, background: ratioColor(gig.ratio) }} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}