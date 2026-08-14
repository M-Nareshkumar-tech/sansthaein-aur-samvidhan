'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useI18n } from '@/hooks/useI18n';
import { UserProgress } from '@/lib/db';
import { getUserProgress } from '@/lib/services';
import { 
  Compass, 
  Sparkles, 
  Play, 
  Trophy, 
  Activity, 
  BookOpen, 
  Zap, 
  Flame, 
  ArrowRight,
  ShieldAlert,
  Dices,
  HelpCircle,
  Award
} from 'lucide-react';

const FACTS = [
  "The original Constitution of India was handwritten by Prem Behari Narain Raizada in flowing italic style.",
  "The Constitution of India is the longest written constitution of any sovereign country in the world.",
  "The Preamble to our Constitution was inspired by the US Constitution, beginning with 'We, the People'.",
  "Dr. B. R. Ambedkar is widely regarded as the Father of the Indian Constitution.",
  "The original copies of the Constitution are preserved in special helium-filled cases in the Parliament library.",
  "The Constitution was adopted on 26 November 1949 and came into effect on 26 January 1950 (Republic Day)."
];

export default function Dashboard() {
  const { t } = useI18n();
  const [stats, setStats] = useState<UserProgress | null>(null);
  const [randomFact, setRandomFact] = useState("");
  const [selectedOrgan, setSelectedOrgan] = useState<'All' | 'Legislature' | 'Executive' | 'Judiciary'>('All');

  useEffect(() => {
    const fetchStats = async () => {
      const p = await getUserProgress();
      setStats(p);
    };
    fetchStats();
    // Pick a random fact
    const index = Math.floor(Math.random() * FACTS.length);
    setRandomFact(FACTS[index]);
  }, []);

  const getCitizenRank = (level: number) => {
    if (level >= 5) return { name: "Constitution Guardian (संविधान रक्षक)", color: "text-red-400" };
    if (level >= 3) return { name: "Lawmaker Cadet (विधायक कैडेट)", color: "text-saffron" };
    return { name: "Praja / Citizen (सचेत नागरिक)", color: "text-green" };
  };

  const currentRank = stats ? getCitizenRank(stats.level) : { name: "Loading...", color: "text-slate-400" };

  const games = [
    {
      id: 'spin',
      title: '🎡 Spin the Wheel',
      titleHi: '🎡 लोकतंत्र का पहिया',
      desc: t('spin_wheel_desc'),
      href: '/games/spin',
      icon: HelpCircle,
      organ: 'All',
      color: 'from-amber-500/20 to-saffron/20 hover:border-saffron/40',
      btnColor: 'bg-saffron hover:bg-saffron/90'
    },
    {
      id: 'snakes',
      title: '🐍 Snakes & Ladders',
      titleHi: '🐍 सुशासन का मार्ग',
      desc: t('snakes_ladders_desc'),
      href: '/games/snakes',
      icon: Dices,
      organ: 'All',
      color: 'from-emerald-500/20 to-green/20 hover:border-green/40',
      btnColor: 'bg-green hover:bg-green/90'
    },
    {
      id: 'board',
      title: '🎯 Samvidhan Nagri',
      titleHi: '🎯 संविधान नगरी',
      desc: t('board_game_desc'),
      href: '/games/board',
      icon: ShieldAlert,
      organ: 'All',
      color: 'from-blue-500/20 to-ashoka/20 hover:border-blue-400/40',
      btnColor: 'bg-blue-600 hover:bg-blue-500'
    },
    {
      id: 'flashcards',
      title: '🃏 Power Duel Flashcards',
      titleHi: '🃏 शक्ति तुलना फ़्लैशकार्ड',
      desc: t('flashcards_desc'),
      href: '/games/flashcards',
      icon: Award,
      organ: 'All',
      color: 'from-purple-500/20 to-pink-500/20 hover:border-purple-400/40',
      btnColor: 'bg-purple-600 hover:bg-purple-500'
    }
  ];

  // Filter games (though all are playable, we can highlight them)
  const filteredGames = games.filter(g => selectedOrgan === 'All' || g.organ === 'All' || g.organ === selectedOrgan);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Welcome banner */}
      <section className="relative overflow-hidden rounded-3xl glass-card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-4 max-w-2xl text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron/10 border border-saffron/20 text-xs font-semibold text-saffron">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Educational Sandbox</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-saffron to-white bg-clip-text text-transparent">
              {t('app_name')}
            </span>
          </h1>
          <p className="text-sm md:text-md text-slate-300 leading-relaxed">
            Simplify the complex machinery of Indian government organs (Legislature, Executive, Judiciary) through gamified cases, simulations, and challenges.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
            <Link 
              href="/explorer" 
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold btn-saffron text-white"
            >
              <BookOpen className="h-4 w-4" />
              {t('explorer')}
            </Link>
            <a 
              href="#modes"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white"
            >
              <Play className="h-4 w-4 text-green" />
              Start Gaming
            </a>
          </div>
        </div>

        {/* Right Citizen Rank visual */}
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/10 w-full md:w-80 space-y-4">
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-saffron/20 to-green/20 border border-white/20 shadow-inner">
            <Trophy className="h-10 w-10 text-saffron" />
          </div>
          <div className="text-center">
            <div className="text-xs text-slate-400 font-medium">Citizen Standing</div>
            <div className={`text-md font-bold ${currentRank.color}`}>{currentRank.name}</div>
          </div>
          
          {stats && (
            <div className="w-full space-y-1">
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Next Rank Progress</span>
                <span>{stats.score % 100} / 100 XP</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-saffron to-green transition-all duration-500"
                  style={{ width: `${stats.score % 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Quick stats board */}
      {stats && (
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: t('level'), value: stats.level, icon: Flame, color: 'text-saffron' },
            { label: t('points'), value: stats.score, icon: Zap, color: 'text-yellow-400' },
            { label: 'Articles Visited', value: stats.completedArticles.length, icon: BookOpen, color: 'text-blue-400' },
            { label: 'Badges Earned', value: stats.badges.length, icon: Trophy, color: 'text-emerald-400' }
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="glass-card p-4 rounded-2xl flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">{stat.label}</div>
                  <div className="text-lg md:text-xl font-bold">{stat.value}</div>
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* Fact of the day banner */}
      <section className="glass-card p-4 rounded-2xl border-l-4 border-l-saffron flex items-center gap-3">
        <div className="shrink-0 p-2 rounded-lg bg-saffron/10 text-saffron">
          <Compass className="h-5 w-5 animate-spin" style={{ animationDuration: '8s' }} />
        </div>
        <div>
          <span className="text-xs font-semibold text-saffron block uppercase tracking-wider">Did you know?</span>
          <p className="text-xs md:text-sm text-slate-200">{randomFact || "Loading Constitutional fact..."}</p>
        </div>
      </section>

      {/* Game Selector Section */}
      <section id="modes" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">Select Game Mode</h2>
            <p className="text-xs text-slate-400">Challenge your understanding of our constitutional systems</p>
          </div>
          
          {/* Organ Filter controls */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 sm:gap-2 p-1 rounded-xl bg-white/5 border border-white/10 max-w-full overflow-x-auto">
            {(['All', 'Legislature', 'Executive', 'Judiciary'] as const).map((org) => (
              <button
                key={org}
                onClick={() => setSelectedOrgan(org)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shrink-0 ${
                  selectedOrgan === org 
                    ? 'bg-saffron text-white shadow-sm' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {org === 'All' ? 'All Organs' : org}
              </button>
            ))}
          </div>
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredGames.map((game) => {
            const Icon = game.icon;
            // Get stats from local storage for this specific game
            const gameStat = stats?.gameStats[game.id as 'spin' | 'snakes' | 'board' | 'flashcards'];

            return (
              <div 
                key={game.id} 
                className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b ${game.color} p-6 flex flex-col justify-between group transition-all`}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="p-3 rounded-xl bg-white/10 text-white shadow-lg">
                      <Icon className="h-6 w-6" />
                    </div>
                    {/* Game analytics display */}
                    {gameStat && (
                      <div className="text-right text-[10px] text-slate-400 font-medium">
                        <div>Plays: {gameStat.plays}</div>
                        <div>High XP: {gameStat.highScore}</div>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-saffron transition-colors">
                      {stats ? (stats.feedbackLogs.length > 0 && typeof window !== 'undefined' && localStorage.getItem('samvidhan_lang') === 'hi' ? game.titleHi : game.title) : game.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                      {game.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-6 flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                    Format: {game.id === 'spin' ? 'Quiz Wheel' : game.id === 'snakes' ? 'Civic Board' : game.id === 'board' ? 'Monopoly Roleplay' : 'Flashcards'}
                  </span>
                  
                  <Link 
                    href={game.href}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white ${game.btnColor} transition-all`}
                  >
                    {t('play_now')}
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
