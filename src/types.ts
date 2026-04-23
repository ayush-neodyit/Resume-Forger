/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PersonalDetails {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  jobTitle: string;
  summary: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
}

export interface ResumeData {
  personal: PersonalDetails;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  templateId: string;
}

export type SectionType = 'education' | 'experience' | 'skills' | 'projects';
