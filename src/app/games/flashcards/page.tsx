'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { incrementGamePlay, getGameContent, verifyGameAnswer } from '@/lib/services';
import { useI18n } from '@/hooks/useI18n';
import { 
  ArrowLeft, 
  Sparkles, 
  HelpCircle, 
  RefreshCw, 
  BookOpen, 
  CheckCircle2, 
  XCircle,
  HelpCircleIcon,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface Flashcard {
  id: string;
  topic: string;
  topicHi: string;
  unionTitle: string;
  unionDesc: string;
  stateTitle: string;
  stateDesc: string;
  comparisonKey: string;
  trivia: {
    question: string;
    options: string[];
    answerIndex: number;
    explanation: string;
  };
}

const CARDS: Flashcard[] = [
  {
    id: "fc_1",
    topic: "President vs Governor",
    topicHi: "राष्ट्रपति बनाम राज्यपाल",
    unionTitle: "President (Union Executive)",
    unionDesc: "Ceremonial head of the country. Holds office for 5 years. bound by the advice of the Prime Minister's cabinet (Article 74) on almost all matters.",
    stateTitle: "Governor (State Executive)",
    stateDesc: "Ceremonial head of the State. Appointed by the President and holds office during their pleasure. Holds explicit discretionary powers (Article 163).",
    comparisonKey: "The Governor has wider constitutional discretionary powers, whereas the President is tightly bound by their Cabinet.",
    trivia: {
      question: "Which of the following officials can act on their own constitutional discretion in certain matters, without cabinet approval?",
      options: [
        "The President of India",
        "The Governor of an Indian State",
        "The Prime Minister of India",
        "The Chief Justice of India"
      ],
      answerIndex: 1,
      explanation: "Article 163 explicitly grants the Governor discretionary powers in specific affairs, whereas the President has very narrow scope for discretion under Article 74."
    }
  },
  {
    id: "fc_2",
    topic: "Supreme Court vs High Court Writs",
    topicHi: "सुप्रीम कोर्ट बनाम हाई कोर्ट रिट अधिकार",
    unionTitle: "Supreme Court (Article 32)",
    unionDesc: "Highest court. Can issue writs ONLY for the enforcement of Fundamental Rights. Has jurisdiction over the entire country.",
    stateTitle: "High Court (Article 226)",
    stateDesc: "Highest court in a state. Can issue writs for both Fundamental Rights and any other legal right. Jurisdiction limited to state boundaries.",
    comparisonKey: "High Court's writ power (Article 226) is broader than the Supreme Court's (Article 32) since it covers non-fundamental legal issues too.",
    trivia: {
      question: "Which Court has the power to issue writs for disputes other than the violation of Fundamental Rights?",
      options: [
        "Only the Supreme Court of India",
        "Only the State High Courts",
        "Both Supreme Court and High Courts",
        "No court has this power"
      ],
      answerIndex: 1,
      explanation: "High Courts can issue writs for 'any other purpose' under Article 226, making their writ power broader than the Supreme Court's, which is restricted to Fundamental Rights (Article 32)."
    }
  },
  {
    id: "fc_3",
    topic: "Parliament vs State Assembly (Legislative Lists)",
    topicHi: "संसद बनाम राज्य विधानसभा (विधायी सूचियाँ)",
    unionTitle: "Union Parliament (Article 246)",
    unionDesc: "Sole authority to legislate on 'Union List' subjects (defense, banking, foreign affairs) and shares 'Concurrent List' with states.",
    stateTitle: "State Legislature (Article 246)",
    stateDesc: "Sole authority to legislate on 'State List' subjects (police, public health, sanitation) and shares 'Concurrent List' with Union.",
    comparisonKey: "In case of conflict on a Concurrent list law, the Union Parliament's law overrides the State's law (Doctrine of Repugnancy).",
    trivia: {
      question: "If a State law and a Union law clash on a topic listed in the Concurrent List (like education), which law prevails?",
      options: [
        "The State law overrides the Union law",
        "The Union law overrides the State law",
        "Both laws are nullified instantly",
        "The local Governor decides which one stands"
      ],
      answerIndex: 1,
      explanation: "Under Article 254 (Doctrine of Repugnancy), if a state law conflicts with a central law on a Concurrent list subject, the central law prevails unless the state law received the President's prior assent."
    }
  },
  {
    id: "fc_4",
    topic: "Ordinance Powers",
    topicHi: "अध्यादेश जारी करने की शक्तियां",
    unionTitle: "Presidential Ordinance (Article 123)",
    unionDesc: "Passed during recess of Parliament. Has the same force as an Act. Ceases to operate 6 weeks after Parliament reassembles.",
    stateTitle: "Gubernatorial Ordinance (Article 213)",
    stateDesc: "Passed during recess of State Assembly. Has the same force as a State Act. Ceases to operate 6 weeks after Assembly reassembles.",
    comparisonKey: "Both are temporary emergency laws, but the Governor must obtain the President's instructions for certain state subject ordinances.",
    trivia: {
      question: "What is the maximum duration an Ordinance can remain active once the legislature has re-convened if it is not approved?",
      options: [
        "Six months",
        "Six weeks",
        "One year",
        "Three months"
      ],
      answerIndex: 1,
      explanation: "Under both Article 123 and 213, an Ordinance will cease to operate six weeks after the reassembly of the legislature unless it is approved by a resolution before that period."
    }
  }
];

export default function FlashcardsGame() {
  const { t, language } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [triviaStarted, setTriviaStarted] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [scoreEarned, setScoreEarned] = useState(0);
  
  const [cards, setCards] = useState<Flashcard[]>(CARDS);
  const [loadingContent, setLoadingContent] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      setLoadingContent(true);
      try {
        const data = await getGameContent('flashcards', language);
        if (data && data.length > 0) {
          const list = CARDS.map((c, idx) => {
            const dbItem = data.find(item => item.identifier === `fc_${idx + 1}`);
            if (dbItem) {
              const comp = dbItem.description;
              return {
                ...c,
                topic: dbItem.title,
                unionTitle: comp.unionTitle,
                unionDesc: comp.unionDesc,
                stateTitle: comp.stateTitle,
                stateDesc: comp.stateDesc,
                comparisonKey: comp.comparisonKey,
                trivia: {
                  question: dbItem.question,
                  options: dbItem.options,
                  answerIndex: -1, // Hidden
                  explanation: "" // Loaded on verification
                }
              };
            }
            return c;
          });
          setCards(list);
        }
      } catch (e) {
        console.error("Failed to load flashcards dynamically", e);
      } finally {
        setLoadingContent(false);
      }
    };
    loadContent();
  }, [language]);

  const activeCard = cards[currentIndex];

  const handleNext = () => {
    setFlipped(false);
    setTriviaStarted(false);
    setQuizAnswer(null);
    setShowResult(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setFlipped(false);
    setTriviaStarted(false);
    setQuizAnswer(null);
    setShowResult(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleTriviaAnswer = async (optionIndex: number) => {
    setQuizAnswer(optionIndex);

    let isCorrect = false;
    let explanationText = "";
    let ansIdx = -1;

    const res = await verifyGameAnswer('flashcards', activeCard.id, optionIndex);

    if (res) {
      isCorrect = res.isCorrect;
      explanationText = res.explanation;
      ansIdx = res.correctAnswerIdx;
      if (res.pointsAwarded > 0) {
        setScoreEarned(prev => prev + res.pointsAwarded);
      }
    } else {
      isCorrect = optionIndex === activeCard.trivia.answerIndex;
      explanationText = activeCard.trivia.explanation;
      ansIdx = activeCard.trivia.answerIndex;
      const points = isCorrect ? 20 : 5;
      setScoreEarned(prev => prev + points);
    }

    // Set active card trivia explanation and correct index dynamically
    setCards(prev => {
      const nextCards = [...prev];
      nextCards[currentIndex] = {
        ...nextCards[currentIndex],
        trivia: {
          ...nextCards[currentIndex].trivia,
          explanation: explanationText,
          answerIndex: ansIdx
        }
      };
      return nextCards;
    });

    setShowResult(true);

    if (!res) {
      // Save offline gameplay progress
      await incrementGamePlay('flashcards', isCorrect ? 20 : 5);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xs font-bold text-saffron bg-saffron/10 border border-saffron/20 px-3 py-1.5 rounded-lg hover:bg-saffron/20 transition-all">
          <ArrowLeft className="h-4 w-4" />
          {t('back_to_dashboard')}
        </Link>
        
        <h1 className="text-xl font-bold tracking-tight text-white">🃏 Power Duel Flashcards</h1>
        
        <div className="text-xs font-bold text-saffron bg-saffron/10 border border-saffron/20 px-3 py-1.5 rounded-lg">
          XP: +{scoreEarned}
        </div>
      </div>

      <div className="max-w-xl mx-auto space-y-6">
        
        {/* Flashcard container with custom 3D flip styling */}
        <div className="relative w-full h-80 sm:h-96 perspective-1000">
          <div 
            onClick={() => !triviaStarted && setFlipped(!flipped)}
            className={`w-full h-full transition-transform duration-500 transform-style-3d cursor-pointer ${
              flipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* FRONT OF THE CARD */}
            <div className="absolute inset-0 backface-hidden glass-card p-6 rounded-3xl flex flex-col justify-between items-center text-center select-none bg-navy/80 border-white/10 hover:border-saffron/30 transition-all">
              <span className="text-[10px] uppercase font-bold tracking-wider text-saffron">Comparison Duel</span>
              
              <div className="space-y-3">
                <h2 className="text-2xl font-black text-white">
                  {language === 'hi' ? activeCard.topicHi : activeCard.topic}
                </h2>
                <p className="text-xs text-slate-400">Click Card to Flip & Compare Institutional Powers</p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-saffron animate-pulse">
                <BookOpen className="h-5 w-5" />
              </div>
            </div>

            {/* BACK OF THE CARD */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 glass-card p-6 rounded-3xl flex flex-col justify-between select-none bg-navy/95 border-saffron/20">
              
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-[10px] uppercase font-bold text-saffron">Federal Contrast</span>
                  <span className="text-[9px] text-slate-400">Card {currentIndex + 1} of {CARDS.length}</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Union Side */}
                  <div className="space-y-1.5 border-r border-white/5 pr-3">
                    <span className="text-[9px] font-bold text-orange-400 uppercase tracking-wide">Union</span>
                    <h4 className="text-xs font-bold text-white leading-tight">{activeCard.unionTitle}</h4>
                    <p className="text-[10px] text-slate-300 leading-relaxed line-clamp-4">{activeCard.unionDesc}</p>
                  </div>

                  {/* State Side */}
                  <div className="space-y-1.5 pl-1">
                    <span className="text-[9px] font-bold text-green uppercase tracking-wide">State</span>
                    <h4 className="text-xs font-bold text-white leading-tight">{activeCard.stateTitle}</h4>
                    <p className="text-[10px] text-slate-300 leading-relaxed line-clamp-4">{activeCard.stateDesc}</p>
                  </div>
                </div>

                {/* Key takeaway */}
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/5 text-[10px] text-slate-200">
                  <span className="font-bold text-saffron">Key difference: </span>
                  {activeCard.comparisonKey}
                </div>
              </div>

              <div className="text-[10px] text-slate-400 text-center">
                Click card to return, or click buttons below to challenge
              </div>
            </div>

          </div>
        </div>

        {/* Card Navigation */}
        <div className="flex flex-wrap gap-2.5 justify-between items-center">
          <button 
            onClick={handlePrev}
            className="flex items-center gap-1 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold bg-white/5 border border-white/10 hover:bg-white/10 text-white cursor-pointer order-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>

          {!triviaStarted && (
            <button
              onClick={() => setTriviaStarted(true)}
              className="px-5 sm:px-6 py-2 rounded-xl text-xs font-bold btn-saffron text-white cursor-pointer order-3 sm:order-2 w-full sm:w-auto text-center"
            >
              Take Trivia Duel
            </button>
          )}

          <button 
            onClick={handleNext}
            className="flex items-center gap-1 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold bg-white/5 border border-white/10 hover:bg-white/10 text-white cursor-pointer order-2 sm:order-3"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Trivia Box */}
        {triviaStarted && (
          <div className="glass-card p-6 rounded-3xl space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2">
              <HelpCircleIcon className="h-4 w-4 text-blue-400" />
              <span className="text-xs font-bold uppercase text-blue-400 tracking-wider">Trivia Duel Question</span>
            </div>

            <div className="space-y-4">
              <p className="text-xs md:text-sm font-bold text-slate-100">
                {activeCard.trivia.question}
              </p>

              <div className="grid grid-cols-1 gap-2.5">
                {activeCard.trivia.options.map((opt, i) => {
                  const isChosen = quizAnswer === i;
                  const isCorrect = i === activeCard.trivia.answerIndex;

                  let btnStyle = "bg-white/5 border-white/5 text-slate-300 hover:bg-white/10";
                  if (showResult) {
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
                      disabled={showResult}
                      onClick={() => handleTriviaAnswer(i)}
                      className={`w-full text-left p-3.5 rounded-xl text-xs border transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {showResult && (
                <div className={`p-4 rounded-xl text-xs space-y-2 animate-fadeIn border ${
                  quizAnswer === activeCard.trivia.answerIndex 
                    ? 'bg-green/5 border-green/20' 
                    : 'bg-red-500/5 border-red-500/20'
                }`}>
                  <div className="font-extrabold flex items-center gap-1">
                    {quizAnswer === activeCard.trivia.answerIndex ? (
                      <span className="text-green flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" /> Correct! +20 XP
                      </span>
                    ) : (
                      <span className="text-red-400 flex items-center gap-1">
                        <XCircle className="h-4 w-4" /> Incorrect! +5 XP (effort)
                      </span>
                    )}
                  </div>
                  <p className="leading-relaxed text-slate-350">
                    {activeCard.trivia.explanation}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Perspective helper CSS */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
