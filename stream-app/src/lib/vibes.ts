export interface Vibe {
  id: string;
  emoji: string;
  label: string;
  description: string;
  genres: string[];
  gradient: string;
  glowColor: string;
}

export const VIBES: Vibe[] = [
  {
    id: "spannend",
    emoji: "🌑",
    label: "Donker & Spannend",
    description: "Gripping thrillers en misdaadverhalen die je aan de rand van je stoel houden.",
    genres: ["Thriller", "Crime"],
    gradient: "from-slate-900 via-gray-900 to-zinc-800",
    glowColor: "shadow-gray-500/25",
  },
  {
    id: "sci-fi",
    emoji: "🚀",
    label: "Sci-Fi & Toekomst",
    description: "Verken de toekomst, andere werelden en de grenzen van de menselijke verbeelding.",
    genres: ["Sci-Fi"],
    gradient: "from-blue-950 via-indigo-950 to-violet-950",
    glowColor: "shadow-blue-500/25",
  },
  {
    id: "mysterie",
    emoji: "🔍",
    label: "Mysterie & Intriges",
    description: "Duister, onthullend en vol verrassingen — voor wie van raadsels houdt.",
    genres: ["Mystery", "Crime", "Thriller"],
    gradient: "from-purple-950 via-violet-950 to-indigo-950",
    glowColor: "shadow-purple-500/25",
  },
  {
    id: "actie",
    emoji: "⚡",
    label: "Actie & Adrenaline",
    description: "Hou je vast — non-stop actie, explosies en spanning van begin tot einde.",
    genres: ["Actie", "Avontuur"],
    gradient: "from-orange-950 via-red-950 to-rose-950",
    glowColor: "shadow-orange-500/25",
  },
  {
    id: "emotie",
    emoji: "🎭",
    label: "Emotioneel & Diep",
    description: "Krachtige verhalen die raken, bewegen en lang bij je blijven.",
    genres: ["Drama", "Historisch"],
    gradient: "from-rose-950 via-pink-950 to-fuchsia-950",
    glowColor: "shadow-rose-500/25",
  },
  {
    id: "lachen",
    emoji: "😄",
    label: "Lachen & Luchtig",
    description: "Ontspan en lach — perfect voor als je iets vrolijks wil na een lange dag.",
    genres: ["Komedie"],
    gradient: "from-yellow-950 via-amber-950 to-orange-950",
    glowColor: "shadow-yellow-500/25",
  },
  {
    id: "romantiek",
    emoji: "💫",
    label: "Romantisch & Magisch",
    description: "Liefdesverhalen met een vleugje magie — voor de dromer in jou.",
    genres: ["Romantiek"],
    gradient: "from-pink-950 via-rose-950 to-red-950",
    glowColor: "shadow-pink-500/25",
  },
  {
    id: "avontuur",
    emoji: "🗺️",
    label: "Avontuur & Ontdekking",
    description: "Verken het onbekende — van de diepzee tot andere planeten.",
    genres: ["Avontuur", "Sci-Fi", "Actie"],
    gradient: "from-teal-950 via-emerald-950 to-green-950",
    glowColor: "shadow-teal-500/25",
  },
];
