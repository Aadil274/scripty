import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const systemPrompt = `You are Scriptoria, an expert AI screenwriter and story consultant. Your role is to help writers continue and develop their existing stories.

When given an existing story excerpt and an optional direction, provide:

1. **Analysis**: Brief analysis of the story's current state, tone, themes, and momentum
2. **Immediate Next Beat**: What should happen next in the narrative
3. **Suggested Continuation**: A written continuation of the story in the same style and voice
4. **Structural Notes**: How this continuation fits into the larger narrative arc
5. **Thematic Threads**: Themes to explore or reinforce
6. **Next Steps**: Actionable items for the writer

Match the writing style, voice, and format of the original excerpt. If it's a screenplay, continue in screenplay format. If it's prose, continue in prose. Be creative but consistent with the established world and characters.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { existingStory, direction } = await req.json();
    
    if (!existingStory || existingStory.trim().length === 0) {
      return new Response(JSON.stringify({ error: 'Story content is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const wordCount = existingStory.split(/\s+/).length;
    
    const userPrompt = `Here is the existing story/screenplay excerpt (${wordCount} words):

---
${existingStory}
---

${direction ? `The writer wants the story to move in this direction: "${direction}"` : 'Continue the story naturally, following its established momentum.'}

Please provide a comprehensive story continuation with all sections (Analysis, Immediate Next Beat, Suggested Continuation, Structural Notes, Thematic Threads, and Next Steps).`;

    console.log('Generating story continuation with Lovable AI...');
    
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
    
    console.log('Story continuation generated successfully');

    return new Response(JSON.stringify({ continuation: content }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error generating continuation:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
