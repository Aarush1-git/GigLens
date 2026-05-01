'use client';

import { Menu, Sun, Moon, Plus } from 'lucide-react';

export default function TopNav({ isDark, onToggleTheme, onOpenSidebar, onOpenAdd }) {
  return (
    <header className="sticky top-0 z-20 bg-white dark:bg-[#1C1C1E] border-b border-gray-200 dark:border-[#2C2C2E] transition-colors">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Hamburger */}
        <button
          onClick={onOpenSidebar}
          aria-label="Open navigation menu"
          aria-haspopup="dialog"
          className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:text-[#F97316] transition-colors"
        >
          <Menu size={20} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#F97316] rounded-lg flex items-center justify-center">
            <span className="text-white font-display font-black text-[10px]">G</span>
          </div>
          <span className="font-display font-bold text-gray-900 dark:text-white text-base">GigLens</span>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#2C2C2E] flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-[#F97316] transition-colors"
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button
            onClick={onOpenAdd}
            aria-label="Add new transaction"
            className="flex items-center gap-1.5 bg-[#F97316] hover:bg-[#EA6C0A] text-white px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors"
          >
            <Plus size={15} />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </header>
  );
}