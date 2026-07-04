"use client";

import { useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

const LINKS = [
  ["01", "#stay", "Stay"],
  ["02", "#dine", "Dine"],
  ["03", "#experience", "Experience"],
  ["04", "#find", "Find us"],
];

const emptySubscribe = () => () => {};

export function NavMenu() {
  const [open, setOpen] = useState(false);
  // SSR-safe mount check: server snapshot is false, client snapshot is true,
  // so the portal only renders after hydration completes.
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  return (
    <>
      <button
        type="button"
        data-navlink="true"
        data-hover="true"
        onClick={() => setOpen(true)}
        className="[cursor:none] flex items-center gap-3 bg-transparent border-none text-sm tracking-[0.22em] uppercase text-[rgba(245,241,233,0.85)] transition-colors duration-500 translate-y-[3px]"
      >
        <span className="flex flex-col gap-[5px] w-5">
          <span className="block h-px w-full bg-current" />
          <span className="block h-px w-full bg-current" />
        </span>
        Menu
      </button>

      {mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-95 bg-ink transition-[opacity,visibility] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: open ? 1 : 0,
              visibility: open ? "visible" : "hidden",
              pointerEvents: open ? "auto" : "none",
            }}
          >
            {/* grain overlay to match global texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.055]"
              style={{
                backgroundImage:
                  "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"300\" height=\"300\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"2\"/></filter><rect width=\"300\" height=\"300\" filter=\"url(%23n)\"/></svg>')",
              }}
            />

            <div className="relative h-[76px] sm:h-[86px] lg:h-[97px] flex items-center justify-between px-5 sm:px-8 lg:px-12 border-b border-[rgba(245,241,233,0.14)]">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 cursor-pointer bg-transparent border-none text-[13px] sm:text-sm tracking-[0.22em] uppercase text-[rgba(245,241,233,0.85)] transition-colors hover:text-gold"
              >
                <span className="relative flex flex-col gap-[5px] w-5">
                  <span className="block h-px w-full bg-current rotate-[20deg] origin-center translate-y-[3px]" />
                  <span className="block h-px w-full bg-current -rotate-[20deg] origin-center -translate-y-[3px]" />
                </span>
                Close
              </button>
              <span className="font-serif text-lg sm:text-xl lg:text-2xl text-ivory">
                Halyard<span className="text-gold">.</span>
              </span>
            </div>

            <nav className="relative px-5 sm:px-8 lg:px-12 pt-8 sm:pt-10 lg:pt-14 h-[calc(100%-76px)] sm:h-[calc(100%-86px)] lg:h-[calc(100%-97px)] overflow-y-auto">
              <div className="max-w-[720px]">
                {LINKS.map(([idx, href, label], i) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="group no-underline flex items-baseline gap-3 sm:gap-7 py-3.5 sm:py-6 border-b border-[rgba(245,241,233,0.14)]"
                  >
                    <span
                      className="font-serif text-sm text-gold transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{
                        transform: open ? "translateY(0)" : "translateY(20px)",
                        opacity: open ? 1 : 0,
                        transitionDelay: open ? `${i * 0.09 + 0.1}s` : "0s",
                        transitionProperty: "transform, opacity",
                      }}
                    >
                      {idx}
                    </span>
                    <span className="overflow-hidden flex-1">
                      <span
                        className="block font-serif font-normal text-[clamp(28px,10vw,72px)] leading-[1.05] text-ivory transition-transform duration-[1.7s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-gold sm:group-hover:translate-x-3"
                        style={{
                          transform: open ? "translateY(0)" : "translateY(110%)",
                          transitionDelay: open ? `${i * 0.09 + 0.15}s` : "0s",
                        }}
                      >
                        {label}
                      </span>
                    </span>
                    <span
                      className="hidden sm:inline text-gold text-xl transition-all duration-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                      aria-hidden="true"
                    >
                      &rarr;
                    </span>
                  </a>
                ))}
              </div>

              <div className="mt-7 sm:mt-12 overflow-hidden">
                <Link
                  href="/booking"
                  data-hover="true"
                  className="inline-flex items-center justify-center w-full sm:w-auto no-underline text-xs tracking-[0.24em] uppercase text-ink bg-gold px-9 py-4 sm:py-4.5 rounded-full font-medium transition-transform duration-[1.7s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transform: open ? "translateY(0)" : "translateY(110%)",
                    transitionDelay: open ? `${LINKS.length * 0.09 + 0.2}s` : "0s",
                  }}
                >
                  Reserve
                </Link>
              </div>

              <div
                className="mt-8 flex flex-col sm:flex-row sm:absolute sm:left-12 sm:right-12 sm:bottom-10 sm:mt-0 gap-1.5 sm:gap-0 sm:justify-between text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.24em] uppercase text-[rgba(245,241,233,0.4)] transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  opacity: open ? 1 : 0,
                  transitionDelay: open ? "0.6s" : "0s",
                }}
              >
                <span>Mendocino, California</span>
                <span>(707) 555 0142</span>
              </div>
            </nav>
          </div>,
          document.body
        )}
    </>
  );
}
