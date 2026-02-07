import { Clapperboard, Sparkles, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center mb-16 animate-fade-in">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl w-full animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <button
          onClick={() => navigate("/generate")}
          className="glass-card p-8 text-left group cursor-pointer"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-primary/20">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h2 className="font-display text-2xl text-foreground">New Script</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Start fresh with a logline and generate a complete film blueprint — from story structure to production plan.
          </p>
          <div className="mt-6 text-primary font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
            Begin Creating
            <span className="text-lg">→</span>
          </div>
        </button>

        <button
          onClick={() => navigate("/continue")}
          className="glass-card p-8 text-left group cursor-pointer"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-secondary/20">
              <BookOpen className="w-6 h-6 text-secondary" />
            </div>
            <h2 className="font-display text-2xl text-foreground">Continue Story</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Already have a story in progress? Paste your existing script and let AI help you develop it further.
          </p>
          <div className="mt-6 text-secondary font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
            Continue Writing
            <span className="text-lg">→</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Home;
