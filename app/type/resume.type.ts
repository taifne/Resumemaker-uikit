export type Experience = {
  company: string;
  role: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
  achievements?: string[];
};

export type Education = {
  institution: string;
  degree: string;
  location?: string;
  startDate: Date|null;
  endDate: Date|null;
  description?: string;
  gpa?: string;
};

export type PersonalProject = {
  persionalProjectName: string;
  domain?: string;
  description?: string;
  technologies?: string[];
  time?: string;
  teamSize?: number;
  responsibilities?: string[];
};

export type Certification = {
  cerName: string;
  issuer?: string;
  date?: Date;
};

export type Language = {
  langueName: string;
  level?: string;
};

export type Link = {
  label?: string;
  url: string;
};

export type VolunteerWork = {
  org: string;
  role?: string;
  startDate?: Date;
  endDate?: Date;
  description?: string;
};

export type Reference = {
  referName: string;
  contact: string;
  relationship?: string;
};

export type Resume = {
  _id: string;
  user: string; // userId
  title: string;
  template: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  yearBorn?: number;
  address?: string;
  avatarUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  website?: string;
  desiredPosition?: string;
  desiredSalary?: string;
  availableFrom?: Date;
  summary?: string;
  skills?: string[];
  experience?: Experience[];
  education?: Education[];
  personalProjects?: PersonalProject[];
  certifications?: Certification[];
  languages?: Language[];
  links?: Link[];
  volunteerWork?: VolunteerWork[];
  references?: Reference[];
  visibility?: 'private' | 'public' | 'linkOnly';
  isDefault?: boolean;
  generatedText?: string;
  isPublished?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateResumeDto = {
  title: string;
  template: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  yearBorn?: number;
  address?: string;
  avatarUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  website?: string;
  desiredPosition?: string;
  desiredSalary?: string;
  availableFrom?: Date;
  summary?: string;
  skills?: string[];
  experience?: Experience[];
  education?: Education[];
  personalProjects?: PersonalProject[];
  certifications?: Certification[];
  languages?: Language[];
  links?: Link[];
  volunteerWork?: VolunteerWork[];
  references?: Reference[];
  visibility?: 'private' | 'public' | 'linkOnly';
  isDefault?: boolean;
  generatedText?: string;
  isPublished?: boolean;
};

export type UpdateResumeDto = Partial<CreateResumeDto>;
