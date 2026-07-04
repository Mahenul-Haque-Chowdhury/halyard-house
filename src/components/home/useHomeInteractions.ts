"use client";

import { useEffect } from "react";

export function useHomeInteractions() {
  useEffect(() => {
    const cleanup: Array<() => void> = [];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const on = (
      target: EventTarget,
      ev: string,
      fn: EventListenerOrEventListenerObject,
      opts?: boolean | AddEventListenerOptions
    ) => {
      target.addEventListener(ev, fn, opts);
      cleanup.push(() => target.removeEventListener(ev, fn, opts));
    };

    const qa = (sel: string) => Array.from(document.querySelectorAll<HTMLElement>(sel));
    const q = (sel: string) => document.querySelector<HTMLElement>(sel);

    // ---------- PRELOADER ----------
    function initPreloader() {
      const pre = q("[data-pre]");
      if (!pre) return;
      const finish = () => {
        pre.style.transform = "translateY(-100%)";
        document.documentElement.style.overflow = "";
        setTimeout(() => {
          pre.style.display = "none";
        }, 1200);
        revealHero(false);
      };
      if (reduced) {
        pre.style.display = "none";
        revealHero(true);
        return;
      }
      document.documentElement.style.overflow = "hidden";
      window.scrollTo(0, 0);
      const word = q("[data-pre-word]");
      const sub = q("[data-pre-sub]");
      const count = q("[data-pre-count]");
      const bar = q("[data-pre-bar]");
      setTimeout(() => {
        if (word) word.style.transform = "translateY(0)";
        if (sub) sub.style.transform = "translateY(0)";
      }, 150);
      let n = 0;
      const t0 = performance.now();
      const dur = 2600;
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        n = Math.round(eased * 100);
        if (count) count.textContent = String(n);
        if (bar) bar.style.width = n + "%";
        if (p < 1) requestAnimationFrame(tick);
        else setTimeout(finish, 500);
      };
      requestAnimationFrame(tick);
    }

    function revealHero(instant: boolean) {
      const media = q("[data-hero-media]");
      if (media) media.style.opacity = "1";
      qa("[data-hero-line]").forEach((el) => {
        if (instant) el.style.transition = "none";
        el.style.transform = "translateY(0)";
        el.style.opacity = "1";
      });
      const nav = q("[data-nav]");
      if (nav) {
        nav.style.transition =
          "background 0.5s, backdrop-filter 0.5s, border-color 0.5s, opacity 1s ease 0.5s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.5s";
        nav.style.opacity = "1";
        nav.style.transform = "translateY(0)";
      }
    }

    // ---------- NAV ----------
    function initNav() {
      const nav = q("[data-nav]");
      if (!nav) return;
      const logo = q("[data-nav-logo]");
      const logosub = q("[data-nav-logosub]");
      const links = qa("[data-navlink]");
      const onScroll = () => {
        let onLight = false;
        qa(
          "[data-screen-label='Manifesto'], [data-screen-label='Dining'], [data-screen-label='Reviews']"
        ).forEach((s) => {
          const r = s.getBoundingClientRect();
          if (r.top < 60 && r.bottom > 60) onLight = true;
        });
        nav.style.background =
          window.scrollY > 40 ? (onLight ? "rgba(245,241,233,0.75)" : "rgba(16,22,29,0.55)") : "transparent";
        nav.style.backdropFilter = window.scrollY > 40 ? "blur(14px)" : "none";
        nav.style.borderColor =
          window.scrollY > 40 ? (onLight ? "rgba(16,22,29,0.1)" : "rgba(245,241,233,0.1)") : "transparent";
        const fg = onLight ? "#10161D" : "#F5F1E9";
        const fgDim = onLight ? "rgba(16,22,29,0.75)" : "rgba(245,241,233,0.85)";
        if (logo) logo.style.color = fg;
        if (logosub) logosub.style.color = onLight ? "rgba(16,22,29,0.55)" : "rgba(245,241,233,0.6)";
        links.forEach((a) => {
          a.style.color = fgDim;
        });
      };
      on(window, "scroll", onScroll, { passive: true });
      onScroll();
    }

    // ---------- CURSOR ----------
    function initCursor() {
      if (window.matchMedia("(pointer: coarse)").matches) return;
      const dot = q("[data-cursor-dot]");
      const ring = q("[data-cursor-ring]");
      const label = q("[data-cursor-label]");
      if (!dot || !ring) return;
      let mx = -100,
        my = -100,
        rx = -100,
        ry = -100,
        visible = false,
        running = true;
      const onMove = (e: MouseEvent) => {
        mx = e.clientX;
        my = e.clientY;
        if (!visible) {
          visible = true;
          dot.style.opacity = "1";
          ring.style.opacity = "1";
        }
      };
      on(window, "mousemove", onMove as EventListener, { passive: true });
      const loop = () => {
        if (!running) return;
        rx += (mx - rx) * 0.09;
        ry += (my - ry) * 0.09;
        dot.style.transform = `translate(${mx}px, ${my}px)`;
        ring.style.transform = `translate(${rx}px, ${ry}px)`;
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
      cleanup.push(() => {
        running = false;
      });
      const setHover = (mode: "label" | "link" | "none", text?: string) => {
        if (mode === "label") {
          ring.style.width = "88px";
          ring.style.height = "88px";
          ring.style.margin = "-44px 0 0 -44px";
          ring.style.background = "rgba(196,166,114,0.92)";
          ring.style.borderColor = "transparent";
          if (label) {
            label.textContent = text || "";
            label.style.opacity = "1";
          }
          dot.style.opacity = "0";
        } else if (mode === "link") {
          ring.style.width = "56px";
          ring.style.height = "56px";
          ring.style.margin = "-28px 0 0 -28px";
          ring.style.background = "transparent";
          ring.style.borderColor = "rgba(196,166,114,0.85)";
          if (label) label.style.opacity = "0";
          dot.style.opacity = "1";
        } else {
          ring.style.width = "40px";
          ring.style.height = "40px";
          ring.style.margin = "-20px 0 0 -20px";
          ring.style.background = "transparent";
          ring.style.borderColor = "rgba(196,166,114,0.85)";
          if (label) label.style.opacity = "0";
          dot.style.opacity = "1";
        }
      };
      qa("[data-hover]").forEach((el) => {
        const cursorText = el.getAttribute("data-cursor");
        on(el, "mouseenter", () => setHover(cursorText ? "label" : "link", cursorText || ""));
        on(el, "mouseleave", () => setHover("none"));
      });
    }

    // ---------- MAGNETIC ----------
    function initMagnetic() {
      if (reduced) return;
      qa("[data-magnetic]").forEach((el) => {
        const baseY = parseFloat(el.getAttribute("data-base-offset-y") || "0");
        el.style.transition = "transform 0.65s cubic-bezier(0.16,1,0.3,1)";
        el.style.transform = `translate(0px, ${baseY}px)`;
        on(el, "mousemove", ((e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2 - baseY);
          el.style.transform = `translate(${dx * 0.28}px, ${baseY + dy * 0.28}px)`;
        }) as EventListener);
        on(el, "mouseleave", () => {
          el.style.transform = `translate(0px, ${baseY}px)`;
        });
      });
    }

    // ---------- REVEALS ----------
    function initReveals() {
      qa("[data-words]").forEach((el) => {
        const words = (el.textContent || "").split(/\s+/).filter(Boolean);
        el.textContent = "";
        words.forEach((w, i) => {
          const outer = document.createElement("span");
          outer.style.cssText =
            "display:inline-block;overflow:hidden;vertical-align:bottom;padding-bottom:0.12em;margin-bottom:-0.12em;";
          const inner = document.createElement("span");
          inner.textContent = w;
          inner.style.cssText = `display:inline-block;transform:translateY(110%);transition:transform 1.4s cubic-bezier(0.16,1,0.3,1) ${i * 0.045}s;`;
          outer.appendChild(inner);
          el.appendChild(outer);
          el.appendChild(document.createTextNode(" "));
        });
        (el as HTMLElement & { _innerWords?: HTMLElement[] })._innerWords = Array.from(
          el.querySelectorAll("span > span")
        );
      });

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (!en.isIntersecting) return;
            const target = en.target as HTMLElement & { _revealTarget?: HTMLElement };
            const el = target._revealTarget || target;
            const kind = el.getAttribute("data-io");
            const withWords = el as HTMLElement & { _innerWords?: HTMLElement[] };
            if (el.hasAttribute("data-words")) {
              (withWords._innerWords || []).forEach((s) => {
                s.style.transform = "translateY(0)";
              });
            } else if (kind === "line") {
              el.style.transition = "opacity 1.6s ease, transform 1.6s cubic-bezier(0.16,1,0.3,1)";
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            } else {
              el.style.transition = "opacity 1.5s ease, transform 1.5s cubic-bezier(0.16,1,0.3,1)";
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }
            io.unobserve(en.target);
          });
        },
        { threshold: 0.18 }
      );

      qa("[data-io], [data-words]").forEach((el) => {
        const withWords = el as HTMLElement & { _innerWords?: HTMLElement[] };
        if (reduced) {
          el.style.transition = "none";
          el.style.opacity = "1";
          el.style.transform = "none";
          (withWords._innerWords || []).forEach((s) => {
            s.style.transition = "none";
            s.style.transform = "none";
          });
          return;
        }
        io.observe(el);
      });
      cleanup.push(() => io.disconnect());
    }

    // ---------- COUNTERS ----------
    function initCounters() {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (!en.isIntersecting) return;
            const el = en.target as HTMLElement;
            io.unobserve(el);
            const target = parseFloat(el.getAttribute("data-count") || "0");
            const dec = parseInt(el.getAttribute("data-decimals") || "0", 10);
            if (reduced) {
              el.textContent = target.toFixed(dec);
              return;
            }
            const t0 = performance.now();
            const dur = 2300;
            const tick = (now: number) => {
              const p = Math.min(1, (now - t0) / dur);
              const eased = 1 - Math.pow(1 - p, 4);
              el.textContent = (target * eased).toFixed(dec);
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          });
        },
        { threshold: 0.6 }
      );
      qa("[data-count]").forEach((el) => io.observe(el));
      cleanup.push(() => io.disconnect());
    }

    // ---------- SCROLL ENGINE (pinned horizontal + parallax) ----------
    function initScrollEngine() {
      const wrap = q("[data-hwrap]");
      const track = q("[data-htrack]");
      const progress = q("[data-hprogress]");
      const parallaxEls = qa("[data-parallax]");
      const cardImgs = qa("[data-parallax-x]");
      let cur = 0,
        rafActive = false,
        stopped = false;

      const frame = () => {
        if (stopped) {
          rafActive = false;
          return;
        }
        let settled = true;
        const vh = window.innerHeight,
          vw = window.innerWidth;
        if (wrap && track) {
          const r = wrap.getBoundingClientRect();
          const total = Math.max(1, r.height - vh);
          const p = Math.min(1, Math.max(0, -r.top / total));
          const maxX = Math.max(0, track.scrollWidth - vw + 96);
          const target = p * maxX;
          cur += (target - cur) * (reduced ? 1 : 0.12);
          if (Math.abs(target - cur) > 0.5) settled = false;
          else cur = target;
          const inView = r.bottom > 0 && r.top < vh;
          const cardRects = inView ? cardImgs.map((el) => el.getBoundingClientRect()) : null;
          track.style.transform = `translateX(${-cur}px)`;
          if (progress) progress.style.width = p * 100 + "%";
          if (cardRects) {
            cardImgs.forEach((el, i) => {
              const ir = cardRects[i];
              const center = (ir.left + ir.width / 2 - vw / 2) / vw;
              el.style.transform = `translateX(${center * 26}px)`;
            });
          }
        }
        if (!reduced) {
          const rects = parallaxEls.map((img) => img.parentElement!.getBoundingClientRect());
          parallaxEls.forEach((img, i) => {
            const r2 = rects[i];
            if (r2.bottom < 0 || r2.top > vh) return;
            const speed = parseFloat(img.getAttribute("data-parallax") || "0");
            const rel = (r2.top + r2.height / 2 - vh / 2) / vh;
            img.style.transform = `translateY(${rel * speed * -220}px)`;
          });
        }
        if (settled) {
          rafActive = false;
          return;
        }
        requestAnimationFrame(frame);
      };
      const kick = () => {
        if (!rafActive && !stopped) {
          rafActive = true;
          requestAnimationFrame(frame);
        }
      };
      on(window, "scroll", kick, { passive: true });
      on(window, "resize", kick, { passive: true });
      kick();
      cleanup.push(() => {
        stopped = true;
      });
    }

    // ---------- UNDERLINES ----------
    function initUnderlines() {
      qa("[data-underline]").forEach((a) => {
        const line = document.createElement("span");
        line.style.cssText = `position:absolute;left:0;bottom:-3px;height:1px;width:100%;background:#C4A672;transform:scaleX(0);transform-origin:right;transition:transform 0.65s cubic-bezier(0.16,1,0.3,1);`;
        a.style.position = "relative";
        a.appendChild(line);
        on(a, "mouseenter", () => {
          line.style.transformOrigin = "left";
          line.style.transform = "scaleX(1)";
        });
        on(a, "mouseleave", () => {
          line.style.transformOrigin = "right";
          line.style.transform = "scaleX(0)";
        });
      });
    }

    // ---------- IMAGE HOVERS ----------
    function initImageHovers() {
      qa("[data-cursor]").forEach((box) => {
        const img = box.querySelector<HTMLElement>("img, [role='img']");
        if (!img) return;
        img.style.transition = "filter 1.2s ease, scale 1.3s cubic-bezier(0.16,1,0.3,1)";
        on(box, "mouseenter", () => {
          img.style.filter = "grayscale(0%)";
          img.style.scale = "1.045";
        });
        on(box, "mouseleave", () => {
          img.style.filter = "";
          img.style.scale = "1";
        });
      });
    }

    const raf = requestAnimationFrame(() => {
      initPreloader();
      initNav();
      initCursor();
      initMagnetic();
      initReveals();
      initCounters();
      initScrollEngine();
      initUnderlines();
      initImageHovers();
    });

    return () => {
      cancelAnimationFrame(raf);
      cleanup.forEach((fn) => {
        try {
          fn();
        } catch {
          // no-op
        }
      });
    };
  }, []);
}
