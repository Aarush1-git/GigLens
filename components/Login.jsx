'use client';

import { useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useTheme } from '@/hooks/useTheme';
import { Sun, Moon } from 'lucide-react';

export default function Login() {
  const { isDark, toggle } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError('');
    setLoading(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F5F5F7] dark:bg-[#111111] transition-colors duration-300">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-[#2C2C2E]">
          {/* Orange header */}
          <div className="bg-[#F97316] px-7 pt-7 pb-14">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center">
                <span className="text-[#F97316] font-display font-black text-sm">G</span>
              </div>
              <span className="font-display font-bold text-white text-xl">GigLens</span>
            </div>
            <p className="text-white/75 text-sm mt-0.5">Track every rupee from every gig.</p>
          </div>

          {/* Form floats up over the header */}
          <div className="px-7 -mt-8">
            <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-[#2C2C2E]">
              <h1 className="font-display font-bold text-gray-900 dark:text-white text-lg mb-0.5">
                {isSignUp ? 'Create account' : 'Welcome back'}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-xs mb-5">
                {isSignUp ? 'Start tracking your gig income.' : 'Sign in to your GigLens account.'}
              </p>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <label
                    htmlFor="login-email"
                    className="block text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-[#2C2C2E] border border-gray-200 dark:border-[#3C3C3E] text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="login-password"
                    className="block text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5"
                  >
                    Password
                  </label>
                  <input
                    id="login-password"
                    type="password"
                    autoComplete={isSignUp ? 'new-password' : 'current-password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-[#2C2C2E] border border-gray-200 dark:border-[#3C3C3E] text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                  />
                </div>

                {error && (
                  <p role="alert" className="text-red-500 text-xs">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#F97316] hover:bg-[#EA6C0A] text-white py-2.5 rounded-xl font-semibold text-sm transition-colors disabled:opacity-60"
                >
                  {loading ? 'Please wait…' : isSignUp ? 'Create Account' : 'Sign In'}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-[#2C2C2E]" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-2 bg-white dark:bg-[#1C1C1E] text-xs text-gray-400">or</span>
                </div>
              </div>

              {/* Google */}
              <button
                type="button"
                onClick={handleGoogle}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 dark:border-[#2C2C2E] bg-transparent hover:bg-gray-50 dark:hover:bg-[#2C2C2E] text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors disabled:opacity-60"
              >
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-7 py-4 mt-2">
            <button
              onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
              className="text-xs text-gray-400 hover:text-[#F97316] transition-colors"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
            <button
              onClick={toggle}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-7 h-7 rounded-full bg-gray-100 dark:bg-[#2C2C2E] flex items-center justify-center text-gray-400 hover:text-[#F97316] transition-colors"
            >
              {isDark ? <Sun size={13} /> : <Moon size={13} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function friendlyError(code) {
  const map = {
    'auth/user-not-found': 'No account found with that email.',
    'auth/wrong-password': 'Incorrect password. Try again.',
    'auth/email-already-in-use': 'An account already exists with this email.',
    'auth/weak-password': 'Password must be at least 6 characters.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/too-many-requests': 'Too many attempts. Please wait and try again.',
    'auth/popup-closed-by-user': 'Sign-in cancelled.',
  };
  return map[code] || 'Something went wrong. Please try again.';
}