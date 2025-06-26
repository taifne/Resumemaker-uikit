
export type ResumeType = {
  _id: string;
  user: string;
  title: string;
  template: string;
  summary: string;
  skills: string[];
  experience: {
    company: string;
    role: string;
    startDate: Date;
    endDate: Date;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    startDate: Date;
    endDate: Date;
    description: string;
  }[];
  generatedText?: string;
  createdAt: Date;
  updatedAt: Date;
};
const mockResume: ResumeType = {
  _id:"1",
  user: "2",
  title: "Frontend Developer Resume",
  template: "modern-blue",
  summary: "Passionate frontend developer with 3+ years of experience building responsive and user-friendly web applications.",
  skills: ["JavaScript", "React", "TypeScript", "CSS", "HTML"],
  experience: [
    {
      company: "Tech Solutions Inc",
      role: "Frontend Developer",
      startDate: new Date("2021-05-01"),
      endDate: new Date("2023-06-30"),
      description: "Developed and maintained web applications using React and TypeScript."
    },
    {
      company: "Webify Labs",
      role: "Junior Frontend Developer",
      startDate: new Date("2019-07-01"),
      endDate: new Date("2021-04-30"),
      description: "Assisted in building UI components and enhancing website performance."
    }
  ],
  education: [
    {
      institution: "University of Technology",
      degree: "Bachelor of Science in Computer Science",
      startDate: new Date("2015-09-01"),
      endDate: new Date("2019-06-30"),
      description: "Graduated with honors. Focused on software development and web technologies."
    }
  ],
  generatedText: "This is a sample generated resume text from AI.",
  createdAt: new Date(),
  updatedAt: new Date(),
};
 export const suggestions = [
  { label: 'Software Engineer', value: 'Software Engineer' },
  { label: 'Frontend Developer', value: 'Frontend Developer' },
  { label: 'Backend Developer', value: 'Backend Developer' },
  { label: 'Full Stack Developer', value: 'Full Stack Developer' },
  { label: 'Data Scientist', value: 'Data Scientist' },
  { label: 'DevOps Engineer', value: 'DevOps Engineer' },
  { label: 'Product Manager', value: 'Product Manager' },
  { label: 'Project Manager', value: 'Project Manager' },
  { label: 'UX Designer', value: 'UX Designer' },
  { label: 'UI Designer', value: 'UI Designer' },
  { label: 'Quality Assurance Engineer', value: 'Quality Assurance Engineer' },
  { label: 'Mobile Developer', value: 'Mobile Developer' },
  { label: 'Machine Learning Engineer', value: 'Machine Learning Engineer' },
  { label: 'Business Analyst', value: 'Business Analyst' },
  { label: 'Systems Administrator', value: 'Systems Administrator' },
  { label: 'Cloud Engineer', value: 'Cloud Engineer' },
  { label: 'Cybersecurity Specialist', value: 'Cybersecurity Specialist' },
  { label: 'Network Engineer', value: 'Network Engineer' },
  { label: 'Database Administrator', value: 'Database Administrator' },
  { label: 'Technical Support Engineer', value: 'Technical Support Engineer' },
  { label: 'IT Consultant', value: 'IT Consultant' },
  { label: 'Digital Marketing Specialist', value: 'Digital Marketing Specialist' },
  { label: 'SEO Specialist', value: 'SEO Specialist' },
  { label: 'Content Writer', value: 'Content Writer' },
  { label: 'Graphic Designer', value: 'Graphic Designer' },
  { label: 'Sales Manager', value: 'Sales Manager' },
  { label: 'Account Manager', value: 'Account Manager' },
  { label: 'HR Manager', value: 'HR Manager' },
  { label: 'Operations Manager', value: 'Operations Manager' },
  { label: 'Financial Analyst', value: 'Financial Analyst' },
];
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
