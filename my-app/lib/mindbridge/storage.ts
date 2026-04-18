import type {
  JournalEntry,
  QuizDraft,
  QuizResult,
} from "@/lib/mindbridge/types";

export const storageKeys = {
  quizDraft: "mindbridge.quiz.draft",
  quizResult: "mindbridge.quiz.result",
  journalEntries: "mindbridge.journal.entries",
} as const;

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readJson<T>(key: string, fallback: T): T {
  if (!canUseStorage()) {
    return fallback;
  }

  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getQuizDraft() {
  return readJson<QuizDraft | null>(storageKeys.quizDraft, null);
}

export function saveQuizDraft(value: QuizDraft) {
  writeJson(storageKeys.quizDraft, value);
}

export function clearQuizDraft() {
  if (canUseStorage()) {
    window.localStorage.removeItem(storageKeys.quizDraft);
  }
}

export function getQuizResult() {
  return readJson<QuizResult | null>(storageKeys.quizResult, null);
}

export function saveQuizResult(value: QuizResult) {
  writeJson(storageKeys.quizResult, value);
}

export function clearQuizResult() {
  if (canUseStorage()) {
    window.localStorage.removeItem(storageKeys.quizResult);
  }
}

export function getJournalEntries() {
  return readJson<JournalEntry[]>(storageKeys.journalEntries, []);
}

export function saveJournalEntries(value: JournalEntry[]) {
  writeJson(storageKeys.journalEntries, value);
}
