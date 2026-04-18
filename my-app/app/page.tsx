import Link from "next/link";

import { CheckInSummary } from "@/components/mindbridge/check-in-summary";

export default function HomePage() {
  return (
    <div className="space-y-8 pb-12 sm:space-y-10 sm:pb-16">
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(189,187,255,0.30),transparent_22%),radial-gradient(circle_at_80%_18%,rgba(239,44,193,0.10),transparent_18%),radial-gradient(circle_at_bottom_left,rgba(252,76,2,0.07),transparent_18%)]"
        />
        <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="space-y-5">
            <p className="mindbridge-label text-black/55">Student wellbeing</p>
            <h1 className="mindbridge-hero-title max-w-3xl text-[#010120]">
              A calmer place to notice stress before it grows.
            </h1>
            <p className="max-w-2xl text-base leading-[1.35] text-black/68 sm:text-lg">
              Start with one gentle check-in, then move to a note, a breathing reset,
              or support if you need it.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link className="mindbridge-button-dark px-5 py-3 text-sm font-medium" href="/quiz">
                Start check-in
              </Link>
              <Link className="mindbridge-button-outline px-5 py-3 text-sm font-medium" href="/resources">
                Open support
              </Link>
            </div>
            <p className="max-w-xl text-sm leading-[1.35] text-black/55">
              Not a diagnosis. For emergencies, contact local emergency services.
            </p>
          </div>

          <div className="mindbridge-soft-panel p-5 sm:p-6">
            <p className="mindbridge-label text-black/50">Quick look</p>
            <p className="mindbridge-card-title mt-4 max-w-lg text-[#010120]">
              One short flow, one private note, one calmer next step.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-[4px] border border-black/10 bg-white/80 px-2 py-1 text-xs font-medium uppercase tracking-[0.08em] text-[#010120]">
                Check-in
              </span>
              <span className="rounded-[4px] border border-black/10 bg-white/80 px-2 py-1 text-xs font-medium uppercase tracking-[0.08em] text-[#010120]">
                Journal
              </span>
              <span className="rounded-[4px] border border-black/10 bg-white/80 px-2 py-1 text-xs font-medium uppercase tracking-[0.08em] text-[#010120]">
                Breathing
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="mindbridge-card p-4">
                <p className="mindbridge-label text-black/45">Private</p>
                <p className="mt-3 text-3xl font-medium tracking-[-0.05em] text-[#010120]">
                  Local
                </p>
              </div>
              <div className="mindbridge-card p-4">
                <p className="mindbridge-label text-black/45">Tools</p>
                <p className="mt-3 text-3xl font-medium tracking-[-0.05em] text-[#010120]">
                  4
                </p>
              </div>
              <div className="mindbridge-card p-4">
                <p className="mindbridge-label text-black/45">Tone</p>
                <p className="mt-3 text-3xl font-medium tracking-[-0.05em] text-[#010120]">
                  Soft
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CheckInSummary />

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link className="mindbridge-card p-5 transition hover:-translate-y-0.5" href="/quiz">
            <p className="mindbridge-label text-black/45">Check-in</p>
            <p className="mt-3 text-2xl font-medium leading-[1.08] tracking-[-0.04em] text-[#010120]">
              Stress check
            </p>
            <p className="mt-3 text-sm leading-[1.35] text-black/68">
              Answer a short set of questions.
            </p>
          </Link>
          <Link className="mindbridge-card p-5 transition hover:-translate-y-0.5" href="/journal">
            <p className="mindbridge-label text-black/45">Write</p>
            <p className="mt-3 text-2xl font-medium leading-[1.08] tracking-[-0.04em] text-[#010120]">
              Journal
            </p>
            <p className="mt-3 text-sm leading-[1.35] text-black/68">
              Save one honest note.
            </p>
          </Link>
          <Link className="mindbridge-card p-5 transition hover:-translate-y-0.5" href="/breathing">
            <p className="mindbridge-label text-black/45">Reset</p>
            <p className="mt-3 text-2xl font-medium leading-[1.08] tracking-[-0.04em] text-[#010120]">
              Breathing
            </p>
            <p className="mt-3 text-sm leading-[1.35] text-black/68">
              Slow down for one minute.
            </p>
          </Link>
          <Link className="mindbridge-card p-5 transition hover:-translate-y-0.5" href="/resources">
            <p className="mindbridge-label text-black/45">Help</p>
            <p className="mt-3 text-2xl font-medium leading-[1.08] tracking-[-0.04em] text-[#010120]">
              Resources
            </p>
            <p className="mt-3 text-sm leading-[1.35] text-black/68">
              Find support fast.
            </p>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mindbridge-dark-panel flex flex-col gap-4 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="space-y-2">
            <p className="mindbridge-label text-white/60">Next move</p>
            <p className="text-2xl font-medium tracking-[-0.04em] text-white">
              Start with one small step, not the whole day.
            </p>
          </div>
          <Link className="mindbridge-button-glass px-5 py-3 text-sm font-medium" href="/quiz">
            Open check-in
          </Link>
        </div>
      </section>
    </div>
  );
}
