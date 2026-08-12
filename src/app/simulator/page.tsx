'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useI18n } from '@/hooks/useI18n';
import { addCivicPoints, getUserProgress } from '@/lib/services';
import { 
  Compass, 
  Lock, 
  CheckCircle, 
  HelpCircle, 
  Sparkles, 
  ArrowRight, 
  Play, 
  ShieldCheck, 
  Activity, 
  Award,
  AlertTriangle,
  BookOpen
} from 'lucide-react';

interface Scenario {
  id: string;
  title: string;
  description: string;
  articleLinked: string;
  options: { text: string; points: number; explanation: string }[];
}

const PATHS = [
  {
    id: 'beginner',
    title: 'Beginner Path (Union & State Basics)',
    levelRequired: 1,
    icon: Compass,
    color: 'border-blue-500/20 text-blue-400 bg-blue-500/5',
    glow: 'shadow-blue-500/5',
    scenarios: [
      {
        id: 'B1',
        title: 'The Cabinet Appointment',
        description: 'The Prime Minister advises you (the President) to appoint a close advisor as a Cabinet Minister. However, this advisor is not currently a member of either Lok Sabha or Rajya Sabha. What do you do?',
        articleLinked: 'Article 74 & 75',
        options: [
          {
            text: 'Refuse the appointment, as ministers must be Members of Parliament.',
            points: 10,
            explanation: 'Incorrect. Article 75(5) allows a non-member to be appointed as a minister, but they must get elected to either House within six consecutive months.'
          },
          {
            text: 'Appoint them, but warn that they must get elected to Parliament within 6 months.',
            points: 40,
            explanation: 'Correct! According to Article 75(5), a minister who is not a member of Parliament for six consecutive months ceases to be a minister.'
          },
          {
            text: 'Appoint them permanently without any conditions, using presidential discretion.',
            points: 5,
            explanation: 'Incorrect. A minister cannot continue beyond six months without gaining election to Parliament.'
          }
        ]
      },
      {
        id: 'B2',
        title: 'Governor\'s Assent Dilemma',
        description: 'You are the Governor of a state. The State Assembly has passed a bill that significantly weakens the power of the State High Court. What is your constitutional action?',
        articleLinked: 'Article 200',
        options: [
          {
            text: 'Sign the bill immediately, since the state cabinet has advised you to do so.',
            points: 5,
            explanation: 'Incorrect. If the bill derogates from the powers of the High Court, signing it would violate your oath to protect judicial independence.'
          },
          {
            text: 'Reserve the bill for the consideration of the President of India.',
            points: 40,
            explanation: 'Correct! Under Article 200, the Governor MUST reserve any bill for the President if it would endanger the constitutional position of the High Court.'
          },
          {
            text: 'Veto the bill permanently and dissolve the Assembly.',
            points: 10,
            explanation: 'Incorrect. Governors do not have absolute veto power, nor can they dissolve the assembly arbitrarily without cabinet recommendation.'
          }
        ]
      }
    ]
  },
  {
    id: 'intermediate',
    title: 'Intermediate Path (Checks & Balances)',
    levelRequired: 3,
    icon: Activity,
    color: 'border-saffron/20 text-saffron bg-saffron/5',
    glow: 'shadow-saffron/5',
    scenarios: [
      {
        id: 'I1',
        title: 'The Rajya Sabha Delay',
        description: 'Lok Sabha passes a crucial Money Bill regarding income tax reforms and sends it to Rajya Sabha. The Rajya Sabha disagrees with the tax brackets and decides to sit on the bill without returning it. What happens after 14 days?',
        articleLinked: 'Article 109',
        options: [
          {
            text: 'The bill lapses and must be introduced again in the next session.',
            points: 5,
            explanation: 'Incorrect. Money bills have special rules and cannot lapse due to Rajya Sabha delay.'
          },
          {
            text: 'A joint sitting of both Houses must be called by the President to resolve the deadlock.',
            points: 15,
            explanation: 'Incorrect. Article 108 (Joint Sitting) does not apply to Money Bills.'
          },
          {
            text: 'The bill is deemed to have been passed by both Houses in the form passed by Lok Sabha.',
            points: 40,
            explanation: 'Correct! Under Article 109(5), if Rajya Sabha does not return a Money Bill within 14 days, it is deemed passed by both Houses in the Lok Sabha version.'
          }
        ]
      },
      {
        id: 'I2',
        title: 'State Machinery Breakdown',
        description: 'A state experiences severe internal rioting, and the state cabinet fails to contain it. The Governor reports that the state administration cannot be carried out in accordance with the Constitution. What step is taken?',
        articleLinked: 'Article 356',
        options: [
          {
            text: 'The President issues a proclamation of President\'s Rule in the state.',
            points: 40,
            explanation: 'Correct! Under Article 356, if the President receives a report from the Governor and is satisfied that the state machinery has broken down, President\'s Rule can be imposed.'
          },
          {
            text: 'The Supreme Court directly takes over the administration of the state.',
            points: 5,
            explanation: 'Incorrect. The judiciary has no executive administration powers under the Constitution.'
          },
          {
            text: 'The Central Cabinet sends the Army to arrest the Chief Minister.',
            points: 10,
            explanation: 'Incorrect. The CM cannot be arrested arbitrarily; constitutional procedures under Article 356 must be followed.'
          }
        ]
      }
    ]
  },
  {
    id: 'advanced',
    title: 'Advanced Path (Judicial Review & Writs)',
    levelRequired: 5,
    icon: ShieldCheck,
    color: 'border-green/20 text-green bg-green/5',
    glow: 'shadow-green/5',
    scenarios: [
      {
        id: 'A1',
        title: 'Arbitrary Arrest Shield',
        description: 'Your cousin has been picked up by local police for questioning and has been kept in custody for over 48 hours without any production before a magistrate. What writ should you file in the High Court?',
        articleLinked: 'Article 226 & 22',
        options: [
          {
            text: 'Writ of Habeas Corpus ("Produce the Body")',
            points: 40,
            explanation: 'Correct! Habeas Corpus is filed under Article 226/32 to protect personal liberty against unlawful detention, commanding the state to produce the detained person.'
          },
          {
            text: 'Writ of Mandamus ("We Command")',
            points: 15,
            explanation: 'Incorrect. Mandamus is used to compel a public official to perform a duty, not for illegal detention release.'
          },
          {
            text: 'Writ of Quo Warranto ("By What Authority")',
            points: 10,
            explanation: 'Incorrect. Quo Warranto challenges a person\'s right to hold a public office.'
          }
        ]
      },
      {
        id: 'A2',
        title: 'Conflict of Laws',
        description: 'Both Parliament and a State Legislature pass laws on the subject of "Contracts" (which is in the Concurrent List). The state law directly contradicts the federal law. Which law prevails?',
        articleLinked: 'Article 254',
        options: [
          {
            text: 'The state law always prevails within the state territory.',
            points: 5,
            explanation: 'Incorrect. Under Article 254(1), federal law generally overrides state law on Concurrent List items.'
          },
          {
            text: 'The federal law prevails, and the state law is void to the extent of repugnancy.',
            points: 40,
            explanation: 'Correct! Under Article 254(1), the law made by Parliament shall prevail, unless the state law received the President\'s assent under Article 254(2).'
          },
          {
            text: 'Both laws are struck down and the subject goes to the Supreme Court for settlement.',
            points: 10,
            explanation: 'Incorrect. The laws are not struck down automatically; the rule of federal supremacy resolves the conflict.'
          }
        ]
      }
    ]
  },
  {
    id: 'expert',
    title: 'Expert Path (Constitutional Crises)',
    levelRequired: 7,
    icon: Award,
    color: 'border-red-500/20 text-red-400 bg-red-500/5',
    glow: 'shadow-red-500/5',
    scenarios: [
      {
        id: 'E1',
        title: 'The Ordinance Loophole',
        description: 'A state government repromulgates the same emergency Ordinance (temporary law) six times consecutively without ever putting it to vote in the Legislative Assembly. What is the constitutional validity of this ordinance?',
        articleLinked: 'Article 213 & DC Wadhwa Case',
        options: [
          {
            text: 'It is valid, as the governor has absolute power to repromulgate ordinances.',
            points: 10,
            explanation: 'Incorrect. The Governor\'s power is temporary and subject to legislative oversight.'
          },
          {
            text: 'It is a fraud on the Constitution and void, as ruled in the D.C. Wadhwa case.',
            points: 40,
            explanation: 'Correct! The Supreme Court held that repeated repromulgation of ordinances without legislative approval is an abuse of executive power and unconstitutional.'
          },
          {
            text: 'It is valid, provided the Chief Minister signs a declaration of emergency.',
            points: 5,
            explanation: 'Incorrect. There is no such provision to bypass the legislature using executive declarations.'
          }
        ]
      },
      {
        id: 'E2',
        title: 'Basic Structure Challenge',
        description: 'Parliament passes a Constitutional Amendment Bill under Article 368 that removes the power of judicial review from the High Courts. Does Parliament have this power?',
        articleLinked: 'Article 368 & Kesavananda Case',
        options: [
          {
            text: 'Yes, Parliament has absolute power to amend any part of the Constitution.',
            points: 10,
            explanation: 'Incorrect. Parliament\'s amending power is not absolute and is bounded by the Basic Structure.'
          },
          {
            text: 'No, because judicial review is part of the Basic Structure of the Constitution and cannot be destroyed.',
            points: 40,
            explanation: 'Correct! The Kesavananda Bharati precedent holds that Parliament cannot amend the Constitution in a way that alters or destroys its "Basic Structure" (which includes judicial review).'
          },
          {
            text: 'Yes, but it must be approved by a national referendum of citizens.',
            points: 10,
            explanation: 'Incorrect. The Indian Constitution does not have a provision for referendums.'
          }
        ]
      }
    ]
  }
];

export default function Simulator() {
  const { user } = useAuth();
  const { t } = useI18n();
  
  const [userLevel, setUserLevel] = useState(1);
  const [selectedPath, setSelectedPath] = useState<typeof PATHS[0] | null>(null);
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [pathProgress, setPathProgress] = useState<Record<string, string[]>>({}); // pathId -> array of completed scenarioIds
  
  // Game metrics
  const [scoreEarned, setScoreEarned] = useState(0);
  const [attemptedScenarios, setAttemptedScenarios] = useState<string[]>([]);

  useEffect(() => {
    const fetchProgress = async () => {
      const p = await getUserProgress();
      setUserLevel(p.level);
      // Construct completed list
      const completed = p.completedQuizzes || [];
      setAttemptedScenarios(completed);
    };
    fetchProgress();
  }, []);

  const startPath = (path: typeof PATHS[0]) => {
    if (userLevel < path.levelRequired) return;
    setSelectedPath(path);
    setActiveScenarioIdx(0);
    setSelectedOption(null);
    setShowResult(false);
    setScoreEarned(0);
  };

  const handleOptionSelect = (idx: number) => {
    if (showResult) return;
    setSelectedOption(idx);
  };

  const submitDecision = async () => {
    if (!selectedPath || selectedOption === null) return;
    setShowResult(true);
    
    const scenario = selectedPath.scenarios[activeScenarioIdx];
    const option = scenario.options[selectedOption];
    setScoreEarned(prev => prev + option.points);

    // Save attempts in DB
    await addCivicPoints(option.points);
  };

  const nextScenario = () => {
    if (!selectedPath) return;
    if (activeScenarioIdx + 1 < selectedPath.scenarios.length) {
      setActiveScenarioIdx(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      // Completed path!
      // Add completion badge or log in DB
      setSelectedPath(null);
      // Refresh user level
      const fetchLevel = async () => {
        const p = await getUserProgress();
        setUserLevel(p.level);
      };
      fetchLevel();
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-black text-white font-outfit tracking-tight">
            ⚖️ Constitutional Decision Simulator
          </h1>
          <p className="text-sm text-slate-400">
            Step into the shoes of the President, Governors, Justices, and Citizens to handle governance crises.
          </p>
        </div>

        <div className="inline-flex items-center gap-3 px-4 py-2 bg-saffron/10 border border-saffron/20 rounded-xl text-saffron text-sm font-bold font-outfit">
          <Sparkles className="h-4.5 w-4.5 animate-pulse" />
          <span>Your Level: Lvl {userLevel}</span>
        </div>
      </div>

      {!selectedPath ? (
        // Path Selection View
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PATHS.map((path) => {
            const Icon = path.icon;
            const isLocked = userLevel < path.levelRequired;
            
            return (
              <div 
                key={path.id}
                className={`glass-card p-6 rounded-3xl border transition-all flex flex-col justify-between gap-6 relative overflow-hidden ${path.glow} ${
                  isLocked ? 'opacity-60' : 'hover:scale-[1.01] hover:border-white/20'
                }`}
              >
                {isLocked && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold font-outfit">
                    <Lock className="h-3 w-3" />
                    <span>Lvl {path.levelRequired} Required</span>
                  </div>
                )}
                
                <div className="space-y-4">
                  <div className={`inline-flex p-3 rounded-2xl border ${path.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-extrabold text-white font-outfit">{path.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Analyze {path.scenarios.length} high-stakes governance scenarios exploring constitutional rules, veto checks, and court precedents.
                    </p>
                  </div>
                </div>

                <button
                  disabled={isLocked}
                  onClick={() => startPath(path)}
                  className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all border ${
                    isLocked 
                      ? 'bg-white/5 border-white/5 text-slate-500 cursor-not-allowed'
                      : 'bg-white/10 border-white/10 hover:bg-saffron hover:border-saffron hover:text-white text-white'
                  }`}
                >
                  <span>{isLocked ? 'Path Locked' : 'Start Simulation'}</span>
                  <Play className="h-3 w-3" />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        // Active Scenario Simulation View
        <div className="max-w-2xl mx-auto glass-card p-6 rounded-3xl border border-white/10 space-y-6 relative">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <span className="text-xs font-bold text-saffron uppercase font-outfit tracking-wider">
              {selectedPath.title}
            </span>
            <span className="text-xs font-bold text-slate-400">
              Scenario {activeScenarioIdx + 1} of {selectedPath.scenarios.length}
            </span>
          </div>

          {/* Scenario Text */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-red-400 text-xs font-bold font-outfit uppercase">
              <AlertTriangle className="h-4.5 w-4.5" />
              <span>Institutional Crisis Report</span>
            </div>
            
            <h2 className="text-lg font-extrabold text-white leading-snug">
              {selectedPath.scenarios[activeScenarioIdx].title}
            </h2>
            
            <p className="text-sm text-slate-300 leading-relaxed bg-navy/40 p-4 rounded-2xl border border-white/5">
              {selectedPath.scenarios[activeScenarioIdx].description}
            </p>
          </div>

          {/* Decisions Options */}
          <div className="space-y-3">
            <label className="text-[10px] uppercase font-bold text-slate-400 font-outfit tracking-wider block">
              Choose your Constitutional Decision
            </label>
            
            <div className="grid grid-cols-1 gap-2.5">
              {selectedPath.scenarios[activeScenarioIdx].options.map((opt, i) => {
                const isSelected = selectedOption === i;
                
                let btnStyle = "bg-white/5 border-white/5 text-slate-300 hover:bg-white/10";
                if (isSelected) {
                  btnStyle = "bg-saffron/10 border-saffron/40 text-saffron font-bold";
                }
                
                if (showResult) {
                  const isCorrect = opt.points === 40;
                  if (isCorrect) {
                    btnStyle = "bg-green/10 border-green/40 text-green font-bold";
                  } else if (isSelected) {
                    btnStyle = "bg-red-500/10 border-red-500/40 text-red-400 font-bold";
                  } else {
                    btnStyle = "bg-white/5 border-white/5 text-slate-400 opacity-60";
                  }
                }

                return (
                  <button
                    key={i}
                    disabled={showResult}
                    onClick={() => handleOptionSelect(i)}
                    className={`w-full text-left p-4 rounded-2xl text-xs border transition-all cursor-pointer leading-relaxed ${btnStyle}`}
                  >
                    {opt.text}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Result explanation block */}
          {showResult && selectedOption !== null && (
            <div className={`p-5 rounded-2xl border space-y-3 animate-fadeIn text-xs ${
              selectedPath.scenarios[activeScenarioIdx].options[selectedOption].points === 40
                ? 'bg-green/5 border-green/20'
                : 'bg-red-500/5 border-red-500/20'
            }`}>
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="font-extrabold text-white flex items-center gap-1.5 font-outfit uppercase">
                  {selectedPath.scenarios[activeScenarioIdx].options[selectedOption].points === 40 ? (
                    <span className="text-green flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" /> Correct Resolution
                    </span>
                  ) : (
                    <span className="text-red-400 flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4" /> Unconstitutional/Sub-optimal Action
                    </span>
                  )}
                </span>
                <span className="text-[10px] font-bold text-saffron font-outfit uppercase bg-saffron/10 border border-saffron/20 px-2 py-0.5 rounded">
                  {selectedPath.scenarios[activeScenarioIdx].options[selectedOption].points} XP
                </span>
              </div>
              
              <p className="text-slate-300 leading-relaxed">
                {selectedPath.scenarios[activeScenarioIdx].options[selectedOption].explanation}
              </p>

              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-semibold bg-white/5 p-2 rounded-lg border border-white/5 w-fit font-sans">
                <BookOpen className="h-3.5 w-3.5 text-saffron" />
                <span>Reference: {selectedPath.scenarios[activeScenarioIdx].articleLinked}</span>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <button
              onClick={() => setSelectedPath(null)}
              className="px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-xs text-white transition-all cursor-pointer font-bold"
            >
              Exit Simulation
            </button>

            {!showResult ? (
              <button
                disabled={selectedOption === null}
                onClick={submitDecision}
                className="px-6 py-2.5 rounded-xl bg-saffron hover:bg-saffron/90 disabled:bg-saffron/40 text-xs text-white transition-all cursor-pointer font-bold"
              >
                Submit Decision
              </button>
            ) : (
              <button
                onClick={nextScenario}
                className="px-6 py-2.5 rounded-xl bg-saffron hover:bg-saffron/90 text-xs text-white transition-all cursor-pointer font-bold flex items-center gap-1"
              >
                <span>{activeScenarioIdx + 1 < selectedPath.scenarios.length ? 'Next Scenario' : 'Finish Path'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
