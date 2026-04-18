export type QuizAnswerValue = 0 | 1 | 2;

export type NullableQuizAnswer = QuizAnswerValue | null;

export type StressLevel = "low" | "medium" | "high";

export type QuizQuestion = {
  id: string;
  prompt: string;
};

export type QuizResult = {
  score: number;
  maxScore: number;
  level: StressLevel;
  title: string;
  summary: string;
  suggestions: string[];
  answeredAt: string;
};

export type QuizDraft = {
  answers: NullableQuizAnswer[];
  currentIndex: number;
  updatedAt: string;
};

export type MoodOption = {
  value: "steady" | "hopeful" | "flat" | "stressed" | "overwhelmed";
  emoji: string;
  label: string;
};

export type JournalEntry = {
  id: string;
  mood: MoodOption["value"];
  emoji: string;
  label: string;
  text: string;
  createdAt: string;
};

export type ResourceGroup = "Urgent support" | "Campus support" | "Self-care";

export type ResourceItem = {
  title: string;
  description: string;
  actionLabel: string;
  href: string;
  group: ResourceGroup;
  note?: string;
  urgent?: boolean;
  external?: boolean;
};

export type BreathingPhase = {
  name: "inhale" | "hold" | "exhale";
  duration: number;
  cue: string;
};
