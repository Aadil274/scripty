import { Clapperboard } from "lucide-react";

export function Hero() {
  return (
    <div className="text-center mb-10 animate-fade-in">
      <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium gradient-text tracking-wide flex items-center justify-center gap-4">
        <Clapperboard className="w-12 h-12 md:w-14 md:h-14 text-secondary" />
        Scriptoria
      </h1>
      <p className="text-base font-light text-muted-foreground max-w-lg mx-auto mt-4 leading-relaxed">
        Where ideas turn into cinema.<br />
        AI-powered film pre-production, designed for creators.
      </p>
      <p className="italic text-sm text-primary mt-5">
        "Every great film begins as a fragile thought."
      </p>
    </div>
  );
}
