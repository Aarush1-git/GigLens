'use client';

import { useEffect, useRef } from 'react';
import { X, LayoutDashboard, TrendingUp, Receipt, Settings, LogOut } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: TrendingUp, label: 'Earnings' },
  { icon: Receipt, label: 'Expenses' },
  { icon: Settings, label: 'Settings' },
];

export default function Sidebar({ open, onClose }) {
  const firstFocusRef = useRef(null);

  // Trap focus while sidebar is open
  useEffect(() => {
    if (open && firstFocusRef.current) {
      firstFocusRef.current.focus();
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  async function handleSignOut() {
    await signOut(auth);
    onClose();
  }

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className={`fixed top-0 left-0 h-full w-60 bg-white dark:bg-[#1C1C1E] border-r border-gray-200 dark:border-[#2C2C2E] z-40 flex flex-col transform transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-[#2C2C2E]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#F97316] rounded-lg flex items-center justify-center">
              <span className="text-white font-display font-black text-xs">G</span>
            </div>
            <span className="font-display font-bold text-gray-900 dark:text-white">GigLens</span>
          </div>
          <button
            ref={firstFocusRef}
            onClick={onClose}
            aria-label="Close navigation"
            className="p-1 rounded-lg text-gray-400 hover:text-[#F97316] transition-colors"
          >
            <X size={17} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-0.5" aria-label="Main navigation">
          {NAV_ITEMS.map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? 'bg-[#F97316] text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-[#F97316]/10 hover:text-[#F97316]'
              }`}
              aria-current={active ? 'page' : undefined}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>

        {/* Sign out */}
        <div className="px-3 py-4 border-t border-gray-200 dark:border-[#2C2C2E]">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}