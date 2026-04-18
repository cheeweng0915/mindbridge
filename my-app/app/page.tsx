import Link from "next/link";

import { CheckInSummary } from "@/components/mindbridge/check-in-summary";
import { featureHighlights } from "@/lib/mindbridge/constants";

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-white">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 hidden w-full max-w-[48%] bg-cover bg-center lg:block"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1523240798132-8757219e7d2d?auto=format&fit=crop&w=1600&q=80)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(239,44,193,0.14),transparent_28%),radial-gradient(circle_at_45%_18%,rgba(189,187,255,0.34),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(252,76,2,0.10),transparent_20%)]" />
        <div className="absolute inset-y-0 right-0 hidden w-full max-w-[48%] bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.16)_20%,rgba(255,255,255,0.84)_95%)] lg:block" />
        <div className="relative mx-auto grid min-h-[auto] max-w-6xl gap-8 px-4 pb-8 pt-10 sm:px-6 sm:pb-10 sm:pt-14 lg:min-h-[68svh] lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div className="max-w-3xl py-4 sm:py-6">
            <p className="mindbridge-label text-black/55">Student wellbeing</p>
            <h1 className="mt-4 text-4xl font-medium leading-[1.04] text-[#010120] sm:mt-5 md:text-7xl">
              Check in before stress takes over.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-[1.35] text-black/68 sm:mt-6 sm:text-lg sm:leading-[1.3]">
              MindBridge helps students notice stress, choose one next step, and
              keep private notes in this browser.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
              <Link
                className="mindbridge-button-dark px-5 py-3 text-sm font-medium"
                href="/quiz"
              >
                Start
              </Link>
              <Link
                className="mindbridge-button-outline px-5 py-3 text-sm font-medium"
                href="/resources"
              >
                Get help
              </Link>
            </div>
            <p className="mt-8 max-w-xl text-sm leading-[1.35] text-black/55">
              Not a diagnosis. For emergencies, call local emergency services.
            </p>
          </div>
          <div
            aria-hidden="true"
            className="mindbridge-card min-h-[180px] bg-cover bg-center lg:hidden"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(1,1,32,0.20)), url(https://images.unsplash.com/photo-1523240798132-8757219e7d2d?auto=format&fit=crop&w=900&q=80)",
            }}
          />
        </div>
      </section>

      <CheckInSummary />

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div
              className="mindbridge-card min-h-[220px] bg-cover bg-center sm:min-h-[300px]"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(1,1,32,0.24)), url(https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80)",
              }}
            >
              <div className="flex h-full flex-col justify-end p-6 text-white">
                <p className="mindbridge-label text-white/70">Main tools</p>
                <p className="mt-3 max-w-sm text-xl font-medium leading-[1.12] sm:text-2xl">
                  One calm place for checking in, writing, breathing, and finding help.
                </p>
              </div>
            </div>

            <div>
              <p className="mindbridge-label text-black/55">Choose a tool</p>
              <h2 className="mt-4 text-3xl font-medium leading-[1.08] text-[#010120] sm:text-4xl">
                Start with the smallest helpful action.
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {featureHighlights.map((item) => (
                  <Link
                    className="mindbridge-card p-5 transition hover:-translate-y-0.5"
                    href={item.href}
                    key={item.href}
                  >
                    <p className="text-xl font-medium leading-[1.12] text-[#010120]">
                      {item.title}
                    </p>
                    <p className="mt-3 text-sm leading-[1.35] text-black/68">
                      {item.body}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#010120] py-12 text-white sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-5">
            <p className="mindbridge-label text-white/60">Local storage</p>
            <h2 className="text-3xl font-medium leading-[1.08] text-white sm:text-4xl">
              Data stays on this device.
            </h2>
            <p className="max-w-2xl text-base leading-[1.35] text-white/72">
              Quiz drafts, results, and journal entries are saved in the
              visitor&apos;s browser. On Vercel, they stay tied to that browser
              on your deployed site.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                className="mindbridge-button-glass px-5 py-3 text-sm font-medium"
                href="/quiz"
              >
                Check in
              </Link>
              <Link
                className="mindbridge-button-glass px-5 py-3 text-sm font-medium"
                href="/journal"
              >
                Journal
              </Link>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="mindbridge-dark-card p-6">
              <p className="mindbridge-label text-white/60">Saved keys</p>
              <p className="mt-4 break-words font-mono text-sm text-white">
                mindbridge.quiz.draft
              </p>
              <p className="mt-2 break-words font-mono text-sm text-white">
                mindbridge.quiz.result
              </p>
              <p className="mt-2 break-words font-mono text-sm text-white">
                mindbridge.journal.entries
              </p>
            </div>
            <div className="mindbridge-dark-card p-6">
              <p className="mindbridge-label text-white/60">Demo note</p>
              <p className="mt-4 text-sm leading-[1.35] text-white/72">
                Simple for a hackathon demo. Add a backend later if users need
                sync across devices.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
