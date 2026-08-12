'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserProgress } from '@/lib/db';
import { getUserProgress } from '@/lib/services';
import { useAuth } from '@/hooks/useAuth';
import { useI18n } from '@/hooks/useI18n';
import { 
  BookOpen, 
  LayoutDashboard, 
  Trophy, 
  Gamepad2, 
  Languages, 
  Sparkles,
  Menu,
  X,
  Compass
} from 'lucide-react';

export default function Navbar() {
  const { language, setLanguage, t } = useI18n();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [stats, setStats] = useState<UserProgress | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Poll progress state from services frequently to keep points sync
  useEffect(() => {
    const fetchProgress = async () => {
      const p = await getUserProgress();
      setStats(p);
    };
    fetchProgress();
    
    // Listen for custom events or focus changes to update scores instantly
    window.addEventListener('storage', fetchProgress);
    const interval = setInterval(fetchProgress, 1500);
    
    return () => {
      window.removeEventListener('storage', fetchProgress);
      clearInterval(interval);
    };
  }, []);

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'hi' : language === 'hi' ? 'ta' : 'en';
    setLanguage(nextLang);
  };

  const navItems = [
    { href: '/', label: t('dashboard'), icon: LayoutDashboard },
    { href: '/explorer', label: t('explorer'), icon: BookOpen },
    { href: '/simulator', label: 'Simulator', icon: Compass },
    { href: '/profile', label: t('profile'), icon: Trophy },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-navy/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-saffron to-green p-0.5 shadow-lg group-hover:scale-105 transition-transform">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-navy">
                  <span className="text-lg font-bold text-saffron">सं</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-md md:text-lg font-extrabold tracking-tight bg-gradient-to-r from-saffron via-white to-green bg-clip-text text-transparent">
                  {t('app_name')}
                </span>
                <span className="text-[10px] text-slate-400 -mt-1 font-medium hidden sm:block">
                  {t('app_tagline')}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-saffron/10 text-saffron border border-saffron/20' 
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* User Score & Language Toggle */}
          <div className="hidden md:flex items-center gap-4">
            {/* Stat badge */}
            {stats && (
              <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs">
                <div className="flex items-center gap-1 text-saffron font-bold">
                  <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                  <span>Lvl {stats.level}</span>
                </div>
                <div className="h-3 w-px bg-white/20" />
                <div className="text-slate-300 font-medium">
                  {stats.score} <span className="text-[10px] text-slate-400">{t('points')}</span>
                </div>
                <div className="h-3 w-px bg-white/20" />
                <div className="flex items-center gap-1 text-green font-bold">
                  <Trophy className="h-3.5 w-3.5" />
                  <span>{stats.badges.length} Badges</span>
                </div>
              </div>
            )}

            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-saffron/10 hover:bg-saffron/20 text-saffron border border-saffron/20 transition-all cursor-pointer font-sans"
            >
              <Languages className="h-3.5 w-3.5" />
              <span>{language === 'en' ? 'हिन्दी' : language === 'hi' ? 'தமிழ்' : 'English'}</span>
            </button>

            {/* Auth Session Button */}
            {user ? (
              <button
                onClick={logout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all cursor-pointer"
              >
                Logout ({user.profile?.displayName || 'User'})
              </button>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-saffron hover:bg-saffron/90 text-white transition-all shadow-md cursor-pointer"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center gap-3">
            {/* Lang Button on Mobile header */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-saffron/10 text-saffron border border-saffron/20 font-sans"
            >
              <Languages className="h-3.5 w-3.5" />
              <span>{language === 'en' ? 'हिन्दी' : language === 'hi' ? 'தமிழ்' : 'EN'}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-navy px-4 py-3 flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-saffron/15 text-saffron border border-saffron/20' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}

          {stats && (
            <div className="mt-2 flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 text-xs">
              <div className="flex items-center gap-1 text-saffron font-bold">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Level {stats.level}</span>
              </div>
              <div className="text-slate-300 font-medium">
                {stats.score} {t('points')}
              </div>
              <div className="flex items-center gap-1 text-green font-bold">
                <Trophy className="h-3.5 w-3.5" />
                <span>{stats.badges.length} Badges</span>
              </div>
            </div>
          )}

          {/* Mobile Auth Button */}
          {user ? (
            <button
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 border border-white/10 transition-all cursor-pointer mt-2 text-center"
            >
              Logout ({user.profile?.displayName || 'User'})
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-saffron text-white transition-all mt-2 text-center font-bold"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
