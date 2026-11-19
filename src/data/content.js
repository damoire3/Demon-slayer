// Site content. Keep texts short: the video must stay visible.

// Single screen: one pinned video, scrubbed by scroll, with all chapters.
// Chapter start/end are fractions (0 to 1) of the scroll distance.
export const screen = {
  video: "/videos/demon-slayer.mp4",
  chapters: [
    {
      kicker: "Chapter I",
      title: "Demon Slayer",
      text: "Step into the world of the demon slayers.",
      align: "left",
      start: 0,
      end: 0.18,
    },
    {
      kicker: "Chapter II",
      title: "Breath of Water",
      text: "The blade cuts through the night.",
      align: "right",
      start: 0.2,
      end: 0.38,
    },
    {
      kicker: "Chapter III",
      title: "Breath of Fire",
      text: "A flame that never steps back.",
      align: "left",
      start: 0.4,
      end: 0.58,
    },
    {
      kicker: "Chapter IV",
      title: "The Endless Night",
      text: "Every slayer keeps a promise.",
      align: "right",
      start: 0.6,
      end: 0.78,
    },
    {
      kicker: "Epilogue",
      title: "Join the Fight",
      text: "Step into the story.",
      align: "center",
      start: 0.8,
      end: 1,
      cta: true,
    },
  ],
};

// Quotes shown on their own, one per screen.
export const quotes = [
  "Even in the darkest night, a blade can trace the way to dawn.",
  "Every slayer keeps a promise.",
  "A flame that never steps back.",
];

export const characters = [
  { name: "Tanjirō Kamado", detail: "Water Breathing" },
  { name: "Nezuko Kamado", detail: "Demon Blood Art" },
  { name: "Zenitsu Agatsuma", detail: "Thunder Breathing" },
  { name: "Inosuke Hashibira", detail: "Beast Breathing" },
  { name: "Kyōjurō Rengoku", detail: "Flame Breathing" },
  { name: "Giyū Tomioka", detail: "Water Breathing" },
];

export const places = [
  "The Kamado house",
  "The Infinity Train",
  "The Infinity Castle",
];

export const timeline = [
  { year: "The beginning", title: "A family shattered" },
  { year: "Training", title: "The Water Breath" },
  { year: "The Train arc", title: "The Infinity Train" },
  { year: "The Pillars", title: "The Hashira" },
  { year: "The finale", title: "The Infinity Castle" },
];
