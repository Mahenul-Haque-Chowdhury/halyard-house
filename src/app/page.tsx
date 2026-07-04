"use client";

import Link from "next/link";
import { useHomeInteractions } from "@/components/home/useHomeInteractions";
import { NavMenu } from "@/components/home/NavMenu";
import { ROOMS, EXPERIENCES, QUOTES } from "@/lib/data";

const marqueeQuotes = [...QUOTES, ...QUOTES];

export default function Home() {
  useHomeInteractions();

  return (
    <div
      data-root="true"
      className="relative bg-ivory text-ink font-sans font-normal overflow-clip [cursor:none] max-md:!cursor-auto"
    >
      {/* GRAIN OVERLAY */}
      <div
        className="fixed -inset-1/2 w-[200%] h-[200%] z-90 pointer-events-none opacity-[0.055]"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"300\" height=\"300\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"2\"/></filter><rect width=\"300\" height=\"300\" filter=\"url(%23n)\"/></svg>')",
        }}
      />

      {/* CUSTOM CURSOR */}
      <div
        data-cursor-dot="true"
        className="fixed top-0 left-0 w-1.5 h-1.5 -m-[3px] rounded-full bg-gold z-100 pointer-events-none opacity-0"
      />
      <div
        data-cursor-ring="true"
        className="fixed top-0 left-0 w-10 h-10 -m-5 rounded-full border border-[rgba(196,166,114,0.85)] z-100 pointer-events-none flex items-center justify-center opacity-0 transition-[width,height,margin,background,border-color] duration-[0.35s] ease-[cubic-bezier(0.16,1,0.3,1)]"
      >
        <span
          data-cursor-label="true"
          className="text-[11px] tracking-[0.18em] uppercase text-ink opacity-0 transition-opacity duration-[0.25s] font-medium"
        />
      </div>

      {/* PRELOADER */}
      <div
        data-pre="true"
        className="fixed inset-0 z-80 bg-ink flex items-center justify-center transition-transform duration-[1.6s] ease-[cubic-bezier(0.76,0,0.24,1)]"
      >
        <div className="text-center">
          <div className="overflow-hidden">
            <div
              data-pre-word="true"
              className="font-serif text-[64px] text-ivory tracking-[0.02em] translate-y-[110%] transition-transform duration-[1.3s] ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              Halyard<span className="text-gold">.</span>
            </div>
          </div>
          <div className="overflow-hidden mt-3.5">
            <div
              data-pre-sub="true"
              className="text-xs tracking-[0.34em] uppercase text-[rgba(245,241,233,0.55)] translate-y-[110%] transition-transform duration-[1.3s] ease-[cubic-bezier(0.16,1,0.3,1)] [transition-delay:0.2s]"
            >
              House &nbsp;·&nbsp; Mendocino, California
            </div>
          </div>
        </div>
        <div
          data-pre-count="true"
          className="absolute right-12 bottom-10 font-serif text-[88px] font-normal text-[rgba(245,241,233,0.28)] [font-variant-numeric:tabular-nums]"
        >
          0
        </div>
        <div className="absolute left-12 bottom-[52px] h-px w-[180px] bg-[rgba(245,241,233,0.18)]">
          <div data-pre-bar="true" className="h-full w-0 bg-gold" />
        </div>
      </div>

      {/* NAV */}
      <nav
        data-nav="true"
        className="fixed top-0 left-0 right-0 z-70 h-[97px] flex items-center justify-between px-12 transition-[background,backdrop-filter,padding,border-color] duration-500 border-b border-transparent opacity-0 -translate-y-4"
      >
        <div className="flex items-center gap-7">
          <NavMenu />
          <a href="#top" data-hover="true" className="no-underline flex items-baseline gap-2.5 [cursor:none]">
            <span data-nav-logo="true" className="font-serif text-2xl text-ivory transition-colors duration-500">
              Halyard<span className="text-gold">.</span>
            </span>
            <span
              data-nav-logosub="true"
              className="text-[10px] tracking-[0.3em] uppercase text-[rgba(245,241,233,0.6)] transition-colors duration-500"
            >
              House
            </span>
          </a>
        </div>
        <Link
          href="/booking"
          data-magnetic="true"
          data-base-offset-y="3"
          data-hover="true"
          className="[cursor:none] no-underline inline-block text-xs tracking-[0.22em] uppercase text-ink bg-gold px-7 py-3.5 rounded-full font-medium"
        >
          Reserve
        </Link>
      </nav>

      {/* HERO */}
      <header
        id="top"
        data-screen-label="Hero"
        className="relative h-screen min-h-[640px] overflow-hidden bg-ink"
      >
        <div data-hero-media="true" className="absolute inset-0 opacity-0 transition-opacity duration-[1.4s] ease-in-out">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2400&q=80"
            alt="Hotel pool at dusk"
            className="absolute inset-0 w-full h-full object-cover [filter:brightness(0.72)_saturate(0.85)] [animation:kenburns_26s_ease-out_forwards]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(16,22,29,0.72) 0%, rgba(16,22,29,0.28) 42%, rgba(16,22,29,0.85) 100%)",
            }}
          />
        </div>
        <div className="relative z-2 h-full flex flex-col justify-end px-12 pb-18">
          <div
            data-hero-line="true"
            className="mb-7 opacity-0 translate-y-[24px] transition-[opacity,transform] duration-[1.7s] ease-[cubic-bezier(0.16,1,0.3,1)] [transition-delay:0.15s] text-xs tracking-[0.34em] uppercase text-[rgba(245,241,233,0.92)] flex items-center gap-3.5"
          >
            <span className="inline-block w-9 h-px bg-gold" />
            Mendocino, California &nbsp;·&nbsp; 39.31° N, 123.80° W
          </div>
          <h1 className="m-0 font-serif font-normal text-[clamp(56px,7.4vw,128px)] leading-[1.04] text-ivory tracking-[-0.01em] max-w-[15ch]">
            <span
              data-hero-line="true"
              className="block opacity-0 translate-y-[24px] transition-[opacity,transform] duration-[1.8s] ease-[cubic-bezier(0.16,1,0.3,1)] [transition-delay:0.4s]"
            >
              Rest, at the edge
            </span>
            <span
              data-hero-line="true"
              className="block opacity-0 translate-y-[24px] transition-[opacity,transform] duration-[1.8s] ease-[cubic-bezier(0.16,1,0.3,1)] [transition-delay:0.65s]"
            >
              of the <em className="italic text-gold">Pacific</em>
            </span>
          </h1>
          <div className="flex items-end justify-between mt-11">
            <p
              data-hero-line="true"
              className="m-0 opacity-0 translate-y-[24px] transition-[opacity,transform] duration-[1.7s] ease-[cubic-bezier(0.16,1,0.3,1)] [transition-delay:0.9s] max-w-[44ch] text-[15px] leading-[1.7] font-light text-[rgba(245,241,233,0.95)]"
            >
              A quiet base on the Mendocino coast: five kinds of rest, a table worth staying in for, and the wild
              edge of the Pacific at your door.
            </p>
            <div
              data-hero-line="true"
              className="opacity-0 translate-y-[24px] transition-[transform,opacity] duration-[1.7s] ease-[cubic-bezier(0.16,1,0.3,1)] [transition-delay:1.1s] flex items-center gap-4.5"
            >
              <span className="text-[11px] tracking-[0.28em] uppercase text-[rgba(245,241,233,0.6)]">Scroll</span>
              <span className="inline-block w-px h-14 bg-[rgba(245,241,233,0.25)] overflow-hidden relative">
                <span className="absolute inset-0 bg-gold [animation:scrollcue_2.8s_cubic-bezier(0.76,0,0.24,1)_infinite]" />
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* 01 MANIFESTO */}
      <section data-screen-label="Manifesto" className="relative px-12 pt-40 pb-35 bg-ivory">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16">
          <div>
            <div data-io="fade" className="opacity-0 translate-y-[30px] flex items-baseline gap-4">
              <span className="font-serif text-[15px] text-gold">01</span>
              <span className="text-[11px] tracking-[0.32em] uppercase text-[rgba(16,22,29,0.55)]">The house</span>
            </div>
            <div
              data-io="fade"
              data-hover="true"
              data-cursor="View"
              className="opacity-0 translate-y-[30px] mt-14 relative overflow-hidden aspect-[3/4] max-w-[340px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                data-parallax="0.12"
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
                alt="Mendocino coastline"
                className="absolute -inset-x-0 -inset-y-[8%] w-full h-[116%] object-cover grayscale-[35%]"
              />
            </div>
            <div data-io="fade" className="opacity-0 translate-y-[30px] mt-5 text-[11px] tracking-[0.22em] uppercase text-[rgba(16,22,29,0.45)]">
              Van Damme Beach, 6 min
            </div>
          </div>
          <div className="pt-2">
            <p
              data-words="true"
              className="m-0 font-serif font-normal text-[clamp(32px,3.4vw,54px)] leading-[1.28] text-ink max-w-[24ch]"
            >
              Where the North Coast slows down, so do we. Rooms without noise, a table worth staying in for, and
              Mendocino&apos;s coast, headlands and history within minutes.
            </p>
            <div className="flex gap-20 mt-22 border-t border-[rgba(16,22,29,0.14)] pt-10 flex-wrap">
              <div data-io="fade" className="opacity-0 translate-y-[30px]">
                <div className="font-serif text-[56px] leading-none text-ink">
                  <span data-count="74">0</span>
                </div>
                <div className="mt-3 text-[11px] tracking-[0.26em] uppercase text-[rgba(16,22,29,0.5)]">Rooms &amp; suites</div>
              </div>
              <div data-io="fade" className="opacity-0 translate-y-[30px]">
                <div className="font-serif text-[56px] leading-none text-ink">
                  <span data-count="8.8" data-decimals="1">0</span>
                </div>
                <div className="mt-3 text-[11px] tracking-[0.26em] uppercase text-[rgba(16,22,29,0.5)]">Guest rating / 10</div>
              </div>
              <div data-io="fade" className="opacity-0 translate-y-[30px]">
                <div className="font-serif text-[56px] leading-none text-ink">
                  <span data-count="6">0</span>
                  <span className="text-gold">&prime;</span>
                </div>
                <div className="mt-3 text-[11px] tracking-[0.26em] uppercase text-[rgba(16,22,29,0.5)]">To the beach</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 ROOMS, PINNED HORIZONTAL */}
      <section id="stay" data-screen-label="Rooms" data-hwrap="true" className="relative bg-ink h-[420vh]">
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 left-12 right-12 pt-[110px] flex justify-between items-baseline z-3">
            <div data-io="fade" className="opacity-0 translate-y-[30px] flex items-baseline gap-4">
              <span className="font-serif text-[15px] text-gold">02</span>
              <span className="text-[11px] tracking-[0.32em] uppercase text-[rgba(245,241,233,0.55)]">Stay</span>
            </div>
            <h2 data-io="fade" className="opacity-0 translate-y-[30px] m-0 font-serif font-normal text-[clamp(30px,3vw,48px)] text-ivory">
              Five kinds of rest<span className="text-gold">.</span>
            </h2>
            <div data-io="fade" className="opacity-0 translate-y-[30px] text-[11px] tracking-[0.24em] uppercase text-[rgba(245,241,233,0.45)] hidden lg:block">
              Drag of the coast, keep scrolling
            </div>
          </div>
          <div data-htrack="true" className="flex gap-[4vw] px-12 items-center will-change-transform">
            {ROOMS.map((room) => (
              <div key={room.id} data-hover="true" data-cursor="View" className="flex-none w-[40vw] min-w-[480px]">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <div
                    data-parallax-x="true"
                    role="img"
                    aria-label={room.name}
                    className="absolute -inset-x-[6%] inset-y-0 w-[112%] h-full bg-cover bg-center grayscale-[25%] will-change-transform"
                    style={{ backgroundImage: `url('${room.img}')` }}
                  />
                  <div className="absolute top-5 left-5 font-serif text-[15px] text-[rgba(245,241,233,0.9)] bg-[rgba(16,22,29,0.45)] backdrop-blur-[8px] px-3.5 py-1.5">
                    {room.idx}
                  </div>
                </div>
                <div className="flex justify-between items-baseline mt-6 border-b border-[rgba(245,241,233,0.16)] pb-5">
                  <div>
                    <div className="font-serif text-[28px] text-ivory">{room.name}</div>
                    <div className="mt-2 text-xs tracking-[0.14em] uppercase text-[rgba(245,241,233,0.5)]">{room.spec}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] tracking-[0.2em] uppercase text-[rgba(245,241,233,0.45)]">From</div>
                    <div className="font-serif text-2xl text-gold">${room.rate}</div>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex-none w-[24vw] min-w-[300px] flex items-center justify-center">
              <a
                href="#find"
                data-magnetic="true"
                data-hover="true"
                className="[cursor:none] no-underline w-[180px] h-[180px] rounded-full border border-[rgba(196,166,114,0.6)] flex items-center justify-center text-center text-xs tracking-[0.24em] uppercase text-ivory leading-[1.8]"
              >
                View all
                <br />
                rooms
              </a>
            </div>
          </div>
          <div className="absolute bottom-14 left-12 right-12 h-px bg-[rgba(245,241,233,0.14)]">
            <div data-hprogress="true" className="h-full w-0 bg-gold" />
          </div>
        </div>
      </section>

      {/* 03 DINING */}
      <section id="dine" data-screen-label="Dining" className="relative bg-ivory px-12 py-40">
        <div className="max-w-[1440px] mx-auto">
          <div data-io="fade" className="opacity-0 translate-y-[30px] flex items-baseline gap-4 mb-16">
            <span className="font-serif text-[15px] text-gold">03</span>
            <span className="text-[11px] tracking-[0.32em] uppercase text-[rgba(16,22,29,0.55)]">Dine</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-18 items-center">
            <div
              data-io="fade"
              data-hover="true"
              data-cursor="Menu"
              className="opacity-0 translate-y-[30px] relative overflow-hidden aspect-[16/11]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                data-parallax="0.14"
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=80"
                alt="Ember and Tide dining room"
                className="absolute -inset-x-0 -inset-y-[8%] w-full h-[116%] object-cover"
              />
              <div className="absolute left-7 bottom-6 font-serif text-[clamp(72px,8vw,140px)] leading-none text-[rgba(245,241,233,0.92)] mix-blend-screen">
                E&amp;T
              </div>
            </div>
            <div>
              <h2
                data-io="line"
                className="opacity-0 translate-y-[30px] m-0 font-serif font-normal text-[clamp(36px,3.6vw,60px)] leading-[1.1] text-ink"
              >
                Ember
                <br />
                &amp; Tide<span className="text-gold">.</span>
              </h2>
              <p
                data-io="fade"
                className="opacity-0 translate-y-[30px] mt-8 text-[15px] leading-[1.8] font-light text-[rgba(16,22,29,0.7)] max-w-[42ch]"
              >
                Char-grilled Pacific catch, wood-fired plates, and a bar that keeps its own hours of quiet. Warm
                rooms, open flame, no hurry.
              </p>
              <div
                data-io="fade"
                className="opacity-0 translate-y-[30px] mt-10 flex flex-col border-t border-[rgba(16,22,29,0.14)]"
              >
                {[
                  ["Breakfast", "6.30 to 10.00"],
                  ["Dinner", "17.30 to late"],
                  ["Bar", "All day"],
                ].map(([label, time]) => (
                  <div
                    key={label}
                    className="flex justify-between py-4.5 border-b border-[rgba(16,22,29,0.14)] text-[13px] tracking-[0.08em]"
                  >
                    <span className="uppercase tracking-[0.2em] text-[rgba(16,22,29,0.5)] text-[11px]">{label}</span>
                    <span>{time}</span>
                  </div>
                ))}
              </div>
              <a
                href="#find"
                data-io="fade"
                data-magnetic="true"
                data-hover="true"
                data-underline="true"
                className="opacity-0 translate-y-[30px] [cursor:none] no-underline inline-flex items-center gap-3.5 mt-11 text-xs tracking-[0.24em] uppercase text-ink font-medium"
              >
                Reserve a table <span className="text-gold">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 04 EXPERIENCES, STICKY STACK */}
      <div id="experience" data-screen-label="Experiences" className="relative">
        {EXPERIENCES.map((exp) => (
          <section key={exp.idx} className="sticky top-0 h-screen overflow-hidden bg-ink">
            <div
              role="img"
              aria-label={exp.name}
              className="absolute inset-0 bg-cover bg-center [filter:brightness(0.8)_saturate(0.9)]"
              style={{ backgroundImage: `url('${exp.img}')` }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(16,22,29,0.55) 0%, rgba(16,22,29,0.18) 45%, rgba(16,22,29,0.85) 100%)",
              }}
            />
            <div className="absolute top-0 left-12 right-12 pt-[120px] flex justify-between items-baseline">
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-[15px] text-gold">04</span>
                <span className="text-[11px] tracking-[0.32em] uppercase text-[rgba(245,241,233,0.7)]">Experience Mendocino</span>
              </div>
              <span className="font-serif text-[15px] text-[rgba(245,241,233,0.7)]">{exp.idx} / 04</span>
            </div>
            <div className="absolute left-12 right-12 bottom-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
              <div>
                <div className="text-[11px] tracking-[0.28em] uppercase text-[rgba(245,241,233,0.65)] mb-4">{exp.tag}</div>
                <h3 className="m-0 font-serif font-normal text-[clamp(44px,4.6vw,84px)] leading-[1.05] text-ivory max-w-[14ch]">
                  {exp.name}
                </h3>
              </div>
              <p className="m-0 max-w-[36ch] text-sm leading-[1.75] font-light text-[rgba(245,241,233,0.95)] md:text-right">
                {exp.copy}
              </p>
            </div>
          </section>
        ))}
      </div>

      {/* 05 GUESTS, MARQUEE */}
      <section data-screen-label="Reviews" className="bg-ivory pt-[150px] pb-35 overflow-hidden">
        <div className="px-12 max-w-[1440px] mx-auto mb-18">
          <div data-io="fade" className="opacity-0 translate-y-[30px] flex items-baseline gap-4">
            <span className="font-serif text-[15px] text-gold">05</span>
            <span className="text-[11px] tracking-[0.32em] uppercase text-[rgba(16,22,29,0.55)]">Guest book</span>
          </div>
        </div>
        <div data-hover="true" data-marquee="true" className="flex w-max [animation:marquee_74s_linear_infinite]">
          {marqueeQuotes.map((q, i) => (
            <div key={i} className="flex-none w-[560px] px-14 border-l border-[rgba(16,22,29,0.14)]">
              <div className="font-serif text-[30px] text-gold leading-none">&ldquo;</div>
              <p className="mt-2.5 font-serif text-[22px] leading-[1.5] text-ink">{q.text}</p>
              <div className="mt-5.5 text-[11px] tracking-[0.24em] uppercase text-[rgba(16,22,29,0.5)]">{q.who}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 06 FIND US */}
      <section id="find" data-screen-label="Location" className="relative bg-ink text-ivory px-12 pt-38">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-18 pb-32">
            <div>
              <div data-io="fade" className="opacity-0 translate-y-[30px] flex items-baseline gap-4 mb-14">
                <span className="font-serif text-[15px] text-gold">06</span>
                <span className="text-[11px] tracking-[0.32em] uppercase text-[rgba(245,241,233,0.55)]">Find us</span>
              </div>
              <h2 data-io="line" className="opacity-0 translate-y-[30px] m-0 font-serif font-normal text-[clamp(40px,4vw,68px)] leading-[1.1]">
                45050 Main Street<span className="text-gold">.</span>
              </h2>
              <p
                data-io="fade"
                className="opacity-0 translate-y-[30px] mt-7 text-[15px] leading-[1.8] font-light text-[rgba(245,241,233,0.7)] max-w-[40ch]"
              >
                Ten minutes from the village centre, six from Van Damme Beach. Complimentary parking on site, tour
                desk in the lobby.
              </p>
              <div data-io="fade" className="opacity-0 translate-y-[30px] mt-14 flex flex-col max-w-[420px]">
                <a
                  href="tel:+17075550142"
                  data-hover="true"
                  data-underline="true"
                  className="[cursor:none] no-underline text-ivory flex justify-between py-5 border-t border-[rgba(245,241,233,0.16)] text-sm tracking-[0.06em]"
                >
                  <span className="text-[11px] tracking-[0.24em] uppercase text-[rgba(245,241,233,0.5)]">Reservations</span>
                  <span>(707) 555 0142</span>
                </a>
                <a
                  href="mailto:reception@halyardhouse.com"
                  data-hover="true"
                  data-underline="true"
                  className="[cursor:none] no-underline text-ivory flex justify-between py-5 border-t border-b border-[rgba(245,241,233,0.16)] text-sm tracking-[0.06em]"
                >
                  <span className="text-[11px] tracking-[0.24em] uppercase text-[rgba(245,241,233,0.5)]">Email</span>
                  <span>reception@halyardhouse.com</span>
                </a>
              </div>
              <Link
                href="/booking"
                data-io="fade"
                data-magnetic="true"
                data-hover="true"
                className="opacity-0 translate-y-[30px] [cursor:none] no-underline inline-block mt-14 text-xs tracking-[0.24em] uppercase text-ink bg-gold px-11 py-5 rounded-full font-medium"
              >
                Book your stay
              </Link>
            </div>
            <div
              data-io="fade"
              data-hover="true"
              data-cursor="Map"
              className="opacity-0 translate-y-[30px] relative overflow-hidden min-h-[520px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                data-parallax="0.1"
                src="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80"
                alt="Mendocino coast aerial"
                className="absolute -inset-x-0 -inset-y-[8%] w-full h-[116%] object-cover grayscale-[45%] brightness-[0.85]"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[150px] h-[150px] [animation:spin-slow_36s_linear_infinite]">
                  <svg viewBox="0 0 150 150" className="absolute inset-0 w-full h-full">
                    <defs>
                      <path id="circ" d="M 75,75 m -58,0 a 58,58 0 1,1 116,0 a 58,58 0 1,1 -116,0" />
                    </defs>
                    <text className="text-[11.5px] tracking-[0.32em] uppercase fill-ivory font-sans">
                      <textPath href="#circ">39.31° N · 123.80° W · Mendocino CA · </textPath>
                    </text>
                  </svg>
                  <span className="absolute top-1/2 left-1/2 w-2 h-2 -m-1 rounded-full bg-gold" />
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <footer className="border-t border-[rgba(245,241,233,0.14)] pt-18">
            <div className="flex flex-col md:flex-row justify-between gap-12 pb-22">
              <div className="max-w-[260px]">
                <div className="font-serif text-[22px]">
                  Halyard<span className="text-gold">.</span>
                </div>
                <p className="mt-4 text-[13px] leading-[1.7] font-light text-[rgba(245,241,233,0.55)]">
                  Halyard House
                  <br />
                  45050 Main Street
                  <br />
                  Mendocino, California
                </p>
              </div>
              <div className="flex gap-16 md:gap-24 flex-wrap">
                <div className="flex flex-col gap-3.5">
                  <span className="text-[11px] tracking-[0.26em] uppercase text-[rgba(245,241,233,0.4)] mb-1.5">Hotel</span>
                  <a href="#stay" data-hover="true" data-underline="true" className="[cursor:none] no-underline text-[rgba(245,241,233,0.8)] text-[13px]">Rooms &amp; suites</a>
                  <a href="#dine" data-hover="true" data-underline="true" className="[cursor:none] no-underline text-[rgba(245,241,233,0.8)] text-[13px]">Ember &amp; Tide</a>
                  <a href="#experience" data-hover="true" data-underline="true" className="[cursor:none] no-underline text-[rgba(245,241,233,0.8)] text-[13px]">Experiences</a>
                </div>
                <div className="flex flex-col gap-3.5">
                  <span className="text-[11px] tracking-[0.26em] uppercase text-[rgba(245,241,233,0.4)] mb-1.5">Guests</span>
                  <a href="#find" data-hover="true" data-underline="true" className="[cursor:none] no-underline text-[rgba(245,241,233,0.8)] text-[13px]">Reservations</a>
                  <a href="#find" data-hover="true" data-underline="true" className="[cursor:none] no-underline text-[rgba(245,241,233,0.8)] text-[13px]">Gift vouchers</a>
                  <a href="#find" data-hover="true" data-underline="true" className="[cursor:none] no-underline text-[rgba(245,241,233,0.8)] text-[13px]">Contact</a>
                </div>
                <div className="flex flex-col gap-3.5">
                  <span className="text-[11px] tracking-[0.26em] uppercase text-[rgba(245,241,233,0.4)] mb-1.5">Follow</span>
                  <a href="#top" data-hover="true" data-underline="true" className="[cursor:none] no-underline text-[rgba(245,241,233,0.8)] text-[13px]">Instagram</a>
                  <a href="#top" data-hover="true" data-underline="true" className="[cursor:none] no-underline text-[rgba(245,241,233,0.8)] text-[13px]">Facebook</a>
                </div>
              </div>
            </div>
            <div className="leading-[0.78] text-center">
              <div
                data-io="line"
                className="opacity-0 translate-y-[30px] font-serif text-[clamp(120px,17.5vw,330px)] text-[rgba(245,241,233,0.96)] tracking-[0.01em] select-none"
              >
                Halyard
              </div>
            </div>
            <div className="flex justify-between py-7 pb-8 border-t border-[rgba(245,241,233,0.12)] -mt-1.5 text-[11px] tracking-[0.18em] uppercase text-[rgba(245,241,233,0.4)]">
              <span>© 2026 Halyard House</span>
              <span>Privacy · Careers</span>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}
