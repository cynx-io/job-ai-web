// lib/types.ts

export type ResumeFormData = {
  basicInfo: BasicInfo;
  workExperience: WorkExperience[];
  education: Education[];
  projects: Project[];
  skills: string;
};

export type BasicInfo = {
  name: string;
  sumary: string;
  email: string;
  phone: string;
  location: string;
  website: string;
};

export type WorkExperience = {
  company: string;
  position: string;
  date: string;
  description: string;
};

export type Education = {
  institution: string;
  degree: string;
  date: string;
  gpa: string;
  description: string;
};

export type Project = {
  name: string;
  description: string;
  date: string;
};

export type Skill = {
  name: string;
  level: string;
};
