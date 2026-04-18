import Link from "next/link";

import { CheckInSummary } from "@/components/mindbridge/check-in-summary";
import { featureHighlights } from "@/lib/mindbridge/constants";

export default function HomePage() {
  return (
    <div className="space-y-10 pb-12 sm:space-y-14 sm:pb-16">
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(189,187,255,0.34),transparent_20%),radial-gradient(circle_at_80%_18%,rgba(239,44,193,0.14),transparent_18%),radial-gradient(circle_at_bottom_left,rgba(252,76,2,0.09),transparent_18%)]"
        />
        <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-20">
          <div className="space-y-6">
            <p className="mindbridge-label text-black/55">Student wellbeing</p>
            <h1 className="mindbridge-hero-title max-w-3xl text-[#010120]">
              A calmer place to notice stress before it grows.
            </h1>
            <p className="max-w-2xl text-base leading-[1.35] text-black/68 sm:text-lg">
              MindBridge gives students one soft entry point for checking in,
              writing a note, slowing the body down, and finding support.
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

          <div className="grid gap-4">
            <div className="mindbridge-soft-panel p-5 sm:p-6">
              <div className="grid gap-4 sm:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-4">
                  <p className="mindbridge-label text-black/50">Soft launch</p>
                  <p className="mindbridge-card-title max-w-sm text-[#010120]">
                    One short flow, one private note, one calmer next step.
                  </p>
                  <div className="flex flex-wrap gap-2">
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
                </div>
                <div className="flex items-end justify-end">
                  <div className="relative h-44 w-full max-w-[180px] overflow-hidden rounded-[8px] border border-black/10 bg-[#010120] p-4 text-white shadow-[0_4px_10px_rgba(1,1,32,0.1)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_20%,rgba(189,187,255,0.32),transparent_28%),radial-gradient(circle_at_78%_82%,rgba(239,44,193,0.18),transparent_24%)]" />
                    <div className="relative flex h-full flex-col justify-between">
                      <p className="mindbridge-label text-white/60">Today</p>
                      <div>
                        <p className="text-4xl font-medium tracking-[-0.05em]">08</p>
                        <p className="mt-1 text-sm text-white/68">guided prompts</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="mindbridge-card p-4">
                <p className="mindbridge-label text-black/45">Private</p>
                <p className="mt-3 text-3xl font-medium tracking-[-0.05em] text-[#010120]">
                  Local
                </p>
                <p className="mt-3 text-sm leading-[1.35] text-black/62">
                  Drafts and notes stay in this browser.
                </p>
              </div>
              <div className="mindbridge-card p-4">
                <p className="mindbridge-label text-black/45">Tools</p>
                <p className="mt-3 text-3xl font-medium tracking-[-0.05em] text-[#010120]">
                  4
                </p>
                <p className="mt-3 text-sm leading-[1.35] text-black/62">
                  Check-in, journal, breathing, and resources.
                </p>
              </div>
              <div className="mindbridge-card p-4">
                <p className="mindbridge-label text-black/45">Tone</p>
                <p className="mt-3 text-3xl font-medium tracking-[-0.05em] text-[#010120]">
                  Soft
                </p>
                <p className="mt-3 text-sm leading-[1.35] text-black/62">
                  Clear guidance without feeling clinical.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CheckInSummary />

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="mindbridge-dark-panel p-6 text-white sm:p-8">
            <p className="mindbridge-label text-white/60">Research zone</p>
            <h2 className="mindbridge-section-title mt-4 max-w-md text-white">
              Calm UI on the front, practical support underneath.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-[1.35] text-white/72">
              The app helps students slow down long enough to notice pressure,
              then points them to a single useful action instead of overwhelming
              them with choices.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link className="mindbridge-button-glass px-5 py-3 text-sm font-medium" href="/quiz">
                Take the quiz
              </Link>
              <Link className="mindbridge-button-glass px-5 py-3 text-sm font-medium" href="/journal">
                Write a note
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            {featureHighlights.map((item) => (
              <Link
                className="mindbridge-card p-5 transition hover:-translate-y-0.5"
                href={item.href}
                key={item.href}
              >
                <p className="mindbridge-label text-black/45">Quick path</p>
                <p className="mt-3 text-2xl font-medium leading-[1.08] tracking-[-0.04em] text-[#010120]">
                  {item.title}
                </p>
                <p className="mt-3 max-w-xl text-sm leading-[1.35] text-black/68">
                  {item.body}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="mindbridge-card p-6 sm:p-8">
            <p className="mindbridge-label text-black/45">Local storage</p>
            <h2 className="mindbridge-section-title mt-4 max-w-md text-[#010120]">
              Data stays on this device.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-[1.35] text-black/68">
              Quiz drafts, results, and journal entries are saved in the
              visitor&apos;s browser. Add a backend later if you need sync across
              devices.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link className="mindbridge-button-dark px-5 py-3 text-sm font-medium" href="/quiz">
                Check in
              </Link>
              <Link className="mindbridge-button-outline px-5 py-3 text-sm font-medium" href="/resources">
                Get help
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="mindbridge-dark-panel p-6 text-white">
              <p className="mindbridge-label text-white/60">Saved keys</p>
              <div className="mt-4 space-y-2 font-mono text-sm text-white/84">
                <p>mindbridge.quiz.draft</p>
                <p>mindbridge.quiz.result</p>
                <p>mindbridge.journal.entries</p>
              </div>
            </div>
            <div className="mindbridge-soft-panel p-6">
              <p className="mindbridge-label text-black/45">Demo note</p>
              <p className="mt-4 text-sm leading-[1.35] text-black/68">
                The layout follows the same light-and-dark rhythm as DESIGN.md:
                optimistic on top, serious where support matters.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
