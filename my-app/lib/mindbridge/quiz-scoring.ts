import type {
  QuizAnswerValue,
  QuizResult,
  StressLevel,
} from "@/lib/mindbridge/types";

const resultContent: Record<
  StressLevel,
  { title: string; summary: string; suggestions: string[] }
> = {
  low: {
    title: "You sound stretched, but still fairly steady.",
    summary:
      "A few small recovery habits can help you stay grounded before stress grows.",
    suggestions: [
      "Protect one proper rest block today instead of pushing through again.",
      "Keep your current routine gentle and realistic for the rest of the week.",
      "Try one short breathing cycle before your next study session.",
    ],
  },
  medium: {
    title: "You may be carrying a noticeable amount of pressure.",
    summary:
      "This is a good moment to slow the spiral, name what feels heavy, and choose one support step.",
    suggestions: [
      "Take one meaningful break today, not just a quick scroll.",
      "Write down the top three stressors so they stop blending together.",
      "Choose one support option from the resources page before the day ends.",
    ],
  },
  high: {
    title: "Your check-in suggests a high level of stress right now.",
    summary:
      "You deserve support. Start with one calming action and reach out instead of carrying this alone.",
    suggestions: [
      "Pause and try the breathing reset before doing anything demanding.",
      "Contact a trusted person, counsellor, or support line as soon as you can.",
      "Open urgent support resources now if you feel overwhelmed or unsafe.",
    ],
  },
};

export function scoreQuiz(
  answers: QuizAnswerValue[],
  answeredAt = new Date().toISOString(),
): QuizResult {
  const score = answers.reduce<number>((total, answer) => total + answer, 0);
  const maxScore = answers.length * 2;
  const level: StressLevel =
    score <= 5 ? "low" : score <= 10 ? "medium" : "high";
  const content = resultContent[level];

  return {
    score,
    maxScore,
    level,
    title: content.title,
    summary: content.summary,
    suggestions: content.suggestions,
    answeredAt,
  };
}
