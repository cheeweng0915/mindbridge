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
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="h-56 rounded-[8px] bg-white/80 shadow-[0_4px_10px_rgba(1,1,32,0.1)]" />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-12 sm:px-6 sm:py-16">
        <section className="mindbridge-soft-panel p-6 sm:p-8">
          <p className="mindbridge-label text-black/55">Result unavailable</p>
          <h1 className="mindbridge-hero-title mt-4 max-w-4xl text-[#010120]">
            Start a check-in to unlock your support path.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-[1.35] text-black/68">
            Your result will appear here after you complete the quiz.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link className="mindbridge-button-dark px-5 py-3 text-sm font-medium" href="/quiz">
              Start the quiz
            </Link>
            <Link className="mindbridge-button-outline px-5 py-3 text-sm font-medium" href="/resources">
              Open resources
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const styles = levelStyles[result.level];

  return (
    <div className="relative isolate overflow-hidden py-12 sm:py-16">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(239,44,193,0.12),transparent_24%),radial-gradient(circle_at_55%_18%,rgba(189,187,255,0.28),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(252,76,2,0.08),transparent_18%)]"
      />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 sm:gap-10 sm:px-6">
        <section className="mindbridge-soft-panel p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mindbridge-label text-black/55">Your result</p>
              <h1 className="mindbridge-hero-title mt-4 text-[#010120]">
                Take the next step that feels kind to your nervous system.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-[1.35] text-black/68">
                This score is a soft signal, not a diagnosis. Use it to choose the
                kind of support that fits the moment.
              </p>
            </div>
            <span className={`inline-flex rounded-[4px] px-3 py-2 text-sm font-medium ${styles.badge}`}>
              {result.level} stress
            </span>
          </div>
        </section>

        <section className={`grid gap-6 lg:grid-cols-[1.05fr_0.95fr]`}>
          <div className={`mindbridge-soft-panel p-6 sm:p-8 ${styles.ring}`}>
            <h2 className="mindbridge-section-title text-[#010120]">{result.title}</h2>
            <p className="mt-4 max-w-3xl text-base leading-[1.35] text-black/68">
              {result.summary}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[8px] border border-black/10 bg-white/80 p-4">
                <p className="mindbridge-label text-black/45">Score</p>
                <p className="mt-3 text-3xl font-medium tracking-[-0.05em] text-[#010120] sm:text-4xl">
                  {result.score} / {result.maxScore}
                </p>
              </div>
              <div className="rounded-[8px] border border-black/10 bg-white/80 p-4">
                <p className="mindbridge-label text-black/45">Saved</p>
                <p className="mt-3 text-lg font-medium leading-[1.15] text-[#010120]">
                  {formatDate(result.answeredAt)}
                </p>
              </div>
            </div>
          </div>

          <div className="mindbridge-dark-panel p-6 text-white sm:p-8">
            <p className="mindbridge-label text-white/60">Try one now</p>
            <h3 className="mt-4 text-3xl font-medium tracking-[-0.04em] text-white">
              Choose the kind of help you need next.
            </h3>
            <div className="mt-6 flex flex-col gap-3">
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
                className="rounded-[4px] px-4 py-3 text-center text-sm font-medium text-white/64 hover:bg-white/5"
                href="/quiz"
              >
                Retake the quiz
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.98fr_1.02fr]">
          <div className="mindbridge-card p-6 sm:p-8">
            <h3 className="mindbridge-section-title text-[#010120]">Supportive next steps</h3>
            <ul className="mt-5 space-y-4 text-black/68">
              {result.suggestions.map((suggestion) => (
                <li className="flex gap-3" key={suggestion}>
                  <span
                    className={`mt-1 h-2.5 w-2.5 rounded-full ${styles.accent.replace("text", "bg")}`}
                  />
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mindbridge-soft-panel p-6 sm:p-8">
            <p className="mindbridge-label text-black/45">What this means</p>
            <p className="mt-4 max-w-2xl text-base leading-[1.35] text-black/68">
              The number is there to orient you, not define you. Use one small step,
              then come back later if you need another one.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link className="mindbridge-button-dark px-5 py-3 text-sm font-medium" href="/quiz">
                Revisit the check-in
              </Link>
              <Link className="mindbridge-button-outline px-5 py-3 text-sm font-medium" href="/resources">
                Find support
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
