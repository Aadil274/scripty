import type { FormData } from "@/types";

interface QuickSuggestionsProps {
  setFormData: (updater: (prev: FormData) => FormData) => void;
}

const genreSuggestions = [
  { emoji: "🚀", label: "Sci-Fi", value: "Sci-Fi" },
  { emoji: "❤️", label: "Romance", value: "Romance" },
  { emoji: "🔪", label: "Thriller", value: "Thriller" },
  { emoji: "🎭", label: "Drama", value: "Drama" },
  { emoji: "👻", label: "Horror", value: "Horror" },
  { emoji: "🕵️", label: "Noir", value: "Noir" },
];

const toneSuggestions = [
  { emoji: "🌑", label: "Dark & Gritty", value: "Dark & Gritty" },
  { emoji: "✨", label: "Whimsical", value: "Whimsical" },
  { emoji: "🎭", label: "Melancholic", value: "Melancholic" },
  { emoji: "⚡", label: "Intense", value: "Intense" },
];

const visualSuggestions = [
  { emoji: "🌈", label: "Neon", value: "Neon-lit cyberpunk" },
  { emoji: "🎞️", label: "Film Noir", value: "High contrast black & white" },
  { emoji: "🌅", label: "Golden Hour", value: "Warm golden naturalism" },
  { emoji: "❄️", label: "Desaturated", value: "Cold desaturated realism" },
];

const eraSuggestions = [
  { emoji: "🤖", label: "Near Future", value: "Near Future (2040s)" },
  { emoji: "📼", label: "1980s", value: "1980s" },
  { emoji: "🎩", label: "Victorian", value: "Victorian Era" },
  { emoji: "📱", label: "Present Day", value: "Contemporary" },
];

const loglineSuggestions = [
  { emoji: "🌍", label: "Lone Wanderer", value: "A lone wanderer discovers a hidden truth that could change everything." },
  { emoji: "💫", label: "Strangers Collide", value: "Two strangers meet under impossible circumstances and must trust each other to survive." },
  { emoji: "🔮", label: "Hidden Power", value: "An ordinary person discovers they have an extraordinary gift—and dangerous people want it." },
];

export function QuickSuggestions({ setFormData }: QuickSuggestionsProps) {
  const applyField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-5">
      <h3 className="text-accent font-display text-lg">⚡ Quick Fill</h3>
      
      <div>
        <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Genre</p>
        <div className="flex flex-wrap gap-2">
          {genreSuggestions.map((s) => (
            <button key={s.label} onClick={() => applyField('genre', s.value)} className="suggestion-chip text-xs">
              {s.emoji} {s.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Tone</p>
        <div className="flex flex-wrap gap-2">
          {toneSuggestions.map((s) => (
            <button key={s.label} onClick={() => applyField('tone', s.value)} className="suggestion-chip text-xs">
              {s.emoji} {s.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Visual Style</p>
        <div className="flex flex-wrap gap-2">
          {visualSuggestions.map((s) => (
            <button key={s.label} onClick={() => applyField('visualStyle', s.value)} className="suggestion-chip text-xs">
              {s.emoji} {s.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Era</p>
        <div className="flex flex-wrap gap-2">
          {eraSuggestions.map((s) => (
            <button key={s.label} onClick={() => applyField('era', s.value)} className="suggestion-chip text-xs">
              {s.emoji} {s.label}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Logline Ideas</p>
        <div className="space-y-2">
          {loglineSuggestions.map((s) => (
            <button key={s.label} onClick={() => applyField('logline', s.value)} className="suggestion-chip w-full text-left text-xs">
              {s.emoji} {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
