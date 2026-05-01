// components/AtAGlance.jsx
'use client';

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatRupee } from '@/lib/calculations';

const DONUT_BG_LIGHT = '#FFFFFF'; // must match bg-white on the donut card, NOT the page bg
const DONUT_BG_DARK = '#1C1C1E';

export default function AtAGlance({ stats, transactions, isDark }) {
  const { totalEarnings, totalExpenses, netProfit, donutData, weekData } = stats;

  const donutWithBg = [
    ...donutData.slice(0, 2),
    { ...donutData[2], color: isDark ? DONUT_BG_DARK : DONUT_BG_LIGHT },
  ];

  return (
    <section aria-label="Financial summary" className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
      {/* ── Donut chart ─────────────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl border border-gray-200 dark:border-[#2C2C2E] p-5 flex flex-col items-center">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
          Net Profit
        </p>

        <div className="relative w-44 h-44">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={donutWithBg}
                cx="50%"
                cy="50%"
                innerRadius={54}
                outerRadius={72}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                strokeWidth={0}
                aria-label="Net profit donut chart"
              >
                {donutWithBg.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Centre label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] text-gray-400 leading-tight">Net</span>
            <span className="font-display font-bold text-xl text-gray-900 dark:text-white leading-tight">
              {formatRupee(netProfit)}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-5 mt-3">
          {[
            { color: '#22C55E', label: 'Earned' },
            { color: '#EF4444', label: 'Spent' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: color }} />
              <span className="text-xs text-gray-400">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right column ────────────────────────────────────────────────────── */}
      <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Earned card */}
        <div
          className="bg-white dark:bg-[#1C1C1E] rounded-2xl border border-gray-200 dark:border-[#2C2C2E] p-5"
          style={{
            background: isDark
              ? undefined
              : 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-green-600 dark:text-green-400">↗ Earned</span>
            <div className="w-7 h-7 rounded-full bg-green-100 dark:bg-green-500/15 flex items-center justify-center">
              <TrendingUp size={13} className="text-green-500" aria-hidden="true" />
            </div>
          </div>
          <p className="font-display font-bold text-2xl text-green-600 dark:text-green-400">
            {formatRupee(totalEarnings)}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            {transactions.filter((t) => t.type === 'earning').length} transactions
          </p>
        </div>

        {/* Spent card */}
        <div
          className="bg-white dark:bg-[#1C1C1E] rounded-2xl border border-gray-200 dark:border-[#2C2C2E] p-5"
          style={{
            background: isDark
              ? undefined
              : 'linear-gradient(135deg, #fff1f2, #ffe4e6)',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-red-600 dark:text-red-400">↘ Spent</span>
            <div className="w-7 h-7 rounded-full bg-red-100 dark:bg-red-500/15 flex items-center justify-center">
              <TrendingDown size={13} className="text-red-500" aria-hidden="true" />
            </div>
          </div>
          <p className="font-display font-bold text-2xl text-red-600 dark:text-red-400">
            {formatRupee(totalExpenses)}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            {transactions.filter((t) => t.type === 'expense').length} transactions
          </p>
        </div>

        {/* Weekly bar chart */}
        <div className="sm:col-span-2 bg-white dark:bg-[#1C1C1E] rounded-2xl border border-gray-200 dark:border-[#2C2C2E] p-5">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
            This Week
          </p>
          <ResponsiveContainer width="100%" height={90}>
            <BarChart data={weekData} barSize={22} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: isDark ? '#9CA3AF' : '#6B7280' }}
              />
              <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                {weekData.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={entry.isToday ? '#F97316' : entry.amount > 0 ? '#FDBA74' : isDark ? '#2C2C2E' : '#E5E7EB'}
                  />
                ))}
              </Bar>
              <Tooltip
                cursor={false}
                contentStyle={{
                  background: isDark ? '#1C1C1E' : '#fff',
                  border: `1px solid ${isDark ? '#2C2C2E' : '#E5E7EB'}`,
                  borderRadius: 10,
                  fontSize: 12,
                  fontFamily: 'DM Sans, sans-serif',
                  color: isDark ? '#ffffff' : '#111111',  // fixes unreadable text in light mode
                }}
                labelStyle={{ color: isDark ? '#9CA3AF' : '#6B7280' }}
                itemStyle={{ color: isDark ? '#ffffff' : '#111111' }}
                formatter={(v) => [formatRupee(v), 'Earned']}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}