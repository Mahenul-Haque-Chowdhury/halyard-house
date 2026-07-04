export type Room = {
  id: string;
  idx: string;
  name: string;
  spec: string;
  rate: number;
  img: string;
};

export const ROOMS: Room[] = [
  {
    id: "std",
    idx: "No. 01",
    name: "Standard Room",
    spec: "Queen · 2 guests · 20 m²",
    rate: 149,
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "twin",
    idx: "No. 02",
    name: "Standard Twin",
    spec: "2 × Single · 2 guests · 21 m²",
    rate: 159,
    img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "dlx",
    idx: "No. 03",
    name: "Deluxe Room",
    spec: "King · 2 guests · 26 m²",
    rate: 189,
    img: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "fam",
    idx: "No. 04",
    name: "Family Room",
    spec: "Queen + bunks · 4 guests · 30 m²",
    rate: 219,
    img: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "dfs",
    idx: "No. 05",
    name: "Deluxe Family Suite",
    spec: "Two rooms · 5 guests · 42 m²",
    rate: 269,
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
  },
];

export type Addon = {
  id: string;
  name: string;
  desc: string;
  price: number;
};

export const ADDONS: Addon[] = [
  { id: "bfast", name: "Breakfast, both of you", desc: "Full buffet, 6.30 to 10.00", price: 42 },
  { id: "late", name: "Late checkout", desc: "Stay until 2pm, subject to availability", price: 35 },
  { id: "parking", name: "Undercover parking", desc: "One vehicle, for the length of your stay", price: 18 },
  {
    id: "welcome",
    name: "Welcome bottle, Anderson Valley riesling",
    desc: "Waiting in your room on arrival",
    price: 55,
  },
];

export type Experience = {
  idx: string;
  tag: string;
  name: string;
  copy: string;
  img: string;
};

export const EXPERIENCES: Experience[] = [
  {
    idx: "01",
    tag: "Mendocino Headlands · Dec to Apr",
    name: "Whales off the Headlands",
    copy: "Gray whales pass close to shore each winter on their migration south. The best viewing point is a ten minute walk from the lobby.",
    img: "https://images.unsplash.com/photo-1518877593221-1f28583780b4?auto=format&fit=crop&w=2200&q=80",
  },
  {
    idx: "02",
    tag: "Mendocino Headlands · 10 min",
    name: "The Blowholes & Arch Rock",
    copy: "Wave-cut coves and sea arches where the Pacific has carved its own architecture. Go at golden hour.",
    img: "https://images.unsplash.com/photo-1439405326854-014607f694d7?auto=format&fit=crop&w=2200&q=80",
  },
  {
    idx: "03",
    tag: "Anderson Valley · 45 min",
    name: "Wineries of the valley",
    copy: "Cool-climate pinot and riesling under the redwoods. We'll arrange the driver.",
    img: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=2200&q=80",
  },
  {
    idx: "04",
    tag: "Van Damme Beach · 6 min",
    name: "Mornings at Van Damme",
    copy: "A walk before breakfast, the trail to Fern Canyon after. The quiet kind of routine holidays are for.",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=80",
  },
];

export type Quote = { text: string; who: string };

export const QUOTES: Quote[] = [
  { text: "The quietest sleep we've had on the whole north coast trip.", who: "Sacramento, March" },
  { text: "Dinner at Ember & Tide twice in three nights. The grill is worth the stay alone.", who: "San Francisco, January" },
  { text: "Walked to the beach every morning. Staff arranged the whale cruise for us.", who: "Portland, July" },
  { text: "Feels far more considered than the price suggests.", who: "Seattle, October" },
  { text: "The kids had their own room, we had our own quiet. Perfect.", who: "Sonoma, April" },
];

export const PANELS = [
  {
    img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=80",
    eyebrow: "Halyard House",
    caption: "Rest, at the edge of the Pacific.",
  },
  {
    img: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1400&q=80",
    eyebrow: "Five kinds of rest",
    caption: "Every room looks out on the Pacific, or the redwoods.",
  },
  {
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80",
    eyebrow: "Ember & Tide",
    caption: "A few extras, to make the stay yours.",
  },
  {
    img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1400&q=80",
    eyebrow: "Almost there",
    caption: "Just your details, then we'll hold the room.",
  },
  {
    img: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1400&q=80",
    eyebrow: "Secure your stay",
    caption: "Encrypted payment, refundable up to 48 hours out.",
  },
];

export const STEP_LABELS = ["Dates", "Room", "Add ons", "Details", "Payment"];
