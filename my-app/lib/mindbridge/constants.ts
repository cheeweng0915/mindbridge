import type {
  BreathingPhase,
  MoodOption,
  ResourceItem,
  StressLevel,
} from "@/lib/mindbridge/types";

export const featureHighlights = [
  {
    href: "/quiz",
    title: "Stress check-in",
    body: "Answer a short set of questions and get a grounded next step.",
  },
  {
    href: "/resources",
    title: "Support resources",
    body: "See urgent help, trusted support contacts, and a simple help path.",
  },
  {
    href: "/journal",
    title: "Reflection journal",
    body: "Save a mood and a short note privately in this browser.",
  },
  {
    href: "/breathing",
    title: "Breathing reset",
    body: "Use a guided 4-7-8 rhythm when you need a calmer moment.",
  },
];

export const moodOptions: MoodOption[] = [
  { value: "steady", emoji: "🙂", label: "Steady" },
  { value: "hopeful", emoji: "🌤️", label: "Hopeful" },
  { value: "flat", emoji: "😶", label: "Flat" },
  { value: "stressed", emoji: "😣", label: "Stressed" },
  { value: "overwhelmed", emoji: "😵", label: "Too much" },
];

export const resources: ResourceItem[] = [
  {
    group: "Urgent support",
    title: "Emergency services",
    description:
      "If you or someone nearby is in immediate danger, call emergency services right away.",
    actionLabel: "Call 999",
    href: "tel:999",
    urgent: true,
  },
  {
    group: "Urgent support",
    title: "Talian HEAL 15555",
    description:
      "Ministry of Health Malaysia psychosocial support and tele-counselling line.",
    actionLabel: "Call 15555",
    href: "tel:15555",
    note: "Official support line",
  },
  {
    group: "Urgent support",
    title: "Befrienders Kuala Lumpur",
    description:
      "Free, confidential emotional support for people in distress or despair.",
    actionLabel: "Call 03-7627 2929",
    href: "tel:+60376272929",
    note: "24 hours",
  },
  {
    group: "Campus support",
    title: "Student counsellor",
    description:
      "Reach out to your school or college counsellor for a private conversation and support plan.",
    actionLabel: "Plan this step",
    href: "/journal",
    note: "Use your journal to note what you want to say.",
  },
  {
    group: "Campus support",
    title: "Academic advisor",
    description:
      "Ask for help prioritising deadlines, workload, and realistic next actions.",
    actionLabel: "List your pressure points",
    href: "/journal",
  },
  {
    group: "Campus support",
    title: "Talian Kasih 15999",
    description:
      "National care line for counselling, welfare support, and emotional well-being guidance.",
    actionLabel: "Call 15999",
    href: "tel:15999",
    note: "Also available on WhatsApp: 019-2615999",
  },
  {
    group: "Self-care",
    title: "4-7-8 breathing reset",
    description:
      "Take one quiet minute to slow your breathing and settle your body.",
    actionLabel: "Open breathing",
    href: "/breathing",
  },
  {
    group: "Self-care",
    title: "Private reflection",
    description:
      "Write down what feels heavy, what is still manageable, and one next move for today.",
    actionLabel: "Open journal",
    href: "/journal",
  },
  {
    group: "Self-care",
    title: "Mental health information",
    description:
      "Read Ministry of Health Malaysia mental health guidance and support information.",
    actionLabel: "Open official page",
    href: "https://www.moh.gov.my/teras/kesihatan-mental/pengenalan",
    external: true,
  },
];

export const levelStyles: Record<
  StressLevel,
  { badge: string; accent: string; ring: string }
> = {
  low: {
    badge: "bg-emerald-100 text-emerald-700",
    accent: "text-emerald-700",
    ring: "border-emerald-300",
  },
  medium: {
    badge: "bg-amber-100 text-amber-700",
    accent: "text-amber-700",
    ring: "border-amber-300",
  },
  high: {
    badge: "bg-rose-100 text-rose-700",
    accent: "text-rose-700",
    ring: "border-rose-300",
  },
};

export const breathingPhases: BreathingPhase[] = [
  { name: "inhale", duration: 4, cue: "Breathe in slowly" },
  { name: "hold", duration: 7, cue: "Hold gently" },
  { name: "exhale", duration: 8, cue: "Release the breath" },
];
