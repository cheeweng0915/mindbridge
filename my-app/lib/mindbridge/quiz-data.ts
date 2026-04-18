import type { QuizQuestion, QuizAnswerValue } from "@/lib/mindbridge/types";

export const quizQuestions: QuizQuestion[] = [
  { id: "rest", prompt: "I feel tired even after resting." },
  { id: "study", prompt: "I feel stressed about my studies." },
  { id: "focus", prompt: "I find it hard to focus on my tasks." },
  {
    id: "drained",
    prompt: "I feel emotionally drained by daily responsibilities.",
  },
  { id: "deadlines", prompt: "I feel overwhelmed by deadlines." },
  { id: "motivation", prompt: "I have less motivation than usual." },
  { id: "relax", prompt: "I struggle to relax after study time." },
  {
    id: "mental-load",
    prompt: "I feel like I am carrying too much mentally.",
  },
];

export const answerOptions: { label: string; value: QuizAnswerValue }[] = [
  { label: "Never", value: 0 },
  { label: "Sometimes", value: 1 },
  { label: "Often", value: 2 },
];
