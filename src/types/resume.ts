export interface PersonalInfo {
  name: string;
  title: string;
  avatar?: string;
  location: string;
  email: string;
  phone?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  summary: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-100
  category: SkillCategory;
  icon?: string;
  color?: string;
}

export type SkillCategory = 
  | "frontend"
  | "backend" 
  | "mobile"
  | "database"
  | "devops"
  | "design"
  | "other";

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string; // YYYY-MM format
  endDate?: string; // YYYY-MM format, undefined for current
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  type: ExperienceType;
}

export type ExperienceType = "work" | "internship" | "freelance" | "project";

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string; // YYYY-MM format
  endDate?: string; // YYYY-MM format
  gpa?: number;
  honors?: string[];
  relevantCourses?: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  startDate: string; // YYYY-MM format
  endDate?: string; // YYYY-MM format
  status: ProjectStatus;
  links: {
    demo?: string;
    github?: string;
    website?: string;
  };
  images?: string[];
  highlights: string[];
}

export type ProjectStatus = "completed" | "in-progress" | "planned" | "on-hold";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string; // YYYY-MM format
  issuer?: string;
  type: AchievementType;
  link?: string;
}

export type AchievementType = 
  | "certification"
  | "award"
  | "publication"
  | "speaking"
  | "competition"
  | "other";

export interface Language {
  id: string;
  name: string;
  proficiency: LanguageProficiency;
}

export type LanguageProficiency = 
  | "native"
  | "fluent"
  | "intermediate"
  | "beginner";

export interface Interest {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  achievements: Achievement[];
  languages: Language[];
  interests: Interest[];
  metadata: {
    lastUpdated: string;
    version: string;
    theme: "light" | "dark";
  };
}

// Utility types for component props
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface SectionProps extends ComponentProps {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  delay?: number; // for animations
}

export interface CardProps extends ComponentProps {
  variant?: "default" | "outlined" | "elevated";
  interactive?: boolean;
}

// Theme and styling types
export interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface AnimationConfig {
  duration: number;
  delay: number;
  easing: string;
}

// Responsive breakpoints
export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

// Print and export types
export interface ExportOptions {
  format: "pdf" | "json" | "html";
  sections: (keyof ResumeData)[];
  theme: "light" | "dark";
  includeImages: boolean;
}