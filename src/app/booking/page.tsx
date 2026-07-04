"use client";

import { useEffect, useReducer, useRef } from "react";
import Link from "next/link";
import { ADDONS, PANELS, ROOMS, STEP_LABELS } from "@/lib/data";
import {
  bookingReducer,
  deriveTotals,
  fmtDate,
  initialState,
  nights as computeNights,
} from "@/components/booking/bookingState";
import { Calendar } from "@/components/booking/Calendar";

export default function BookingPage() {
  const [state, dispatch] = useReducer(bookingReducer, undefined, initialState);
  const popoverRef = useRef<HTMLDivElement>(null);

  const n = computeNights(state);
  const { room, roomTotal, selectedAddons, grandTotal } = deriveTotals(state);

  // click outside closes calendar
  useEffect(() => {
    if (!state.calOpen) return;
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button")) return;
      if (popoverRef.current && popoverRef.current.contains(target)) return;
      dispatch({ type: "CLOSE_CAL" });
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [state.calOpen]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [state.step, state.confirmed]);

  const stepForPanel = state.confirmed ? 6 : state.step;
  const panel = PANELS[Math.min(stepForPanel, 5) - 1] || PANELS[0];
  const hasSummary = stepForPanel >= 2;

  const goStep = (s: 1 | 2 | 3 | 4 | 5) => dispatch({ type: "GO_STEP", step: s });

  const goToRooms = () => {
    if (n <= 0) {
      dispatch({ type: "SET_DATE_ERROR", error: "Check out must be after check in." });
      return;
    }
    dispatch({ type: "SET_DATE_ERROR", error: "" });
    goStep(2);
  };

  const goToPayment = () => {
    if (!state.guestName.trim() || !state.guestEmail.trim() || !state.guestEmail.includes("@")) {
      dispatch({ type: "SET_DETAILS_ERROR", error: "Please enter your name and a valid email." });
      return;
    }
    dispatch({ type: "SET_DETAILS_ERROR", error: "" });
    goStep(5);
  };

  const submitPayment = () => {
    if (state.paying) return;
    const digits = state.cardNumber.replace(/\s/g, "");
    if (digits.length < 12 || !state.cardExpiry.trim() || !state.cardCvc.trim()) {
      dispatch({ type: "SET_PAYMENT_ERROR", error: "Enter a valid card number, expiry and CVC." });
      return;
    }
    dispatch({ type: "START_PAYING" });
    setTimeout(() => {
      const ref = "HH" + Math.random().toString(36).slice(2, 8).toUpperCase();
      dispatch({ type: "CONFIRM", ref });
    }, 2000);
  };

  const firstName = state.guestName.trim().split(" ")[0] || "guest";
  const roomIdx = room ? "No. " + String(ROOMS.indexOf(room) + 1).padStart(2, "0") : "";

  if (state.confirmed) {
    return (
      <div className="bg-ivory text-ink font-sans min-h-screen flex flex-col">
        <TopNav />
        <main className="flex-1 flex items-start justify-center px-12 pt-22 pb-30">
          <div
            className="w-full max-w-[720px] text-center"
            style={{ animation: "pop-in 0.7s cubic-bezier(0.16,1,0.3,1)" }}
          >
            <svg width="76" height="76" viewBox="0 0 72 72" className="mb-9 mx-auto">
              <circle cx="36" cy="36" r="34" fill="none" stroke="#C4A672" strokeWidth="1.2" />
              <path
                d="M20 37 L31 48 L52 24"
                fill="none"
                stroke="#C4A672"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="60"
                strokeDashoffset="60"
                style={{ animation: "check-draw 0.7s ease 0.3s forwards" }}
              />
            </svg>
            <div className="text-[11px] tracking-[0.3em] uppercase text-[rgba(16,22,29,0.5)] mb-4.5">
              Booking confirmed
            </div>
            <h1 className="m-0 mb-5.5 font-serif font-normal text-[clamp(36px,4vw,56px)] text-ink">
              See you soon, {firstName}.
            </h1>
            <p className="mx-auto mb-13 max-w-[46ch] text-[15px] leading-[1.75] text-[rgba(16,22,29,0.62)] font-light">
              A confirmation has been sent to {state.guestEmail}. Your reference is{" "}
              <strong className="text-ink tracking-[0.04em]">{state.bookingRef}</strong>.
            </p>
            <div className="inline-block text-left bg-ink text-ivory px-13 py-11 min-w-[400px]">
              <div className="text-[10px] tracking-[0.28em] uppercase text-[rgba(196,166,114,0.9)] mb-2.5">
                {roomIdx}
              </div>
              <div className="font-serif text-2xl mb-5.5">{room?.name}</div>
              <div className="flex justify-between py-3 border-t border-[rgba(245,241,233,0.16)] text-[13px]">
                <span className="text-[rgba(245,241,233,0.55)]">Dates</span>
                <span>
                  {fmtDate(state.checkIn)} &nbsp;to&nbsp; {fmtDate(state.checkOut)}
                </span>
              </div>
              <div className="flex justify-between py-3 border-t border-[rgba(245,241,233,0.16)] text-[13px]">
                <span className="text-[rgba(245,241,233,0.55)]">Guests</span>
                <span>{state.guests}</span>
              </div>
              <div className="flex justify-between py-4 pt-4 mt-2.5 border-t border-[rgba(196,166,114,0.5)] font-serif text-[25px]">
                <span>Paid</span>
                <span className="text-gold">${grandTotal}</span>
              </div>
            </div>
            <div className="mt-13">
              <Link href="/" className="no-underline text-xs tracking-[0.24em] uppercase text-ink border-b border-gold pb-1.5">
                Return to Halyard House
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-ivory text-ink font-sans min-h-screen flex flex-col">
      <TopNav />
      <main className="flex-1 flex items-stretch min-h-0 flex-col lg:flex-row">
        {/* LEFT PANEL */}
        <div className="w-full lg:w-[42%] lg:sticky lg:top-0 h-[42vh] lg:h-[calc(100vh-65px)] overflow-hidden bg-ink flex-shrink-0 relative">
          <div
            key={stepForPanel}
            className="absolute inset-0"
            style={{ animation: "fade-slide-in 1.3s ease" }}
          >
            <div
              role="img"
              className="absolute inset-0 bg-cover bg-center [filter:brightness(0.72)_saturate(0.9)]"
              style={{
                backgroundImage: `url('${panel.img}')`,
                animation: "kenburns-slow 22s ease-out forwards",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(16,22,29,0.35) 0%, rgba(16,22,29,0.15) 45%, rgba(16,22,29,0.88) 100%)",
              }}
            />
          </div>
          <div className="absolute left-11 right-11 bottom-12">
            <div className="text-[11px] tracking-[0.3em] uppercase text-[rgba(196,166,114,0.92)] mb-4.5">
              {panel.eyebrow}
            </div>
            <div className="font-serif font-normal text-[clamp(28px,2.6vw,40px)] leading-[1.2] text-ivory">
              {panel.caption}
            </div>
            {hasSummary && (
              <div className="mt-10 pt-7 border-t border-[rgba(245,241,233,0.18)]">
                <div className="flex justify-between text-[13px] text-[rgba(245,241,233,0.65)] mb-2.5">
                  <span>
                    {n} nights, {state.guests} guests
                  </span>
                  <span>
                    {fmtDate(state.checkIn)} &nbsp;to&nbsp; {fmtDate(state.checkOut)}
                  </span>
                </div>
                {room && (
                  <div className="flex justify-between items-baseline mt-5">
                    <span className="font-serif text-xl text-ivory">{room.name}</span>
                    <span className="font-serif text-xl text-gold">${grandTotal}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full lg:w-[58%] px-6 sm:px-12 lg:px-16 pt-14 pb-30">
          {/* PROGRESS */}
          <div className="max-w-[620px] mb-14">
            <div className="flex items-center justify-between">
              {STEP_LABELS.map((label, i) => {
                const num = i + 1;
                const active = num === state.step;
                const done = num < state.step;
                const dotColor = done || active ? "#10161D" : "transparent";
                const dotBorder = done || active ? "#10161D" : "rgba(16,22,29,0.3)";
                const dotText = done || active ? "#F5F1E9" : "rgba(16,22,29,0.4)";
                const hasLine = num < STEP_LABELS.length;
                return (
                  <div key={label} className="flex items-center gap-3 flex-1">
                    <div className="flex flex-col items-center gap-2 min-w-[22px]">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-serif transition-all duration-500"
                        style={{ border: `1px solid ${dotBorder}`, background: dotColor, color: dotText }}
                      >
                        {done ? "✓" : num}
                      </div>
                      <div
                        className="text-[9.5px] tracking-[0.14em] uppercase whitespace-nowrap"
                        style={{ color: active ? "#10161D" : "rgba(16,22,29,0.4)" }}
                      >
                        {label}
                      </div>
                    </div>
                    {hasLine && (
                      <div className="flex-1 h-px bg-[rgba(16,22,29,0.14)] mb-5 relative overflow-hidden">
                        <div
                          className="absolute inset-0 bg-gold origin-left transition-transform duration-[0.9s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                          style={{ transform: `scaleX(${done ? 1 : 0})` }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="max-w-[620px] relative">
            {state.step === 1 && (
              <div key={state.animKey} style={{ animation: "fade-slide-in 0.9s cubic-bezier(0.16,1,0.3,1)" }}>
                <StepHeading num="01" eyebrow="When & who" title="Choose your dates." />

                <div className="relative">
                  <div className="grid grid-cols-2 gap-px bg-[rgba(16,22,29,0.16)] border border-[rgba(16,22,29,0.16)]">
                    <button
                      type="button"
                      onClick={() => dispatch({ type: "OPEN_CAL", which: "in" })}
                      className="text-left cursor-pointer border-none px-5.5 py-5"
                      style={{ background: state.calOpen === "in" ? "rgba(196,166,114,0.12)" : "#FFFFFF" }}
                    >
                      <div className="text-[10.5px] tracking-[0.2em] uppercase text-[rgba(16,22,29,0.48)]">
                        Check in
                      </div>
                      <div className="mt-2 font-serif text-[22px] text-ink">{fmtDate(state.checkIn)}</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => dispatch({ type: "OPEN_CAL", which: "out" })}
                      className="text-left cursor-pointer border-none px-5.5 py-5"
                      style={{ background: state.calOpen === "out" ? "rgba(196,166,114,0.12)" : "#FFFFFF" }}
                    >
                      <div className="text-[10.5px] tracking-[0.2em] uppercase text-[rgba(16,22,29,0.48)]">
                        Check out
                      </div>
                      <div className="mt-2 font-serif text-[22px] text-ink">{fmtDate(state.checkOut)}</div>
                    </button>
                  </div>

                  {state.calOpen && (
                    <div ref={popoverRef}>
                      <Calendar
                        state={state}
                        onSelectDate={(dateStr) => dispatch({ type: "SELECT_DATE", dateStr })}
                        onPrev={() => dispatch({ type: "CAL_PREV" })}
                        onNext={() => dispatch({ type: "CAL_NEXT" })}
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between py-6.5 border-b border-[rgba(16,22,29,0.14)] mt-8">
                  <div>
                    <div className="text-[15px] text-ink">Guests</div>
                    <div className="text-xs text-[rgba(16,22,29,0.48)] mt-1">{n} night stay</div>
                  </div>
                  <div className="flex items-center gap-5.5">
                    <button
                      type="button"
                      onClick={() => dispatch({ type: "DEC_GUESTS" })}
                      className="w-8.5 h-8.5 rounded-full border border-[rgba(16,22,29,0.22)] bg-transparent text-base text-ink cursor-pointer transition-colors"
                    >
                      &minus;
                    </button>
                    <span className="font-serif text-xl min-w-[20px] text-center">{state.guests}</span>
                    <button
                      type="button"
                      onClick={() => dispatch({ type: "INC_GUESTS" })}
                      className="w-8.5 h-8.5 rounded-full border border-[rgba(16,22,29,0.22)] bg-transparent text-base text-ink cursor-pointer transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {state.dateError && <div className="text-xs text-error mt-5">{state.dateError}</div>}

                <button
                  type="button"
                  onClick={goToRooms}
                  className="mt-10 cursor-pointer border-none inline-block text-xs tracking-[0.24em] uppercase text-ink bg-gold px-11.5 py-4.75 font-medium transition-transform"
                >
                  Check availability &rarr;
                </button>
              </div>
            )}

            {state.step === 2 && (
              <div key={state.animKey} style={{ animation: "fade-slide-in 0.9s cubic-bezier(0.16,1,0.3,1)" }}>
                <StepHeading num="02" eyebrow="Your room" />
                <div className="flex items-baseline justify-between mb-9">
                  <h1 className="m-0 font-serif font-normal text-[clamp(30px,3vw,42px)] text-ink">
                    {n} nights, {state.guests} guests.
                  </h1>
                  <button
                    type="button"
                    onClick={() => goStep(1)}
                    className="bg-transparent border-none text-[11px] tracking-[0.18em] uppercase text-[rgba(16,22,29,0.48)] cursor-pointer border-b border-[rgba(16,22,29,0.3)] pb-0.5"
                  >
                    Edit dates
                  </button>
                </div>

                <div className="flex flex-col gap-3.5">
                  {ROOMS.map((r) => {
                    const selected = state.selectedRoomId === r.id;
                    return (
                      <div
                        key={r.id}
                        onClick={() => dispatch({ type: "SELECT_ROOM", id: r.id })}
                        className="flex items-center cursor-pointer p-3.5 relative transition-all"
                        style={{
                          border: `1px solid ${selected ? "#C4A672" : "rgba(16,22,29,0.14)"}`,
                          background: selected ? "rgba(196,166,114,0.08)" : "transparent",
                        }}
                      >
                        <div
                          className="w-32 h-24 flex-none bg-cover bg-center"
                          style={{ backgroundImage: `url('${r.img}')` }}
                        />
                        <div className="flex-1 px-5.5">
                          <div className="font-serif text-xl text-ink">{r.name}</div>
                          <div className="text-xs text-[rgba(16,22,29,0.48)] mt-1.5">{r.spec}</div>
                        </div>
                        <div className="text-right pr-3">
                          <div className="text-[10.5px] tracking-[0.16em] uppercase text-[rgba(16,22,29,0.42)]">
                            {n} nights
                          </div>
                          <div className="font-serif text-[22px] text-gold">${r.rate * n}</div>
                        </div>
                        <div
                          className="absolute top-3.5 right-3.5 w-4 h-4 rounded-full transition-all"
                          style={{
                            border: `1px solid ${selected ? "#C4A672" : "rgba(16,22,29,0.3)"}`,
                            background: selected ? "#C4A672" : "transparent",
                          }}
                        />
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  disabled={!state.selectedRoomId}
                  onClick={() => state.selectedRoomId && goStep(3)}
                  className="mt-7 border-none text-xs tracking-[0.24em] uppercase text-ink px-11.5 py-4.75 font-medium transition-all"
                  style={{
                    cursor: state.selectedRoomId ? "pointer" : "not-allowed",
                    background: state.selectedRoomId ? "#C4A672" : "rgba(16,22,29,0.15)",
                    opacity: state.selectedRoomId ? 1 : 0.6,
                  }}
                >
                  Continue to add ons &rarr;
                </button>
              </div>
            )}

            {state.step === 3 && (
              <div key={state.animKey} style={{ animation: "fade-slide-in 0.9s cubic-bezier(0.16,1,0.3,1)" }}>
                <StepHeading num="03" eyebrow="Add to your stay" title="A few extras." />

                <div className="flex flex-col">
                  {ADDONS.map((addon) => {
                    const checked = state.addonIds.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => dispatch({ type: "TOGGLE_ADDON", id: addon.id })}
                        className="flex items-center justify-between py-5.5 border-b border-[rgba(16,22,29,0.12)] cursor-pointer"
                      >
                        <div className="flex items-center gap-5">
                          <div
                            className="w-5.5 h-5.5 flex-shrink-0 transition-all"
                            style={{
                              border: `1px solid ${checked ? "#C4A672" : "rgba(16,22,29,0.3)"}`,
                              background: checked ? "#C4A672" : "transparent",
                            }}
                          />
                          <div>
                            <div className="text-[15.5px] text-ink">{addon.name}</div>
                            <div className="text-xs text-[rgba(16,22,29,0.48)] mt-1">{addon.desc}</div>
                          </div>
                        </div>
                        <div className="font-serif text-[17px] text-ink flex-shrink-0 ml-4">+${addon.price}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between mt-10">
                  <button
                    type="button"
                    onClick={() => goStep(2)}
                    className="bg-transparent border-none text-[11px] tracking-[0.18em] uppercase text-[rgba(16,22,29,0.48)] cursor-pointer"
                  >
                    &larr; Back
                  </button>
                  <button
                    type="button"
                    onClick={() => goStep(4)}
                    className="cursor-pointer border-none text-xs tracking-[0.24em] uppercase text-ink bg-gold px-11.5 py-4.75"
                  >
                    Continue &rarr;
                  </button>
                </div>
              </div>
            )}

            {state.step === 4 && (
              <div key={state.animKey} style={{ animation: "fade-slide-in 0.9s cubic-bezier(0.16,1,0.3,1)" }}>
                <StepHeading num="04" eyebrow="Your details" title="Who's staying?" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7.5">
                  <FloatField
                    label="Full name"
                    value={state.guestName}
                    onChange={(v) => dispatch({ type: "SET_FIELD", field: "guestName", value: v })}
                    focused={state.focusField === "name"}
                    onFocus={() => dispatch({ type: "FOCUS_FIELD", field: "name" })}
                    onBlur={() => dispatch({ type: "FOCUS_FIELD", field: null })}
                    type="text"
                  />
                  <FloatField
                    label="Email"
                    value={state.guestEmail}
                    onChange={(v) => dispatch({ type: "SET_FIELD", field: "guestEmail", value: v })}
                    focused={state.focusField === "email"}
                    onFocus={() => dispatch({ type: "FOCUS_FIELD", field: "email" })}
                    onBlur={() => dispatch({ type: "FOCUS_FIELD", field: null })}
                    type="email"
                  />
                  <FloatField
                    label="Phone"
                    value={state.guestPhone}
                    onChange={(v) => dispatch({ type: "SET_FIELD", field: "guestPhone", value: v })}
                    focused={state.focusField === "phone"}
                    onFocus={() => dispatch({ type: "FOCUS_FIELD", field: "phone" })}
                    onBlur={() => dispatch({ type: "FOCUS_FIELD", field: null })}
                    type="tel"
                  />
                  <FloatField
                    label="Special requests"
                    value={state.guestRequests}
                    onChange={(v) => dispatch({ type: "SET_FIELD", field: "guestRequests", value: v })}
                    focused={state.focusField === "requests"}
                    onFocus={() => dispatch({ type: "FOCUS_FIELD", field: "requests" })}
                    onBlur={() => dispatch({ type: "FOCUS_FIELD", field: null })}
                    type="text"
                  />
                </div>

                {state.detailsError && <div className="text-xs text-error mt-6">{state.detailsError}</div>}

                <div className="flex justify-between mt-12">
                  <button
                    type="button"
                    onClick={() => goStep(3)}
                    className="bg-transparent border-none text-[11px] tracking-[0.18em] uppercase text-[rgba(16,22,29,0.48)] cursor-pointer"
                  >
                    &larr; Back
                  </button>
                  <button
                    type="button"
                    onClick={goToPayment}
                    className="cursor-pointer border-none text-xs tracking-[0.24em] uppercase text-ink bg-gold px-11.5 py-4.75"
                  >
                    Continue to payment &rarr;
                  </button>
                </div>
              </div>
            )}

            {state.step === 5 && (
              <div key={state.animKey} style={{ animation: "fade-slide-in 0.9s cubic-bezier(0.16,1,0.3,1)" }}>
                <StepHeading num="05" eyebrow="Payment" title="Secure your stay." />

                <label className="flex flex-col gap-2.5 mb-6.5">
                  <span className="text-[10.5px] tracking-[0.2em] uppercase text-[rgba(16,22,29,0.5)]">
                    Card number
                  </span>
                  <input
                    type="text"
                    value={state.cardNumber}
                    onChange={(e) => dispatch({ type: "SET_CARD_FIELD", field: "cardNumber", value: e.target.value })}
                    placeholder="4242 4242 4242 4242"
                    className="border-none border-b border-[rgba(16,22,29,0.25)] bg-transparent text-[17px] py-2.5 text-ink focus:outline-none"
                  />
                </label>
                <div className="grid grid-cols-2 gap-6.5">
                  <label className="flex flex-col gap-2.5">
                    <span className="text-[10.5px] tracking-[0.2em] uppercase text-[rgba(16,22,29,0.5)]">Expiry</span>
                    <input
                      type="text"
                      value={state.cardExpiry}
                      onChange={(e) => dispatch({ type: "SET_CARD_FIELD", field: "cardExpiry", value: e.target.value })}
                      placeholder="MM / YY"
                      className="border-none border-b border-[rgba(16,22,29,0.25)] bg-transparent text-[17px] py-2.5 text-ink focus:outline-none"
                    />
                  </label>
                  <label className="flex flex-col gap-2.5">
                    <span className="text-[10.5px] tracking-[0.2em] uppercase text-[rgba(16,22,29,0.5)]">CVC</span>
                    <input
                      type="text"
                      value={state.cardCvc}
                      onChange={(e) => dispatch({ type: "SET_CARD_FIELD", field: "cardCvc", value: e.target.value })}
                      placeholder="123"
                      className="border-none border-b border-[rgba(16,22,29,0.25)] bg-transparent text-[17px] py-2.5 text-ink focus:outline-none"
                    />
                  </label>
                </div>

                {state.paymentError && <div className="text-xs text-error mt-6">{state.paymentError}</div>}

                <div className="flex items-center gap-2.5 mt-8 text-[11px] text-[rgba(16,22,29,0.42)] tracking-[0.04em]">
                  <span>&#128274;</span>
                  <span>Payments are encrypted and processed securely.</span>
                </div>

                <div className="bg-ink text-ivory p-6 mt-8">
                  <div className="flex justify-between text-[13px] mb-2.5">
                    <span className="text-[rgba(245,241,233,0.6)]">{room?.name}</span>
                    <span>${roomTotal}</span>
                  </div>
                  {selectedAddons.map((a) => (
                    <div key={a.id} className="flex justify-between text-[13px] mb-2.5">
                      <span className="text-[rgba(245,241,233,0.6)]">{a.name}</span>
                      <span>${a.price}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-serif text-xl pt-3 mt-2 border-t border-[rgba(196,166,114,0.5)]">
                    <span>Total</span>
                    <span className="text-gold">${grandTotal}</span>
                  </div>
                </div>

                <div className="flex justify-between mt-10">
                  <button
                    type="button"
                    onClick={() => goStep(4)}
                    className="bg-transparent border-none text-[11px] tracking-[0.18em] uppercase text-[rgba(16,22,29,0.48)] cursor-pointer"
                  >
                    &larr; Back
                  </button>
                  <button
                    type="button"
                    onClick={submitPayment}
                    className="border-none text-xs tracking-[0.24em] uppercase text-ink bg-gold px-11.5 py-4.75"
                    style={{ cursor: state.paying ? "default" : "pointer", opacity: state.paying ? 0.7 : 1 }}
                  >
                    {state.paying ? "Processing…" : `Pay $${grandTotal}`}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function TopNav() {
  return (
    <nav className="flex items-center justify-between px-10 py-5.5 bg-ink relative z-5">
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"300\" height=\"300\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"2\"/></filter><rect width=\"300\" height=\"300\" filter=\"url(%23n)\"/></svg>')",
        }}
      />
      <Link href="/" className="no-underline flex items-baseline gap-2.5 relative">
        <span className="font-serif text-[21px] text-ivory">
          Halyard<span className="text-gold">.</span>
        </span>
        <span className="text-[10px] tracking-[0.3em] uppercase text-[rgba(245,241,233,0.55)]">House</span>
      </Link>
      <div className="flex items-center gap-3.5 relative">
        <span className="w-1.5 h-1.5 rounded-full bg-gold" />
        <span className="text-[11px] tracking-[0.24em] uppercase text-[rgba(245,241,233,0.6)]">
          Secure reservation
        </span>
      </div>
    </nav>
  );
}

function StepHeading({ num, eyebrow, title }: { num: string; eyebrow: string; title?: string }) {
  return (
    <>
      <div className="flex items-baseline gap-4 mb-2.5">
        <span className="font-serif text-sm text-gold">{num}</span>
        <span className="text-[11px] tracking-[0.3em] uppercase text-[rgba(16,22,29,0.5)]">{eyebrow}</span>
      </div>
      {title && (
        <h1 className="mt-0 mb-11 font-serif font-normal text-[clamp(30px,3vw,42px)] text-ink">{title}</h1>
      )}
    </>
  );
}

function FloatField({
  label,
  value,
  onChange,
  focused,
  onFocus,
  onBlur,
  type,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  type: string;
}) {
  const active = focused || value.length > 0;
  return (
    <div className="relative pt-1.5">
      <label
        className="absolute left-0 pointer-events-none transition-all duration-[0.45s] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          top: active ? "-14px" : "18px",
          fontSize: active ? "11px" : "17px",
          letterSpacing: active ? "0.14em" : "0",
          textTransform: active ? "uppercase" : "none",
          color: active ? "rgba(16,22,29,0.5)" : "rgba(16,22,29,0.4)",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        className="w-full border-none border-b border-[rgba(16,22,29,0.25)] bg-transparent text-[17px] py-2.5 text-ink focus:outline-none"
      />
    </div>
  );
}
