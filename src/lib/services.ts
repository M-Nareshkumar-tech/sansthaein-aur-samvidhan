'use client';

import { UserProgress, getClientProgress, updateClientProgress, addCivicPoints as localAddPoints, unlockBadge as localUnlockBadge, completeQuiz as localCompleteQuiz, incrementGamePlay as localIncrementGamePlay } from './db';
import { seedArticles } from '@/data/articles';

// This is the abstract service layer that components should use.
// It will dynamically route queries to the Next.js API endpoints if a session is present,
// and gracefully fallback to localStorage-based db operations if offline or unauthenticated.

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
    });
    if (res.status === 401 || res.status === 403) {
      // Unauthenticated, trigger fallback
      return null;
    }
    if (!res.ok) {
      throw new Error(`API error: ${res.statusText}`);
    }
    return await res.json() as T;
  } catch (error) {
    console.warn(`Fallback to local: API request failed on ${url}`, error);
    return null;
  }
}

let simulatorSessionOffset = 0;

export async function getUserProgress(): Promise<UserProgress> {
  const serverProgress = await fetchJson<UserProgress>('/api/profile');
  if (serverProgress) {
    // Inject session-only simulator points sandbox offset to prevent visual resets during polling
    const adjustedPoints = serverProgress.score + simulatorSessionOffset;
    return {
      ...serverProgress,
      score: adjustedPoints,
      level: Math.max(serverProgress.level, Math.floor(adjustedPoints / 100) + 1)
    };
  }
  return getClientProgress();
}

export async function addCivicPoints(points: number): Promise<UserProgress> {
  // Always update local storage for offline / anonymous state
  const local = localAddPoints(points);

  const serverProgress = await fetchJson<UserProgress>('/api/profile');
  if (serverProgress) {
    simulatorSessionOffset += points;
    console.warn(`[Sandbox Mode] Decision Simulator points (+${points}) added to session offset. Total session offset: +${simulatorSessionOffset}. These points are sandbox-only and will not persist in the database.`);
    
    const adjustedPoints = serverProgress.score + simulatorSessionOffset;
    return {
      ...serverProgress,
      score: adjustedPoints,
      level: Math.max(serverProgress.level, Math.floor(adjustedPoints / 100) + 1)
    };
  }
  return local;
}

export async function unlockBadge(badgeName: string): Promise<UserProgress> {
  const serverProgress = await fetchJson<UserProgress>('/api/profile/badge', {
    method: 'POST',
    body: JSON.stringify({ badgeName }),
  });
  if (serverProgress) {
    return serverProgress;
  }
  return localUnlockBadge(badgeName);
}

export async function completeQuiz(articleNum: string, quizId: string, correct: boolean): Promise<UserProgress> {
  const serverProgress = await fetchJson<UserProgress>('/api/profile/quiz', {
    method: 'POST',
    body: JSON.stringify({ articleNum, quizId, correct }),
  });
  if (serverProgress) {
    return serverProgress;
  }
  return localCompleteQuiz(articleNum, quizId, correct);
}

export async function incrementGamePlay(gameType: 'spin' | 'snakes' | 'board' | 'flashcards', scoreGained: number): Promise<UserProgress> {
  const serverProgress = await fetchJson<UserProgress>('/api/profile/game', {
    method: 'POST',
    body: JSON.stringify({ gameType, scoreGained }),
  });
  if (serverProgress) {
    return serverProgress;
  }
  return localIncrementGamePlay(gameType, scoreGained);
}

export interface FeedbackSubmission {
  rating: number;
  category: string;
  comment: string;
}

export async function submitFeedback(feedback: FeedbackSubmission): Promise<{ success: boolean; data?: any }> {
  try {
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedback),
    });
    if (res.ok) {
      const data = await res.json();
      return { success: true, data };
    }
  } catch (error) {
    console.error("API Feedback submit error:", error);
  }
  
  // Fallback to local storage logging
  const current = getClientProgress();
  const newLog = {
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date().toLocaleString(),
    rating: feedback.rating,
    comment: feedback.comment,
    category: feedback.category
  };
  const updatedLogs = [newLog, ...current.feedbackLogs];
  updateClientProgress({ feedbackLogs: updatedLogs });
  return { success: true, data: newLog };
}

export async function getArticles(lang: string = 'en', organ?: string, level?: string): Promise<any[]> {
  let url = `/api/articles?lang=${lang}`;
  if (organ && organ !== 'All') url += `&organ=${organ}`;
  if (level && level !== 'All') url += `&level=${level}`;
  
  const serverArticles = await fetchJson<any[]>(url);
  if (serverArticles) {
    return serverArticles;
  }
  
  // Fallback to static seed data
  return seedArticles.map(art => {
    // Basic local language translation mapping for the static articles fallback
    return {
      id: art.article_number,
      article_number: art.article_number,
      title: art.title,
      raw_text: art.raw_text,
      simplified_summary: art.simplified_summary,
      child_friendly_summary: art.child_friendly_summary,
      key_takeaways: art.key_takeaways,
      organ: art.organ,
      level: art.level,
      scenario_questions: art.scenario_questions
    };
  });
}
