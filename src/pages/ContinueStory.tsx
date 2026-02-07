import { useState } from "react";
import { ArrowLeft, Sparkles, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { continueStory } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const ContinueStory = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [existingStory, setExistingStory] = useState("");
  const [continuationPrompt, setContinuationPrompt] = useState("");
  const [generatedContinuation, setGeneratedContinuation] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleContinue = async () => {
    if (!existingStory.trim()) return;
    
    setIsGenerating(true);
    try {
      const result = await continueStory(existingStory, continuationPrompt);
      setGeneratedContinuation(result);
      toast({
        title: "Story Continued",
        description: "Your story continuation has been generated with AI.",
      });
    } catch (error) {
      console.error('Continuation error:', error);
      toast({
        title: "Continuation Failed",
        description: error instanceof Error ? error.message : "Failed to continue story. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 md:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-secondary/20">
              <BookOpen className="w-8 h-8 text-secondary" />
            </div>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-medium gradient-text tracking-wide">
            Continue Your Story
          </h1>
          <p className="text-base font-light text-muted-foreground max-w-lg mx-auto mt-4 leading-relaxed">
            Paste your existing script or story excerpt, and let AI help you develop the next beats.
          </p>
        </div>

        {/* Input Section */}
        <div className="glass-card p-7 mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <h3 className="text-accent font-display text-lg mb-5">📖 Your Existing Story</h3>
          
          <textarea
            placeholder="Paste your story, screenplay excerpt, or treatment here..."
            value={existingStory}
            onChange={(e) => setExistingStory(e.target.value)}
            className="glass-input px-4 py-4 w-full min-h-[200px] resize-y"
          />

          <input
            type="text"
            placeholder="🎯 What direction should the story take? (optional)"
            value={continuationPrompt}
            onChange={(e) => setContinuationPrompt(e.target.value)}
            className="glass-input px-4 py-3.5 w-full mt-4"
          />

          <button
            onClick={handleContinue}
            disabled={isGenerating || !existingStory.trim()}
            className="gradient-button w-full mt-6 py-4 rounded-2xl text-base font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles className={`w-5 h-5 ${isGenerating ? "animate-spin" : ""}`} />
            {isGenerating ? "Generating..." : "Continue Story"}
          </button>
        </div>

        {/* Output Section */}
        {generatedContinuation && (
          <div className="glass-card p-7 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-primary font-display text-lg mb-5 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              AI Continuation
            </h3>
            <div className="code-block whitespace-pre-wrap">
              {generatedContinuation}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContinueStory;
