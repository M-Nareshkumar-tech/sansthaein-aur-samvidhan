import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  displayName: z.string().min(2, 'Display name must be at least 2 characters long'),
  role: z.enum([
    'STUDENT',
    'CITIZEN',
    'EDUCATOR',
    'CONTENT_REVIEWER',
    'CONTENT_ADMIN',
    'PLATFORM_ADMIN'
  ]).default('CITIZEN')
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

export const quizSchema = z.object({
  questionId: z.string().uuid('Invalid question ID format'),
  chosenOptionIndex: z.number().int().min(0, 'Option index must be a non-negative integer')
});

export const gameSchema = z.object({
  gameType: z.enum(['spin', 'snakes', 'board', 'flashcards']),
  scoreGained: z.number().int().min(0, 'Score must be a non-negative integer')
});

export const feedbackSchema = z.object({
  rating: z.number().int().min(1).max(5, 'Rating must be between 1 and 5'),
  category: z.string().min(1, 'Category is required'),
  comment: z.string().min(1, 'Comment is required')
});

export const simulatorSubmitSchema = z.object({
  pathId: z.string().min(1, 'Path ID is required'),
  scenarioId: z.string().min(1, 'Scenario ID is required'),
  optionIndex: z.number().int().min(0, 'Option index must be a non-negative integer')
});
