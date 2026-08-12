export interface GameStats {
  plays: number;
  highScore: number;
}

export interface UserProgress {
  score: number;
  level: number;
  completedArticles: string[];
  completedQuizzes: string[];
  badges: string[];
  gameStats: {
    spin: GameStats;
    snakes: GameStats;
    board: GameStats;
    flashcards: GameStats;
  };
  feedbackLogs: {
    id: string;
    timestamp: string;
    rating: number;
    comment: string;
    category: string;
  }[];
}

const DEFAULT_PROGRESS: UserProgress = {
  score: 0,
  level: 1,
  completedArticles: [],
  completedQuizzes: [],
  badges: [],
  gameStats: {
    spin: { plays: 0, highScore: 0 },
    snakes: { plays: 0, highScore: 0 },
    board: { plays: 0, highScore: 0 },
    flashcards: { plays: 0, highScore: 0 },
  },
  feedbackLogs: [],
};

const STORAGE_KEY = "samvidhan_user_progress";

export function getClientProgress(): UserProgress {
  if (typeof window === "undefined") {
    return DEFAULT_PROGRESS;
  }
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Error reading localStorage", e);
  }
  return DEFAULT_PROGRESS;
}

export function saveClientProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error("Error writing localStorage", e);
  }
}

export function updateClientProgress(updates: Partial<UserProgress>): UserProgress {
  const current = getClientProgress();
  const next = { ...current, ...updates };
  saveClientProgress(next);
  return next;
}

export function addCivicPoints(points: number): UserProgress {
  const current = getClientProgress();
  const nextScore = current.score + points;
  
  // Dynamic level progression: level = 1 + floor(score / 100)
  const nextLevel = Math.max(current.level, Math.floor(nextScore / 100) + 1);
  
  // Badge unlocking checks
  const badges = [...current.badges];
  if (nextScore >= 100 && !badges.includes("Citizen Scholar")) {
    badges.push("Citizen Scholar");
  }
  if (nextScore >= 250 && !badges.includes("Lawmaker Cadet")) {
    badges.push("Lawmaker Cadet");
  }
  if (nextScore >= 500 && !badges.includes("Constitution Guardian")) {
    badges.push("Constitution Guardian");
  }
  
  const next = {
    ...current,
    score: nextScore,
    level: nextLevel,
    badges,
  };
  saveClientProgress(next);
  return next;
}

export function unlockBadge(badgeName: string): UserProgress {
  const current = getClientProgress();
  if (current.badges.includes(badgeName)) {
    return current;
  }
  const next = {
    ...current,
    badges: [...current.badges, badgeName],
  };
  saveClientProgress(next);
  return next;
}

export function completeQuiz(articleNum: string, quizId: string, correct: boolean): UserProgress {
  const current = getClientProgress();
  const completedQuizzes = [...current.completedQuizzes];
  if (!completedQuizzes.includes(quizId)) {
    completedQuizzes.push(quizId);
  }
  
  const completedArticles = [...current.completedArticles];
  if (!completedArticles.includes(articleNum)) {
    completedArticles.push(articleNum);
  }
  
  let next = {
    ...current,
    completedQuizzes,
    completedArticles,
  };
  
  saveClientProgress(next);
  
  if (correct) {
    next = addCivicPoints(25); // 25 points for correct scenario choice
  }
  return next;
}

export function incrementGamePlay(gameType: 'spin' | 'snakes' | 'board' | 'flashcards', scoreGained: number): UserProgress {
  const current = getClientProgress();
  const stats = { ...current.gameStats[gameType] };
  stats.plays += 1;
  stats.highScore = Math.max(stats.highScore, scoreGained);
  
  const next = {
    ...current,
    gameStats: {
      ...current.gameStats,
      [gameType]: stats,
    },
  };
  
  saveClientProgress(next);
  return addCivicPoints(scoreGained);
}
