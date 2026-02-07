export interface FilmBlueprint {
  story: string;
  characters: string;
  characterDesign: string;
  locations: string;
  screenplay: string;
  storyboard: string;
  visualStyle: string;
  costumes: string;
  props: string;
  sound: string;
  shots: string;
  lighting: string;
  production: string;
  casting: string;
}

export interface Suggestion {
  id: string;
  author: string;
  section: 'story' | 'characters' | 'screenplay' | 'sound' | 'shots' | 'production' | 'visual' | 'general';
  content: string;
  timestamp: Date;
  votes: number;
  hasVoted: boolean;
}

export interface FormData {
  genre: string;
  tone: string;
  logline: string;
  setting: string;
  era: string;
  visualStyle: string;
  budget: 'low' | 'medium' | 'high';
}
