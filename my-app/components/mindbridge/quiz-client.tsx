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
    <div className="relative isolate overflow-hidden py-12 sm:py-16">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(189,187,255,0.30),transparent_22%),radial-gradient(circle_at_84%_12%,rgba(239,44,193,0.10),transparent_18%),radial-gradient(circle_at_bottom_left,rgba(252,76,2,0.08),transparent_18%)]"
      />
      <div className="relative mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="space-y-6">
          <div className="space-y-4">
            <p className="mindbridge-label text-black/55">Gentle check-in</p>
            <h1 className="mindbridge-hero-title max-w-3xl text-[#010120]">
              Notice what your system has been carrying today.
            </h1>
            <p className="max-w-2xl text-base leading-[1.35] text-black/68 sm:text-lg">
              Move one question at a time. Your draft stays in this browser if you
              step away and come back later.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="mindbridge-card p-4">
              <p className="mindbridge-label text-black/45">Pace</p>
              <p className="mt-3 text-3xl font-medium tracking-[-0.05em] text-[#010120]">
                1
              </p>
              <p className="mt-3 text-sm leading-[1.35] text-black/62">
                Question at a time.
              </p>
            </div>
            <div className="mindbridge-card p-4">
              <p className="mindbridge-label text-black/45">Draft</p>
              <p className="mt-3 text-3xl font-medium tracking-[-0.05em] text-[#010120]">
                Local
              </p>
              <p className="mt-3 text-sm leading-[1.35] text-black/62">
                Saved in this browser.
              </p>
            </div>
            <div className="mindbridge-card p-4">
              <p className="mindbridge-label text-black/45">Flow</p>
              <p className="mt-3 text-3xl font-medium tracking-[-0.05em] text-[#010120]">
                8
              </p>
              <p className="mt-3 text-sm leading-[1.35] text-black/62">
                Prompts total.
              </p>
            </div>
          </div>

          <section className="mindbridge-soft-panel space-y-5 p-5 sm:space-y-6 sm:p-7">
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

            <div className="space-y-3">
              <p className="mindbridge-label text-black/45">Current prompt</p>
              <h2 className="mindbridge-section-title text-[#010120]">
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
                        : "border-black/[0.08] bg-white/90 text-black/72 hover:border-[#bdbbff] hover:bg-[#f7f7ff]"
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
        </section>

        <aside className="space-y-4 lg:pt-20">
          <div className="mindbridge-dark-panel p-6 text-white">
            <p className="mindbridge-label text-white/60">How this works</p>
            <p className="mt-4 text-2xl font-medium tracking-[-0.04em] text-white sm:text-3xl">
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
              <span className="font-mono text-[#010120]"> mindbridge.quiz.draft</span>.
            </p>
          </div>
          <div className="mindbridge-card p-6">
            <p className="mindbridge-label text-black/45">Next step</p>
            <p className="mt-4 text-sm leading-[1.35] text-black/68">
              Use the quiz result as a pointer, not a verdict. The goal is one
              helpful move, not perfect insight.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
