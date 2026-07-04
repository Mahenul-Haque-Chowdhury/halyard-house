# Handoff: Halyard House — Premium Hotel Website (Home + Booking Flow)

## Overview
A premium, editorial boutique-hotel website for "Halyard House" (fictional hotel, Mendocino, California — Pacific coast). Two screens were designed: a cinematic, scroll-driven **Home** page and a 5-step **Booking flow** prototype (dates → room selection with live pricing → add-ons → guest details → payment → animated confirmation). This is a Next.js/React target implementation per the original brief (Next.js 14+, TypeScript, Tailwind, GSAP+ScrollTrigger, Lenis, Framer Motion, Prisma/Postgres, NextAuth, Stripe) — nothing in this bundle is production code to copy in; it is a precise visual/interaction reference to recreate in that stack.

## About the Design Files
The files in `reference/` (`Home.dc.html`, `Booking.dc.html`) are **design references built as self-contained HTML prototypes** — a custom internal component format (`<x-dc>` + a small runtime, not React). They are not meant to be embedded or copied as-is. **Recreate the visual design and interaction logic in the target Next.js codebase**, using Tailwind for styling (translate the inline styles below into a token-driven Tailwind config), Framer Motion / GSAP+ScrollTrigger for the animations described, and React state/forms for the booking flow. Open the HTML files directly in a browser to see the live, working reference (all interactions and animations run).

## Fidelity
**High-fidelity.** Colors, typography, spacing, copy, and animation timings below are final and should be recreated pixel-for-pixel and timing-for-timing. Imagery is temporary — all photos are Unsplash stock and must be swapped for licensed/owned hotel photography before launch.

---

## Design Tokens

**Colors**
- Ink navy (primary dark / text-on-light): `#10161D`
- Ivory (primary light background): `#F5F1E9`
- Champagne gold (accent, sparing use only — CTAs, numerals, hairlines, hover accents): `#C4A672`
- Error red (form validation): `#A6432E`
- White (calendar popover surface): `#FFFFFF`

**Typography**
- Display serif: `'Playfair Display'`, weights 400/500/600, italic 400/500 — used for all headlines, numerals, prices, room names.
- Body/UI sans: `'Archivo'`, weights 300/400/500/600 — used for body copy, labels, nav, buttons.
- Load via Google Fonts: `family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Archivo:wght@300;400;500;600`
- Type scale in use: 11–12px tracked-out uppercase eyebrows/labels (letter-spacing 0.16–0.34em), 15–17px body, 20–26px serif sub-headlines/prices, 30–46px section H1s, 56–128px (clamp) hero display.
- Numbered section markers ("01", "02"…) in small Playfair serif, gold, paired with an uppercase tracked label — used to open every major section.

**Spacing / Layout**
- Generous section padding: 140–160px vertical on desktop sections, 48px horizontal page gutters.
- Max content width: 1440px (home), 620–920px (booking form column).
- Hairline rules: 1px solid, `rgba(16,22,29,0.12–0.16)` on light, `rgba(245,241,233,0.14–0.18)` on dark.
- No default border-radius anywhere except pill buttons (`border-radius: 999px`) and circular controls (avatars-style dots, guest stepper, calendar day cells).

**Motion**
- Signature easing: `cubic-bezier(0.16,1,0.3,1)` (a soft "ease-out-expo" feel) for nearly all reveals, magnetic buttons, step transitions.
- Reveal durations run long and staggered: 1.4–1.8s per element, with per-line/per-word stagger delays (~0.15–0.65s offsets, ~0.045s per word).
- Ken Burns background zoom: 22–26s, `scale(1.03 → 1.16)`, ease-out, runs once per image load (not looping).
- Horizontal pinned scroll (rooms section) and vertical parallax both use a **lerp/easing follow** (~0.06 interpolation factor per frame) rather than snapping directly to scroll position — this is what gives the "slow, directional" feel; do this with GSAP ScrollTrigger `scrub` with a large scrub value (e.g. `scrub: 1.5–2`), or a manual rAF lerp if hand-rolled.
- Custom cursor (desktop only): a small dot + a 40px ring that lerps toward the pointer at ~0.09 interpolation/frame (slow, springy trail), morphing to an 88px filled gold circle with a text label ("View" / "Menu" / "Map") on certain hovers.
- Respect `prefers-reduced-motion: reduce` — instant states, no animation, everywhere (already implemented as a hard override in the reference CSS).

---

## Screens

### 1. Home

**Sections, top to bottom** (each is a full-bleed section; alternates ivory `#F5F1E9` and ink `#10161D` backgrounds — max 2 background colors per the system):

1. **Preloader** (ink bg): centered "Halyard." wordmark (Playfair, 64px) + "House · Western... " sub-label revealed via clipped mask/translateY, a numeric counter (0→100) bottom-right, a thin gold progress bar bottom-left. Runs ~2.6s eased (cubic power3-out), then the whole overlay slides up (`translateY(-100%)`, 1.6s) to reveal the hero already in place.
2. **Nav** (fixed, transparent → blurred ink/ivory on scroll depending on section behind it): wordmark left ("Halyard." + "House" sub-label), links (Stay / Dine / Experience / Find us) + a gold pill "Reserve" button right. Nav background/text color crossfades between dark-on-transparent and blurred-ink-or-ivory depending on which section is behind it (tracked via scroll position + IntersectionObserver against light-background sections).
3. **Hero** (full viewport, ink bg, full-bleed photo w/ Ken Burns + dark gradient overlay 72%→28%→85% top-to-bottom): small eyebrow line ("Mendocino, California · 39.31° N, 123.80° W") with a short gold rule; oversized two-line serif headline ("Rest, at the edge / of the *Pacific*", the word "Pacific" italic gold); supporting sentence + "Scroll" cue with an animated falling tick mark. All hero text enters via **masked line reveal**: each line is wrapped in an `overflow:hidden` box and slides up from `translateY(110%)` to `0`, staggered ~0.15s apart, 1.7–1.8s duration.
4. **01 — Manifesto** (ivory bg): 1:2 grid — left column has a small portrait image (3:4 ratio, grayscale-to-color on hover, parallax) with caption; right column has a large word-by-word revealed serif paragraph (each word masked/slides up individually, ~0.045s stagger) plus 3 animated stat counters (rooms count, guest rating /10, minutes to beach) that count up on scroll into view.
5. **02 — Stay / Rooms** (ink bg, **pinned horizontal-scroll section**, ~420vh of vertical scroll distance): section pins to viewport; a flex row of room cards translates horizontally as the user scrolls vertically (driven by scroll progress within the pinned range, lerped not snapped). Each card: 40vw-wide image (grayscale, revealed on hover to full color, subtle inner parallax) + room number/index, name, spec line, "from $price". Ends in a circular "View all rooms" CTA. Thin progress bar along the bottom fills as you scroll through.
6. **03 — Dine** (ivory bg): editorial 1.25:1 grid — large image with an oversized translucent numeral/monogram overlay (screen-blended) on the left, restaurant copy + a simple hours table + "Reserve a table →" link (animated underline) on the right. Restaurant is **Ember & Tide**.
7. **04 — Experiences** (ink bg, **sticky-stacking section**, 4 full-viewport panels): each experience (numbered 01–04) is `position: sticky; top:0` so each new panel slides over/covers the previous one as you scroll — full-bleed photo, gradient, small eyebrow/location tag, large serif name bottom-left, descriptive copy bottom-right.
8. **05 — Guest book** (ivory bg): infinite horizontal **marquee** of guest quotes (auto-scrolls right-to-left continuously at slow constant speed, ~74s per loop, pauses conceptually acceptable on hover), each quote card has a large gold quotation mark, serif quote text, and attribution.
9. **06 — Find us / Footer** (ink bg): two-column — address/contact block with a "Book your stay" gold CTA button, and a photo panel with a slowly rotating (36s/rotation) circular SVG text ring showing lat/long coordinates around a gold center dot. Below: footer link columns (Hotel / Guests / Follow) and a **huge oversized wordmark** ("Halyard", clamp 120–330px) revealed via the same masked line-reveal, then a copyright bar.

**Global micro-interactions**: magnetic buttons (translate toward cursor within ~28% of offset, springy return), animated underline links (draw in from the cursor side, retract to the opposite side on mouseleave), image hover = grayscale→color + 4.5% scale up over 1.2–1.3s, custom morphing cursor as described in Motion tokens, and a very subtle (5.5% opacity) full-page film-grain overlay (SVG feTurbulence noise as a data-URI background, `pointer-events:none`, fixed).

### 2. Booking flow

**Persistent layout while a booking is in progress** (steps 1–5): a 42%/58% split screen below a slim dark nav bar.
- **Left panel**: sticky, full-height, dark, changes image per step with the same Ken Burns treatment (22s, scale 1.03→1.16) and gradient. Shows a step-appropriate eyebrow + serif caption (e.g. step 1: "Halyard House" / "Rest, at the edge of the Pacific."). From step 2 onward, a running summary fades in at the bottom: nights/guests + dates, and once a room is picked, the room name + running total in gold.
- **Right panel**: scrollable, ivory background, contains a 5-dot progress indicator (numbered circles that fill solid ink + show a ✓ once completed, connected by hairlines that fill left-to-right with a gold bar, 0.9s ease) and the active step's form, max-width 620px.

**Step 1 — Dates & guests**: two large date "fields" (styled as buttons, not native inputs) showing a formatted date ("14 Jul" style); clicking opens a **custom calendar popover** below the field — month grid, prev/next chevrons, weekday header, day cells as circular buttons (selected = solid ink fill, in-range = pale gold tint, disabled/past = greyed and unclickable). Logic: first click sets check-in and auto-advances the popover to checkout-selection mode; second click sets check-out and closes the popover. A guest stepper (− / count / +) sits below with the computed night count. Inline validation error text (checked on submit) in red. Primary gold pill CTA "Check availability →".

**Step 2 — Room selection**: list of 5 room type cards (thumbnail image, name, spec line, nights × rate = total in gold serif), each a full-row click target; selecting one highlights it (gold border + tinted background + filled radio dot top-right). CTA is disabled/dimmed until a room is chosen.

**Step 3 — Add-ons**: toggleable list rows (checkbox-style square, name, description, "+$price"), click anywhere on the row to toggle.

**Step 4 — Guest details**: 2-column form grid with **floating-label inputs** (label sits inline in the field at rest, animates up-and-shrinks to a small tracked uppercase label above the field on focus or once a value is present — 0.45s ease). Fields: full name, email, phone, special requests. Validates name + valid email on continue.

**Step 5 — Payment**: card number / expiry / CVC inputs (same underline-input style as step 4, not floating-label), a small encrypted-payment reassurance line, and a right-hand dark summary card (room, dates, room subtotal, each add-on line, gold total) that is visible even though the layout is otherwise single-column at this step (the left sticky panel still carries the same running summary). "Pay $total" button shows a "Processing…" state for ~2s (simulated), then advances.

**Confirmation** (replaces the split layout entirely with a centered, single-column ivory screen): an SVG circle+checkmark that draws in via `stroke-dashoffset` animation (0.7s, delayed 0.3s), "Booking confirmed" eyebrow, "See you soon, {guest first name}." headline, confirmation copy with the entered email and a generated reference code, a dark summary card (room, dates, guests, total paid), and a "Return to Halyard House" link back to the home page.

---

## Interactions & Behavior Summary
- All step transitions are `fadeSlideIn` (opacity 0→1, translateY 28px→0, 0.9s cubic-bezier(0.16,1,0.3,1)) — re-triggered by changing a `key` on the step container so React (or a `key`-based remount) replays the animation each time.
- Calendar popover: click-outside should close it (reference implementation attaches a document click listener that ignores clicks inside `button` or the popover itself).
- Nav "Reserve" (home) and "Book your stay" (home, location section) both link to the booking flow page.
- Form fields are fully controlled (value + onChange) — no uncontrolled inputs.
- No page uses native `<input type="date">` — this was deliberately replaced with the custom calendar popover for visual consistency and control over states (range highlighting, disabled past dates).

## State Management
Booking flow state (single source of truth, e.g. a `useReducer` or a small Zustand store in the real app):
```
step: 1–5
checkIn, checkOut: ISO date strings
guests: number (1–8)
selectedRoomId: string | null
addonIds: string[]
guestName, guestEmail, guestPhone, guestRequests: string
cardNumber, cardExpiry, cardCvc: string
paying: boolean
confirmed: boolean
bookingRef: string (generated client-side in the reference; should be server-issued in production)
calOpen: 'in' | 'out' | null, calMonth: Date (calendar UI-only state)
```
Derived: `nights` (from check-in/out), `roomTotal` (rate × nights), `addonsTotal`, `grandTotal`. Room rates and add-on catalog are static reference data in the prototype (`ROOMS`, `ADDONS` arrays in `Booking.dc.html`'s logic) — in production these come from the rate/inventory DB per the original brief (live availability engine, seasonal pricing, transactional holds).

## Content used (copy is final unless noted as placeholder)
- Hotel name: **Halyard House**. Restaurant: **Ember & Tide**. Location: Mendocino, California (39.31°N, 123.80°W), 45050 Main Street. Phone (707) 555 0142, reception@halyardhouse.com.
- Room types (name / spec / nightly rate): Standard Room (Queen, 2 guests, 20 m², $149) · Standard Twin (2× Single, 2 guests, 21 m², $159) · Deluxe Room (King, 2 guests, 26 m², $189) · Family Room (Queen + bunks, 4 guests, 30 m², $219) · Deluxe Family Suite (two rooms, 5 guests, 42 m², $269).
- Add-ons: Breakfast ($42), Late checkout ($35), Undercover parking ($18), Welcome bottle — Anderson Valley riesling ($55).
- Experiences: Whales off the Headlands · The Blowholes & Arch Rock · Wineries of the valley (Anderson Valley) · Mornings at Van Damme (beach).
- Currency: USD throughout.

## Assets
All photography is placeholder stock from Unsplash (URLs are inline `src`/`background-image` values in the reference HTML — search each URL for the exact image). **Must be replaced with licensed/owned photography before production.** No custom icons/SVGs beyond a couple of inline decorative SVGs (checkmark-in-circle for confirmation, a circular text-path ring on the home location section) — both trivial to recreate in React/SVG directly.

## Files
- `reference/Home.dc.html` — full home page, open directly in a browser for the live interactive reference (all animations run).
- `reference/Booking.dc.html` — same note.

These are self-contained (fonts loaded from Google Fonts CDN, images from Unsplash CDN, everything else inline) — no build step needed to view them.

---

## Implementation status
Next.js 16 app scaffolded in this directory (App Router, TypeScript, Tailwind v4). See `src/app/` for pages.
