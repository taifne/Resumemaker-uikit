import React, { useState } from 'react';
import { Input } from '../../../../components/Input';

type Language = {
  langueName: string;
  level: string;
};

type LanguagesInputProps = {
  languages: Language[];
  onChange: (languages: Language[]) => void;
};

const LanguagesInput: React.FC<LanguagesInputProps> = ({ 
  languages, 
  onChange 
}) => {
  const [newLanguage, setNewLanguage] = useState<Language>({ langueName: "", level: "Beginner" });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  
  const proficiencyLevels = [
    "Native",
    "Fluent",
    "Advanced",
    "Intermediate",
    "Beginner",
    "Basic"
  ];

  const proficiencyColors = {
    Native: "from-indigo-600 to-purple-600",
    Fluent: "from-blue-600 to-indigo-600",
    Advanced: "from-green-500 to-teal-500",
    Intermediate: "from-yellow-500 to-amber-500",
    Beginner: "from-orange-500 to-amber-500",
    Basic: "from-red-500 to-orange-500"
  };

  const proficiencyIcons = {
    Native: "🇺🇸",
    Fluent: "🗣️",
    Advanced: "📚",
    Intermediate: "💬",
    Beginner: "👶",
    Basic: "👋"
  };

  const handleAddLanguage = () => {
    if (newLanguage.langueName.trim() === "") return;
    
    if (editingIndex !== null) {
      // Update existing language
      const updatedLanguages = [...languages];
      updatedLanguages[editingIndex] = newLanguage;
      onChange(updatedLanguages);
      setEditingIndex(null);
    } else {
      // Add new language
      onChange([...languages, newLanguage]);
    }
    
    setNewLanguage({ langueName: "", level: "Beginner" });
  };

  const handleRemoveLanguage = (index: number) => {
    const newLanguages = [...languages];
    newLanguages.splice(index, 1);
    onChange(newLanguages);
  };

  const handleEditLanguage = (index: number) => {
    setNewLanguage(languages[index]);
    setEditingIndex(index);
  };

  return (
    <div className="space-y-6">
    

      {languages.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {languages.map((lang, index) => (
            <div 
              key={index}
              className="relative group border border-gray-200 rounded-xl p-4 bg-gradient-to-br from-white to-gray-50 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {lang.langueName === "English" ? "🇬🇧" : 
                       lang.langueName === "Spanish" ? "🇪🇸" : 
                       lang.langueName === "French" ? "🇫🇷" : 
                       lang.langueName === "German" ? "🇩🇪" : 
                       lang.langueName === "Chinese" ? "🇨🇳" : 
                       lang.langueName === "Japanese" ? "🇯🇵" : "🌐"}
                    </span>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {lang.langueName}
                    </h4>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg">{proficiencyIcons[lang.level as keyof typeof proficiencyIcons]}</span>
                    <span 
                      className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${proficiencyColors[lang.level as keyof typeof proficiencyColors]} text-white`}
                    >
                      {lang.level}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() => handleEditLanguage(index)}
                    className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveLanguage(index)}
                    className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${proficiencyColors[lang.level as keyof typeof proficiencyColors]}`}
                    style={{
                      width: lang.level === "Native" ? "100%" : 
                             lang.level === "Fluent" ? "90%" : 
                             lang.level === "Advanced" ? "75%" : 
                             lang.level === "Intermediate" ? "60%" : 
                             lang.level === "Beginner" ? "40%" : "25%"
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 bg-gradient-to-br from-gray-50 to-white">
        <h4 className="text-lg font-medium text-gray-800 mb-4">
          {editingIndex !== null ? "Edit Language" : "Add New Language"}
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <Input
              value={newLanguage.langueName}
              onChange={(value) => setNewLanguage({...newLanguage, langueName: value})}
              placeholder="English, Spanish, etc."
              startIcon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clipRule="evenodd" />
                </svg>
              }
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Proficiency Level
            </label>
            <div className="relative">
              <select
                value={newLanguage.level}
                onChange={(e) => setNewLanguage({...newLanguage, level: e.target.value})}
                className="w-full pl-10 pr-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 appearance-none"
              >
                {proficiencyLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">
                {proficiencyIcons[newLanguage.level as keyof typeof proficiencyIcons]}
              </span>
              <span 
                className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${proficiencyColors[newLanguage.level as keyof typeof proficiencyColors]} text-white`}
              >
                {newLanguage.level}
              </span>
            </div>
            
            <button
              type="button"
              onClick={handleAddLanguage}
              disabled={!newLanguage.langueName.trim()}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
                newLanguage.langueName.trim() 
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 shadow-md" 
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {editingIndex !== null ? "Update Language" : "Add Language"}
            </button>
          </div>
          
          <div className="mt-3">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full bg-gradient-to-r ${proficiencyColors[newLanguage.level as keyof typeof proficiencyColors]}`}
                style={{
                  width: newLanguage.level === "Native" ? "100%" : 
                         newLanguage.level === "Fluent" ? "90%" : 
                         newLanguage.level === "Advanced" ? "75%" : 
                         newLanguage.level === "Intermediate" ? "60%" : 
                         newLanguage.level === "Beginner" ? "40%" : "25%"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguagesInput;