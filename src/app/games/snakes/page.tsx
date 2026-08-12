'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { incrementGamePlay, getGameContent, verifyGameAnswer } from '@/lib/services';
import { useI18n } from '@/hooks/useI18n';
import { 
  ArrowLeft, 
  Dices, 
  ShieldCheck, 
  AlertTriangle, 
  HelpCircle,
  Trophy,
  RefreshCw,
  Sparkles
} from 'lucide-react';

interface GameEvent {
  title: string;
  desc: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

const LADDERS: Record<number, { target: number; event: GameEvent }> = {
  4: {
    target: 25,
    event: {
      title: "Writ of Habeas Corpus filed (Article 226)",
      desc: "A citizen was locked up without charge. Their family filed a Writ in High Court.",
      question: "Which organ of government issues Writs to protect fundamental rights?",
      options: ["The Legislature (Parliament)", "The Executive (Police)", "The Judiciary (High/Supreme Court)", "The Cabinet Ministers"],
      answerIndex: 2,
      explanation: "Under Article 226 (High Court) and Article 32 (Supreme Court), the Judiciary has the special power to issue writs like Habeas Corpus to protect personal liberties from state misuse."
    }
  },
  12: {
    target: 33,
    event: {
      title: "Judicial Review of Unconstitutional Act",
      desc: "The legislature passed an emergency act violating personal privacy. The Court struck it down.",
      question: "What is this judicial power to check and cancel unconstitutional laws called?",
      options: ["Legislative Veto", "Judicial Review", "Presidential Discretion", "Executive Order"],
      answerIndex: 1,
      explanation: "Judicial Review is the power of courts to examine actions of the legislative, executive, and administrative arms of the government and determine whether such actions are consistent with the Constitution."
    }
  },
  36: {
    target: 57,
    event: {
      title: "Money Bill Certified Properly (Article 110)",
      desc: "A dispute arose about a national budget bill. The Speaker resolved it according to the rulebook.",
      question: "Who holds the final authority to certify whether a bill is a Money Bill or not?",
      options: ["The President", "The Finance Minister", "The Speaker of the Lok Sabha", "The Chief Justice of India"],
      answerIndex: 2,
      explanation: "Under Article 110(3), the decision of the Speaker of the Lok Sabha is final regarding whether a bill is a Money Bill."
    }
  },
  50: {
    target: 72,
    event: {
      title: "Governor Assents to Welfare Bill (Article 200)",
      desc: "The state legislature passed a crucial free-education act, and the Governor signed it without delay.",
      question: "In state governance, whose signature formally turns a bill passed by the assembly into a binding State law?",
      options: ["The Chief Minister", "The State Governor", "The Prime Minister", "The High Court Chief Justice"],
      answerIndex: 1,
      explanation: "Like the President at the Union level, the Governor's assent is required for all state-legislated bills to become official state laws under Article 200."
    }
  }
};

const SNAKES: Record<number, { target: number; event: GameEvent }> = {
  28: {
    target: 9,
    event: {
      title: "Governor delays Welfare Bill indefinitely",
      desc: "A public health bill is held up for months by the Governor without returning it or giving reason.",
      question: "To bypass this delay, what must the Governor do under Article 200 if they wish to request changes?",
      options: ["Keep it in pocket veto forever", "Return it to the State Legislature as soon as possible with a message to reconsider", "Refer it to the local police chief", "Order the assembly to dissolve"],
      answerIndex: 1,
      explanation: "The first proviso of Article 200 requires that the Governor, if not assenting, should return the bill as soon as possible with a message asking the legislature to reconsider."
    }
  },
  47: {
    target: 18,
    event: {
      title: "Ordinance misrule (Article 123/213 misuse)",
      desc: "The Executive bypasses parliament by repeatedly re-promulgating temporary emergency laws (Ordinances).",
      question: "What is the maximum time an Ordinance can last once the Parliament or State Assembly reconvenes?",
      options: ["6 months", "6 weeks", "1 year", "24 hours"],
      answerIndex: 1,
      explanation: "Under Article 123 (Union) and Article 213 (State), an Ordinance must be approved by the legislature within six weeks of its reassembly, otherwise it ceases to operate."
    }
  },
  62: {
    target: 40,
    event: {
      title: "Unconstitutional State Emergency (Article 356)",
      desc: "The Union Executive declares President's Rule in a state because of political differences, not actual system failure.",
      question: "Which organ checks and can declare this misuse of President's Rule null and void?",
      options: ["The Prime Minister's office", "The Supreme Court", "The State Governor", "The state police force"],
      answerIndex: 1,
      explanation: "In the famous S.R. Bommai case, the Supreme Court established that presidential proclamations under Article 356 are subject to judicial review, and the courts can restore the state assembly."
    }
  },
  85: {
    target: 63,
    event: {
      title: "Writs order ignored by executive officers",
      desc: "A government official refuses to release a wrongfully detained individual despite a High Court order.",
      question: "Under Article 226, ignoring a High Court's writ command is a violation which represents what offence?",
      options: ["Breach of Privilege", "Contempt of Court", "Treason", "Administrative Discretion"],
      answerIndex: 1,
      explanation: "Refusing to follow a direct judicial directive/writ order constitutes 'Contempt of Court', which allows judges to penalize the non-compliant officers with fines or imprisonment."
    }
  }
};

export default function SnakesGame() {
  const { t, language } = useI18n();
  const [playerPosition, setPlayerPosition] = useState(1);
  const [diceRoll, setDiceRoll] = useState<number | null>(null);
  const [rolling, setRolling] = useState(false);
  
  const [dbLadders, setDbLadders] = useState<Record<number, any>>({});
  const [dbSnakes, setDbSnakes] = useState<Record<number, any>>({});
  const [loadingContent, setLoadingContent] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      setLoadingContent(true);
      try {
        const data = await getGameContent('snakes', language);
        if (data && data.length > 0) {
          const lMap: Record<number, any> = {};
          const sMap: Record<number, any> = {};
          
          data.forEach(item => {
            const parts = item.identifier.split('_');
            const tile = parseInt(parts[1], 10);
            if (item.identifier.startsWith('ladder')) {
              lMap[tile] = {
                target: LADDERS[tile].target,
                event: {
                  title: item.title,
                  desc: item.description,
                  question: item.question,
                  options: item.options,
                  answerIndex: -1, // Hidden
                  explanation: "" // Verification loads it
                }
              };
            } else if (item.identifier.startsWith('snake')) {
              sMap[tile] = {
                target: SNAKES[tile].target,
                event: {
                  title: item.title,
                  desc: item.description,
                  question: item.question,
                  options: item.options,
                  answerIndex: -1, // Hidden
                  explanation: "" // Verification loads it
                }
              };
            }
          });
          setDbLadders(lMap);
          setDbSnakes(sMap);
        }
      } catch (e) {
        console.error("Failed to load snakes game content dynamically", e);
      } finally {
        setLoadingContent(false);
      }
    };
    loadContent();
  }, [language]);

  // Game states
  const [activeEvent, setActiveEvent] = useState<{
    tile: number;
    type: 'snake' | 'ladder';
    event: GameEvent;
  } | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameLog, setGameLog] = useState<string[]>(["Game started! Roll the dice to begin the path of governance."]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [scoreAccumulated, setScoreAccumulated] = useState(0);

  const logMessage = (msg: string) => {
    setGameLog(prev => [msg, ...prev].slice(0, 10));
  };

  const rollDice = () => {
    if (rolling || activeEvent || isGameOver) return;
    
    setRolling(true);
    setDiceRoll(null);

    // Short dice roll delay
    let counter = 0;
    const interval = setInterval(() => {
      setDiceRoll(Math.floor(Math.random() * 6) + 1);
      counter++;
      if (counter > 6) {
        clearInterval(interval);
        finalizeMove();
      }
    }, 100);
  };

  const finalizeMove = async () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(roll);
    setRolling(false);

    let nextPos = playerPosition + roll;
    if (nextPos >= 100) {
      nextPos = 100;
      setPlayerPosition(100);
      setIsGameOver(true);
      logMessage(`Rolled a ${roll}. Reached cell 100! You won the game!`);
      const res = await verifyGameAnswer('snakes', 'completion', 0);
      if (res) {
        if (res.pointsAwarded > 0) {
          setScoreAccumulated(prev => prev + res.pointsAwarded);
        }
      } else {
        await incrementGamePlay('snakes', scoreAccumulated + 100);
      }
      return;
    }

    logMessage(`Rolled a ${roll}. Moved from ${playerPosition} to ${nextPos}.`);
    
    const activeLadders = Object.keys(dbLadders).length > 0 ? dbLadders : LADDERS;
    const activeSnakes = Object.keys(dbSnakes).length > 0 ? dbSnakes : SNAKES;

    // Check for snakes or ladders
    if (activeLadders[nextPos]) {
      setPlayerPosition(nextPos);
      setActiveEvent({
        tile: nextPos,
        type: 'ladder',
        event: activeLadders[nextPos].event
      });
    } else if (activeSnakes[nextPos]) {
      setPlayerPosition(nextPos);
      setActiveEvent({
        tile: nextPos,
        type: 'snake',
        event: activeSnakes[nextPos].event
      });
    } else {
      setPlayerPosition(nextPos);
    }
  };

  const handleScenarioSubmit = async (chosenIndex: number) => {
    if (!activeEvent) return;
    setQuizAnswer(chosenIndex);

    let isCorrect = false;
    let explanationText = "";
    let ansIdx = -1;

    const identifier = `${activeEvent.type}_${activeEvent.tile}`;
    const res = await verifyGameAnswer('snakes', identifier, chosenIndex);

    if (res) {
      isCorrect = res.isCorrect;
      explanationText = res.explanation;
      ansIdx = res.correctAnswerIdx;
      if (res.pointsAwarded > 0) {
        setScoreAccumulated(prev => prev + res.pointsAwarded);
      }
    } else {
      const originalEvent = activeEvent.type === 'ladder' ? LADDERS[activeEvent.tile] : SNAKES[activeEvent.tile];
      isCorrect = chosenIndex === originalEvent.event.answerIndex;
      explanationText = originalEvent.event.explanation;
      ansIdx = originalEvent.event.answerIndex;
      const fallbackPoints = isCorrect ? (activeEvent.type === 'ladder' ? 25 : 15) : 0;
      setScoreAccumulated(prev => prev + fallbackPoints);
    }

    // Set active event explanation and correct index dynamically
    setActiveEvent(prev => prev ? {
      ...prev,
      event: {
        ...prev.event,
        explanation: explanationText,
        answerIndex: ansIdx
      }
    } : null);

    setShowExplanation(true);

    if (activeEvent.type === 'ladder') {
      if (isCorrect) {
        const target = LADDERS[activeEvent.tile].target;
        setPlayerPosition(target);
        logMessage(`Correct! Climbed ladder from ${activeEvent.tile} to ${target}.`);
      } else {
        logMessage(`Incorrect! Missed the ladder at cell ${activeEvent.tile}.`);
      }
    } else if (activeEvent.type === 'snake') {
      if (isCorrect) {
        logMessage(`Correct! Used Constitutional Shield. Safe at cell ${activeEvent.tile}.`);
      } else {
        const target = SNAKES[activeEvent.tile].target;
        setPlayerPosition(target);
        logMessage(`Incorrect! Slid down snake from ${activeEvent.tile} to ${target}.`);
      }
    }
  };

  const closeEventDialog = () => {
    setActiveEvent(null);
    setQuizAnswer(null);
    setShowExplanation(false);
  };

  const resetGame = () => {
    setPlayerPosition(1);
    setDiceRoll(null);
    setActiveEvent(null);
    setQuizAnswer(null);
    setShowExplanation(false);
    setIsGameOver(false);
    setScoreAccumulated(0);
    setGameLog(["Game restarted! Roll the dice."]);
  };

  // Generate board coordinates dynamically for cell numbers 1 to 100
  const getCoordinates = (cellNum: number) => {
    // Standard snakes and ladders bottom-to-top layout
    // Row index 0 is bottom (cell 1-10), Row index 9 is top (cell 91-100)
    const row = Math.floor((cellNum - 1) / 10);
    const col = (cellNum - 1) % 10;
    // zig-zag: odd rows go right-to-left
    const x = row % 2 === 0 ? col : 9 - col;
    const y = 9 - row; // row 9 is top of grid
    return { x, y };
  };

  const boardCells = Array.from({ length: 100 }, (_, i) => 100 - i);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 text-xs font-bold text-saffron bg-saffron/10 border border-saffron/20 px-3 py-1.5 rounded-lg hover:bg-saffron/20 transition-all">
          <ArrowLeft className="h-4 w-4" />
          {t('back_to_dashboard')}
        </Link>
        <h1 className="text-xl md:text-2xl font-black text-white">🐍 Constitutional Snakes & Ladders</h1>
        <button 
          onClick={resetGame}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/5 border border-white/10 hover:bg-white/10 text-white"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Reset Board
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: The 10x10 Grid Board (7 cols) */}
        <div className="lg:col-span-8 flex justify-center">
          <div className="w-full max-w-[500px] aspect-square rounded-3xl bg-navy/40 border border-white/10 p-2.5 relative shadow-2xl board-pattern">
            
            {/* Grid container */}
            <div className="grid grid-cols-10 grid-rows-10 h-full w-full gap-0.5 relative">
              {boardCells.map((cellNum) => {
                const isPlayerHere = playerPosition === cellNum;
                const isLadder = !!LADDERS[cellNum];
                const isSnake = !!SNAKES[cellNum];
                
                // Color tiles based on row index to give checkerboard aesthetic
                const row = Math.floor((cellNum - 1) / 10);
                const tileBg = row % 2 === 0
                  ? (cellNum % 2 === 0 ? 'bg-navy/60' : 'bg-navy/35')
                  : (cellNum % 2 === 0 ? 'bg-navy/35' : 'bg-navy/60');

                let overlayStyle = "";
                let tileIcon = null;

                if (isLadder) {
                  overlayStyle = "border border-green/30 bg-green/5";
                  tileIcon = <span className="text-[10px] font-bold text-green absolute bottom-0.5 right-1">🪜 L{LADDERS[cellNum].target}</span>;
                } else if (isSnake) {
                  overlayStyle = "border border-red-500/30 bg-red-500/5";
                  tileIcon = <span className="text-[10px] font-bold text-red-400 absolute bottom-0.5 right-1">🐍 S{SNAKES[cellNum].target}</span>;
                }

                // Check for reverse targets (ladder tops & snake tails) to render markers
                const isLadderTop = Object.values(LADDERS).some(l => l.target === cellNum);
                const isSnakeTail = Object.values(SNAKES).some(s => s.target === cellNum);
                
                if (isLadderTop) {
                  tileIcon = <span className="text-[8px] text-green/60 absolute bottom-0.5 right-1">▲ Top</span>;
                } else if (isSnakeTail) {
                  tileIcon = <span className="text-[8px] text-red-400/50 absolute bottom-0.5 right-1">▼ Tail</span>;
                }

                return (
                  <div 
                    key={cellNum} 
                    className={`relative rounded flex items-center justify-center text-[10px] font-extrabold text-slate-500 transition-all ${tileBg} ${overlayStyle}`}
                  >
                    <span>{cellNum}</span>
                    {tileIcon}

                    {/* Player Token */}
                    {isPlayerHere && (
                      <div className="absolute inset-0 flex items-center justify-center z-10 animate-pulse">
                        <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-saffron to-green border-2 border-white flex items-center justify-center shadow-lg transform -translate-y-0.5">
                          <span className="text-[8px] text-white font-extrabold">YOU</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Gameplay Controls & History (5 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Roll Controls Card */}
          <div className="glass-card p-6 rounded-3xl text-center space-y-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Gameplay Controls</h3>
            
            <div className="flex flex-col items-center justify-center space-y-4">
              
              {/* Animated Dice Render */}
              <div 
                className={`h-16 w-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-navy shadow-lg text-2xl font-black ${
                  rolling ? 'animate-spin' : ''
                }`}
              >
                {diceRoll !== null ? diceRoll : '?'}
              </div>

              <div className="text-xs text-slate-400">
                Current Position: <span className="text-saffron font-extrabold text-sm">{playerPosition} / 100</span>
              </div>

              <button
                onClick={rollDice}
                disabled={rolling || !!activeEvent || isGameOver}
                className="px-8 py-3 rounded-2xl text-xs font-bold btn-saffron text-white w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Dices className="h-4 w-4" />
                Roll Dice
              </button>
            </div>
          </div>

          {/* Game Log */}
          <div className="glass-card p-5 rounded-3xl space-y-3">
            <h3 className="text-xs font-bold text-slate-350 uppercase tracking-wider border-b border-white/5 pb-2">Governance Log</h3>
            <div className="space-y-2 max-h-44 overflow-y-auto text-[11px] text-slate-400 leading-relaxed divide-y divide-white/5 pr-1">
              {gameLog.map((log, index) => (
                <div key={index} className="pt-2">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Popup Dialog for Snakes & Ladders quiz */}
      {activeEvent && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg glass-card p-6 rounded-3xl space-y-6 relative overflow-hidden animate-scaleIn">
            
            {/* Header branding */}
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              {activeEvent.type === 'ladder' ? (
                <div className="p-2.5 rounded-xl bg-green/20 text-green">
                  <ShieldCheck className="h-6 w-6" />
                </div>
              ) : (
                <div className="p-2.5 rounded-xl bg-red-500/20 text-red-400">
                  <AlertTriangle className="h-6 w-6 animate-pulse" />
                </div>
              )}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {activeEvent.type === 'ladder' ? 'Suprashasan Opportunity (सुशासन अवसर)' : 'Sambahavita Ullanghan (संभावित उल्लंघन)'}
                </h4>
                <h3 className="text-md md:text-lg font-black text-white">{activeEvent.event.title}</h3>
              </div>
            </div>

            {/* Event Description */}
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
              {activeEvent.event.desc}
            </p>

            {/* Event Question */}
            <div className="space-y-4">
              <div className="text-xs font-bold text-slate-400 flex items-center gap-1">
                <HelpCircle className="h-3.5 w-3.5 text-saffron" />
                Constitutional Quiz: Answer to trigger Shield / Ladder
              </div>
              <p className="text-xs md:text-sm font-bold text-slate-100">{activeEvent.event.question}</p>

              <div className="grid grid-cols-1 gap-2.5">
                {activeEvent.event.options.map((opt, i) => {
                  const isChosen = quizAnswer === i;
                  const isCorrect = i === activeEvent.event.answerIndex;

                  let btnStyle = "bg-white/5 border-white/5 text-slate-300 hover:bg-white/10";
                  if (showExplanation) {
                    if (isCorrect) {
                      btnStyle = "bg-green/10 border-green/40 text-green font-bold";
                    } else if (isChosen) {
                      btnStyle = "bg-red-500/10 border-red-500/40 text-red-400 font-bold";
                    } else {
                      btnStyle = "bg-white/5 border-white/5 text-slate-500 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={i}
                      disabled={showExplanation}
                      onClick={() => handleScenarioSubmit(i)}
                      className={`w-full text-left p-3.5 rounded-xl text-xs border transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Quiz Explanation */}
              {showExplanation && (
                <div className="space-y-4 animate-fadeIn">
                  <div className={`p-4 rounded-xl text-xs leading-relaxed border ${
                    quizAnswer === activeEvent.event.answerIndex 
                      ? 'bg-green/5 border-green/20 text-slate-200' 
                      : 'bg-red-500/5 border-red-500/20 text-slate-200'
                  }`}>
                    <div className="font-extrabold mb-1">
                      {quizAnswer === activeEvent.event.answerIndex ? 'Correct decision made!' : 'Incorrect decision.'}
                    </div>
                    {activeEvent.event.explanation}
                  </div>

                  <button
                    onClick={closeEventDialog}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold btn-saffron text-white w-full cursor-pointer"
                  >
                    Proceed On Board
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Game Over Dialog */}
      {isGameOver && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md glass-card p-8 rounded-3xl text-center space-y-6 animate-scaleIn">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-saffron to-green border border-white/20 mx-auto shadow-lg animate-bounce">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white">Victory! Citizen Supreme</h2>
              <p className="text-xs text-slate-400">You navigated the path of governance successfully and reached cell 100!</p>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex justify-around text-xs">
              <div>
                <span className="text-slate-400 block">Civic XP Gained</span>
                <span className="text-md font-bold text-saffron">+{scoreAccumulated + 100} XP</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={resetGame}
                className="flex-1 px-4 py-2.5 rounded-xl text-xs font-bold bg-white/5 border border-white/10 hover:bg-white/10 text-white cursor-pointer"
              >
                Play Again
              </button>
              <Link
                href="/"
                className="flex-1 px-4 py-2.5 rounded-xl text-xs font-bold btn-saffron text-white flex items-center justify-center"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
