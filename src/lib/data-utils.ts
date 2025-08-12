import { ResumeData, Skill, Experience, Project, SkillCategory } from "@/types/resume";

/**
 * Format date string to readable format
 */
export function formatDate(dateString: string, includeDay: boolean = false): string {
  if (!dateString) return "Present";
  
  const [year, month] = dateString.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    ...(includeDay && { day: "numeric" })
  };
  
  return date.toLocaleDateString("en-US", options);
}

/**
 * Calculate experience duration
 */
export function calculateDuration(startDate: string, endDate?: string): string {
  const start = new Date(startDate + "-01");
  const end = endDate ? new Date(endDate + "-01") : new Date();
  
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.44));
  
  if (diffMonths < 12) {
    return `${diffMonths} month${diffMonths > 1 ? 's' : ''}`;
  }
  
  const years = Math.floor(diffMonths / 12);
  const remainingMonths = diffMonths % 12;
  
  let result = `${years} year${years > 1 ? 's' : ''}`;
  if (remainingMonths > 0) {
    result += ` ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
  }
  
  return result;
}

/**
 * Group skills by category
 */
export function groupSkillsByCategory(skills: Skill[]): Record<SkillCategory, Skill[]> {
  return skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<SkillCategory, Skill[]>);
}

/**
 * Get top skills by level
 */
export function getTopSkills(skills: Skill[], count: number = 5): Skill[] {
  return [...skills]
    .sort((a, b) => b.level - a.level)
    .slice(0, count);
}

/**
 * Sort experience by date (most recent first)
 */
export function sortExperienceByDate(experience: Experience[]): Experience[] {
  return [...experience].sort((a, b) => {
    const aDate = a.endDate || "9999-12"; // Current positions go first
    const bDate = b.endDate || "9999-12";
    return bDate.localeCompare(aDate);
  });
}

/**
 * Sort projects by date (most recent first)
 */
export function sortProjectsByDate(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    const aDate = a.endDate || a.startDate;
    const bDate = b.endDate || b.startDate;
    return bDate.localeCompare(aDate);
  });
}

/**
 * Get current experience (no end date)
 */
export function getCurrentExperience(experience: Experience[]): Experience[] {
  return experience.filter(exp => !exp.endDate);
}

/**
 * Calculate total years of experience
 */
export function calculateTotalExperience(experience: Experience[]): number {
  const totalMonths = experience.reduce((acc, exp) => {
    const start = new Date(exp.startDate + "-01");
    const end = exp.endDate ? new Date(exp.endDate + "-01") : new Date();
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.44));
    return acc + diffMonths;
  }, 0);
  
  return Math.round((totalMonths / 12) * 10) / 10; // Round to 1 decimal place
}

/**
 * Extract unique technologies from experience and projects
 */
export function extractUniqueTechnologies(resumeData: ResumeData): string[] {
  const technologies = new Set<string>();
  
  resumeData.experience.forEach(exp => {
    exp.technologies.forEach(tech => technologies.add(tech));
  });
  
  resumeData.projects.forEach(project => {
    project.technologies.forEach(tech => technologies.add(tech));
  });
  
  return Array.from(technologies).sort();
}

/**
 * Generate resume summary statistics
 */
export function generateResumeStats(resumeData: ResumeData) {
  return {
    totalExperience: calculateTotalExperience(resumeData.experience),
    totalProjects: resumeData.projects.length,
    totalSkills: resumeData.skills.length,
    totalAchievements: resumeData.achievements.length,
    topSkills: getTopSkills(resumeData.skills, 3),
    uniqueTechnologies: extractUniqueTechnologies(resumeData).length,
    currentPositions: getCurrentExperience(resumeData.experience).length,
    completedProjects: resumeData.projects.filter(p => p.status === "completed").length,
  };
}

/**
 * Validate resume data completeness
 */
export function validateResumeData(resumeData: ResumeData): {
  isValid: boolean;
  missingFields: string[];
  warnings: string[];
} {
  const missingFields: string[] = [];
  const warnings: string[] = [];
  
  // Required fields validation
  if (!resumeData.personal.name) missingFields.push("personal.name");
  if (!resumeData.personal.email) missingFields.push("personal.email");
  if (!resumeData.personal.summary) missingFields.push("personal.summary");
  
  // Recommendations
  if (resumeData.skills.length === 0) warnings.push("No skills listed");
  if (resumeData.experience.length === 0) warnings.push("No experience listed");
  if (resumeData.projects.length === 0) warnings.push("No projects listed");
  if (!resumeData.personal.avatar) warnings.push("No profile image");
  
  return {
    isValid: missingFields.length === 0,
    missingFields,
    warnings
  };
}

/**
 * Generate skill level text
 */
export function getSkillLevelText(level: number): string {
  if (level >= 90) return "Expert";
  if (level >= 75) return "Advanced";
  if (level >= 60) return "Intermediate";
  if (level >= 40) return "Basic";
  return "Beginner";
}

/**
 * Calculate reading time for text
 */
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}

/**
 * Convert skill category to display name
 */
export function getCategoryDisplayName(category: SkillCategory): string {
  const categoryNames: Record<SkillCategory, string> = {
    frontend: "Frontend",
    backend: "Backend", 
    mobile: "Mobile",
    database: "Database",
    devops: "DevOps",
    design: "Design",
    other: "Other"
  };
  
  return categoryNames[category] || category;
}