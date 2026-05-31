export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  github: string;
  linkedin: string;
  twitter: string;
  email: string;
  company?: string;
  duration?: string;
}

export interface ExperienceItem {
  id: string;
  date: string;
  title: string;
  description?: string;
}

export interface TechnologyCategory {
  id: string;
  category: string;
  skills: string;
}

export interface EducationItem {
  id: string;
  period: string;
  institution: string;
  credential: string;
  details?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description?: string;
  technologies?: string[];
  bulletPoints?: string[];
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  experiences: ExperienceItem[];
  technologies: TechnologyCategory[];
  educations: EducationItem[];
  projects: ProjectItem[];
}
