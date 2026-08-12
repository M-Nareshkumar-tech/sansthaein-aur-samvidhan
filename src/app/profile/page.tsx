'use client';

import React, { useState, useEffect } from 'react';
import { UserProgress } from '@/lib/db';
import { getUserProgress, submitFeedback } from '@/lib/services';
import { useI18n } from '@/hooks/useI18n';
import { 
  Trophy, 
  Award, 
  Star, 
  Activity, 
  MessageSquare, 
  CheckCircle,
  HelpCircle,
  Clock,
  Sparkles,
  User
} from 'lucide-react';

const ALL_BADGES = [
  { name: "Citizen Scholar", desc: "Earned by reaching 100 Civic XP.", icon: Award, color: "text-amber-400 border-amber-500/20" },
  { name: "Lawmaker Cadet", desc: "Earned by reaching 250 Civic XP.", icon: Sparkles, color: "text-saffron border-saffron/20" },
  { name: "Constitution Guardian", desc: "Earned by reaching 500 Civic XP.", icon: Trophy, color: "text-red-400 border-red-500/20" },
  { name: "Judicial Guard", desc: "Complete the Supreme Court (Art. 124) challenge.", icon: Star, color: "text-emerald-400 border-emerald-500/20" },
  { name: "Legislator Star", desc: "Complete the Parliament (Art. 79) challenge.", icon: Activity, color: "text-blue-400 border-blue-500/20" }
];

export default function ProfilePage() {
  const { t } = useI18n();
  const [stats, setStats] = useState<UserProgress | null>(null);
  
  // Feedback form states
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState("Suggestion");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      const p = await getUserProgress();
      setStats(p);
    };
    fetchStats();
  }, []);

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const res = await submitFeedback({
      rating,
      category,
      comment
    });

    if (res.success) {
      // Refresh local state from db
      const p = await getUserProgress();
      setStats(p);

      // Clear and notify
      setComment("");
      setRating(5);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  const getBadgeUnlockedStatus = (badgeName: string) => {
    if (!stats) return false;
    
    // Custom trigger overrides for Judicial/Legislator badges based on visited articles
    if (badgeName === "Judicial Guard" && stats.completedArticles.includes("Article 124")) {
      return true;
    }
    if (badgeName === "Legislator Star" && stats.completedArticles.includes("Article 79")) {
      return true;
    }
    
    return stats.badges.includes(badgeName);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Citizen Banner */}
      <section className="glass-card p-6 rounded-3xl flex flex-col md:flex-row items-center gap-6 justify-between">
        <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-saffron to-green p-0.5 shadow-lg">
            <div className="h-full w-full bg-navy rounded-[14px] flex items-center justify-center">
              <User className="h-8 w-8 text-saffron" />
            </div>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Citizen Profile</span>
            <h2 className="text-xl md:text-2xl font-black text-white">Democratic Explorer</h2>
            {stats && (
              <p className="text-xs text-saffron font-bold">Level {stats.level} • {stats.score} Civic XP</p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="text-center bg-white/5 border border-white/10 px-4 py-2 rounded-2xl">
            <span className="text-[9px] text-slate-400 block uppercase font-bold">Articles Studied</span>
            <span className="text-lg font-bold text-white">{stats?.completedArticles.length || 0}</span>
          </div>
          <div className="text-center bg-white/5 border border-white/10 px-4 py-2 rounded-2xl">
            <span className="text-[9px] text-slate-400 block uppercase font-bold">Quizzes Cleared</span>
            <span className="text-lg font-bold text-white">{stats?.completedQuizzes.length || 0}</span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Badges Shelf and Analytics (7 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Badge shelf */}
          <div className="glass-card p-6 rounded-3xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-white/5 pb-2">
              <Trophy className="h-4.5 w-4.5 text-saffron" />
              Constitutional Badges ({stats?.badges.length || 0} Unlocked)
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ALL_BADGES.map((badge, index) => {
                const isUnlocked = getBadgeUnlockedStatus(badge.name);
                const BadgeIcon = badge.icon;
                
                return (
                  <div 
                    key={index}
                    className={`flex items-start gap-3 p-3.5 rounded-2xl border transition-all ${
                      isUnlocked 
                        ? `bg-white/5 border-white/10 ${badge.color}` 
                        : 'bg-black/20 border-white/5 opacity-40 grayscale'
                    }`}
                  >
                    <div className={`p-2 rounded-xl bg-white/5 ${isUnlocked ? badge.color : 'text-slate-500'}`}>
                      <BadgeIcon className="h-5 w-5" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-extrabold text-white">{badge.name}</h4>
                      <p className="text-[10px] text-slate-400 leading-normal">{badge.desc}</p>
                      {isUnlocked ? (
                        <span className="text-[8px] font-bold text-green flex items-center gap-0.5 mt-1">
                          <CheckCircle className="h-2.5 w-2.5" /> Unlocked
                        </span>
                      ) : (
                        <span className="text-[8px] font-bold text-slate-500 flex items-center gap-0.5 mt-1">
                          Locked
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Game Analytics table */}
          {stats && (
            <div className="glass-card p-6 rounded-3xl space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-white/5 pb-2">
                <Activity className="h-4.5 w-4.5 text-blue-400" />
                Game Engagement Metrics
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { name: "Spin Wheel", key: 'spin', color: 'text-saffron' },
                  { name: "Snakes & Ladders", key: 'snakes', color: 'text-green' },
                  { name: "Samvidhan Nagri", key: 'board', color: 'text-blue-400' },
                  { name: "Trivia Cards", key: 'flashcards', color: 'text-purple-400' }
                ].map((game) => {
                  const gameStat = stats.gameStats[game.key as 'spin' | 'snakes' | 'board' | 'flashcards'];
                  return (
                    <div key={game.key} className="bg-white/5 border border-white/10 p-3 rounded-2xl space-y-1">
                      <span className="text-[9px] text-slate-400 font-bold block uppercase truncate">{game.name}</span>
                      <div className="flex justify-between items-baseline pt-1">
                        <span className="text-xs text-slate-300">Plays: <span className="font-bold text-white">{gameStat.plays}</span></span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-[10px] text-slate-400">High: <span className={`font-bold ${game.color}`}>{gameStat.highScore} XP</span></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Feedback Form (5 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-6 rounded-3xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-white/5 pb-2">
              <MessageSquare className="h-4.5 w-4.5 text-saffron" />
              Citizen Feedback
            </h3>

            {submitted && (
              <div className="bg-green/10 border border-green/30 text-green p-3 rounded-xl text-xs font-medium flex items-center gap-1">
                <CheckCircle className="h-4 w-4 shrink-0" />
                {t('feedback_success')}
              </div>
            )}

            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              {/* Star Rating select */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400">Rate Platform Usability</label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 rounded bg-white/5 border border-white/5 hover:bg-white/10 text-yellow-400 transition-all cursor-pointer"
                    >
                      <Star className={`h-4.5 w-4.5 ${star <= rating ? 'fill-yellow-400' : 'opacity-30'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback Category */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400">Review Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-navy/80 border border-white/10 text-xs text-white rounded-lg p-2.5 outline-none focus:border-saffron/40"
                >
                  <option value="Suggestion">Suggestion (सुझाव)</option>
                  <option value="Applause">Applause (प्रशंसा)</option>
                  <option value="Question">Question (प्रश्न)</option>
                  <option value="Issue">Issue (त्रुटि)</option>
                </select>
              </div>

              {/* Comment text area */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400">Comments & Review</label>
                <textarea
                  value={comment}
                  required
                  rows={4}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={t('feedback_placeholder')}
                  className="w-full bg-navy/80 border border-white/10 text-xs text-white rounded-xl p-3 outline-none focus:border-saffron/40 focus:ring-1 focus:ring-saffron/20 placeholder-slate-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl text-xs font-bold btn-saffron text-white cursor-pointer"
              >
                {t('send_feedback')}
              </button>
            </form>
          </div>

          {/* Feedback Logs shelf */}
          {stats && stats.feedbackLogs.length > 0 && (
            <div className="glass-card p-5 rounded-3xl space-y-3">
              <h3 className="text-xs font-bold text-slate-350 uppercase tracking-wider border-b border-white/5 pb-2">Recent Submissions ({stats.feedbackLogs.length})</h3>
              <div className="space-y-3 max-h-44 overflow-y-auto pr-1 divide-y divide-white/5">
                {stats.feedbackLogs.map((log) => (
                  <div key={log.id} className="pt-2 text-[10px] space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="px-1.5 py-0.5 rounded bg-saffron/15 text-saffron font-bold text-[8px]">{log.category}</span>
                      <div className="flex items-center gap-0.5 text-yellow-400">
                        {Array.from({ length: log.rating }).map((_, i) => (
                          <Star key={i} className="h-2.5 w-2.5 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-300 italic">"{log.comment}"</p>
                    <div className="flex items-center gap-1 text-[8px] text-slate-500 font-medium">
                      <Clock className="h-2.5 w-2.5" />
                      {log.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
