"use client";

import type { BookingState } from "./bookingState";

function toStrDate(dt: Date) {
  return dt.toISOString().slice(0, 10);
}

const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function Calendar({
  state,
  onSelectDate,
  onPrev,
  onNext,
}: {
  state: BookingState;
  onSelectDate: (dateStr: string) => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const month = state.calMonth;
  if (!month) return null;

  const firstWeekday = (month.getDay() + 6) % 7;
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const todayStr = toStrDate(new Date());

  const cells: (string | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(toStrDate(new Date(month.getFullYear(), month.getMonth(), d)));
  }
  while (cells.length < 42) cells.push(null);

  return (
    <div
      className="absolute top-[calc(100%+10px)] left-0 right-0 bg-white border border-[rgba(16,22,29,0.14)] shadow-[0_24px_60px_rgba(16,22,29,0.16)] z-10 p-4 sm:p-6"
      style={{ animation: "fade-slide-in 0.5s cubic-bezier(0.16,1,0.3,1)" }}
    >
      <div className="flex items-center justify-between mb-4.5">
        <button
          type="button"
          onClick={onPrev}
          className="border-none bg-transparent cursor-pointer text-lg text-ink px-2.5 py-1"
        >
          &lsaquo;
        </button>
        <div className="font-serif text-[17px] text-ink">
          {MONTH_NAMES[month.getMonth()]} {month.getFullYear()}
        </div>
        <button
          type="button"
          onClick={onNext}
          className="border-none bg-transparent cursor-pointer text-lg text-ink px-2.5 py-1"
        >
          &rsaquo;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAYS.map((wd, i) => (
          <div
            key={i}
            className="text-center text-[10px] tracking-[0.1em] uppercase text-[rgba(16,22,29,0.4)] py-1"
          >
            {wd}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((dateStr, i) => {
          if (!dateStr) return <button key={i} disabled style={{ visibility: "hidden" }} />;
          const isPast = dateStr < todayStr;
          const isCheckIn = dateStr === state.checkIn;
          const isCheckOut = dateStr === state.checkOut;
          const inRange = dateStr > state.checkIn && dateStr < state.checkOut;
          const disabled = state.calOpen === "out" ? dateStr <= state.checkIn : isPast;
          let bg = "transparent";
          let color = "#10161D";
          let weight = "400";
          if (isCheckIn || isCheckOut) {
            bg = "#10161D";
            color = "#F5F1E9";
            weight = "500";
          } else if (inRange) {
            bg = "rgba(196,166,114,0.18)";
          }
          if (disabled) color = "rgba(16,22,29,0.25)";
          return (
            <button
              key={dateStr}
              type="button"
              disabled={disabled}
              onClick={() => !disabled && onSelectDate(dateStr)}
              style={{
                border: "none",
                cursor: disabled ? "default" : "pointer",
                background: bg,
                color,
                fontWeight: weight,
                fontSize: "13px",
                padding: "9px 0",
                borderRadius: "50%",
                transition: "background 0.4s ease",
              }}
            >
              {parseInt(dateStr.slice(8, 10), 10)}
            </button>
          );
        })}
      </div>
      <div className="mt-4 text-xs text-[rgba(16,22,29,0.45)] text-center">
        {state.calOpen === "in" ? "Select your arrival date" : "Select your departure date"}
      </div>
    </div>
  );
}
