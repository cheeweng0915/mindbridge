"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/quiz", label: "Quiz" },
  { href: "/resources", label: "Resources" },
  { href: "/journal", label: "Journal" },
  { href: "/breathing", label: "Breathing" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3 py-3 sm:gap-4 sm:py-4">
          <Link className="flex min-w-0 items-center gap-3" href="/">
            <Image
              src="/images/logo/logo-icon.svg"
              alt="MindBridge logo"
              width={32}
              height={32}
              priority
            />
            <span className="min-w-0">
              <span className="mindbridge-label hidden text-black/50 sm:block">
                Student support
              </span>
              <span className="block text-xl font-medium leading-none tracking-[-0.04em] text-[#010120] sm:text-2xl">
                MindBridge
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  className={`rounded-[4px] px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-[#010120] text-white shadow-[0_4px_10px_rgba(1,1,32,0.12)]"
                      : "text-black/60 hover:bg-black/[0.04] hover:text-[#010120]"
                  }`}
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              className="mindbridge-button-dark hidden px-4 py-2 text-sm font-medium md:inline-flex"
              href="/quiz"
            >
              Check in
            </Link>
            <button
              aria-expanded={open}
              aria-label="Toggle navigation"
              className="mindbridge-button-outline min-h-10 px-3 py-2 text-sm font-medium md:hidden"
              onClick={() => setOpen((value) => !value)}
              type="button"
            >
              Menu
            </button>
          </div>
      </div>

        {open ? (
          <nav className="grid gap-2 border-t border-black/10 py-4 md:hidden">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  className={`rounded-[4px] px-3 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-[#010120] text-white"
                      : "text-black/70 hover:bg-black/[0.04] hover:text-[#010120]"
                  }`}
                  href={item.href}
                  key={item.href}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              className="mindbridge-button-dark mt-1 px-4 py-3 text-sm font-medium"
              href="/quiz"
              onClick={() => setOpen(false)}
            >
              Check in
            </Link>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
