// Core data types for Anime Resume Studio
export interface ProfileData {
  name: string;
  codename: string;
  title: string;
  location: string;
  bio: string;
  stats: {
    chakra: number;
    focus: number;
    creativity: number;
  };
  contact: {
    email: string;
    linkedin: string;
    github: string;
    website: string;
  };
  level?: number;
  class?: string;
  guild?: string;
  currentObjective?: string;
  favoriteQuote?: string;
  specialties?: string[];
  badges?: Badge[];
  avatar?: AvatarConfig;
  personalityTraits?: Record<string, number>;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedDate: string;
}

export interface AvatarConfig {
  url: string;
  style: string;
  background: string;
  effects: string[];
}

export interface Mission {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  longDescription?: string;
  rank: 'D' | 'C' | 'B' | 'A' | 'S' | 'SS' | 'SSS';
  status: 'completed' | 'in-progress' | 'legendary';
  tech: string[];
  impact: string;
  team: number;
  duration: string;
  type: 'work' | 'project' | 'freelance';
  company?: string;
  position?: string;
  startDate?: string;
  endDate?: string;
  role?: string;
  achievements?: string[];
  metrics?: Record<string, string>;
  rewards?: string[];
  links?: {
    demo?: string;
    github?: string;
    website?: string;
    case_study?: string;
    article?: string;
    ios?: string;
    android?: string;
    trailer?: string;
    docs?: string;
  };
  tags?: string[];
  icon?: string;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  experienceGained?: number;
  skillsUnlocked?: string[];
  progress?: number;
  nextMilestone?: string;
  expectedCompletion?: string;
}

export interface MissionsData {
  missions: Mission[];
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: number;
  maxLevel: number;
  description: string;
  icon?: string;
  prerequisites?: string[];
  unlocked: boolean;
}

export type SkillCategory = 'Frontend' | 'Backend' | 'DevOps' | 'Design' | 'Languages' | 'Styling' | 'Mobile' | 'Database' | 'AI/ML' | 'Other';

export interface SkillsData {
  categories: SkillCategory[];
  skills: Skill[];
}

export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  primary?: string; // For backward compatibility
}

export interface ThemesData {
  themes: Record<string, Theme>;
}

// Animation and UI types
export interface MotionConfig {
  initial: Record<string, any>;
  animate: Record<string, any>;
  transition: Record<string, any>;
}

export interface ExportOptions {
  format: 'pdf' | 'json' | 'html' | 'image';
  theme: string;
  sections: string[];
  quality?: 'draft' | 'standard' | 'high';
}

// Component prop types
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface CardProps extends ComponentProps {
  variant?: 'default' | 'outlined' | 'filled' | 'glass';
  interactive?: boolean;
  glowEffect?: boolean;
}

export interface StatBarProps {
  label: string;
  value: number;
  maxValue: number;
  color?: string;
  animated?: boolean;
  showValue?: boolean;
}

// Utility types
export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';
export type MissionStatus = 'completed' | 'in-progress' | 'legendary';
export type MissionRank = 'D' | 'C' | 'B' | 'A' | 'S' | 'SS' | 'SSS';

// Easter egg types for developers
export interface EasterEgg {
  id: string;
  trigger: string;
  message: string;
  animation?: string;
  sound?: string;
}