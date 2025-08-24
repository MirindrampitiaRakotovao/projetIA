export interface Suspect {
  id: string;
  name: string;
}

export interface Crime {
  id: string;
  name: string;
  icon: string;
}

export interface Evidence {
  type: string;
  suspect: string;
  crime: string;
  label: string;
  icon: string;
}

export interface CrimeAnalysis {
  suspect: string;
  crime: string;
  evidences: Evidence[];
  isGuilty: boolean;
  reasoning: string[];
}