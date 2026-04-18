"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { getJournalEntries, getQuizResult } from "@/lib/mindbridge/storage";
import type { QuizResult } from "@/lib/mindbridge/types";

export function CheckInSummary() {
  const [result, setResult] = useState<QuizResult | null>(null);
  const [entryCount, setEntryCount] = useState(0);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setResult(getQuizResult());
      setEntryCount(getJournalEntries().length);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="bg-white py-4 sm:py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mindbridge-card grid grid-cols-3 gap-0 overflow-hidden">
          <article className="border-r border-black/10 p-4 sm:p-6">
            <p className="mindbridge-label text-black/50">Guided prompts</p>
            <p className="mt-3 text-3xl font-medium leading-none text-[#010120] sm:mt-4 sm:text-5xl">
              8
            </p>
            <p className="mt-4 hidden max-w-xs text-sm leading-[1.35] text-black/62 sm:block">
              One short flow to help you notice strain before it compounds.
            </p>
          </article>
          <article className="border-r border-black/10 p-4 sm:p-6">
            <p className="mindbridge-label text-black/50">Private notes</p>
            <p className="mt-3 text-3xl font-medium leading-none text-[#010120] sm:mt-4 sm:text-5xl">
              {entryCount}
            </p>
            <p className="mt-4 hidden max-w-xs text-sm leading-[1.35] text-black/62 sm:block">
              Journal entries saved in this browser for your own reflection.
            </p>
          </article>
          <article className="p-4 sm:p-6">
            <p className="mindbridge-label text-black/50">Latest check-in</p>
            <p className="mt-3 text-3xl font-medium leading-none text-[#010120] sm:mt-4 sm:text-5xl">
              {result ? result.level : "local"}
            </p>
            <p className="mt-4 hidden max-w-xs text-sm leading-[1.35] text-black/62 sm:block">
              {result
                ? result.summary
                : "Your last result appears here after you complete the check-in."}
            </p>
            <Link
              className="mindbridge-button-dark mt-3 hidden px-4 py-2 text-sm font-medium sm:inline-flex"
              href="/result"
            >
              Open result
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
