'use client';

import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

export default function AddTransactionModal({ gigs, onClose, onAdd }) {
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [gigId, setGigId] = useState(gigs[0]?.id || '');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    // Focus amount input on mount for accessibility
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) return;
    setIsSubmitting(true);
    await onAdd({ type, amount, gigId, note });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true"></div>
      
      <div 
        className="relative bg-white dark:bg-[#1C1C1E] border border-gray-200 dark:border-[#2C2C2E] w-full max-w-md rounded-[24px] p-6 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 id="modal-title" className="text-xl font-display font-bold text-gray-900 dark:text-white">Add Transaction</h2>
          <button onClick={onClose} aria-label="Close Modal" className="p-2 rounded-full bg-gray-100 dark:bg-[#2C2C2E] text-gray-500 hover:text-[#F97316] transition">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Type Toggle */}
          <div className="flex bg-gray-100 dark:bg-[#111111] p-1 rounded-xl">
            <button 
              type="button"
              onClick={() => setType('expense')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition ${type === 'expense' ? 'bg-[#EF4444] text-white shadow-sm' : 'text-gray-500'}`}
            >
              ↘ Expense
            </button>
            <button 
              type="button"
              onClick={() => setType('earning')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition ${type === 'earning' ? 'bg-[#22C55E] text-white shadow-sm' : 'text-gray-500'}`}
            >
              ↗ Earning
            </button>
          </div>

          {/* Gig Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Select Gig</label>
            <div className="flex flex-wrap gap-2">
              {gigs.map(gig => (
                <button
                  key={gig.id}
                  type="button"
                  onClick={() => setGigId(gig.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${gigId === gig.id ? 'bg-gray-900 dark:bg-white text-white dark:text-black' : 'bg-gray-100 dark:bg-[#2C2C2E] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#3C3C3E]'}`}
                >
                  {gig.name}
                </button>
              ))}
            </div>
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="amount" className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">₹</span>
              <input 
                id="amount"
                ref={inputRef}
                type="number" 
                step="0.01"
                required
                className="w-full pl-9 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-[#2C2C2E] bg-transparent text-gray-900 dark:text-white text-xl font-bold focus:ring-2 focus:ring-[#F97316] outline-none transition"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          {/* Note */}
          <div>
            <label htmlFor="note" className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Note (optional)</label>
            <input 
              id="note"
              type="text" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#2C2C2E] bg-transparent text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-[#F97316] outline-none transition"
              placeholder="What was this for?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting || !gigId}
            className="w-full bg-[#F97316] text-white font-bold py-3.5 rounded-xl hover:bg-[#EA6C0A] transition disabled:opacity-50 mt-2"
          >
            {isSubmitting ? 'Saving...' : `Add ${type === 'expense' ? 'Expense' : 'Earning'}`}
          </button>
        </form>
      </div>
    </div>
  );
}