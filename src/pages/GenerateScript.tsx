import { useState } from "react";
import { 
  BookOpen, Users, Film, Music, Camera, ClipboardList, 
  Palette, MapPin, Layout, Shirt, Package, Lightbulb, UserCheck,
  ChevronDown, ChevronUp, ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { BlueprintForm } from "@/components/BlueprintForm";
import { OutputSection } from "@/components/OutputSection";
import { QuickSuggestions } from "@/components/QuickSuggestions";
import { TeamSuggestions } from "@/components/TeamSuggestions";
import { ExportActions } from "@/components/ExportActions";
import { generateBlueprint } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import type { FormData, FilmBlueprint } from "@/types";

const budgetLabels = {
  low: "💸 Low Budget",
  medium: "🎥 Medium Budget",
  high: "💎 High Budget",
};

const GenerateScript = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    genre: "",
    tone: "",
    logline: "",
    setting: "",
    era: "",
    visualStyle: "",
    budget: "medium",
  });

  const [blueprint, setBlueprint] = useState<FilmBlueprint>({
    story: "",
    characters: "",
    characterDesign: "",
    locations: "",
    screenplay: "",
    storyboard: "",
    visualStyle: "",
    costumes: "",
    props: "",
    sound: "",
    shots: "",
    lighting: "",
    production: "",
    casting: "",
  });

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    story: true,
    characters: true,
    characterDesign: true,
    locations: true,
    screenplay: true,
    storyboard: true,
    visualStyle: true,
    costumes: true,
    props: true,
    sound: true,
    shots: true,
    lighting: true,
    production: true,
    casting: true,
  });

  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGenerate = async (data: FormData) => {
    setIsGenerating(true);
    try {
      const result = await generateBlueprint(data);
      setBlueprint(result);
      toast({
        title: "Blueprint Generated",
        description: "Your film blueprint has been created with AI.",
      });
    } catch (error) {
      console.error('Generation error:', error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate blueprint. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const hasContent = Object.values(blueprint).some(v => v);

  return (
    <div className="min-h-screen px-4 py-8 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <Hero />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <BlueprintForm
              onGenerate={handleGenerate}
              formData={formData}
              setFormData={setFormData}
              isGenerating={isGenerating}
            />

            {hasContent && (
              <div className="mb-6 flex flex-wrap gap-2">
                <button 
                  onClick={() => setExpandedSections(prev => {
                    const allExpanded = Object.values(prev).every(v => v);
                    const newState: Record<string, boolean> = {};
                    Object.keys(prev).forEach(k => newState[k] = !allExpanded);
                    return newState;
                  })}
                  className="action-button !flex-none text-sm flex items-center gap-2"
                >
                  {Object.values(expandedSections).every(v => v) ? (
                    <><ChevronUp className="w-4 h-4" /> Collapse All</>
                  ) : (
                    <><ChevronDown className="w-4 h-4" /> Expand All</>
                  )}
                </button>
              </div>
            )}

            <OutputSection
              icon={<BookOpen className="w-5 h-5" />}
              title="Story & Structure"
              content={blueprint.story}
              delay={0.1}
              isExpanded={expandedSections.story}
              onToggle={() => toggleSection('story')}
            />
            <OutputSection
              icon={<Users className="w-5 h-5" />}
              title="Character Arcs"
              content={blueprint.characters}
              delay={0.15}
              isExpanded={expandedSections.characters}
              onToggle={() => toggleSection('characters')}
            />
            <OutputSection
              icon={<Palette className="w-5 h-5" />}
              title="Character Design"
              content={blueprint.characterDesign}
              delay={0.2}
              isExpanded={expandedSections.characterDesign}
              onToggle={() => toggleSection('characterDesign')}
            />
            <OutputSection
              icon={<MapPin className="w-5 h-5" />}
              title="Locations"
              content={blueprint.locations}
              delay={0.25}
              isExpanded={expandedSections.locations}
              onToggle={() => toggleSection('locations')}
            />
            <OutputSection
              icon={<Film className="w-5 h-5" />}
              title="Screenplay"
              content={blueprint.screenplay}
              delay={0.3}
              isExpanded={expandedSections.screenplay}
              onToggle={() => toggleSection('screenplay')}
            />
            <OutputSection
              icon={<Layout className="w-5 h-5" />}
              title="Storyboard Notes"
              content={blueprint.storyboard}
              delay={0.35}
              isExpanded={expandedSections.storyboard}
              onToggle={() => toggleSection('storyboard')}
            />
            <OutputSection
              icon={<Palette className="w-5 h-5" />}
              title="Visual Style Guide"
              content={blueprint.visualStyle}
              delay={0.4}
              isExpanded={expandedSections.visualStyle}
              onToggle={() => toggleSection('visualStyle')}
            />
            <OutputSection
              icon={<Shirt className="w-5 h-5" />}
              title="Costume Design"
              content={blueprint.costumes}
              delay={0.45}
              isExpanded={expandedSections.costumes}
              onToggle={() => toggleSection('costumes')}
            />
            <OutputSection
              icon={<Package className="w-5 h-5" />}
              title="Props & Set Design"
              content={blueprint.props}
              delay={0.5}
              isExpanded={expandedSections.props}
              onToggle={() => toggleSection('props')}
            />
            <OutputSection
              icon={<Music className="w-5 h-5" />}
              title="Sound Design"
              content={blueprint.sound}
              delay={0.55}
              isExpanded={expandedSections.sound}
              onToggle={() => toggleSection('sound')}
            />
            <OutputSection
              icon={<Camera className="w-5 h-5" />}
              title="Shot List"
              content={blueprint.shots}
              delay={0.6}
              isExpanded={expandedSections.shots}
              onToggle={() => toggleSection('shots')}
            />
            <OutputSection
              icon={<Lightbulb className="w-5 h-5" />}
              title="Lighting Design"
              content={blueprint.lighting}
              delay={0.65}
              isExpanded={expandedSections.lighting}
              onToggle={() => toggleSection('lighting')}
            />
            <OutputSection
              icon={<UserCheck className="w-5 h-5" />}
              title="Casting Breakdown"
              content={blueprint.casting}
              delay={0.7}
              isExpanded={expandedSections.casting}
              onToggle={() => toggleSection('casting')}
            />
            <OutputSection
              icon={<ClipboardList className="w-5 h-5" />}
              title="Production Plan"
              content={blueprint.production}
              delay={0.75}
              isExpanded={expandedSections.production}
              onToggle={() => toggleSection('production')}
            />

            <ExportActions blueprint={blueprint} />
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8 space-y-6">
              {/* Quick suggestions */}
              <div className="glass-card p-5">
                <QuickSuggestions setFormData={(updater) => setFormData(updater(formData))} />
              </div>

              {/* Team suggestions */}
              <div className="glass-card p-5 min-h-[500px]">
                <TeamSuggestions />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateScript;
