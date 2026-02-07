import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const systemPrompt = `You are Scriptoria, an expert AI screenwriter and film production consultant. You help filmmakers create comprehensive film blueprints.

When given project details (genre, tone, logline, setting, era, visual style, budget), generate a complete film blueprint with these sections:

1. **Story & Structure**: A complete Write the full 3-act story here with key plot points, character motivations, and emotional beats. Include a detailed breakdown of each act and how they connect.
2. **Character Arcs**: Detailed protagonist, antagonist, and supporting character profiles with wants, needs, and arcs
3. **Character Design**: Visual identity for each character including silhouette, color palette, wardrobe evolution, and signature elements
4. **Locations**: Primary locations with production notes, symbolic significance, and environmental storytelling opportunities
5. **Screenplay**: An opening scene in proper screenplay format
6. **Storyboard Notes**: Frame-by-frame breakdown of key sequences with duration, camera notes, and purpose
7. **Visual Style Guide**: Color theory, composition principles, camera philosophy, texture/grain notes, and aspect ratio recommendations
8. **Costume Design**: Detailed costume breakdown for main characters across all acts
9. **Props & Set Design**: Hero props, talismans, and set dressing priorities
10. **Sound Design**: Sonic palette, diegetic sound, score approach, and key silence moments
11. **Shot List**: Detailed shot lists for key sequences with camera movements and timing
12. **Lighting Design**: Lighting philosophy, location-specific lighting, and emotional beat lighting
13. **Casting Breakdown**: Age ranges, key qualities, audition scenes for each role
14. **Production Plan**: Timeline, crew essentials, location strategy, equipment priorities, and schedule

Format each section with clear headers and use creative, professional film industry language. Be specific and actionable.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { genre, tone, logline, setting, era, visualStyle, budget } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const budgetLabels: Record<string, string> = {
      low: 'Low Budget',
      medium: 'Medium Budget',
      high: 'High Budget',
    };

    const userPrompt = `Create a comprehensive film blueprint for a project with these details:

Genre: ${genre || 'Mystery'}
Tone/Mood: ${tone || 'Melancholic'}
Logline: ${logline || 'A story waiting to be told.'}
Setting: ${setting || 'An unnamed city'}
Era: ${era || 'Contemporary'}
Visual Style: ${visualStyle || 'Naturalistic'}
Budget Level: ${budgetLabels[budget] || 'Medium Budget'}

Generate all 14 sections of the blueprint. Use proper formatting with section headers. Be creative, specific, and professional.`;

    console.log('Generating blueprint with Lovable AI...');
    
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'AI credits exhausted. Please add funds to continue.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';
    
    console.log('Blueprint generated successfully');

    // Parse the content into sections
    const blueprint = parseBlueprint(content);

    return new Response(JSON.stringify({ blueprint }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error generating blueprint:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function parseBlueprint(content: string) {
  const sections = {
    story: '',
    characters: '',
    characterDesign: '',
    locations: '',
    screenplay: '',
    storyboard: '',
    visualStyle: '',
    costumes: '',
    props: '',
    sound: '',
    shots: '',
    lighting: '',
    casting: '',
    production: '',
  };

  const sectionPatterns = [
    { key: 'story', patterns: ['story', 'structure', 'story & structure', 'story and structure'] },
    { key: 'characters', patterns: ['character arc', 'character arcs'] },
    { key: 'characterDesign', patterns: ['character design'] },
    { key: 'locations', patterns: ['location'] },
    { key: 'screenplay', patterns: ['screenplay'] },
    { key: 'storyboard', patterns: ['storyboard'] },
    { key: 'visualStyle', patterns: ['visual style', 'visual guide'] },
    { key: 'costumes', patterns: ['costume'] },
    { key: 'props', patterns: ['prop', 'set design'] },
    { key: 'sound', patterns: ['sound'] },
    { key: 'shots', patterns: ['shot list', 'shot'] },
    { key: 'lighting', patterns: ['lighting'] },
    { key: 'casting', patterns: ['casting'] },
    { key: 'production', patterns: ['production'] },
  ];

  // Split content by headers (## or **)
  const lines = content.split('\n');
  let currentSection = '';
  let currentContent: string[] = [];

  for (const line of lines) {
    const lowerLine = line.toLowerCase();
    const cleanLine = lowerLine.replace(/[*#]/g, '');
    let foundSection = false;

    if (line.startsWith('#') || line.startsWith('**') || /^\d+\./.test(line.trim())) {
    for (const { key, patterns } of sectionPatterns) {
      if (patterns.some(p => cleanLine.includes(p))) {
        if (currentSection && currentContent.length > 0) {
          sections[currentSection as keyof typeof sections] =
            currentContent.join('\n').trim();
        }
        currentSection = key;
        currentContent = [];
        foundSection = true;
        break;
      }
    }
  }

  if (!foundSection && currentSection) {
    currentContent.push(line);
  }
}

  // Save last section
  if (currentSection && currentContent.length > 0) {
    sections[currentSection as keyof typeof sections] = currentContent.join('\n').trim();
  }

  // If parsing failed, put everything in story
  if (!Object.values(sections).some(v => v)) {
    sections.story = content;
  }

  return sections;
}
