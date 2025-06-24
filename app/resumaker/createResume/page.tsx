"use client";

import React, { useState } from "react";
import { Input } from "../../components/Input"; // assume you have this

import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import Textarea from "../../components/TextArea";
import Button from "../../components/Button";
import ResumePdf from "../Component/classicResume";
import DinamicResumePdf from "../Component/dinamicResume";
import BaseResumePdf from "../Component/BaseResume";
import HarvardTemplateResumePdf from "../Component/HarvardResume";
import ElegantDarkTemplate from "../Component/VisualTemplate";
import StanfordBaseResumePdf from "../Component/StanfordResume";
import ModernElegantTemplate from "../Component/StanfordResume";
import ColorBlockTemplate from "../Component/ElegantResume";
import TwoToneSidebarTemplate from "../Component/classicResume";
import ProfessionalBlueTemplate from "../Component/dinamicResume";
import MinimalistLightTemplate from "../Component/Minilist";
import ClassicAcademicTemplate from "../Component/Academic";
import SwissResumeTemplate from "../Component/Swiss";
import ModernSwissResumeTemplate from "../Component/Morden";
import ModernChronologicalTemplate from "../Component/Modern-chronological";
import { StepInput } from "../../components/StepInput";
import { suggestions } from "../Component/data";
import Autocomplete from "../../components/Autocomplete";
import {
  Certification,
  Education,
  Experience,
  VolunteerWork,
} from "../../type/resume.type";
import ExperienceInput from "../Component/InputForm/ExperienceInput";
import { content } from "html2canvas/dist/types/css/property-descriptors/content";
import PersonalProjectsInput from "../Component/InputForm/PersonalProjectInput";
import LanguagesInput from "../Component/InputForm/LangueInput";
import EducationInput from "../Component/InputForm/EducationInput";
import VolunteerInput from "../Component/InputForm/ColunteerInput";
import CertificationsInput from "../Component/InputForm/CerInput";
import LinksInput from "../Component/InputForm/LinksInput";
import SkillsInput from "../Component/InputForm/SkillsInput";
import JobPreferencesInput from "../Component/InputForm/DesignPostionInput";
import YearPickerInput from "../../components/YearPicker";
import PersonalInfoSection, { PersonalInfo } from "../Component/InputForm/BasicInput";
import { BriefcaseIcon } from "lucide-react";

const styles = {
  page: { padding: 30 },
  section: { marginBottom: 10 },
  title: { fontSize: 24, marginBottom: 10 },
  text: { fontSize: 12 },
  heading: { fontSize: 16, fontWeight: "bold", marginBottom: 5 }, // <-- add this
};
const resumeData = {
  _id: "665e8f0d12abc3456789abcd",
  user: "665e8f0d12abc3456789aaaa",
  title: "Senior Frontend Engineer Resume",
  template: "modern-template-01",
  fullName: "Jane Elizabeth Doe",
  email: "jane.doe@example.com",
  phoneNumber: "+1-555-123-4567",
  yearBorn: 1990,
  address: "123 Main St, Apt 4B, San Francisco, CA 94105, USA",
  avatarUrl: "https://example.com/avatars/jane.jpg",
  linkedinUrl: "https://www.linkedin.com/in/janedoe",
  githubUrl: "https://github.com/janedoe",
  website: "https://janedoe.dev",
  desiredPosition: "Senior Frontend Engineer / Tech Lead",
  desiredSalary: "$130,000 - $150,000",
  availableFrom: new Date("2025-08-01"),
  summary:
    "Innovative and detail-oriented Senior Frontend Engineer with 10+ years of experience designing, developing, and managing complex web applications and internal frameworks. Passionate about creating efficient, user-friendly solutions and mentoring future tech leaders.",
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "GraphQL",
    "Tailwind CSS",
    "Node.js",
    "Jest",
    "Cypress",
    "Webpack",
    "Docker",
    "Agile/Scrum",
  ],
  experience: [
    {
      company: "TechCorp Inc.",
      role: "Senior Frontend Engineer / Tech Lead",
      location: "San Francisco, CA",
      startDate: new Date("2021-06-01"),
      endDate: null,
      description:
        "Led frontend development on major SaaS products. Collaborated with designers, backend engineers, and product managers to deliver high-quality features on time.",
      achievements: [
        "Reduced load times by 45% through advanced code-splitting and performance tuning.",
        "Spearheaded migration of legacy codebase from AngularJS to React + TypeScript.",
        "Introduced CI/CD pipelines and testing standards, cutting QA time by 30%.",
        "Mentored 7 engineers, resulting in 3 internal promotions.",
      ],
    },
    {
      company: "Webify LLC",
      role: "Frontend Developer",
      location: "Remote",
      startDate: new Date("2017-03-01"),
      endDate: new Date("2021-05-31"),
      description:
        "Built responsive, accessible web applications for e-commerce and media clients.",
      achievements: [
        "Developed a shared component library adopted across 5 company products.",
        "Improved accessibility scores (Lighthouse) from 65 to 95+.",
        "Integrated GraphQL API for real-time features, enhancing user engagement.",
      ],
    },
  ],
  education: [
    {
      institution: "University of California, Berkeley",
      degree: "BSc in Computer Science",
      location: "Berkeley, CA",
      startDate: new Date("2008-09-01"),
      endDate: new Date("2012-06-01"),
      description:
        "Graduated with honors. Specialized in software engineering and human-computer interaction.",
      gpa: "3.85",
    },
  ],
  personalProjects: [
    {
      persionalProjectName: "OpenSource UI Kit",
      domain: "UI/UX",
      description:
        "A customizable, accessible React component library for rapid prototyping.",
      technologies: ["React", "TypeScript", "Storybook", "Styled Components"],
      time: "2023",
      teamSize: 1,
      responsibilities: [
        "Design system architecture",
        "Component development",
        "Documentation",
      ],
    },
    {
      persionalProjectName: "DevBlog Platform",
      domain: "Content Management",
      description: "A headless CMS and static blog generator for developers.",
      technologies: ["Next.js", "GraphQL", "Prisma", "Vercel"],
      time: "2022",
      teamSize: 2,
      responsibilities: [
        "Frontend architecture",
        "API integration",
        "CI/CD setup",
      ],
    },
  ],
  certifications: [
    {
      cerName: "AWS Certified Developer – Associate",
      issuer: "Amazon Web Services",
      date: new Date("2023-04-15"),
    },
    {
      cerName: "Scrum Master Certification",
      issuer: "Scrum Alliance",
      date: new Date("2021-11-10"),
    },
  ],
  languages: [
    {
      langueName: "English",
      level: "Native",
    },
    {
      langueName: "Spanish",
      level: "Intermediate",
    },
  ],
  volunteerWork: [
    {
      org: "Code for Good",
      role: "Volunteer Developer",
      startDate: new Date("2020-01-01"),
      endDate: new Date("2022-01-01"),
      description:
        "Built and maintained web apps for non-profits focused on education.",
    },
    {
      org: "Women Who Code",
      role: "Mentor",
      startDate: new Date("2019-06-01"),
      endDate: null,
      description:
        "Mentor junior developers and lead workshops on React and TypeScript.",
    },
  ],
  links: [
    {
      label: "Portfolio",
      url: "https://janedoe.dev",
    },
    {
      label: "Technical Blog",
      url: "https://blog.janedoe.dev",
    },
    {
      label: "GitHub",
      url: "https://github.com/janedoe",
    },
  ],
  references: [
    {
      referName: "John Smith",
      contact: "john.smith@techcorp.com",
      relationship: "Engineering Manager at TechCorp",
    },
    {
      referName: "Emily Brown",
      contact: "emily.brown@webify.com",
      relationship: "Former Team Lead at Webify",
    },
  ],
  visibility: "public",
  isDefault: true,
  generatedText:
    "Jane Elizabeth Doe is an accomplished Senior Frontend Engineer with expertise in React, TypeScript, and modern web technologies. Her experience spans leadership, mentoring, and delivering high-performance web applications.",
  isPublished: true,
  createdAt: new Date("2025-06-22T12:00:00Z").toISOString(),
  updatedAt: new Date("2025-06-23T08:00:00Z").toISOString(),
};

const CreateResumePage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [yearBorn, setYearBorn] = useState<number | null>(null);

  const [address, setAddress] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  // Online profiles
  const [linkedinUrl, setLinkedinUrl] = useState(resumeData.linkedinUrl);
  const [githubUrl, setGithubUrl] = useState(resumeData.githubUrl);
  const [website, setWebsite] = useState(resumeData.website);

  // Summary + skills
  const [summary, setSummary] = useState(resumeData.summary);
  const [links, setLinks] = useState([
    {
      label: "Portfolio",
      url: "https://janedoe.dev",
    },
    {
      label: "Technical Blog",
      url: "https://blog.janedoe.dev",
    },
    {
      label: "GitHub",
      url: "https://github.com/janedoe",
    },
  ]);
  // Experience
  const [experience, setExperience] = useState<typeof resumeData.experience>(
    resumeData.experience
  );
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      company: "Tech Solutions Inc",
      role: "Frontend Developer",
      startDate: new Date("2021-05-01"),
      endDate: new Date("2023-06-30"),
      description:
        "Developed and maintained web applications using React and TypeScript.",
    },
    {
      company: "Webify Labs",
      role: "Junior Frontend Developer",
      startDate: new Date("2019-07-01"),
      endDate: new Date("2021-04-30"),
      description:
        "Assisted in building UI components and enhancing website performance.",
    },
  ]);
  const [projects, setProjects] = useState([
    {
      persionalProjectName: "OpenSource UI Kit",
      domain: "UI/UX",
      description:
        "A customizable, accessible React component library for rapid prototyping.",
      technologies: ["React", "TypeScript", "Storybook", "Styled Components"],
      time: "2023",
      teamSize: 1,
      responsibilities: [
        "Design system architecture",
        "Component development",
        "Documentation",
      ],
    },
    {
      persionalProjectName: "DevBlog Platform",
      domain: "Content Management",
      description: "A headless CMS and static blog generator for developers.",
      technologies: ["Next.js", "GraphQL", "Prisma", "Vercel"],
      time: "2022",
      teamSize: 2,
      responsibilities: [
        "Frontend architecture",
        "API integration",
        "CI/CD setup",
      ],
    },
  ]);
  const [volunteerWork, setVolunteerWork] = useState<VolunteerWork[]>([
    {
      org: "Code for Good",
      role: "Volunteer Developer",
      startDate: new Date("2020-01-01"),
      endDate: new Date("2022-01-01"),
      description:
        "Built and maintained web apps for non-profits focused on education.",
    },
    {
      org: "Women Who Code",
      role: "Mentor",
      startDate: new Date("2019-06-01"),
      endDate: new Date("2019-06-01"),
      description:
        "Mentor junior developers and lead workshops on React and TypeScript.",
    },
  ]);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    title: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    yearBorn: null,
    address: '',
    avatarUrl: ''
  });

  // Personal projects
  const [personalProjects, setPersonalProjects] = useState<
    typeof resumeData.personalProjects
  >(resumeData.personalProjects);

  // Languages
  const [languages, setLanguages] = useState([
    {
      langueName: "English",
      level: "Native",
    },
    {
      langueName: "Spanish",
      level: "Intermediate",
    },
  ]);
  const [education, setEducation] = useState<Education[]>([
    {
      institution: "University of California, Berkeley",
      degree: "BSc in Computer Science",
      location: "Berkeley, CA",
      startDate: new Date(),
      endDate: new Date("2012-06-01"),
      description:
        "Graduated with honors. Specialized in software engineering and human-computer interaction.",
      gpa: "3.85",
    },
  ]);
  const [skills, setSkills] = useState([
    "React",
    "Next.js",
    "TypeScript",
    "GraphQL",
    "Tailwind CSS",
    "Node.js",
    "Jest",
    "Cypress",
    "Webpack",
    "Docker",
    "Agile/Scrum",
  ]);

  // References
  const [references, setReferences] = useState<typeof resumeData.references>(
    resumeData.references
  );
  const [desiredPositions, setDesiredPositions] = useState<string[]>([
    "Frontend Developer",
    "UI/UX Designer"
  ]);
  const [desiredSalary, setDesiredSalary] = useState('$90,000 - $120,000');
  const [availableFrom, setAvailableFrom] = useState('2023-09-01');
  const [visibility, setVisibility] = useState('public');
  const [isPublished, setIsPublished] = useState(true);
  const [isDefault, setIsDefault] = useState(true);
  // Timestamps (if you want to track or display them)
  const [createdAt] = useState(resumeData.createdAt);
  const [updatedAt, setUpdatedAt] = useState(resumeData.updatedAt);

  const [generatedResume, setGeneratedResume] = useState<any>(null);

  const updateExperience = (idx: number, field: string, value: string) => {
    const updated = [...experience];
    (updated[idx] as any)[field] = value;
    setExperience(updated);
  };

  const removeExperience = (idx: number) => {
    setExperience(experience.filter((_, i) => i !== idx));
  };

  const updateEducation = (idx: number, field: string, value: string) => {
    const updated = [...education];
    (updated[idx] as any)[field] = value;
    setEducation(updated);
  };

  const removeEducation = (idx: number) => {
    setEducation(education.filter((_, i) => i !== idx));
  };

  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkills(e.target.value.split(",").map((s) => s.trim()));
  };
  const [certifications, setCertifications] = useState<Certification[]>([
    {
      cerName: "AWS Certified Developer – Associate",
      issuer: "Amazon Web Services",
      date: new Date("2023-04-15"),
    },
    {
      cerName: "Scrum Master Certification",
      issuer: "Scrum Alliance",
      date: new Date("2021-11-10"),
    },
  ]);

  const steps = [
    {
      label: "Basic Info",
      content: (
        <div className="">
         <PersonalInfoSection
        info={personalInfo}
        onChange={setPersonalInfo}
      />
        </div>
      ),
      icon:<BriefcaseIcon />
    },
    {
      label: "",
      content: (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Work Experience
          </h2>
          <ExperienceInput
            experiences={experiences}
            onChange={setExperiences}
          />
        </div>
      ),
    },
    {
      label: "",
      content: (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Personal Projects
          </h2>
          <PersonalProjectsInput projects={projects} onChange={setProjects} />
        </div>
      ),
    },
    {
      label: "",
      content: (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Language Proficiency
          </h2>
          <LanguagesInput languages={languages} onChange={setLanguages} />
        </div>
      ),
    },
    {
      label: "",
      content: (
        <div className=" p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Education History
          </h2>
          <EducationInput education={education} onChange={setEducation} />
        </div>
      ),
    },
    {
      label: "",
      content: (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Volunteer Experience
          </h2>
          <VolunteerInput
            volunteerWork={volunteerWork}
            onChange={setVolunteerWork}
          />
        </div>
      ),
    },
    {
      label: "",
      content: (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Professional Certifications
          </h2>
          <CertificationsInput
            certifications={certifications}
            onChange={setCertifications}
          />
        </div>
      ),
    },
    {
      label: "",
      content: (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Useful Links
          </h2>
          <LinksInput links={links} onChange={setLinks} />
        </div>
      ),
    },
    {
      label: "",
      content: (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Technical Skills
          </h2>
          <SkillsInput skills={skills} onChange={setSkills} />

          <div className="mt-8 p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-amber-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Skill Suggestions
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "AWS",
                "Kubernetes",
                "React Native",
                "Redux",
                "Python",
                "MongoDB",
                "PostgreSQL",
                "CI/CD",
                "Web Security",
                "UX/UI Design",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-white border border-amber-200 rounded-full text-sm text-gray-600 cursor-pointer hover:bg-amber-50"
                  onClick={() =>
                    setSkills((prev) =>
                      prev.includes(skill) ? prev : [...prev, skill]
                    )
                  }
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "",
      content: (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Job Preferences
      </h2>
      <JobPreferencesInput
        desiredPositions={desiredPositions}
        setDesiredPositions={setDesiredPositions}
        desiredSalary={desiredSalary}
        setDesiredSalary={setDesiredSalary}
        availableFrom={availableFrom}
        setAvailableFrom={setAvailableFrom}
        visibility={visibility}
        setVisibility={setVisibility}
        isPublished={isPublished}
        setIsPublished={setIsPublished}
        isDefault={isDefault}
        setIsDefault={setIsDefault}
      />
    </div>
  ),
    },
    // Continue for other steps similarly...
  ];

    const handleFinish = () => {
  
  };

  const handleStepChange = (currentStep: number) => {
    console.log("Current step changed to:", currentStep);
  };

  const handleBeforeStepChange = async (currentStep: number, direction: "next" | "prev") => {
    console.log(`Trying to go ${direction} from step ${currentStep}`);

    return true;
  };
  return (
    <div className="flex w-full h-screen">
      {/* Left: Form */}
      <div className="w-1/2 p-6 overflow-visible h-[860px] ">
        <h1 className="text-xl font-bold mb-4">Create Resume</h1>
       <StepInput
        steps={steps}
        onFinish={handleFinish}
        onStepChange={handleStepChange}
        beforeStepChange={handleBeforeStepChange}
        buttonPosition="both"
        progressBarStyle="line"
        transitionType="slide"
        customButtonLabels={{
          back: "Previous",
          next: "Continue",
          finish: "Submit",
        }}
       colorTheme={{
  primary: "#10b981",    // emerald-500
  secondary: "#e5e7eb",  // gray-200 (softer secondary)
  text: "#1f2937",       // gray-800 (darker text for contrast)
}}

        disableNextOn={(stepIndex) => stepIndex === 100} 
        height="100%"
      />
      </div>

      {/* Right: PDF Preview */}
      <div className="w-1/2 p-4 bg-gray-100">
        {generatedResume && (
          <PDFViewer style={{ width: "100%", height: "100%" }}>
            <ModernChronologicalTemplate resume={resumeData} />
          </PDFViewer>
        )}
      </div>
    </div>
  );
};

export default CreateResumePage;
