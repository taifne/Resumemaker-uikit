import React, { useState, useRef, useEffect } from "react";
import { Input } from "../../../../components/Input";

type SkillsInputProps = {
  skills: string[];
  onChange: (skills: string[]) => void;
};

const allSkills = [
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
  "JavaScript",
  "HTML5",
  "CSS3",
  "SASS/SCSS",
  "Redux",
  "Vue.js",
  "Angular",
  "Svelte",
  "Express.js",
  "NestJS",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Firebase",
  "AWS",
  "Azure",
  "Google Cloud",
  "REST API",
  "WebSockets",
  "Git",
  "CI/CD",
  "Jenkins",
  "GitHub Actions",
  "Kubernetes",
  "Terraform",
  "Python",
  "Django",
  "Flask",
  "Java",
  "Spring Boot",
  "Kotlin",
  "Swift",
  "iOS Development",
  "Android Development",
  "React Native",
  "Flutter",
  "Electron",
  "WebAssembly",
  "Three.js",
  "D3.js",
  "JIRA",
  "Confluence",
  "Figma",
  "Adobe XD",
  "Sketch",
  "UX/UI Design",
  "Responsive Design",
  "Accessibility",
  "Web Security",
  "OAuth",
  "JWT",
  "WebGL",
  "Canvas API",
  "WebRTC",
  "PWA",
  "SEO",
  "SSR",
  "CSR",
  "Static Site Generation",
  "GraphQL Apollo",
  "Prisma",
  "TypeORM",
  "Mongoose",
  "Redis",
  "Elasticsearch",
  "Kafka",
  "RabbitMQ",
  "WebSockets",
  "Socket.io",
  "TensorFlow",
  "Machine Learning",
  "Data Visualization",
  "Chart.js",
  "Jest",
  "Mocha",
  "Chai",
  "Testing Library",
  "Storybook",
  "ESLint",
  "Prettier",
  "Babel",
  "Vite",
  "Rollup",
  "Parcel",
  "Linux",
  "Bash",
  "Zsh",
  "PowerShell",
  "Nginx",
  "Apache",
  "Serverless",
  "Microservices",
  "Monorepo",
  "Lerna",
  "Yarn Workspaces",
  "Web Components",
  "Stencil",
  "LitElement",
  "RxJS",
  "Web Workers",
  "Service Workers",
  "IndexedDB",
  "LocalStorage",
  "Web Audio API",
  "Web Bluetooth",
  "AR/VR",
  "Three.js",
  "Blender",
  "Unity",
  "Blockchain",
  "Solidity",
  "Web3.js",
  "Ethers.js",
  "NFT",
  "Smart Contracts",
  "DevOps",
  "SRE",
  "Monitoring",
  "Prometheus",
  "Grafana",
  "Log Management",
  "Sentry",
  "Performance Optimization",
  "Web Vitals",
  "Lighthouse",
  "Chrome DevTools",
  "Postman",
  "Insomnia",
  "GraphQL Playground",
  "Apollo Studio",
];

const SkillsInput: React.FC<SkillsInputProps> = ({ skills, onChange }) => {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredSkills = allSkills.filter(
    (skill) =>
      skill.toLowerCase().includes(inputValue.toLowerCase()) &&
      !skills.includes(skill)
  );

  const handleAddSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      onChange([...skills, skill]);
      setInputValue("");
      setShowSuggestions(false);
    }
  };

  const handleRemoveSkill = (index: number) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    onChange(newSkills);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setShowSuggestions(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim() && filteredSkills.length > 0) {
      handleAddSkill(filteredSkills[0]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
      
        <div className="relative w-64" ref={inputRef}>
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Add a skill..."
            startIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            }
          />

          {showSuggestions && inputValue && filteredSkills.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
              {filteredSkills.slice(0, 5).map((skill, index) => (
                <div
                  key={skill}
                  className={`px-4 py-2 cursor-pointer hover:bg-amber-50 ${
                    index === 0 ? "rounded-t-lg" : ""
                  } ${
                    index === filteredSkills.length - 1 ? "rounded-b-lg" : ""
                  }`}
                  onClick={() => handleAddSkill(skill)}
                >
                  <div className="flex items-center">
                    <span className="text-amber-600 mr-2">+</span>
                    <span className="font-medium text-gray-800">{skill}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {skills.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-amber-200 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-amber-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          <h4 className="mt-4 text-xl font-semibold text-gray-700">
            No skills added
          </h4>
          <p className="mt-2 text-gray-500 max-w-md mx-auto">
            Add your technical skills and competencies to showcase your
            expertise.
          </p>
          <button
            type="button"
            onClick={() => inputRef.current?.focus()}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:opacity-90 transition-opacity shadow-lg"
          >
            Add Skills
          </button>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:border-amber-300 hover:shadow-md">
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-full px-4 py-2 group"
              >
                <span className="font-medium text-gray-800">{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(index)}
                  className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-4 text-sm text-gray-500">Add more skills</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <div className="mt-6 relative" ref={inputRef}>
            <Input
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Type to search skills..."
              startIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              }
            />

            {showSuggestions && inputValue && filteredSkills.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
                {filteredSkills.slice(0, 5).map((skill, index) => (
                  <div
                    key={skill}
                    className={`px-4 py-2 cursor-pointer hover:bg-amber-50 ${
                      index === 0 ? "rounded-t-lg" : ""
                    } ${
                      index === filteredSkills.length - 1 ? "rounded-b-lg" : ""
                    }`}
                    onClick={() => handleAddSkill(skill)}
                  >
                    <div className="flex items-center">
                      <span className="text-amber-600 mr-2">+</span>
                      <span className="font-medium text-gray-800">{skill}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {allSkills.some(
                        (s) => s.toLowerCase() === skill.toLowerCase()
                      )
                        ? "Common skill"
                        : "Specialized skill"}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsInput;
