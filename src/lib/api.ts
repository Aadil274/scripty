import { supabase } from "@/integrations/supabase/client";
import type { FormData, FilmBlueprint } from "@/types";

export async function generateBlueprint(formData: FormData): Promise<FilmBlueprint> {
  const { data, error } = await supabase.functions.invoke('generate-blueprint', {
    body: {
      genre: formData.genre,
      tone: formData.tone,
      logline: formData.logline,
      setting: formData.setting,
      era: formData.era,
      visualStyle: formData.visualStyle,
      budget: formData.budget,
    },
  });

  if (error) {
    console.error('Error generating blueprint:', error);
    throw new Error(error.message || 'Failed to generate blueprint');
  }

  if (data.error) {
    throw new Error(data.error);
  }

  return data.blueprint;
}

export async function continueStory(existingStory: string, direction?: string): Promise<string> {
  const { data, error } = await supabase.functions.invoke('continue-story', {
    body: {
      existingStory,
      direction,
    },
  });

  if (error) {
    console.error('Error continuing story:', error);
    throw new Error(error.message || 'Failed to continue story');
  }

  if (data.error) {
    throw new Error(data.error);
  }

  return data.continuation;
}
