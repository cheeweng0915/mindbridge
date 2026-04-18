"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { levelStyles } from "@/lib/mindbridge/constants";
import { getQuizResult } from "@/lib/mindbridge/storage";
import type { QuizResult } from "@/lib/mindbridge/types";

function formatDate(isoString: string) {
  return new Intl.DateTimeFormat("en-MY", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(isoString));
}

export function ResultClient() {
  const [result, setResult] = useState<QuizResult | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setResult(getQuizResult());
      setReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!ready) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="h-40 rounded-lg bg-emerald-50" />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-10 sm:px-6 sm:py-12">
        <h1 className="text-3xl font-semibold text-slate-900">
          Start a check-in to unlock your support path.
        </h1>
        <p className="max-w-2xl text-slate-600">
          Your result will appear here after you complete the quiz.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            className="rounded-lg bg-emerald-600 px-5 py-3 font-medium text-white"
            href="/quiz"
          >
            Start the quiz
          </Link>
          <Link
            className="rounded-lg border border-slate-200 px-5 py-3 font-medium text-slate-700"
            href="/resources"
          >
            Open resources
          </Link>
        </div>
      </div>
    );
  }

  const styles = levelStyles[result.level];

  return (
    <div className="bg-white py-10 sm:py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 sm:gap-10 sm:px-6">
        <section className="relative overflow-hidden rounded-[8px] border border-black/10 bg-[radial-gradient(circle_at_top_left,rgba(239,44,193,0.12),transparent_24%),radial-gradient(circle_at_55%_18%,rgba(189,187,255,0.28),transparent_20%),#ffffff)] p-5 shadow-[0_4px_10px_rgba(1,1,32,0.1)] sm:p-8">
          <p className="mindbridge-label text-black/55">Your result</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-medium leading-[1.04] text-[#010120] sm:text-5xl">
            Take the next step that feels kind to your nervous system.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-[1.35] text-black/68">
            This score is a soft signal, not a diagnosis. Use it to choose the
            kind of support that fits the moment.
          </p>
        </section>

        <section className={`rounded-[8px] border bg-white p-5 shadow-[0_4px_10px_rgba(1,1,32,0.1)] sm:p-6 ${styles.ring}`}>
        <span className={`inline-flex rounded-[4px] px-3 py-2 text-sm font-semibold ${styles.badge}`}>
          {result.level} stress
        </span>
        <h2 className="mt-4 text-3xl font-medium leading-[1.08] text-[#010120]">
          {result.title}
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-[1.35] text-black/68">
          {result.summary}
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-[8px] border border-black/10 bg-black/[0.02] p-4">
            <p className="mindbridge-label text-black/45">Score</p>
            <p className="mt-3 text-3xl font-medium leading-none text-[#010120] sm:text-4xl">
              {result.score} / {result.maxScore}
            </p>
          </div>
          <div className="rounded-[8px] border border-black/10 bg-black/[0.02] p-4">
            <p className="mindbridge-label text-black/45">Saved</p>
            <p className="mt-3 text-lg font-medium leading-[1.15] text-[#010120]">
              {formatDate(result.answeredAt)}
            </p>
          </div>
        </div>
      </section>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="mindbridge-card p-6">
          <h3 className="text-2xl font-medium leading-[1.1] text-[#010120]">
            Supportive next steps
          </h3>
          <ul className="mt-5 space-y-4 text-black/68">
            {result.suggestions.map((suggestion) => (
              <li className="flex gap-3" key={suggestion}>
                <span className={`mt-1 h-2.5 w-2.5 rounded-full ${styles.accent.replace("text", "bg")}`} />
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mindbridge-dark-card bg-[#010120] p-6 text-white">
          <p className="mindbridge-label text-white/60">Try one now</p>
          <h3 className="mt-4 text-3xl font-medium leading-[1.08] text-white">
            Choose the kind of help you need next.
          </h3>
          <div className="mt-4 flex flex-col gap-3">
            <Link
              className="mindbridge-button-glass px-4 py-3 text-center text-sm font-medium"
              href="/breathing"
            >
              Try breathing
            </Link>
            <Link
              className="mindbridge-button-glass px-4 py-3 text-center text-sm font-medium"
              href="/journal"
            >
              Write a journal note
            </Link>
            <Link
              className="mindbridge-button-glass px-4 py-3 text-center text-sm font-medium"
              href="/resources"
            >
              Open support resources
            </Link>
            <Link
              className="rounded-[4px] px-4 py-3 text-center text-sm font-medium text-white/64"
              href="/quiz"
            >
              Retake the quiz
            </Link>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
