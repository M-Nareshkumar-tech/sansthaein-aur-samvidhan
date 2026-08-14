'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { seedArticles, Article } from '@/data/articles';
import { useI18n } from '@/hooks/useI18n';
import { incrementGamePlay, getArticles, verifyGameAnswer } from '@/lib/services';
import { 
  ArrowLeft, 
  HelpCircle, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  RotateCcw,
  CheckCircle,
  XCircle,
  HelpCircleIcon
} from 'lucide-react';

const SECTOR_COUNT = 8;
const WHEEL_SECTORS = [
  { index: 0, artNum: "Article 52", label: "Executive (52)", color: "#ff9933" },
  { index: 1, artNum: "Article 74", label: "Executive (74)", color: "#e65c00" },
  { index: 2, artNum: "Article 79", label: "Legislature (79)", color: "#000080" },
  { index: 3, artNum: "Article 110", label: "Money Bills (110)", color: "#0a0e29" },
  { index: 4, artNum: "Article 124", label: "Supreme Court (124)", color: "#138808" },
  { index: 5, artNum: "Article 153", label: "State Governor (153)", color: "#0d6804" },
  { index: 6, artNum: "Article 168", label: "State Assembly (168)", color: "#d87d1a" },
  { index: 7, artNum: "Article 226", label: "Writs (226)", color: "#4B5563" },
];

export default function SpinGame() {
  const { t, language } = useI18n();
  const [articlesList, setArticlesList] = useState<any[]>([]);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [landedSector, setLandedSector] = useState<typeof WHEEL_SECTORS[0] | null>(null);
  const [landedArticle, setLandedArticle] = useState<any | null>(null);

  useEffect(() => {
    const fetchDynamicArticles = async () => {
      try {
        const list = await getArticles(language);
        if (list && list.length > 0) {
          setArticlesList(list);
        }
      } catch (e) {
        console.error("Failed to fetch dynamic articles for Spin Wheel", e);
      }
    };
    fetchDynamicArticles();
  }, [language]);
  
  // Quiz states
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [wonPoints, setWonPoints] = useState(0);

  // Stop sound if playing on spin
  const [isMuted, setIsMuted] = useState(false);

  const spinWheel = () => {
    if (spinning) return;
    
    // Reset states
    setSpinning(true);
    setLandedSector(null);
    setLandedArticle(null);
    setQuizAnswer(null);
    setShowQuizResult(false);
    setWonPoints(0);

    // Audio cue if not muted
    if (!isMuted && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const clickSynth = new SpeechSynthesisUtterance("Democracy wheel in motion!");
      clickSynth.volume = 0.5;
      window.speechSynthesis.speak(clickSynth);
    }

    // Determine random sector
    const sectorIndex = Math.floor(Math.random() * SECTOR_COUNT);
    // Base 5 full rotations (1800 deg) + sector offset
    // Sectors are distributed clockwise. Sector 0 starts at 0 deg.
    // The pointer is at the TOP (270 deg). 
    // To land on sector X at the top, we need the wheel to rotate by:
    // 270 - (X * (360/8) + (360/16))
    const anglePerSector = 360 / SECTOR_COUNT;
    const targetAngle = 270 - (sectorIndex * anglePerSector + anglePerSector / 2);
    const finalRotation = 1800 + targetAngle;
    
    setRotation(finalRotation);

    setTimeout(() => {
      setSpinning(false);
      const sector = WHEEL_SECTORS[sectorIndex];
      setLandedSector(sector);
      
      let article = articlesList.find(a => a.article_number === sector.artNum);
      if (!article) {
        article = seedArticles.find(a => a.article_number === sector.artNum) || null;
      }
      setLandedArticle(article);

      // Play success audio
      if (!isMuted && typeof window !== 'undefined' && 'speechSynthesis' in window && article) {
        const landingSynth = new SpeechSynthesisUtterance(`Landed on ${article.article_number}: ${article.title}`);
        window.speechSynthesis.speak(landingSynth);
      }
    }, 4000); // match 4s transition duration
  };

  const handleQuizAnswerSubmit = async (optionIndex: number) => {
    if (!landedArticle) return;
    setQuizAnswer(optionIndex);

    let isCorrect = false;
    let pointsGained = 0;
    let ansIdx = -1;
    let explanationText = "";

    const res = await verifyGameAnswer('spin', landedArticle.scenario_questions[0].id, optionIndex);

    if (res) {
      isCorrect = res.isCorrect;
      pointsGained = res.pointsAwarded;
      ansIdx = res.correctAnswerIdx;
      explanationText = res.explanation;
    } else {
      // Fallback local logic for anonymous/offline players
      const fallbackCorrectIdx = landedArticle.scenario_questions[0].answerIndex;
      isCorrect = optionIndex === fallbackCorrectIdx;
      pointsGained = isCorrect ? 40 : 10;
      ansIdx = fallbackCorrectIdx;
      explanationText = landedArticle.scenario_questions[0].explanation;
      // Save offline progress
      await incrementGamePlay('spin', pointsGained);
    }

    setWonPoints(pointsGained);
    setShowQuizResult(true);

    // Update landedArticle with correct answerIndex and explanation dynamically for display
    setLandedArticle((prev: any) => prev ? {
      ...prev,
      scenario_questions: [
        {
          ...prev.scenario_questions[0],
          answerIndex: ansIdx,
          explanation: explanationText
        }
      ]
    } : null);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Back button header */}
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xs font-bold text-saffron bg-saffron/10 border border-saffron/20 px-3 py-1.5 rounded-lg hover:bg-saffron/20 transition-all">
          <ArrowLeft className="h-4 w-4" />
          {t('back_to_dashboard')}
        </Link>
        
        <h1 className="text-xl font-bold tracking-tight text-white">🎡 Spin the Wheel</h1>

        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300"
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: The Wheel Rendering (7 cols) */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center space-y-6">
          <div className="relative w-[260px] h-[260px] min-[360px]:w-[300px] min-[360px]:h-[300px] sm:w-80 sm:h-80 md:w-96 md:h-96 max-w-full aspect-square">
            
            {/* The Pointer (Top center) */}
            <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 z-20 drop-shadow-[0_4px_10px_rgba(255,153,51,0.5)]">
              <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-saffron" />
              <div className="w-2 h-2 rounded-full bg-white absolute top-[-6px] left-1/2 transform -translate-x-1/2" />
            </div>

            {/* Glowing wheel border */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-saffron via-transparent to-green p-1 animate-pulse" />

            {/* The Wheel SVG */}
            <svg
              className="w-full h-full rounded-full shadow-[0_0_50px_rgba(10,14,41,0.6)]"
              viewBox="0 0 100 100"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: spinning ? 'transform 4s cubic-bezier(0.1, 0.8, 0.2, 1)' : 'none',
              }}
            >
              {WHEEL_SECTORS.map((sector, i) => {
                const angle = 360 / SECTOR_COUNT;
                const startAngle = i * angle;
                const endAngle = startAngle + angle;
                
                // Convert polar to cartesian coordinates
                const radStart = ((startAngle - 90) * Math.PI) / 180;
                const radEnd = ((endAngle - 90) * Math.PI) / 180;
                
                const x1 = 50 + 50 * Math.cos(radStart);
                const y1 = 50 + 50 * Math.sin(radStart);
                const x2 = 50 + 50 * Math.cos(radEnd);
                const y2 = 50 + 50 * Math.sin(radEnd);

                const largeArcFlag = angle <= 180 ? 0 : 1;
                
                // SVG path for a circular pie slice
                const d = `M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

                // Calculate center angle of the slice for label position
                const textAngle = startAngle + angle / 2 - 90;
                const radText = (textAngle * Math.PI) / 180;
                const textX = 50 + 32 * Math.cos(radText);
                const textY = 50 + 32 * Math.sin(radText);

                return (
                  <g key={sector.index}>
                    {/* Pie slice */}
                    <path
                      d={d}
                      fill={sector.color}
                      stroke="rgba(255,255,255,0.15)"
                      strokeWidth="0.5"
                    />
                    
                    {/* Text Label */}
                    <text
                      x={textX}
                      y={textY}
                      fill="#ffffff"
                      fontSize="2.5"
                      fontWeight="bold"
                      textAnchor="middle"
                      transform={`rotate(${textAngle + 90}, ${textX}, ${textY})`}
                    >
                      {sector.artNum}
                    </text>
                  </g>
                );
              })}
              
              {/* Inner Center Hub */}
              <circle cx="50" cy="50" r="10" fill="#020205" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <circle cx="50" cy="50" r="6" fill="#ff9933" />
            </svg>
          </div>

          <button
            onClick={spinWheel}
            disabled={spinning}
            className="px-8 py-3 rounded-2xl text-md font-extrabold btn-saffron text-white w-56 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className={`h-4 w-4 ${spinning ? 'animate-spin' : ''}`} />
            {spinning ? 'SPINNING...' : t('spin_btn')}
          </button>
        </div>

        {/* Right Side: Quiz & Article details (6 cols) */}
        <div className="lg:col-span-6">
          {spinning ? (
            <div className="glass-card p-10 rounded-3xl text-center space-y-4">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-saffron/10 border border-saffron/20 mx-auto animate-bounce">
                <Sparkles className="h-6 w-6 text-saffron" />
              </div>
              <h3 className="text-lg font-bold text-white">The wheel is spinning...</h3>
              <p className="text-xs text-slate-400">Selecting a random category from Legislative, Executive, or Judicial organs.</p>
            </div>
          ) : landedArticle && landedSector ? (
            <div className="space-y-6">
              {/* Article Landing info */}
              <div className="glass-card p-6 rounded-3xl space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-saffron/5 rounded-full filter blur-xl" />
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold text-saffron px-2 py-0.5 rounded bg-saffron/10 border border-saffron/20">
                    Landed Topic
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {landedArticle.level} • {landedArticle.organ}
                  </span>
                </div>
                <h2 className="text-xl font-black text-white">{landedArticle.article_number}: {landedArticle.title}</h2>
                <p className="text-xs text-slate-350 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
                  {landedArticle.simplified_summary}
                </p>
              </div>

              {/* Quiz panel */}
              <div className="glass-card p-6 rounded-3xl space-y-6">
                <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                  <HelpCircle className="h-4 w-4 text-blue-400" />
                  <span className="text-xs font-bold uppercase text-blue-400 tracking-wider">Scenario Quiz (+40 Civic XP)</span>
                </div>

                <div className="space-y-4">
                  <p className="text-xs md:text-sm font-bold text-slate-100">
                    {landedArticle.scenario_questions[0].question}
                  </p>

                  <div className="grid grid-cols-1 gap-2.5">
                    {landedArticle.scenario_questions[0].options.map((opt: string, i: number) => {
                      const isChosen = quizAnswer === i;
                      const isCorrect = i === landedArticle.scenario_questions[0].answerIndex;

                      let btnStyle = "bg-white/5 border-white/5 text-slate-300 hover:bg-white/10";
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
                          onClick={() => handleQuizAnswerSubmit(i)}
                          className={`w-full text-left p-3 py-2.5 rounded-xl text-xs border transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {showQuizResult && (
                    <div className={`p-4 rounded-xl text-xs space-y-2 animate-fadeIn border ${
                      quizAnswer === landedArticle.scenario_questions[0].answerIndex 
                        ? 'bg-green/5 border-green/20' 
                        : 'bg-red-500/5 border-red-500/20'
                    }`}>
                      <div className="font-extrabold flex items-center gap-1">
                        {quizAnswer === landedArticle.scenario_questions[0].answerIndex ? (
                          <span className="text-green flex items-center gap-1">
                            <CheckCircle className="h-4 w-4" /> Correct Decision! +40 XP
                          </span>
                        ) : (
                          <span className="text-red-400 flex items-center gap-1">
                            <XCircle className="h-4 w-4" /> Constitutional Misstep! +10 XP (Pity points)
                          </span>
                        )}
                      </div>
                      <p className="leading-relaxed text-slate-350">
                        {landedArticle.scenario_questions[0].explanation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card p-10 rounded-3xl text-center space-y-4">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-saffron/10 border border-saffron/20 mx-auto">
                <HelpCircleIcon className="h-6 w-6 text-saffron" />
              </div>
              <h3 className="text-lg font-bold text-white">Spin the democracy wheel</h3>
              <p className="text-xs text-slate-400">Click the SPIN button to launch a constitutional quest. Answer correctly to level up.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
