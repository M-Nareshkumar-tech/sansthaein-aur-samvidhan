'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useI18n } from '@/hooks/useI18n';
import { ShieldCheck, Lock, Mail, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const { t } = useI18n();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const res = await login(email, password);
    if (res.success) {
      router.push('/');
    } else {
      setError(res.error || 'Login failed');
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-6 sm:my-12 p-5 sm:p-8 bg-card border border-white/10 rounded-2xl shadow-xl space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 bg-saffron/10 border border-saffron/20 rounded-xl text-saffron">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-black text-white font-outfit">Welcome Back, Citizen</h1>
        <p className="text-sm text-slate-400">Access your constitutional learning journey</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
          <AlertCircle className="h-4.5 w-4.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block" htmlFor="email">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400" />
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white text-base sm:text-sm focus:border-saffron focus:ring-1 focus:ring-saffron outline-none transition-all font-sans"
              placeholder="e.g. citizen@india.gov.in"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400" />
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white text-base sm:text-sm focus:border-saffron focus:ring-1 focus:ring-saffron outline-none transition-all font-sans"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-saffron hover:bg-saffron/90 disabled:bg-saffron/50 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-saffron/20 cursor-pointer"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4.5 w-4.5 animate-spin" />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <span>Log In</span>
              <ArrowRight className="h-4.5 w-4.5" />
            </>
          )}
        </button>
      </form>

      <div className="text-center text-xs text-slate-400">
        New to the platform?{' '}
        <Link href="/register" className="text-saffron hover:underline font-bold">
          Register Here
        </Link>
      </div>
    </div>
  );
}
