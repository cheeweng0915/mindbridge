import Link from "next/link";

import { resources } from "@/lib/mindbridge/constants";
import type { ResourceGroup, ResourceItem } from "@/lib/mindbridge/types";

const groups: ResourceGroup[] = [
  "Urgent support",
  "Campus support",
  "Self-care",
];

function ResourceAction({ item }: { item: ResourceItem }) {
  const className =
    "mindbridge-button-dark px-3 py-2 text-sm font-medium";

  if (item.external) {
    return (
      <a className={className} href={item.href} rel="noreferrer" target="_blank">
        {item.actionLabel}
      </a>
    );
  }

  if (item.href.startsWith("tel:")) {
    return (
      <a className={className} href={item.href}>
        {item.actionLabel}
      </a>
    );
  }

  return (
    <Link className={className} href={item.href}>
      {item.actionLabel}
    </Link>
  );
}

export default function ResourcesPage() {
  return (
    <div className="relative isolate overflow-hidden py-12 sm:py-16">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(189,187,255,0.22),transparent_22%),radial-gradient(circle_at_80%_20%,rgba(239,44,193,0.10),transparent_18%),radial-gradient(circle_at_bottom_right,rgba(252,76,2,0.08),transparent_18%)]"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="mindbridge-label text-black/55">Support resources</p>
            <h1 className="mindbridge-hero-title mt-4 max-w-3xl text-[#010120]">
              Find the right help fast.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-[1.35] text-black/68">
              Use urgent support first if you feel unsafe. If the moment is
              manageable, choose campus support or a self-care step.
            </p>
          </div>

          <div className="mindbridge-dark-panel grid gap-3 p-5 text-white sm:grid-cols-2 sm:p-6">
            <a className="mindbridge-button-glass px-4 py-3 text-sm font-medium" href="tel:999">
              Emergency 999
            </a>
            <a className="mindbridge-button-glass px-4 py-3 text-sm font-medium" href="tel:15555">
              Talian HEAL
            </a>
            <a
              className="mindbridge-button-glass px-4 py-3 text-sm font-medium sm:col-span-2"
              href="tel:+60376272929"
            >
              Befrienders KL
            </a>
          </div>
        </section>

        <div className="mindbridge-soft-panel mt-8 p-5 sm:mt-10 sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div className="space-y-3">
              <p className="mindbridge-label text-black/45">Immediate action</p>
              <p className="mindbridge-card-title max-w-md text-[#010120]">
                Scan, call, or move to one calm next step.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[8px] border border-black/10 bg-white/80 p-4">
                <p className="mindbridge-label text-black/45">Urgent</p>
                <p className="mt-3 text-xl font-medium tracking-[-0.04em] text-[#010120]">
                  Call now
                </p>
              </div>
              <div className="rounded-[8px] border border-black/10 bg-white/80 p-4">
                <p className="mindbridge-label text-black/45">Campus</p>
                <p className="mt-3 text-xl font-medium tracking-[-0.04em] text-[#010120]">
                  Talk it through
                </p>
              </div>
              <div className="rounded-[8px] border border-black/10 bg-white/80 p-4">
                <p className="mindbridge-label text-black/45">Self-care</p>
                <p className="mt-3 text-xl font-medium tracking-[-0.04em] text-[#010120]">
                  Slow down
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-10 space-y-12">
          {groups.map((group) => (
            <section className="grid gap-4 lg:grid-cols-[220px_1fr]" key={group}>
              <div>
                <p className="mindbridge-label text-black/50">{group}</p>
                <p className="mt-3 text-sm leading-[1.35] text-black/60">
                  {group === "Urgent support"
                    ? "Use these first if safety is the priority."
                    : group === "Campus support"
                      ? "People who can help you plan the next step."
                      : "Short tools for moments that feel manageable."}
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {resources
                  .filter((item) => item.group === group)
                  .map((item) => (
                    <article
                      className={`mindbridge-card p-5 ${
                        item.urgent ? "border-rose-200 bg-[#fff8fa]" : "bg-white/90"
                      }`}
                      key={item.title}
                    >
                      <p className="mindbridge-card-title text-[#010120]">{item.title}</p>
                      <p className="mt-4 text-sm leading-[1.35] text-black/68">
                        {item.description}
                      </p>
                      {item.note ? (
                        <p className="mindbridge-label mt-4 text-black/42">{item.note}</p>
                      ) : null}
                      <div className="mt-4">
                        <ResourceAction item={item} />
                      </div>
                    </article>
                  ))}
              </div>
            </section>
          ))}
        </section>
      </div>
    </div>
  );
}
