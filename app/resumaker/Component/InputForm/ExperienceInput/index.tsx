import React, { useState } from 'react';
import { Input } from '../../../../components/Input';
import { Experience } from '../../../../type/resume.type';
type ExperienceInputProps = {
  experiences: Experience[];
  onChange: (experiences: Experience[]) => void;
};

const ExperienceInput: React.FC<ExperienceInputProps> = ({ 
  experiences, 
  onChange 
}) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  
  const handleAddExperience = () => {
    const newExperience: Experience = {
      company: "",
      role: "",
      startDate: new Date(),
      endDate: undefined,
      description: ""
    };
    onChange([...experiences, newExperience]);
    setCurrentIndex(experiences.length);
  };

  const handleRemoveExperience = (index: number) => {
    const newExperiences = [...experiences];
    newExperiences.splice(index, 1);
    onChange(newExperiences);
    setCurrentIndex(null);
  };

  const handleExperienceChange = (
    index: number, 
    field: keyof Experience, 
    value:any
  ) => {
    const newExperiences = [...experiences];
    newExperiences[index] = {
      ...newExperiences[index],
      [field]: value
    };
    onChange(newExperiences);
  };

const formatDateForInput = (date: Date | null): string => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
    
        <button
          type="button"
          onClick={handleAddExperience}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          Add Experience
        </button>
      </div>

      {experiences.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500">No experiences added yet</p>
          <button
            type="button"
            onClick={handleAddExperience}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Your First Experience
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div 
              key={index}
              className={`border rounded-xl p-5 transition-all duration-300 ${
                currentIndex === index 
                  ? "border-blue-500 bg-blue-50 shadow-sm" 
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium text-gray-800">
                  {exp.company || "New Experience"}
                </h4>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveExperience(index);
                  }}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                  label="Company"
                  value={exp.company}
                  onChange={(value) => handleExperienceChange(index, 'company', value)}
                  placeholder="Company name"
                  size="sm"
                />
                <Input
                  label="Role"
                  value={exp.role}
                  onChange={(value) => handleExperienceChange(index, 'role', value)}
                  placeholder="Your position"
                  size="sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                  type="date"
                  label="Start Date"
                  value={exp.startDate ? formatDateForInput(exp.startDate) : ""}
                  onChange={(value) => handleExperienceChange(index, 'startDate', value ? new Date(value) : null)}
                  size="sm"
                />
                <div className="flex items-end">
                  <Input
                    type="date"
                    label="End Date"
                    value={exp.endDate ? formatDateForInput(exp.endDate) : ""}
                    onChange={(value) => handleExperienceChange(index, 'endDate', value ? new Date(value) : null)}
                    size="sm"
                    className="flex-1"
                  />
                  <label className="ml-3 flex items-center h-10 mb-1">
                    <input
                      type="checkbox"
                      checked={!exp.endDate}
                      onChange={(e) => handleExperienceChange(
                        index, 
                        'endDate', 
                        e.target.checked ? null : new Date()
                      )}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Present</span>
                  </label>
                </div>
              </div>

              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={exp.description}
                  onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                  placeholder="Describe your responsibilities and achievements"
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              <div className="mb-2">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Description
  </label>
  <textarea
    value={exp.description}
    onChange={(e) =>
      handleExperienceChange(index, "description", e.target.value)
    }
    placeholder="Describe your responsibilities and achievements"
    rows={3}
    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
  />
</div>

{/* NEW: Achievements input */}
<div className="mb-2">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Achievements
  </label>
  <div className="space-y-2">
    {exp.achievements?.map((ach, achIndex) => (
      <div key={achIndex} className="flex gap-2 items-center">
        <Input
          value={ach}
          onChange={(value) => {
            const newAchievements = exp.achievements ? [...exp.achievements] : [];
            newAchievements[achIndex] = value;
            handleExperienceChange(index, "achievements", newAchievements);
          }}
          placeholder={`Achievement ${achIndex + 1}`}
          size="sm"
          className="flex-1"
        />
        <button
          type="button"
          onClick={() => {
            const newAchievements = (exp.achievements || []).filter(
              (_, i) => i !== achIndex
            );
            handleExperienceChange(index, "achievements", newAchievements);
          }}
          className="text-red-500 hover:text-red-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 6a1 1 0 011 1v6a1 1 0 102 0V7a1 1 0 00-1-1H6zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V6a1 1 0 00-1-1h-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={() => {
        const newAchievements = exp.achievements
          ? [...exp.achievements, ""]
          : [""];
        handleExperienceChange(index, "achievements", newAchievements);
      }}
      className="text-blue-600 hover:text-blue-800 text-sm"
    >
      + Add Achievement
    </button>
  </div>
</div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceInput;