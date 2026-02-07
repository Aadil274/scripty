import { ReactNode } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface OutputSectionProps {
  icon: ReactNode;
  title: string;
  content: string;
  delay?: number;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export function OutputSection({ 
  icon, 
  title, 
  content, 
  delay = 0,
  isExpanded = true,
  onToggle 
}: OutputSectionProps) {
  if (!content) return null;
  
  return (
    <div 
      className="glass-card p-6 mb-5 animate-slide-up" 
      style={{ animationDelay: `${delay}s` }}
    >
      <button 
        onClick={onToggle}
        className="w-full flex items-center justify-between group"
      >
        <h2 className="section-heading flex items-center gap-2">
          {icon}
          {title}
        </h2>
        <span className="text-muted-foreground group-hover:text-foreground transition-colors">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </span>
      </button>
      
      {isExpanded && (
        <pre className="code-block mt-4">{content}</pre>
      )}
    </div>
  );
}
