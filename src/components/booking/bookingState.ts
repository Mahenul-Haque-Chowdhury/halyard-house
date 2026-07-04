import { ADDONS, ROOMS } from "@/lib/data";

export type BookingState = {
  step: 1 | 2 | 3 | 4 | 5;
  checkIn: string;
  checkOut: string;
  guests: number;
  dateError: string;
  calOpen: "in" | "out" | null;
  calMonth: Date | null;
  selectedRoomId: string | null;
  addonIds: string[];
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestRequests: string;
  focusField: string | null;
  detailsError: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  paymentError: string;
  paying: boolean;
  confirmed: boolean;
  bookingRef: string;
  animKey: number;
};

function toStr(dt: Date) {
  return dt.toISOString().slice(0, 10);
}
export function fromStr(s: string) {
  return new Date(s + "T00:00:00");
}
export function fmtDate(d: string) {
  const dt = fromStr(d);
  return dt.toLocaleDateString("en-US", { day: "numeric", month: "short" });
}
export function addDays(dateStr: string, n: number) {
  const dt = fromStr(dateStr);
  dt.setDate(dt.getDate() + n);
  return toStr(dt);
}
export function startOfMonth(dt: Date) {
  return new Date(dt.getFullYear(), dt.getMonth(), 1);
}

export function nights(state: BookingState) {
  const n = Math.round((fromStr(state.checkOut).getTime() - fromStr(state.checkIn).getTime()) / 86400000);
  return n > 0 ? n : 0;
}

export function initialState(): BookingState {
  const today = new Date().toISOString().slice(0, 10);
  return {
    step: 1,
    checkIn: addDays(today, 14),
    checkOut: addDays(today, 17),
    guests: 2,
    dateError: "",
    calOpen: null,
    calMonth: null,
    selectedRoomId: null,
    addonIds: [],
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    guestRequests: "",
    focusField: null,
    detailsError: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    paymentError: "",
    paying: false,
    confirmed: false,
    bookingRef: "",
    animKey: 0,
  };
}

export type Action =
  | { type: "GO_STEP"; step: BookingState["step"] }
  | { type: "OPEN_CAL"; which: "in" | "out" }
  | { type: "SELECT_DATE"; dateStr: string }
  | { type: "CLOSE_CAL" }
  | { type: "CAL_PREV" }
  | { type: "CAL_NEXT" }
  | { type: "INC_GUESTS" }
  | { type: "DEC_GUESTS" }
  | { type: "SET_DATE_ERROR"; error: string }
  | { type: "SELECT_ROOM"; id: string }
  | { type: "TOGGLE_ADDON"; id: string }
  | { type: "SET_FIELD"; field: "guestName" | "guestEmail" | "guestPhone" | "guestRequests"; value: string }
  | { type: "FOCUS_FIELD"; field: string | null }
  | { type: "SET_DETAILS_ERROR"; error: string }
  | { type: "SET_CARD_FIELD"; field: "cardNumber" | "cardExpiry" | "cardCvc"; value: string }
  | { type: "SET_PAYMENT_ERROR"; error: string }
  | { type: "START_PAYING" }
  | { type: "CONFIRM"; ref: string };

export function bookingReducer(state: BookingState, action: Action): BookingState {
  switch (action.type) {
    case "GO_STEP":
      return { ...state, step: action.step, animKey: state.animKey + 1, calOpen: null };
    case "OPEN_CAL": {
      const anchor = action.which === "in" ? state.checkIn : state.checkOut;
      return { ...state, calOpen: action.which, calMonth: startOfMonth(fromStr(anchor)) };
    }
    case "SELECT_DATE": {
      if (state.calOpen === "in") {
        const newOut = action.dateStr >= state.checkOut ? addDays(action.dateStr, 3) : state.checkOut;
        return {
          ...state,
          checkIn: action.dateStr,
          checkOut: newOut,
          calOpen: "out",
          calMonth: startOfMonth(fromStr(newOut)),
        };
      }
      return { ...state, checkOut: action.dateStr, calOpen: null };
    }
    case "CLOSE_CAL":
      return { ...state, calOpen: null };
    case "CAL_PREV": {
      if (!state.calMonth) return state;
      const m = new Date(state.calMonth);
      m.setMonth(m.getMonth() - 1);
      return { ...state, calMonth: m };
    }
    case "CAL_NEXT": {
      if (!state.calMonth) return state;
      const m = new Date(state.calMonth);
      m.setMonth(m.getMonth() + 1);
      return { ...state, calMonth: m };
    }
    case "INC_GUESTS":
      return { ...state, guests: Math.min(8, state.guests + 1) };
    case "DEC_GUESTS":
      return { ...state, guests: Math.max(1, state.guests - 1) };
    case "SET_DATE_ERROR":
      return { ...state, dateError: action.error };
    case "SELECT_ROOM":
      return { ...state, selectedRoomId: action.id };
    case "TOGGLE_ADDON": {
      const ids = state.addonIds.includes(action.id)
        ? state.addonIds.filter((id) => id !== action.id)
        : [...state.addonIds, action.id];
      return { ...state, addonIds: ids };
    }
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "FOCUS_FIELD":
      return { ...state, focusField: action.field };
    case "SET_DETAILS_ERROR":
      return { ...state, detailsError: action.error };
    case "SET_CARD_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_PAYMENT_ERROR":
      return { ...state, paymentError: action.error };
    case "START_PAYING":
      return { ...state, paying: true, paymentError: "" };
    case "CONFIRM":
      return { ...state, paying: false, confirmed: true, bookingRef: action.ref };
    default:
      return state;
  }
}

export function deriveTotals(state: BookingState) {
  const n = nights(state);
  const room = ROOMS.find((r) => r.id === state.selectedRoomId) || null;
  const roomTotal = room ? room.rate * n : 0;
  const selectedAddons = ADDONS.filter((a) => state.addonIds.includes(a.id));
  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const grandTotal = roomTotal + addonsTotal;
  return { nights: n, room, roomTotal, selectedAddons, addonsTotal, grandTotal };
}
