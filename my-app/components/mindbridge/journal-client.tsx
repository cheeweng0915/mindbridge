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
    <div className="bg-white py-10 sm:py-14">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 sm:gap-8 sm:px-6">
        <section className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="mindbridge-label text-black/55">Reflection journal</p>
            <h1 className="mt-4 max-w-2xl text-4xl font-medium leading-[1.04] text-[#010120] sm:mt-5 sm:text-5xl">
              Write one honest note.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-[1.35] text-black/68">
              Save a mood and a short reflection in this browser. Keep it simple:
              what feels heavy, what helps, and what comes next.
            </p>
          </div>
          <div
            className="mindbridge-card min-h-[200px] bg-cover bg-center sm:min-h-[240px]"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(1,1,32,0.70), rgba(1,1,32,0.18)), url(https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80)",
            }}
          >
            <div className="flex min-h-[200px] flex-col justify-end p-5 text-white sm:min-h-[240px] sm:p-6">
              <p className="mindbridge-label text-white/70">Private writing</p>
              <p className="mt-3 max-w-sm text-2xl font-medium leading-[1.08]">
                Clarity first. Perfect words later.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="mindbridge-card space-y-5 p-5 sm:space-y-6 sm:p-6">
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
                          : "border-black/10 bg-white text-black/70 hover:border-[#bdbbff] hover:bg-[#f7f7ff]"
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
                className="min-h-44 w-full rounded-[8px] border border-black/10 bg-white px-4 py-3 text-[#010120] outline-none focus:border-[#bdbbff] focus:ring-4 focus:ring-[#ef2cc1]/10"
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
              <h2 className="text-3xl font-medium leading-[1.08] text-[#010120]">
                Recent notes
              </h2>
              <p className="mindbridge-label text-black/45">{entries.length} saved</p>
            </div>

            {!ready ? (
              <div className="h-32 rounded-[8px] bg-[#f3f2ff]" />
            ) : entries.length === 0 ? (
              <div className="rounded-[8px] border border-dashed border-black/10 bg-white p-6 text-black/68">
                Start with one honest line. A short note is enough.
              </div>
            ) : (
              <div className="space-y-3">
                {entries.map((entry) => (
                  <article className="mindbridge-card p-5" key={entry.id}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-base font-medium text-[#010120]">
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
