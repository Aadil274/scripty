import { Sparkles } from "lucide-react";
import type { FormData } from "@/types";

interface BlueprintFormProps {
  onGenerate: (data: FormData) => void;
  formData: FormData;
  setFormData: (data: FormData) => void;
  isGenerating?: boolean;
}

export function BlueprintForm({ onGenerate, formData, setFormData, isGenerating = false }: BlueprintFormProps) {
  const handleGenerate = () => {
    onGenerate(formData);
  };

  return (
    <div className="glass-card p-7 mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
      <h3 className="text-accent font-display text-lg mb-5">🎬 Project Details</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="🎭 Genre (e.g., Noir, Horror)"
          value={formData.genre}
          onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
          className="glass-input px-4 py-3.5 w-full"
        />
        <input
          type="text"
          placeholder="🌙 Tone / Mood"
          value={formData.tone}
          onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
          className="glass-input px-4 py-3.5 w-full"
        />
        <input
          type="text"
          placeholder="🎨 Visual Style (e.g., Neon, Muted)"
          value={formData.visualStyle}
          onChange={(e) => setFormData({ ...formData, visualStyle: e.target.value })}
          className="glass-input px-4 py-3.5 w-full"
        />
        <input
          type="text"
          placeholder="🏙️ Setting (e.g., Tokyo, Small Town)"
          value={formData.setting}
          onChange={(e) => setFormData({ ...formData, setting: e.target.value })}
          className="glass-input px-4 py-3.5 w-full"
        />
        <input
          type="text"
          placeholder="⏳ Era (e.g., 1980s, Near Future)"
          value={formData.era}
          onChange={(e) => setFormData({ ...formData, era: e.target.value })}
          className="glass-input px-4 py-3.5 w-full"
        />
        <select
          value={formData.budget}
          onChange={(e) => setFormData({ ...formData, budget: e.target.value as FormData['budget'] })}
          className="glass-input px-4 py-3.5 w-full cursor-pointer"
        >
          <option value="low">💸 Low Budget</option>
          <option value="medium">🎥 Medium Budget</option>
          <option value="high">💎 High Budget</option>
        </select>
      </div>
      
      <input
        type="text"
        placeholder="📝 Logline — One sentence that captures your story"
        value={formData.logline}
        onChange={(e) => setFormData({ ...formData, logline: e.target.value })}
        className="glass-input px-4 py-3.5 w-full mt-4"
      />

      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="gradient-button w-full mt-6 py-4 rounded-2xl text-base font-medium flex items-center justify-center gap-2 disabled:opacity-70"
      >
        <Sparkles className={`w-5 h-5 ${isGenerating ? "animate-spin" : ""}`} />
        {isGenerating ? "Generating..." : "Generate Full Film Blueprint"}
      </button>
    </div>
  );
}
