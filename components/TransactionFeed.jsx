'use client';

import { formatRupee } from '@/lib/calculations';
import { Trash2 } from 'lucide-react';

export default function TransactionFeed({ transactions, gigs, onDelete }) {
  const getGigDetails = (gigId) => {
    return gigs.find(g => g.id === gigId) || { name: 'Unknown', color: '#888', initial: '?' };
  };

  return (
    <section aria-label="Recent Transactions" className="bg-white dark:bg-[#1C1C1E] rounded-2xl border border-gray-200 dark:border-[#2C2C2E] flex flex-col h-[600px] xl:h-full">
      <div className="p-5 border-b border-gray-200 dark:border-[#2C2C2E] flex justify-between items-center">
        <h3 className="font-display font-bold text-gray-900 dark:text-white">Recent Transactions</h3>
        <span className="text-xs text-gray-400 font-medium bg-gray-100 dark:bg-[#2C2C2E] px-2 py-1 rounded-md">
          {transactions.length} total
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 p-6 text-center">
            <p className="text-sm">No transactions yet.</p>
            <p className="text-xs mt-1">Click Add to log your first earning or expense.</p>
          </div>
        ) : (
          <ul className="space-y-1">
            {transactions.map((t) => {
              const gig = getGigDetails(t.gigId);
              const isEarning = t.type === 'earning';
              
              return (
                <li key={t.id} className="group flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#2C2C2E] transition-colors">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                      style={{ background: gig.color }}
                      aria-hidden="true"
                    >
                      {gig.initial}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-1">{gig.name}</p>
                      <p className="text-[11px] text-gray-400 line-clamp-1">{t.note || 'No note'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-right">
                    <div>
                      <p className={`font-bold text-sm ${isEarning ? 'text-green-500' : 'text-gray-900 dark:text-white'}`}>
                        {isEarning ? '+' : '-'}{formatRupee(t.amount)}
                      </p>
                      <p className="text-[10px] text-gray-400">{t.date}</p>
                    </div>
                    <button 
                      onClick={() => onDelete(t.id)}
                      aria-label="Delete transaction"
                      className="p-1.5 text-gray-300 dark:text-gray-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all focus:opacity-100"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}