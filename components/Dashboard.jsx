'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useTransactions } from '@/hooks/useTransactions';
import { useTheme } from '@/hooks/useTheme';
import { calculateStats } from '@/lib/calculations';
import TopNav from './TopNav';
import Sidebar from './Sidebar';
import AtAGlance from './AtAGlance';
import GigList from './GigList';
import TransactionFeed from './TransactionFeed';
import AddTransactionModal from './modals/AddTransactionModal';
import ManageGigsModal from './modals/ManageGigsModal';

export default function Dashboard() {
  const { user } = useAuth();
  const { isDark, toggle } = useTheme();
  
  const { 
    transactions, 
    gigs, 
    loading: dataLoading,
    addTransaction,
    deleteTransaction,
    addGig,
    deleteGig
  } = useTransactions(user?.uid);

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isAddOpen, setAddOpen] = useState(false);
  const [isManageOpen, setManageOpen] = useState(false);

  // Loading state with consistent theme colors
  if (dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7] dark:bg-[#111111]">
        <div className="w-8 h-8 border-2 border-[#F97316] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const stats = calculateStats(transactions, gigs);

  return (
    /* 
      FIX: Added explicit light/dark background and text colors here.
      The transition-colors class ensures the toggle feels smooth.
    */
    <div className="min-h-screen flex flex-col relative bg-[#F5F5F7] dark:bg-[#111111] text-slate-900 dark:text-white transition-colors duration-300">
      <TopNav 
        isDark={isDark} 
        onToggleTheme={toggle} 
        onOpenSidebar={() => setSidebarOpen(true)} 
        onOpenAdd={() => setAddOpen(true)} 
      />
      
      <Sidebar 
        open={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 flex flex-col xl:flex-row gap-6">
        <div className="flex-1 min-w-0">
          {/* Ensure AtAGlance and GigList use internal classes like bg-white dark:bg-[#1a1a1a] */}
          <AtAGlance stats={stats} transactions={transactions} isDark={isDark} />
          
          <div className="flex items-center justify-between mt-6 mb-3">
            <h2 className="sr-only">Gig Ratios</h2>
          </div>
          <GigList gigStats={stats.gigStats} />
          
          <button 
            onClick={() => setManageOpen(true)}
            className="mt-4 text-sm font-medium text-gray-500 hover:text-[#F97316] transition-colors"
          >
            + Manage Gig Categories
          </button>
        </div>
        
        <aside className="w-full xl:w-[380px] flex-shrink-0">
          <TransactionFeed 
            transactions={transactions} 
            gigs={gigs} 
            onDelete={deleteTransaction} 
          />
        </aside>
      </main>

      {isAddOpen && (
        <AddTransactionModal 
          gigs={gigs} 
          onClose={() => setAddOpen(false)} 
          onAdd={addTransaction} 
        />
      )}
      {isManageOpen && (
        <ManageGigsModal 
          gigs={gigs} 
          onClose={() => setManageOpen(false)} 
          onAddGig={addGig}
          onDeleteGig={deleteGig}
        />
      )}
    </div>
  );
}