
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