'use client';

import { useState } from 'react';
import { X, Trash2, Plus } from 'lucide-react';

const COLORS = ['#EF4444', '#F97316', '#EAB308', '#22C55E', '#3B82F6', '#A855F7', '#EC4899', '#111111'];

export default function ManageGigsModal({ gigs, onClose, onAddGig, onDeleteGig }) {
  const [newGigName, setGigName] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newGigName.trim()) return;
    await onAddGig({ name: newGigName, color: selectedColor });
    setGigName('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true"></div>
      
      <div 
        className="relative bg-white dark:bg-[#1C1C1E] border border-gray-200 dark:border-[#2C2C2E] w-full max-w-md rounded-[24px] p-6 shadow-2xl flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="manage-title"
      >
        <div className="flex justify-between items-center mb-6 flex-shrink-0">
          <h2 id="manage-title" className="text-xl font-display font-bold text-gray-900 dark:text-white">Manage Gigs</h2>
          <button onClick={onClose} aria-label="Close Modal" className="p-2 rounded-full bg-gray-100 dark:bg-[#2C2C2E] text-gray-500 hover:text-[#F97316] transition">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          {/* Current Gigs List */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Current Gigs</h3>
            <ul className="space-y-2">
              {gigs.map(gig => (
                <li key={gig.id} className="flex justify-between items-center bg-gray-50 dark:bg-[#111111] p-3 rounded-xl border border-gray-100 dark:border-[#2C2C2E]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg" style={{ background: gig.color }}></div>
                    <span className="font-semibold text-sm text-gray-900 dark:text-white">{gig.name}</span>
                  </div>
                  <button 
                    onClick={() => onDeleteGig(gig.id)}
                    aria-label={`Delete ${gig.name}`}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <hr className="border-gray-200 dark:border-[#2C2C2E]" />

          {/* Add New Gig Form */}
          <form onSubmit={handleAdd} className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400">Add New Gig</h3>
            
            <div>
              <label htmlFor="gigName" className="sr-only">Gig Name</label>
              <input 
                id="gigName"
                type="text" 
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#2C2C2E] bg-transparent text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-[#F97316] outline-none transition"
                placeholder="e.g., Fiverr, TaskRabbit"
                value={newGigName}
                onChange={(e) => setGigName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-2">Choose Color</label>
              <div className="flex flex-wrap gap-2">
                {COLORS.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select color ${color}`}
                    className={`w-8 h-8 rounded-full transition-transform ${selectedColor === color ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-[#1C1C1E] ring-gray-400 scale-110' : 'hover:scale-110'}`}
                    style={{ background: color }}
                  />
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-black font-bold py-3.5 rounded-xl hover:opacity-90 transition mt-2"
            >
              <Plus size={18} />
              Add Gig
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}