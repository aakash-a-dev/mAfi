export interface Deadline {
  program: 'GSoC' | 'Outreachy';
  phase: string;
  date: string;
  description: string;
  url: string;
}

export interface Organization {
  name: string;
  techStack: string[];
  projectType: string;
  year: number;
  description: string;
  websiteUrl: string;
  githubUrl: string;
  isFavorite?: boolean;
}

export type TechStack = typeof import('../services/gsocService').TECH_STACKS[number];
export type ProjectType = typeof import('../services/gsocService').PROJECT_TYPES[number];
export type Year = typeof import('../services/gsocService').YEARS[number]; 