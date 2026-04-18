"use client";

import { useEffect, useMemo, useState } from "react";

import { moodOptions } from "@/lib/mindbridge/constants";
import { getJournalEntries, saveJournalEntries } from "@/lib/mindbridge/storage";
import type { JournalEntry, MoodOption } from "@/lib/mindbridge/types";

function formatDate(isoString: string) {
  return new Intl.DateTimeFormat("en-MY", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(isoString));
}

export function JournalClient() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedMood, setSelectedMood] =
    useState<MoodOption["value"]>("steady");
  const [text, setText] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setEntries(getJournalEntries());
      setReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const activeMood = useMemo(
    () => moodOptions.find((option) => option.value === selectedMood) ?? moodOptions[0],
    [selectedMood],
  );

  const saveEntry = () => {
    const trimmed = text.trim();

    if (!trimmed) {
      return;
    }

    const nextEntries = [
      {
        id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}`,
        mood: activeMood.value,
        emoji: activeMood.emoji,
        label: activeMood.label,
        text: trimmed,
        createdAt: new Date().toISOString(),
      },
      ...entries,
    ];

    setEntries(nextEntries);
    saveJournalEntries(nextEntries);
    setText("");
  };

  const deleteEntry = (id: string) => {
    const nextEntries = entries.filter((entry) => entry.id !== id);
    setEntries(nextEntries);
    saveJournalEntries(nextEntries);
  };

  return (
    <div className="relative isolate overflow-hidden py-12 sm:py-14">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(189,187,255,0.24),transparent_22%),radial-gradient(circle_at_84%_16%,rgba(239,44,193,0.10),transparent_18%),radial-gradient(circle_at_bottom_left,rgba(252,76,2,0.08),transparent_18%)]"
      />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 sm:gap-8 sm:px-6">
        <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div className="space-y-5">
            <p className="mindbridge-label text-black/55">Reflection journal</p>
            <h1 className="mindbridge-hero-title max-w-2xl text-[#010120]">
              Write one honest note.
            </h1>
            <p className="max-w-xl text-base leading-[1.35] text-black/68">
              Save a mood and a short reflection in this browser. Keep it simple:
              what feels heavy, what helps, and what comes next.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="mindbridge-card p-4">
                <p className="mindbridge-label text-black/45">Mood</p>
                <p className="mt-3 text-3xl font-medium tracking-[-0.05em] text-[#010120]">
                  5
                </p>
                <p className="mt-3 text-sm leading-[1.35] text-black/62">
                  States to choose from.
                </p>
              </div>
              <div className="mindbridge-card p-4">
                <p className="mindbridge-label text-black/45">Writing</p>
                <p className="mt-3 text-3xl font-medium tracking-[-0.05em] text-[#010120]">
                  Private
                </p>
                <p className="mt-3 text-sm leading-[1.35] text-black/62">
                  Stored locally in the browser.
                </p>
              </div>
              <div className="mindbridge-card p-4">
                <p className="mindbridge-label text-black/45">Goal</p>
                <p className="mt-3 text-3xl font-medium tracking-[-0.05em] text-[#010120]">
                  Clarity
                </p>
                <p className="mt-3 text-sm leading-[1.35] text-black/62">
                  Not perfect wording.
                </p>
              </div>
            </div>
          </div>
          <div className="mindbridge-soft-panel p-5 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-[1fr_0.8fr]">
              <div className="space-y-3">
                <p className="mindbridge-label text-black/45">Private writing</p>
                <p className="mindbridge-card-title max-w-sm text-[#010120]">
                  Clarity first. Perfect words later.
                </p>
                <p className="text-sm leading-[1.35] text-black/68">
                  A short note can make the pressure feel less shapeless.
                </p>
              </div>
              <div className="rounded-[8px] border border-black/10 bg-[#010120] p-4 text-white">
                <p className="mindbridge-label text-white/60">Saved notes</p>
                <p className="mt-4 text-4xl font-medium tracking-[-0.05em]">{entries.length}</p>
                <p className="mt-2 text-sm text-white/68">Entries in this browser.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="mindbridge-soft-panel space-y-5 p-5 sm:space-y-6 sm:p-6">
            <div className="space-y-3">
              <p className="mindbridge-label text-black/45">Mood</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                {moodOptions.map((mood) => {
                  const isActive = mood.value === selectedMood;

                  return (
                    <button
                      className={`min-h-24 rounded-[8px] border px-2 py-3 text-center transition ${
                        isActive
                          ? "border-[#bdbbff] bg-[#f3f2ff] text-[#010120]"
                          : "border-black/10 bg-white/90 text-black/70 hover:border-[#bdbbff] hover:bg-[#f7f7ff]"
                      }`}
                      key={mood.value}
                      onClick={() => setSelectedMood(mood.value)}
                      type="button"
                    >
                      <span className="block text-2xl">{mood.emoji}</span>
                      <span className="mt-2 block text-sm font-medium leading-tight">
                        {mood.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <label
                className="mindbridge-label block text-black/45"
                htmlFor="journal-entry"
              >
                What feels true now?
              </label>
              <textarea
                className="min-h-44 w-full rounded-[8px] border border-black/10 bg-white/90 px-4 py-3 text-[#010120] outline-none focus:border-[#bdbbff] focus:ring-4 focus:ring-[#ef2cc1]/10"
                id="journal-entry"
                onChange={(event) => setText(event.target.value)}
                placeholder="Write one pressure point, one need, or one next step."
                value={text}
              />
            </div>

            <button
              className="mindbridge-button-dark px-5 py-3 text-sm font-medium"
              onClick={saveEntry}
              type="button"
            >
              Save note
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="mindbridge-section-title text-[#010120]">Recent notes</h2>
              <p className="mindbridge-label text-black/45">{entries.length} saved</p>
            </div>

            {!ready ? (
              <div className="h-32 rounded-[8px] bg-[#f3f2ff]" />
            ) : entries.length === 0 ? (
              <div className="mindbridge-card border-dashed p-6 text-black/68">
                Start with one honest line. A short note is enough.
              </div>
            ) : (
              <div className="space-y-3">
                {entries.map((entry) => (
                  <article className="mindbridge-card p-5" key={entry.id}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-base font-medium tracking-[-0.02em] text-[#010120]">
                          {entry.emoji} {entry.label}
                        </p>
                        <p className="mt-1 text-sm text-black/45">
                          {formatDate(entry.createdAt)}
                        </p>
                      </div>
                      <button
                        className="rounded-[4px] px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50"
                        onClick={() => deleteEntry(entry.id)}
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                    <p className="mt-4 whitespace-pre-wrap text-black/68">
                      {entry.text}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
