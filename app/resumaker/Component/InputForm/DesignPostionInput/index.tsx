import React, { useState, useRef, useEffect } from 'react';
import { Input } from '../../../../components/Input';

type JobPreferencesInputProps = {
  desiredPositions: string[];
  setDesiredPositions: (positions: string[]) => void;
  desiredSalary: string;
  setDesiredSalary: (value: string) => void;
  availableFrom: string;
  setAvailableFrom: (value: string) => void;
  visibility: string;
  setVisibility: (value: string) => void;
  isPublished: boolean;
  setIsPublished: (value: boolean) => void;
  isDefault: boolean;
  setIsDefault: (value: boolean) => void;
};

const positionSuggestions = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "UI/UX Designer",
  "DevOps Engineer",
  "Product Manager",
  "Data Scientist",
  "Mobile Developer",
  "QA Engineer",
  "Technical Lead",
  "Software Architect",
  "Cloud Engineer",
  "Security Specialist",
  "Machine Learning Engineer",
  "CTO"
];

const JobPreferencesInput: React.FC<JobPreferencesInputProps> = ({
  desiredPositions,
  setDesiredPositions,
  desiredSalary,
  setDesiredSalary,
  availableFrom,
  setAvailableFrom,
  visibility,
  setVisibility,
  isPublished,
  setIsPublished,
  isDefault,
  setIsDefault
}) => {
  const [positionInput, setPositionInput] = useState('');
  const [showPositionSuggestions, setShowPositionSuggestions] = useState(false);
  const positionRef = useRef<HTMLDivElement>(null);
  
  const filteredPositions = positionSuggestions.filter(position => 
    position.toLowerCase().includes(positionInput.toLowerCase()) && 
    !desiredPositions.includes(position)
  );

  const handleAddPosition = (position: string) => {
    if (!desiredPositions.includes(position)) {
      setDesiredPositions([...desiredPositions, position]);
      setPositionInput('');
      setShowPositionSuggestions(false);
    }
  };

  const handleRemovePosition = (position: string) => {
    setDesiredPositions(desiredPositions.filter(p => p !== position));
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (positionRef.current && !positionRef.current.contains(e.target as Node)) {
        setShowPositionSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
       
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Desired Positions - Multi-select */}
        <div className="md:col-span-2 space-y-1" ref={positionRef}>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Desired Positions
          </label>
          
          <div className="relative">
            <Input
              value={positionInput}
              onChange={setPositionInput}
              onFocus={() => setShowPositionSuggestions(true)}
              placeholder="Search positions..."
              startIcon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            />
            
            {showPositionSuggestions && positionInput && filteredPositions.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white rounded-xl shadow-lg border border-blue-200 max-h-60 overflow-y-auto">
                {filteredPositions.map((position, index) => (
                  <div
                    key={position}
                    className={`px-4 py-3 cursor-pointer hover:bg-blue-50 ${
                      index === 0 ? 'rounded-t-xl' : ''
                    } ${index === filteredPositions.length - 1 ? 'rounded-b-xl' : ''}`}
                    onClick={() => handleAddPosition(position)}
                  >
                    <div className="flex items-center">
                      <span className="text-blue-600 mr-2">+</span>
                      <span className="font-medium text-gray-800">{position}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {desiredPositions.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {desiredPositions.map(position => (
                <div 
                  key={position}
                  className="flex items-center bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-full px-3 py-1.5 group"
                >
                  <span className="font-medium text-gray-800">{position}</span>
                  <button
                    type="button"
                    onClick={() => handleRemovePosition(position)}
                    className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Desired Salary
          </label>
          <Input
            value={desiredSalary}
            onChange={setDesiredSalary}
            placeholder="e.g., $80,000 - $100,000"
            startIcon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Available From
          </label>
          <Input
            type="date"
            value={availableFrom}
            onChange={setAvailableFrom}
            startIcon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Visibility
          </label>
          <div className="relative">
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all appearance-none"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="connections">Visible to Connections</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <div className="flex items-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
          <label className="relative flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-cyan-600"></div>
            <div className="ml-3 flex items-center">
              <span className="text-sm font-medium text-gray-700">Published</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </label>
          <div className="ml-auto text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
            Recommended
          </div>
        </div>

        <div className="flex items-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
          <label className="relative flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-cyan-600"></div>
            <div className="ml-3 flex items-center">
              <span className="text-sm font-medium text-gray-700">Default Profile</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default JobPreferencesInput;