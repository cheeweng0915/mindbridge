"use client";

import { useEffect, useMemo, useState } from "react";

import { breathingPhases } from "@/lib/mindbridge/constants";

type BreathingState = {
  running: boolean;
  phaseIndex: number;
  remaining: number;
  cycleCount: number;
};

const initialState: BreathingState = {
  running: false,
  phaseIndex: 0,
  remaining: breathingPhases[0].duration,
  cycleCount: 1,
};

export function BreathingClient() {
  const [session, setSession] = useState<BreathingState>(initialState);
  const phase = useMemo(
    () => breathingPhases[session.phaseIndex],
    [session.phaseIndex],
  );

  useEffect(() => {
    if (!session.running) {
      return;
    }

    const interval = window.setInterval(() => {
      setSession((currentSession) => {
        if (!currentSession.running) {
          return currentSession;
        }

        if (currentSession.remaining > 1) {
          return {
            ...currentSession,
            remaining: currentSession.remaining - 1,
          };
        }

        const nextPhaseIndex =
          (currentSession.phaseIndex + 1) % breathingPhases.length;
        const completedCycle =
          currentSession.phaseIndex === breathingPhases.length - 1;

        return {
          ...currentSession,
          phaseIndex: nextPhaseIndex,
          remaining: breathingPhases[nextPhaseIndex].duration,
          cycleCount: completedCycle
            ? currentSession.cycleCount + 1
            : currentSession.cycleCount,
        };
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [session.running]);

  const circleState =
    phase.name === "inhale"
      ? "scale-100 bg-emerald-400/50"
      : phase.name === "hold"
        ? "scale-100 bg-violet-300/45"
        : "scale-[0.78] bg-emerald-300/40";

  return (
    <div className="relative isolate overflow-hidden py-12 sm:py-14">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(189,187,255,0.24),transparent_22%),radial-gradient(circle_at_84%_18%,rgba(239,44,193,0.10),transparent_18%),radial-gradient(circle_at_bottom_right,rgba(252,76,2,0.08),transparent_18%)]"
      />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 sm:gap-8 sm:px-6">
        <section className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div className="space-y-5">
            <p className="mindbridge-label text-black/55">Breathing reset</p>
            <h1 className="mindbridge-hero-title max-w-2xl text-[#010120]">
              Slow the next minute down.
            </h1>
            <p className="max-w-xl text-base leading-[1.35] text-black/68">
              Follow the 4-7-8 rhythm. Shorten any hold if your body asks for it.
            </p>
          </div>
          <div className="mindbridge-soft-panel p-5 sm:p-6">
            <p className="mindbridge-label text-black/45">Rhythm</p>
            <p className="mt-4 text-2xl font-medium leading-[1.1] tracking-[-0.03em] text-[#010120] sm:text-3xl sm:leading-[1.08]">
              Inhale 4, hold 7, exhale 8.
            </p>
          </div>
        </section>

        <section className="mindbridge-dark-panel overflow-hidden p-4 text-white sm:p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-center">
            <div className="flex min-h-[320px] flex-col items-center justify-center rounded-[8px] border border-white/[0.12] bg-white/[0.04] p-5 sm:min-h-[420px] sm:p-6">
              <div
                className={`flex h-44 w-44 items-center justify-center rounded-full text-center text-white shadow-[0_18px_40px_rgba(189,187,255,0.16)] transition-all duration-1000 sm:h-64 sm:w-64 ${circleState}`}
              >
                <div className="rounded-full bg-[#010120]/85 px-6 py-4">
                  <p className="mindbridge-label text-white/60">{phase.name}</p>
                  <p className="mt-2 text-4xl font-medium tracking-[-0.05em] text-white">
                    {session.remaining}s
                  </p>
                </div>
              </div>
              <p className="mt-8 text-xl font-medium tracking-[-0.03em] text-white">
                {phase.cue}
              </p>
              <p className="mt-2 text-sm text-white/60">Cycle {session.cycleCount}</p>
            </div>

            <div className="space-y-4">
              <p className="mindbridge-label text-white/60">Controls</p>
              <div className="grid gap-3">
                <button
                  className="mindbridge-button-glass px-5 py-3 text-sm font-medium"
                  onClick={() =>
                    setSession((currentSession) => ({
                      ...currentSession,
                      running: true,
                    }))
                  }
                  type="button"
                >
                  {session.running ? "Running" : "Start"}
                </button>
                <button
                  className="mindbridge-button-glass px-5 py-3 text-sm font-medium"
                  onClick={() =>
                    setSession((currentSession) => ({
                      ...currentSession,
                      running: false,
                    }))
                  }
                  type="button"
                >
                  Pause
                </button>
                <button
                  className="mindbridge-button-glass px-5 py-3 text-sm font-medium"
                  onClick={() => setSession(initialState)}
                  type="button"
                >
                  Reset
                </button>
              </div>
              <div className="rounded-[8px] border border-white/[0.12] bg-white/[0.06] p-4 text-sm leading-[1.35] text-white/72">
                After one or two cycles, choose resources, a journal note, or a
                slower pace for the rest of the day.
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
