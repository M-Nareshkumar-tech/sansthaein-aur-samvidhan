'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { incrementGamePlay, getGameContent, verifyGameAnswer } from '@/lib/services';
import { useI18n } from '@/hooks/useI18n';
import { 
  ArrowLeft, 
  Dices, 
  Building2, 
  UserCheck, 
  AlertOctagon,
  Trophy,
  CheckCircle,
  HelpCircle,
  ShieldCheck,
  RefreshCw,
  Zap,
  Star
} from 'lucide-react';

interface BoardSpace {
  id: number;
  name: string;
  nameHi: string;
  role: string;
  color: string;
  challenge: {
    crisis: string;
    question: string;
    options: string[];
    answerIndex: number;
    explanation: string;
  };
}

const BOARD_SPACES: BoardSpace[] = [
  {
    id: 0,
    name: "Lok Sabha (Parliament)",
    nameHi: "लोक सभा (संसद)",
    role: "Speaker of the House",
    color: "border-t-saffron border-l-saffron",
    challenge: {
      crisis: "A vital environment protection bill is deadlocked between Lok Sabha and Rajya Sabha.",
      question: "Which constitutional method can the Union Executive initiate to resolve a legislative deadlock between both Houses?",
      options: [
        "President summons a Joint Sitting of both Houses (Article 108)",
        "The Prime Minister vetoes the Rajya Sabha objection",
        "The Speaker dissolves Rajya Sabha permanently",
        "Ask the Supreme Court to pass the bill directly"
      ],
      answerIndex: 0,
      explanation: "Under Article 108, if a bill passed by one House is rejected by the other, the President may summon a Joint Sitting of both Houses to deliberate and vote on the bill."
    }
  },
  {
    id: 1,
    name: "Prime Minister's Office",
    nameHi: "प्रधानमंत्री कार्यालय (PMO)",
    role: "Head of Government",
    color: "border-t-saffron",
    challenge: {
      crisis: "A major economic policy requires fast implementation, but parliament is not in session.",
      question: "What advise should the Prime Minister's cabinet give to the President to enact temporary rules?",
      options: [
        "Request the Supreme Court to write a law",
        "Advise the President to promulgate an Ordinance (Article 123)",
        "Declare a National Emergency",
        "Implement the rule without any legal framework"
      ],
      answerIndex: 1,
      explanation: "Under Article 123, if Parliament is recessing, the President can promulgate an Ordinance on the advice of the Prime Minister and cabinet to handle urgent matters."
    }
  },
  {
    id: 2,
    name: "Finance Ministry",
    nameHi: "वित्त मंत्रालय",
    role: "Custodian of Treasury",
    color: "border-t-saffron",
    challenge: {
      crisis: "The Union Budget (Annual Financial Statement) needs to be introduced.",
      question: "Under Article 112, in which house of Parliament must the Budget / Money Bills be introduced first?",
      options: [
        "Either Lok Sabha or Rajya Sabha",
        "Only in the Rajya Sabha",
        "Only in the Lok Sabha",
        "In a Joint Sitting directly"
      ],
      answerIndex: 2,
      explanation: "Under Article 109, a Money Bill (including the budget and taxation bills) can only be introduced in the Lok Sabha (House of the People) with the prior recommendation of the President."
    }
  },
  {
    id: 3,
    name: "Rashtrapati Bhavan",
    nameHi: "राष्ट्रपति भवन",
    role: "Head of State",
    color: "border-t-saffron border-r-saffron",
    challenge: {
      crisis: "A bill reaches your desk that limits civil liberties in an ambiguous way.",
      question: "Under Article 111, what is your constitutional option if you want the cabinet to rethink the bill?",
      options: [
        "Permanently cancel the bill using absolute veto",
        "Return the bill to the Houses with a message requesting reconsideration of specific clauses",
        "Order the arrest of the law sponsors",
        "Declare the parliament dissolved"
      ],
      answerIndex: 1,
      explanation: "Article 111 allows the President to return a bill (if it is not a Money Bill) to the Houses for reconsideration. However, if the bill is passed again by both Houses, the President must give assent."
    }
  },
  {
    id: 4,
    name: "Raj Bhavan (State Governor)",
    nameHi: "राजभवन (राज्यपाल)",
    role: "Union Representative",
    color: "border-r-saffron",
    challenge: {
      crisis: "A state bill is presented to you that overlaps heavily with Union subjects.",
      question: "What discretionary option does the Governor have to ensure federal compatibility under Article 200?",
      options: [
        "Reserve the bill for the consideration of the President",
        "Reject the bill permanently on their own choices",
        "File a suit against the state Assembly in police court",
        "Sign it but order the state police to ignore it"
      ],
      answerIndex: 0,
      explanation: "Under Article 200, the Governor can reserve a bill for the consideration of the President of India, maintaining federal harmony between the Union and the States."
    }
  },
  {
    id: 5,
    name: "Vidhan Sabha (State Assembly)",
    nameHi: "विधान सभा",
    role: "State Lawmaker",
    color: "border-b-green border-r-green",
    challenge: {
      crisis: "An urgent state health epidemic requires state funding, but the state assembly is recessing.",
      question: "Under Article 213, what emergency legislative route is available to the state executive?",
      options: [
        "The Governor can issue an Ordinance on the advice of the State cabinet",
        "The Chief Minister can pass a permanent law by decree",
        "Ask the local municipal corporation to make state-wide rules",
        "The state high court must draft the state budget"
      ],
      answerIndex: 0,
      explanation: "Article 213 empowers the Governor to promulgate Ordinances during the recess of the State Legislature, acting as temporary legislative measures."
    }
  },
  {
    id: 6,
    name: "High Court",
    nameHi: "उच्च न्यायालय",
    role: "State Chief Justice",
    color: "border-b-green",
    challenge: {
      crisis: "An activist group complains that state officers are seizing properties without any legal authority.",
      question: "Under Article 226, which writ can the High Court issue directing officers to show their legal authority to hold the property?",
      options: [
        "Writ of Habeas Corpus",
        "Writ of Quo Warranto or Mandamus",
        "Writ of Prohibition",
        "Writ of Certiorari"
      ],
      answerIndex: 1,
      explanation: "High Courts can issue Mandamus (commanding a public official to perform their legal duty) or Quo Warranto (inquiring by what authority they act) under Article 226."
    }
  },
  {
    id: 7,
    name: "Supreme Court",
    nameHi: "उच्चतम न्यायालय",
    role: "Chief Justice of India",
    color: "border-b-green",
    challenge: {
      crisis: "A citizen is detained by state intelligence services without trial for months.",
      question: "Under Article 32, which writ can the Supreme Court issue to command the state to produce the individual?",
      options: [
        "Writ of Certiorari",
        "Writ of Habeas Corpus",
        "Writ of Quo Warranto",
        "Writ of Mandamus"
      ],
      answerIndex: 1,
      explanation: "A Writ of Habeas Corpus is the constitutional mechanism to safeguard personal liberty against illegal state detentions, commanding the state to produce the person in court."
    }
  },
  {
    id: 8,
    name: "Cabinet Room (State)",
    nameHi: "मंत्रिपरिषद कक्ष",
    role: "Chief Minister",
    color: "border-b-green border-l-green",
    challenge: {
      crisis: "The state cabinet wants to draft a land acquisition policy but the Governor disagrees.",
      question: "Under Article 163, is the Governor generally bound by the advice of the Chief Minister and Council of Ministers?",
      options: [
        "No, the Governor has absolute veto on all executive policies",
        "Yes, except in matters where the Governor is constitutionally allowed discretion",
        "Yes, but only if approved by the local police commissioner",
        "No, the Governor makes all state policies independently"
      ],
      answerIndex: 1,
      explanation: "Article 163 states that there shall be a Council of Ministers with the Chief Minister at the head to aid and advise the Governor, who must act on it except in discretionary matters."
    }
  },
  {
    id: 9,
    name: "Chief Minister's Office",
    nameHi: "मुख्यमंत्री कार्यालय (CMO)",
    role: "State Executive Leader",
    color: "border-l-green",
    challenge: {
      crisis: "The Governor demands information on the cabinet's decisions on a welfare policy.",
      question: "Under Article 167, what is the duty of the Chief Minister regarding sharing cabinet decisions with the Governor?",
      options: [
        "CM can refuse to share info citing executive secrecy",
        "CM is constitutionally bound to communicate all decisions of the Council of Ministers to the Governor",
        "CM must refer the request to the Prime Minister",
        "CM only shares information if the Assembly votes for it"
      ],
      answerIndex: 1,
      explanation: "Article 167 makes it the explicit duty of the Chief Minister to communicate to the Governor of the State all decisions of the Council of Ministers relating to the administration of the state."
    }
  },
  {
    id: 10,
    name: "Elections Commission",
    nameHi: "चुनाव आयोग",
    role: "Democracy Guard",
    color: "border-l-green",
    challenge: {
      crisis: "Allegations of electoral malpractice surface in a State Assembly election.",
      question: "Which independent constitutional body is responsible for superintendence, direction, and control of elections?",
      options: [
        "The State Assembly itself",
        "The Election Commission of India (Article 324)",
        "The Ministry of Home Affairs",
        "The State High Court directly"
      ],
      answerIndex: 1,
      explanation: "Under Article 324, the Election Commission of India has the independent authority for superintendence, direction, and control of elections to Parliament and to the Legislature of every State."
    }
  },
  {
    id: 11,
    name: "Constitution Hall",
    nameHi: "संविधान सभा",
    role: "Founding Architect",
    color: "border-l-saffron",
    challenge: {
      crisis: "A amendment is proposed by Parliament that seeks to remove the power of judicial review.",
      question: "Under which landmark judicial doctrine can the Supreme Court strike down amendments that alter the fundamental pillars of the constitution?",
      options: [
        "Doctrine of Pith and Substance",
        "Basic Structure Doctrine (Kesavananda Bharati case)",
        "Doctrine of Colorable Legislation",
        "Doctrine of Severability"
      ],
      answerIndex: 1,
      explanation: "The Basic Structure Doctrine, established in 1973, dictates that Parliament cannot amend or destroy the essential features of the Constitution (such as democracy, federalism, secularism, and judicial review)."
    }
  }
];

// Layout mapping to render perimeter clockwise:
// 0  1  2  3
// 11       4
// 10       5
// 9  8  7  6
const GRID_CELLS = [
  { index: 0, row: 1, col: 1 },
  { index: 1, row: 1, col: 2 },
  { index: 2, row: 1, col: 3 },
  { index: 3, row: 1, col: 4 },
  { index: 4, row: 2, col: 4 },
  { index: 5, row: 3, col: 4 },
  { index: 6, row: 4, col: 4 },
  { index: 7, row: 4, col: 3 },
  { index: 8, row: 4, col: 2 },
  { index: 9, row: 4, col: 1 },
  { index: 10, row: 3, col: 1 },
  { index: 11, row: 2, col: 1 },
];

export default function BoardGame() {
  const { t, language } = useI18n();
  const [playerPosition, setPlayerPosition] = useState(0);
  const [diceRoll, setDiceRoll] = useState<number | null>(null);
  const [rolling, setRolling] = useState(false);
  const [responsibilities, setResponsibilities] = useState<number[]>([]); // acquired space indices
  const [scoreAccumulated, setScoreAccumulated] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  
  const [spaces, setSpaces] = useState<BoardSpace[]>(BOARD_SPACES);
  const [loadingContent, setLoadingContent] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      setLoadingContent(true);
      try {
        const data = await getGameContent('board', language);
        if (data && data.length > 0) {
          const list = BOARD_SPACES.map((s, idx) => {
            const dbItem = data.find(item => item.identifier === `space_${idx}`);
            if (dbItem) {
              return {
                ...s,
                name: dbItem.title,
                role: dbItem.description,
                challenge: {
                  crisis: s.challenge.crisis, // Keep flavor text
                  question: dbItem.question,
                  options: dbItem.options,
                  answerIndex: -1, // Hidden
                  explanation: "" // Verification loads it
                }
              };
            }
            return s;
          });
          setSpaces(list);
        }
      } catch (e) {
        console.error("Failed to load board spaces dynamically", e);
      } finally {
        setLoadingContent(false);
      }
    };
    loadContent();
  }, [language]);

  // Dialog states
  const [activeSpace, setActiveSpace] = useState<BoardSpace | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameLog, setGameLog] = useState<string[]>(["Welcome to Samvidhan Nagri. Roll the dice to travel!"]);

  const logMessage = (msg: string) => {
    setGameLog(prev => [msg, ...prev].slice(0, 12));
  };

  const rollDice = () => {
    if (rolling || activeSpace || isGameOver) return;
    
    setRolling(true);
    setDiceRoll(null);

    let counter = 0;
    const interval = setInterval(() => {
      setDiceRoll(Math.floor(Math.random() * 3) + 1); // 1-3 dice rolls for quick loops
      counter++;
      if (counter > 6) {
        clearInterval(interval);
        finalizeMove();
      }
    }, 100);
  };

  const finalizeMove = () => {
    const roll = Math.floor(Math.random() * 3) + 1; // 1-3
    setDiceRoll(roll);
    setRolling(false);

    const nextPos = (playerPosition + roll) % 12;
    setPlayerPosition(nextPos);

    const space = spaces[nextPos];
    logMessage(`Rolled ${roll}. Travelled to ${space.name}.`);

    // Trigger Challenge Card
    setTimeout(() => {
      setActiveSpace(space);
    }, 400);
  };

  const handleChallengeSubmit = async (chosenIndex: number) => {
    if (!activeSpace) return;
    setQuizAnswer(chosenIndex);

    let isCorrect = false;
    let explanationText = "";
    let ansIdx = -1;

    const identifier = `space_${activeSpace.id}`;
    const res = await verifyGameAnswer('board', identifier, chosenIndex);

    if (res) {
      isCorrect = res.isCorrect;
      explanationText = res.explanation;
      ansIdx = res.correctAnswerIdx;
      if (res.pointsAwarded > 0) {
        setScoreAccumulated(prev => prev + res.pointsAwarded);
      }
    } else {
      isCorrect = chosenIndex === activeSpace.challenge.answerIndex;
      explanationText = activeSpace.challenge.explanation;
      ansIdx = activeSpace.challenge.answerIndex;
      if (isCorrect) {
        setScoreAccumulated(prev => prev + 35);
      }
    }

    // Set active space explanation and correct index dynamically
    setActiveSpace(prev => prev ? {
      ...prev,
      challenge: {
        ...prev.challenge,
        explanation: explanationText,
        answerIndex: ansIdx
      }
    } : null);

    setShowExplanation(true);

    if (isCorrect) {
      if (!responsibilities.includes(activeSpace.id)) {
        // Acquire responsibility
        const nextResp = [...responsibilities, activeSpace.id];
        setResponsibilities(nextResp);
        logMessage(`Resolved crisis at ${activeSpace.name}! You acquired the role of '${activeSpace.role}'.`);
        
        // Check win condition
        if (nextResp.length >= 6) {
          setIsGameOver(true);
          const compRes = await verifyGameAnswer('board', 'completion', 0);
          if (compRes) {
            if (compRes.pointsAwarded > 0) {
              setScoreAccumulated(prev => prev + compRes.pointsAwarded);
            }
          } else {
            await incrementGamePlay('board', scoreAccumulated + (res ? res.pointsAwarded : 35) + 100);
          }
          logMessage("Fabulous! You acquired 6 Institutional Responsibilities. You saved Samvidhan Nagri!");
        }
      } else {
        // Repeated landing bonus
        setScoreAccumulated(prev => prev + 15);
        logMessage(`Repeated check passed at ${activeSpace.name}. +15 XP`);
      }
    } else {
      logMessage(`Failed to resolve the constitutional crisis at ${activeSpace.name}. Try again next time.`);
    }
  };

  const closeDialog = () => {
    setActiveSpace(null);
    setQuizAnswer(null);
    setShowExplanation(false);
  };

  const resetGame = () => {
    setPlayerPosition(0);
    setDiceRoll(null);
    setResponsibilities([]);
    setScoreAccumulated(0);
    setIsGameOver(false);
    setActiveSpace(null);
    setQuizAnswer(null);
    setShowExplanation(false);
    setGameLog(["Game restarted! Roll the dice to enter Samvidhan Nagri."]);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 text-xs font-bold text-saffron bg-saffron/10 border border-saffron/20 px-3 py-1.5 rounded-lg hover:bg-saffron/20 transition-all">
          <ArrowLeft className="h-4 w-4" />
          {t('back_to_dashboard')}
        </Link>
        <h1 className="text-xl md:text-2xl font-black text-white">🎯 Samvidhan Nagri (Constitution Board Game)</h1>
        <button 
          onClick={resetGame}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/5 border border-white/10 hover:bg-white/10 text-white"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Restart Game
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: The perimeter Board layout (7 cols) */}
        <div className="lg:col-span-8 flex justify-center items-center">
          <div className="w-full max-w-[500px] aspect-square rounded-3xl bg-navy/40 border border-white/10 p-3 relative shadow-2xl board-pattern">
            
            {/* The 4x4 Perimeter Board Ring */}
            <div className="grid grid-cols-4 grid-rows-4 h-full w-full gap-1.5 relative">
              {spaces.map((space) => {
                const layout = GRID_CELLS.find(c => c.index === space.id)!;
                const isPlayerHere = playerPosition === space.id;
                const isAcquired = responsibilities.includes(space.id);

                return (
                  <div
                    key={space.id}
                    className={`relative rounded-xl p-2 flex flex-col justify-between text-left border ${
                      isPlayerHere ? 'ring-2 ring-saffron border-saffron bg-saffron/5 z-20' : 'bg-navy/85 border-white/5'
                    } ${space.color}`}
                    style={{
                      gridRowStart: layout.row,
                      gridColumnStart: layout.col,
                    }}
                  >
                    <div className="space-y-1">
                      <div className="flex justify-between items-start gap-1">
                        <span className="text-[7px] md:text-[8px] font-extrabold text-saffron uppercase">#{space.id}</span>
                        {isAcquired && (
                          <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                        )}
                      </div>
                      <h4 className="text-[8px] md:text-[9px] font-black text-white leading-tight line-clamp-2">
                        {space.name}
                      </h4>
                    </div>

                    <div className="text-[7px] text-slate-400 font-medium truncate">
                      {isAcquired ? space.role : "Vacant"}
                    </div>

                    {/* Player Token representation */}
                    {isPlayerHere && (
                      <div className="absolute inset-0 flex items-center justify-center bg-saffron/10 rounded-xl">
                        <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-saffron to-green border-2 border-white flex items-center justify-center shadow-lg animate-bounce">
                          <span className="text-[8px] text-white font-extrabold">YOU</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Central Area of the Board (covers row 2-3, col 2-3) */}
              <div className="grid-in-middle col-start-2 col-end-4 row-start-2 row-end-4 flex flex-col items-center justify-center p-2 text-center space-y-4">
                <div className="space-y-1">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Target</div>
                  <div className="text-xs font-black text-white">Acquire 6 Roles</div>
                  <div className="text-xs text-saffron font-bold">
                    {responsibilities.length} / 6 Roles Owned
                  </div>
                </div>

                {/* Animated Dice */}
                <div className="flex flex-col items-center gap-2">
                  <button
                    onClick={rollDice}
                    disabled={rolling || !!activeSpace || isGameOver}
                    className="p-3 rounded-full bg-saffron text-white shadow-lg hover:scale-105 hover:bg-saffron/90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <Dices className={`h-5 w-5 ${rolling ? 'animate-spin' : ''}`} />
                  </button>
                  {diceRoll !== null && (
                    <span className="text-xs font-bold text-slate-300">Rolled {diceRoll}</span>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Side: stats & info (5 cols) */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-6">
          
          {/* Stats board */}
          <div className="glass-card p-6 rounded-3xl space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Trophy className="h-4 w-4 text-saffron" />
              Institutional Progress
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between text-xs text-slate-350">
                <span>XP Earned this Game</span>
                <span className="font-extrabold text-saffron">+{scoreAccumulated} XP</span>
              </div>
              <div className="flex justify-between text-xs text-slate-350">
                <span>Offices Acquired</span>
                <span className="font-extrabold text-green">{responsibilities.length} / 12</span>
              </div>
            </div>

            {/* List of acquired office names */}
            <div className="space-y-1.5 pt-2">
              <span className="text-[10px] uppercase font-bold text-slate-400">Your Acquired Offices:</span>
              <div className="flex flex-wrap gap-1">
                {responsibilities.length > 0 ? (
                  responsibilities.map(id => (
                    <span key={id} className="text-[9px] px-2 py-0.5 rounded bg-green/10 border border-green/20 text-green font-bold flex items-center gap-0.5">
                      <UserCheck className="h-2.5 w-2.5" />
                      {spaces[id]?.role || BOARD_SPACES[id].role}
                    </span>
                  ))
                ) : (
                  <span className="text-[9px] text-slate-400 italic">None yet. Resolve challenges to acquire roles.</span>
                )}
              </div>
            </div>
          </div>

          {/* Game Log */}
          <div className="glass-card p-5 rounded-3xl flex-1 flex flex-col justify-between space-y-3">
            <h3 className="text-xs font-bold text-slate-350 uppercase border-b border-white/5 pb-1">Travel Chronicles</h3>
            <div className="space-y-2 text-[10px] text-slate-400 max-h-48 overflow-y-auto leading-relaxed divide-y divide-white/5 pr-1 flex-1">
              {gameLog.map((log, index) => (
                <div key={index} className="pt-2">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Challenge Card Popup Dialog */}
      {activeSpace && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg glass-card p-6 rounded-3xl space-y-6 relative overflow-hidden animate-scaleIn">
            
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <div className="p-2.5 rounded-xl bg-saffron/20 text-saffron">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Governance Challenge card (शासन चुनौती)
                </h4>
                <h3 className="text-md md:text-lg font-black text-white">{activeSpace.name}</h3>
              </div>
            </div>

            <div className="space-y-2 bg-white/5 p-4 rounded-xl border border-white/5">
              <div className="flex items-center gap-1 text-[10px] text-red-400 font-bold uppercase tracking-wider">
                <AlertOctagon className="h-3.5 w-3.5" />
                Administrative Crisis
              </div>
              <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-semibold">
                {activeSpace.challenge.crisis}
              </p>
            </div>

            <div className="space-y-4">
              <div className="text-xs font-bold text-slate-400 flex items-center gap-1">
                <HelpCircle className="h-3.5 w-3.5 text-blue-400" />
                Question to Resolve:
              </div>
              <p className="text-xs md:text-sm font-bold text-slate-100">
                {activeSpace.challenge.question}
              </p>

              <div className="grid grid-cols-1 gap-2.5">
                {activeSpace.challenge.options.map((opt, i) => {
                  const isChosen = quizAnswer === i;
                  const isCorrect = i === activeSpace.challenge.answerIndex;

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
                      onClick={() => handleChallengeSubmit(i)}
                      className={`w-full text-left p-3.5 rounded-xl text-xs border transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {showExplanation && (
                <div className="space-y-4 animate-fadeIn">
                  <div className={`p-4 rounded-xl text-xs leading-relaxed border ${
                    quizAnswer === activeSpace.challenge.answerIndex 
                      ? 'bg-green/5 border-green/20 text-slate-200' 
                      : 'bg-red-500/5 border-red-500/20 text-slate-200'
                  }`}>
                    <div className="font-extrabold mb-1">
                      {quizAnswer === activeSpace.challenge.answerIndex ? 'Constitutional Crisis Resolved!' : 'Systemic Failure.'}
                    </div>
                    {activeSpace.challenge.explanation}
                  </div>

                  <button
                    onClick={closeDialog}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold btn-saffron text-white w-full cursor-pointer"
                  >
                    Return to Board
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
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-saffron to-green border border-white/20 mx-auto shadow-lg">
              <ShieldCheck className="h-8 w-8 text-white animate-bounce" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white">Crisis Resolved!</h2>
              <p className="text-xs text-slate-400">You successfully managed 6 national institutions and kept government stable.</p>
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
                Reset Game
              </button>
              <Link
                href="/"
                className="flex-1 px-4 py-2.5 rounded-xl text-xs font-bold btn-saffron text-white flex items-center justify-center"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
