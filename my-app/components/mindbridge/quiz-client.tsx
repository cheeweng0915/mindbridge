"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { answerOptions, quizQuestions } from "@/lib/mindbridge/quiz-data";
import { scoreQuiz } from "@/lib/mindbridge/quiz-scoring";
import {
  clearQuizResult,
  clearQuizDraft,
  saveQuizDraft,
  saveQuizResult,
  getQuizDraft,
} from "@/lib/mindbridge/storage";
import type { NullableQuizAnswer, QuizAnswerValue } from "@/lib/mindbridge/types";

const defaultAnswers = quizQuestions.map(() => null) as NullableQuizAnswer[];

export function QuizClient() {
  const router = useRouter();
  const [answers, setAnswers] = useState<NullableQuizAnswer[]>(defaultAnswers);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const draft = getQuizDraft();

      if (draft && draft.answers.length === quizQuestions.length) {
        setAnswers(draft.answers);
        setCurrentIndex(Math.min(draft.currentIndex, quizQuestions.length - 1));
      }

      setIsReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    saveQuizDraft({
      answers,
      currentIndex,
      updatedAt: new Date().toISOString(),
    });
  }, [answers, currentIndex, isReady]);

  const currentAnswer = answers[currentIndex];
  const progress = useMemo(
    () => ((currentIndex + 1) / quizQuestions.length) * 100,
    [currentIndex],
  );

  const setAnswer = (value: QuizAnswerValue) => {
    setAnswers((currentAnswers) => {
      const nextAnswers = [...currentAnswers];
      nextAnswers[currentIndex] = value;
      return nextAnswers;
    });
  };

  const goNext = () => {
    if (currentAnswer === null) {
      return;
    }

    setCurrentIndex((value) => Math.min(value + 1, quizQuestions.length - 1));
  };

  const goBack = () => {
    setCurrentIndex((value) => Math.max(value - 1, 0));
  };

  const submitQuiz = () => {
    if (answers.some((answer) => answer === null)) {
      return;
    }

    const completedAnswers = answers as QuizAnswerValue[];
    saveQuizResult(scoreQuiz(completedAnswers));
    clearQuizDraft();
    router.push("/result");
  };

  const restartQuiz = () => {
    setAnswers(defaultAnswers);
    setCurrentIndex(0);
    clearQuizDraft();
    clearQuizResult();
  };

  return (
    <div className="relative overflow-hidden bg-white py-10 sm:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(189,187,255,0.24),transparent_22%),radial-gradient(circle_at_top_right,rgba(239,44,193,0.10),transparent_16%)]" />
      <div className="relative mx-auto grid max-w-6xl gap-6 px-4 sm:gap-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6 sm:space-y-8">
          <section className="space-y-4">
            <p className="mindbridge-label text-black/55">Gentle check-in</p>
            <h1 className="max-w-3xl text-4xl font-medium leading-[1.04] text-[#010120] sm:text-5xl sm:leading-[1.02]">
              Notice what your system has been carrying today.
            </h1>
            <p className="max-w-2xl text-base leading-[1.35] text-black/68">
              Move one question at a time. Your draft stays in this browser if you
              step away and return.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between gap-4 text-sm text-black/55">
              <span>
                Question {currentIndex + 1} of {quizQuestions.length}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-[4px] bg-black/[0.08]">
              <div
                className="h-full rounded-[4px] bg-[#010120] transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </section>

          <section className="mindbridge-card space-y-5 p-5 sm:space-y-6 sm:p-7">
            <div className="space-y-3">
              <p className="mindbridge-label text-black/45">Current prompt</p>
              <h2 className="text-2xl font-medium leading-[1.1] text-[#010120] sm:text-3xl sm:leading-[1.08]">
                {quizQuestions[currentIndex].prompt}
              </h2>
            </div>

            <div className="grid gap-3">
              {answerOptions.map((option) => {
                const isActive = currentAnswer === option.value;

                return (
                  <button
                    className={`rounded-[8px] border px-4 py-3 text-left transition sm:py-4 ${
                      isActive
                        ? "border-[#bdbbff] bg-[#f3f2ff] text-[#010120]"
                        : "border-black/[0.08] bg-white text-black/72 hover:border-[#bdbbff] hover:bg-[#f7f7ff]"
                    }`}
                    key={option.label}
                    onClick={() => setAnswer(option.value)}
                    type="button"
                  >
                    <span className="text-base font-medium">{option.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                className="mindbridge-button-outline px-4 py-3 text-sm font-medium"
                onClick={goBack}
                type="button"
              >
                Back
              </button>
              {currentIndex < quizQuestions.length - 1 ? (
                <button
                  className="mindbridge-button-dark px-5 py-3 text-sm font-medium disabled:cursor-not-allowed disabled:bg-black/25"
                  disabled={currentAnswer === null}
                  onClick={goNext}
                  type="button"
                >
                  Next question
                </button>
              ) : (
                <button
                  className="mindbridge-button-dark px-5 py-3 text-sm font-medium disabled:cursor-not-allowed disabled:bg-black/25"
                  disabled={currentAnswer === null || !isReady}
                  onClick={submitQuiz}
                  type="button"
                >
                  See my result
                </button>
              )}
              <button
                className="rounded-[4px] px-4 py-3 text-sm font-medium text-black/45 hover:bg-black/[0.04]"
                onClick={restartQuiz}
                type="button"
              >
                Reset answers
              </button>
            </div>
          </section>
        </div>

        <aside className="space-y-4 lg:pt-16">
          <div className="mindbridge-dark-card bg-[#010120] p-6 text-white">
            <p className="mindbridge-label text-white/60">How this works</p>
            <p className="mt-4 text-2xl font-medium leading-[1.1] text-white sm:text-3xl sm:leading-[1.08]">
              A short, private signal.
            </p>
            <p className="mt-4 text-sm leading-[1.35] text-white/72">
              Each answer scores the current pressure level, then the result page
              points you toward one calmer next action.
            </p>
          </div>
          <div className="mindbridge-card p-6">
            <p className="mindbridge-label text-black/45">Storage note</p>
            <p className="mt-4 text-sm leading-[1.35] text-black/68">
              Answers are kept locally in the current browser under
              <span className="font-mono text-[#010120]">
                {" "}mindbridge.quiz.draft
              </span>
              .
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
