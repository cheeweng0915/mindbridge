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
    <div className="bg-white">
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(189,187,255,0.22),transparent_22%),radial-gradient(circle_at_80%_20%,rgba(239,44,193,0.10),transparent_18%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="mindbridge-label text-black/55">Support resources</p>
              <h1 className="mt-4 max-w-3xl text-4xl font-medium leading-[1.04] text-[#010120] sm:mt-5 sm:text-5xl">
                Find the right help fast.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-[1.35] text-black/68">
                Use urgent support first if you feel unsafe. If the moment is
                manageable, choose campus support or a self-care step.
              </p>
            </div>

            <div className="mindbridge-dark-card grid gap-3 p-5 text-white sm:grid-cols-2">
              <a
                className="mindbridge-button-glass px-4 py-3 text-sm font-medium"
                href="tel:999"
              >
                Emergency 999
              </a>
              <a
                className="mindbridge-button-glass px-4 py-3 text-sm font-medium"
                href="tel:15555"
              >
                Talian HEAL
              </a>
              <a
                className="mindbridge-button-glass px-4 py-3 text-sm font-medium sm:col-span-2"
                href="tel:+60376272929"
              >
                Befrienders KL
              </a>
            </div>
          </div>

          <div
            className="mindbridge-card mt-8 min-h-[220px] bg-cover bg-center sm:mt-10 sm:min-h-[260px]"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(1,1,32,0.76), rgba(1,1,32,0.20)), url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80)",
            }}
          >
            <div className="flex min-h-[220px] max-w-xl flex-col justify-end p-5 text-white sm:min-h-[260px] sm:p-6">
              <p className="mindbridge-label text-white/70">Immediate action</p>
              <p className="mt-3 text-2xl font-medium leading-[1.08]">
                Scan, call, or move to one calm next step.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="space-y-12">
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
                      className={`rounded-[8px] border p-5 shadow-[0_4px_10px_rgba(1,1,32,0.1)] ${
                        item.urgent
                          ? "border-rose-200 bg-[#fff8fa]"
                          : "border-black/10 bg-white"
                      }`}
                      key={item.title}
                    >
                      <p className="text-xl font-medium leading-[1.12] text-[#010120]">
                        {item.title}
                      </p>
                      <p className="mt-4 text-sm leading-[1.35] text-black/68">
                        {item.description}
                      </p>
                      {item.note ? (
                        <p className="mindbridge-label mt-4 text-black/42">
                          {item.note}
                        </p>
                      ) : null}
                      <div className="mt-4">
                        <ResourceAction item={item} />
                      </div>
                    </article>
                  ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
