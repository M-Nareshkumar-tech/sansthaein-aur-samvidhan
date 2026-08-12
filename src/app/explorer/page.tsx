'use client';

import React, { useState, useEffect } from 'react';
import { useI18n } from '@/hooks/useI18n';
import { useAudio } from '@/hooks/useAudio';
import { completeQuiz, getUserProgress, getArticles } from '@/lib/services';
import { 
  Search, 
  Filter, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  CheckCircle, 
  HelpCircle,
  Sparkles,
  ChevronRight,
  Bookmark,
  BookmarkCheck,
  Languages,
  Loader2
} from 'lucide-react';

export default function ArticleExplorer() {
  const { language, t } = useI18n();
  const { speak, stop, isSpeaking } = useAudio();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrgan, setSelectedOrgan] = useState<'All' | 'Legislature' | 'Executive' | 'Judiciary'>('All');
  const [selectedLevel, setSelectedLevel] = useState<'All' | 'Union' | 'State'>('All');
  
  // Dynamic database loaded states
  const [articles, setArticles] = useState<any[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [loadingArticles, setLoadingArticles] = useState(true);
  
  const [activeTab, setActiveTab] = useState<'simplified' | 'child_friendly' | 'raw_text'>('simplified');
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [userProgress, setUserProgress] = useState<string[]>([]);
  const [scoreNotification, setScoreNotification] = useState(false);

  // Fetch user progress log
  useEffect(() => {
    const fetchProgress = async () => {
      const progress = await getUserProgress();
      setUserProgress(progress.completedArticles);
    };
    fetchProgress();
  }, []);

  // Fetch localized articles from database on filter/language updates
  useEffect(() => {
    const fetchArticlesList = async () => {
      setLoadingArticles(true);
      const list = await getArticles(language, selectedOrgan, selectedLevel);
      setArticles(list);
      
      // Auto select first article or persist selection if still matching
      if (list.length > 0) {
        setSelectedArticle(list[0]);
      } else {
        setSelectedArticle(null);
      }
      setLoadingArticles(false);
    };
    fetchArticlesList();
    stop();
  }, [language, selectedOrgan, selectedLevel]);

  const handleSpeech = (text: string) => {
    if (isSpeaking) {
      stop();
    } else {
      speak(text, language);
    }
  };

  const handleSelectArticle = (art: any) => {
    stop();
    setSelectedArticle(art);
    setActiveTab('simplified');
    setQuizAnswer(null);
    setShowQuizResult(false);
  };

  const handleAnswerSubmit = async (optionIndex: number) => {
    if (!selectedArticle) return;
    setQuizAnswer(optionIndex);
    setShowQuizResult(true);

    const isCorrect = optionIndex === selectedArticle.scenario_questions[0].answerIndex;
    const nextProgress = await completeQuiz(selectedArticle.article_number, selectedArticle.scenario_questions[0].id, isCorrect);
    
    setUserProgress(nextProgress.completedArticles);

    if (isCorrect) {
      setScoreNotification(true);
      setTimeout(() => setScoreNotification(false), 3000);
    }
  };

  // Filter Articles locally based on search query
  const filteredArticles = articles.filter((art) => {
    const matchesSearch = 
      art.article_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.simplified_summary.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
      {/* Sidebar Filter and Article List (4 cols) */}
      <div className="lg:col-span-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder={t('search_placeholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl glass-card bg-navy/60 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-saffron/40 focus:ring-1 focus:ring-saffron/20 font-sans"
          />
        </div>

        {/* Filter Panel */}
        <div className="glass-card p-4 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 border-b border-white/5 pb-2">
            <Filter className="h-4 w-4 text-saffron" />
            <span className="text-xs font-bold uppercase tracking-wider">Search Filters</span>
          </div>

          {/* Organ Filter */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-slate-400">Organ of Government</label>
            <div className="grid grid-cols-2 gap-1.5">
              {(['All', 'Legislature', 'Executive', 'Judiciary'] as const).map((org) => (
                <button
                  key={org}
                  onClick={() => setSelectedOrgan(org)}
                  className={`px-2 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    selectedOrgan === org
                      ? 'bg-saffron/10 border-saffron/30 text-saffron'
                      : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {org === 'All' ? 'All Organs' : org}
                </button>
              ))}
            </div>
          </div>

          {/* Level Filter */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-slate-400">Level of Governance</label>
            <div className="flex gap-1.5">
              {(['All', 'Union', 'State'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    selectedLevel === lvl
                      ? 'bg-green/10 border-green/30 text-green'
                      : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {lvl === 'All' ? 'All Levels' : lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles List */}
        <div className="glass-card rounded-2xl overflow-hidden max-h-[420px] overflow-y-auto">
          <div className="p-3 bg-white/5 border-b border-white/10 flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-300">Articles ({filteredArticles.length})</span>
            {loadingArticles && <Loader2 className="h-3.5 w-3.5 animate-spin text-saffron" />}
          </div>
          <div className="divide-y divide-white/5">
            {loadingArticles ? (
              <div className="p-8 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-saffron" />
                <span>Loading Constitution DB...</span>
              </div>
            ) : filteredArticles.length > 0 ? (
              filteredArticles.map((art) => {
                const isSelected = selectedArticle?.article_number === art.article_number;
                const isCompleted = userProgress.includes(art.article_number);

                return (
                  <button
                    key={art.article_number}
                    onClick={() => handleSelectArticle(art)}
                    className={`w-full text-left p-3.5 flex items-start justify-between gap-3 transition-all cursor-pointer hover:bg-white/5 ${
                      isSelected ? 'bg-saffron/10 hover:bg-saffron/10 border-l-2 border-l-saffron' : ''
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-saffron">{art.article_number}</span>
                        {isCompleted && (
                          <CheckCircle className="h-3.5 w-3.5 text-green fill-green/10" />
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-slate-100 line-clamp-1">{art.title}</h4>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400 font-semibold uppercase">
                          {art.organ}
                        </span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400 font-semibold uppercase">
                          {art.level}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className={`h-4 w-4 text-slate-500 shrink-0 self-center transition-transform ${isSelected ? 'translate-x-1 text-saffron' : ''}`} />
                  </button>
                );
              })
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs">
                No constitutional articles match your active filter settings.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Article Detail View (8 cols) */}
      <div className="lg:col-span-8">
        {selectedArticle ? (
          <div className="space-y-6">
            {/* Header info card */}
            <div className="glass-card p-6 rounded-3xl relative overflow-hidden space-y-4 font-outfit">
              {scoreNotification && (
                <div className="absolute top-4 right-4 bg-green text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg animate-bounce">
                  <Sparkles className="h-3.5 w-3.5" />
                  +25 Civic Points!
                </div>
              )}
              
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm font-extrabold text-saffron tracking-wider px-2.5 py-1 rounded-lg bg-saffron/10 border border-saffron/20 uppercase">
                      {selectedArticle.article_number}
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-semibold uppercase">
                      {selectedArticle.level} • {selectedArticle.organ}
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-black text-white">
                    {selectedArticle.title}
                  </h2>
                </div>

                {/* TTS Reader Button */}
                <button
                  onClick={() => {
                    const speechText = 
                      activeTab === 'simplified' ? selectedArticle.simplified_summary :
                      activeTab === 'child_friendly' ? selectedArticle.child_friendly_summary :
                      selectedArticle.raw_text;
                    handleSpeech(speechText);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    isSpeaking 
                      ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20' 
                      : 'bg-saffron/10 border-saffron/30 text-saffron hover:bg-saffron/20'
                  }`}
                >
                  {isSpeaking ? (
                    <>
                      <VolumeX className="h-4 w-4 animate-pulse" />
                      Stop Audio
                    </>
                  ) : (
                    <>
                      <Volume2 className="h-4 w-4" />
                      Narration
                    </>
                  )}
                </button>
              </div>

              {/* Tabs list */}
              <div className="flex border-b border-white/10 pt-2">
                {[
                  { id: 'simplified', label: t('simplified') },
                  { id: 'child_friendly', label: t('child_friendly') },
                  { id: 'raw_text', label: t('raw_text') }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => { stop(); setActiveTab(tab.id as any); }}
                    className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? 'border-saffron text-saffron bg-saffron/5'
                        : 'border-transparent text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content Display */}
              <div className="p-2 min-h-24">
                {activeTab === 'simplified' && (
                  <p className="text-sm md:text-md text-slate-200 leading-relaxed font-medium animate-fadeIn">
                    {selectedArticle.simplified_summary}
                  </p>
                )}
                {activeTab === 'child_friendly' && (
                  <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-2xl p-4 space-y-2 animate-fadeIn">
                    <span className="text-[10px] font-bold text-green uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="h-3 w-3 animate-spin" style={{ animationDuration: '6s' }} />
                      Hey Kids! Look Here
                    </span>
                    <p className="text-sm text-emerald-100 leading-relaxed font-semibold">
                      {selectedArticle.child_friendly_summary}
                    </p>
                  </div>
                )}
                {activeTab === 'raw_text' && (
                  <p className="text-xs font-mono text-slate-300 bg-navy/60 p-4 rounded-xl border border-white/5 leading-relaxed overflow-x-auto whitespace-pre-wrap select-all animate-fadeIn">
                    {selectedArticle.raw_text}
                  </p>
                )}
              </div>
            </div>

            {/* Key takeaways bullet box */}
            <div className="glass-card p-6 rounded-3xl space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-white/5 pb-2 font-outfit">
                <Bookmark className="h-4 w-4 text-saffron" />
                {t('key_takeaways')}
              </h3>
              <ul className="space-y-2.5">
                {selectedArticle.key_takeaways.map((point: string, index: number) => (
                  <li key={index} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-350">
                    <BookmarkCheck className="h-4 w-4 text-green shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Scenario Quiz component */}
            <div className="glass-card p-6 rounded-3xl space-y-6">
              <div className="flex items-center gap-2 border-b border-white/5 pb-2 font-outfit">
                <HelpCircle className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-bold uppercase text-blue-400 tracking-wider">
                  {t('quiz_title')} (Scenario Decision)
                </span>
              </div>

              {selectedArticle.scenario_questions.map((quiz: any) => (
                <div key={quiz.id} className="space-y-4">
                  <p className="text-xs md:text-sm font-bold text-slate-100">
                    {quiz.question}
                  </p>

                  <div className="grid grid-cols-1 gap-2.5">
                    {quiz.options.map((opt: string, i: number) => {
                      const isChosen = quizAnswer === i;
                      const isCorrect = i === quiz.answerIndex;

                      let btnStyle = "bg-white/5 border-white/5 text-slate-350 hover:bg-white/10";
                      if (showQuizResult) {
                        if (isCorrect) {
                          btnStyle = "bg-green/10 border-green/40 text-green font-bold";
                        } else if (isChosen) {
                          btnStyle = "bg-red-500/10 border-red-500/40 text-red-400 font-bold";
                        } else {
                          btnStyle = "bg-white/5 border-white/5 text-slate-400 opacity-60";
                        }
                      }

                      return (
                        <button
                          key={i}
                          disabled={showQuizResult}
                          onClick={() => handleAnswerSubmit(i)}
                          className={`w-full text-left p-3.5 rounded-xl text-xs border transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {showQuizResult && (
                    <div className={`p-4 rounded-xl text-xs space-y-1.5 animate-fadeIn border ${
                      quizAnswer === quiz.answerIndex 
                        ? 'bg-green/5 border-green/20 text-slate-200' 
                        : 'bg-red-500/5 border-red-500/20 text-slate-200'
                    }`}>
                      <div className="font-extrabold flex items-center gap-1 font-outfit">
                        {quizAnswer === quiz.answerIndex ? (
                          <span className="text-green">{t('correct')}</span>
                        ) : (
                          <span className="text-red-400">{t('incorrect')}</span>
                        )}
                      </div>
                      <p className="leading-relaxed text-slate-350">
                        {quiz.explanation}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center p-12 text-slate-400 text-sm">
            Select an article from the explorer list to view its details.
          </div>
        )}
      </div>
    </div>
  );
}
