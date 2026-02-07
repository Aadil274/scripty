import { useState } from "react";
import { ThumbsUp, Send, MessageCircle, Lightbulb } from "lucide-react";
import type { Suggestion } from "@/types";

const sectionLabels = {
  story: "📖 Story",
  characters: "🫂 Characters",
  screenplay: "🎞 Screenplay",
  sound: "🎧 Sound",
  shots: "📸 Shots",
  production: "🗂 Production",
  general: "💡 General",
};

const initialSuggestions: Suggestion[] = [
  {
    id: "1",
    author: "Maya",
    section: "story",
    content: "What if the protagonist has a secret they're hiding from everyone, including the audience until the midpoint?",
    timestamp: new Date(Date.now() - 3600000),
    votes: 3,
    hasVoted: false,
  },
  {
    id: "2",
    author: "Alex",
    section: "screenplay",
    content: "The opening scene could be more impactful with complete silence - let the visuals do the talking.",
    timestamp: new Date(Date.now() - 7200000),
    votes: 5,
    hasVoted: true,
  },
  {
    id: "3",
    author: "Jordan",
    section: "characters",
    content: "Consider making the antagonist sympathetic. Maybe they have a valid reason for their actions?",
    timestamp: new Date(Date.now() - 10800000),
    votes: 2,
    hasVoted: false,
  },
];

export function TeamSuggestions() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>(initialSuggestions);
  const [newSuggestion, setNewSuggestion] = useState("");
  const [selectedSection, setSelectedSection] = useState<Suggestion['section']>("general");
  const [authorName, setAuthorName] = useState("");

  const handleVote = (id: string) => {
    setSuggestions((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, votes: s.hasVoted ? s.votes - 1 : s.votes + 1, hasVoted: !s.hasVoted }
          : s
      )
    );
  };

  const handleSubmit = () => {
    if (!newSuggestion.trim()) return;
    
    const suggestion: Suggestion = {
      id: Date.now().toString(),
      author: authorName.trim() || "Anonymous",
      section: selectedSection,
      content: newSuggestion.trim(),
      timestamp: new Date(),
      votes: 0,
      hasVoted: false,
    };
    
    setSuggestions((prev) => [suggestion, ...prev]);
    setNewSuggestion("");
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-5">
        <MessageCircle className="w-5 h-5 text-accent" />
        <h2 className="font-display text-xl text-accent">Team Ideas</h2>
      </div>
      
      <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
        Share your creative ideas with the team. Suggest plot twists, character arcs, or scene improvements.
      </p>

      {/* Add new suggestion */}
      <div className="glass-card p-4 mb-5">
        <input
          type="text"
          placeholder="Your name (optional)"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          className="glass-input px-3 py-2 w-full text-sm mb-3"
        />
        
        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value as Suggestion['section'])}
          className="glass-input px-3 py-2 w-full text-sm mb-3 cursor-pointer"
        >
          {Object.entries(sectionLabels).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
        
        <textarea
          placeholder="What if..."
          value={newSuggestion}
          onChange={(e) => setNewSuggestion(e.target.value)}
          className="glass-input px-3 py-2 w-full text-sm min-h-[80px] resize-none mb-3"
        />
        
        <button
          onClick={handleSubmit}
          disabled={!newSuggestion.trim()}
          className="gradient-button w-full py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          Share Idea
        </button>
      </div>

      {/* Suggestions list */}
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-1">
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="comment-card">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-medium text-primary-foreground">
                  {suggestion.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium">{suggestion.author}</p>
                  <p className="text-xs text-muted-foreground">{formatTime(suggestion.timestamp)}</p>
                </div>
              </div>
              <span className="text-xs px-2 py-1 rounded-lg bg-white/10 text-muted-foreground">
                {sectionLabels[suggestion.section]}
              </span>
            </div>
            
            <p className="text-sm text-foreground/90 leading-relaxed mb-3">
              {suggestion.content}
            </p>
            
            <button
              onClick={() => handleVote(suggestion.id)}
              className={`flex items-center gap-1.5 text-sm transition-colors ${
                suggestion.hasVoted ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <ThumbsUp className={`w-4 h-4 ${suggestion.hasVoted ? "fill-current" : ""}`} />
              {suggestion.votes}
            </button>
          </div>
        ))}
        
        {suggestions.length === 0 && (
          <div className="text-center py-10 text-muted-foreground">
            <Lightbulb className="w-10 h-10 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No suggestions yet.<br />Be the first to share an idea!</p>
          </div>
        )}
      </div>
    </div>
  );
}
