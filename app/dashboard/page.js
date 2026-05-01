'use client';

import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import Login from '@/components/Login';
import Dashboard from '@/components/Dashboard';

export default function Page() {
  // Apply dark class to <html> based on persisted theme
  useTheme();

  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0f0f0f] text-slate-900 dark:text-white transition-colors duration-300">
        <div className="w-8 h-8 border-2 border-[#F97316] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return user ? <Dashboard /> : <Login />;
}