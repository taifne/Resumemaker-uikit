import React, { useState, useEffect } from "react";
import { Input } from "../../../../components/Input";

type PersonalProject = {
  persionalProjectName: string;
  domain: string;
  description: string;
  technologies: string[];
  time: string;
  teamSize: number;
  responsibilities: string[];
};

type PersonalProjectsInputProps = {
  projects: PersonalProject[];
  onChange: (projects: PersonalProject[]) => void;
};

const PersonalProjectsInput: React.FC<PersonalProjectsInputProps> = ({
  projects,
  onChange,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [techInput, setTechInput] = useState<string>("");
  const [responsibilityInput, setResponsibilityInput] = useState<string>("");

  const handleAddProject = () => {
    const newProject: PersonalProject = {
      persionalProjectName: "New Project",
      domain: "",
      description: "",
      technologies: [],
      time: new Date().getFullYear().toString(),
      teamSize: 1,
      responsibilities: [],
    };
    onChange([...projects, newProject]);
    setActiveIndex(projects.length);
  };

  const handleRemoveProject = (index: number) => {
    const newProjects = [...projects];
    newProjects.splice(index, 1);
    onChange(newProjects);
    setActiveIndex(null);
  };

  const handleProjectChange = (
    index: number,
    field: keyof PersonalProject,
    value: string | number | string[]
  ) => {
    const newProjects = [...projects];
    newProjects[index] = {
      ...newProjects[index],
      [field]: value,
    };
    onChange(newProjects);
  };

  const handleAddTechnology = (index: number) => {
    if (techInput.trim()) {
      const newTechs = [...projects[index].technologies, techInput.trim()];
      handleProjectChange(index, "technologies", newTechs);
      setTechInput("");
    }
  };

  const handleRemoveTechnology = (index: number, techIndex: number) => {
    const newTechs = [...projects[index].technologies];
    newTechs.splice(techIndex, 1);
    handleProjectChange(index, "technologies", newTechs);
  };

  const handleAddResponsibility = (index: number) => {
    if (responsibilityInput.trim()) {
      const newResponsibilities = [
        ...projects[index].responsibilities,
        responsibilityInput.trim(),
      ];
      handleProjectChange(index, "responsibilities", newResponsibilities);
      setResponsibilityInput("");
    }
  };

  const handleRemoveResponsibility = (index: number, respIndex: number) => {
    const newResponsibilities = [...projects[index].responsibilities];
    newResponsibilities.splice(respIndex, 1);
    handleProjectChange(index, "responsibilities", newResponsibilities);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
      
        <button
          type="button"
          onClick={handleAddProject}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clipRule="evenodd"
            />
          </svg>
          Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-400"
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
          <h4 className="mt-4 text-lg font-medium text-gray-700">
            No projects added yet
          </h4>
          <p className="mt-1 text-gray-500">
            Showcase your personal projects and side work
          </p>
          <button
            type="button"
            onClick={handleAddProject}
            className="mt-6 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Add Your First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`relative border rounded-xl p-5 transition-all duration-300 ${
                activeIndex === index
                  ? "border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg transform -translate-y-0.5"
                  : "border-gray-200 hover:border-blue-300 hover:shadow-md"
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveProject(index);
                  }}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <Input
                    label="Project Name"
                    value={project.persionalProjectName}
                    onChange={(value) =>
                      handleProjectChange(index, "persionalProjectName", value)
                    }
                    placeholder="My Awesome Project"
                    size="sm"
                    className="font-bold text-lg"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Domain"
                    value={project.domain}
                    onChange={(value) =>
                      handleProjectChange(index, "domain", value)
                    }
                    placeholder="UI/UX, Web Dev, etc."
                    size="sm"
                  />
                  <Input
                    type="number"
                    label="Team Size"
                    value={project.teamSize.toString()}
                    onChange={(value) =>
                      handleProjectChange(
                        index,
                        "teamSize",
                        parseInt(value) || 1
                      )
                    }
                    size="sm"
                  />
                </div>

                <div>
                  <Input
                    label="Time Period"
                    value={project.time}
                    onChange={(value) =>
                      handleProjectChange(index, "time", value)
                    }
                    placeholder="2023, 2022-2023, etc."
                    size="sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={project.description}
                    onChange={(e) =>
                      handleProjectChange(index, "description", e.target.value)
                    }
                    placeholder="Describe your project, goals, and outcomes..."
                    rows={3}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Technologies
                    <span className="ml-1 text-xs text-gray-500">
                      (Press Enter to add)
                    </span>
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.technologies.map((tech, techIndex) => (
                      <div
                        key={techIndex}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        <span>{tech}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveTechnology(index, techIndex);
                          }}
                          className="text-blue-600 hover:text-blue-900"
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
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTechnology(index);
                        }
                      }}
                      placeholder="Add technology..."
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddTechnology(index);
                      }}
                      className="px-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Responsibilities
                    <span className="ml-1 text-xs text-gray-500">
                      (One per line)
                    </span>
                  </label>
                  <div className="space-y-2 mb-3">
                    {project.responsibilities.map((resp, respIndex) => (
                      <div
                        key={respIndex}
                        className="flex items-start gap-2 px-3 py-2 bg-gray-50 rounded-lg"
                      >
                        <span className="text-blue-500 mt-0.5">•</span>
                        <span className="flex-1">{resp}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveResponsibility(index, respIndex);
                          }}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <textarea
                      value={responsibilityInput}
                      onChange={(e) => setResponsibilityInput(e.target.value)}
                      placeholder="Add responsibility..."
                      rows={2}
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddResponsibility(index);
                      }}
                      className="px-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors self-start mt-0.5"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonalProjectsInput;
