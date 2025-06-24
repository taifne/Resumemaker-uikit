import { useState } from "react";
import { Input } from "../../../../components/Input";
import { VolunteerWork } from "../../../../type/resume.type";


type VolunteerInputProps = {
  volunteerWork: VolunteerWork[];
  onChange: (volunteerWork: VolunteerWork[]) => void;
};

const VolunteerInput: React.FC<VolunteerInputProps> = ({ 
  volunteerWork, 
  onChange 
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const handleAddVolunteer = () => {
    const newVolunteer: VolunteerWork = {
      org: "",
      role: "",
      startDate: new Date(),
      endDate: new Date(),
      description: ""
    };
    onChange([...volunteerWork, newVolunteer]);
    setActiveIndex(volunteerWork.length);
  };

  const handleRemoveVolunteer = (index: number) => {
    const newVolunteerWork = [...volunteerWork];
    newVolunteerWork.splice(index, 1);
    onChange(newVolunteerWork);
    setActiveIndex(null);
  };

  const handleVolunteerChange = (
    index: number, 
    field: keyof VolunteerWork, 
    value: string | Date | null
  ) => {
    const newVolunteerWork = [...volunteerWork];
    newVolunteerWork[index] = {
      ...newVolunteerWork[index],
      [field]: value
    };
    onChange(newVolunteerWork);
  };


const formatDateForInput = (date: Date | null): string => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
      
        <button
          type="button"
          onClick={handleAddVolunteer}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl hover:opacity-90 transition-opacity shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          Add Experience
        </button>
      </div>

      {volunteerWork.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-green-200 rounded-2xl bg-gradient-to-br from-green-50 to-teal-50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h4 className="mt-4 text-xl font-semibold text-gray-700">No volunteer experience added</h4>
          <p className="mt-2 text-gray-500 max-w-md mx-auto">
            Showcase your community involvement and volunteer work to demonstrate your commitment to social causes.
          </p>
          <button
            type="button"
            onClick={handleAddVolunteer}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl hover:opacity-90 transition-opacity shadow-lg"
          >
            Add Volunteer Experience
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {volunteerWork.map((vol, index) => (
            <div 
              key={index}
              className={`relative border rounded-2xl p-6 transition-all duration-300 ${
                activeIndex === index 
                  ? "border-teal-500 bg-gradient-to-br from-green-50 to-teal-50 shadow-lg ring-4 ring-teal-100" 
                  : "border-gray-200 hover:border-green-300 hover:shadow-md"
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <div className="absolute top-5 right-5 flex gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveVolunteer(index);
                  }}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1.5 bg-white rounded-full shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              <div className="flex items-start gap-4 mb-5">
                <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-xl p-3 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800">
                    {vol.org || "Organization"}
                  </h4>
                  <p className="text-teal-600 font-medium">
                    {vol.role || "Volunteer Role"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organization
                  </label>
                  <Input
                    value={vol.org}
                    onChange={(value) => handleVolunteerChange(index, 'org', value)}
                    placeholder="Organization name"
                    startIcon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    }
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <Input
                    value={vol.role}
                    onChange={(value) => handleVolunteerChange(index, 'role', value)}
                    placeholder="Your volunteer role"
                    startIcon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <Input
                    type="date"
                    value={vol.startDate ? formatDateForInput(vol.startDate) : ""}
                    onChange={(value) => handleVolunteerChange(index, 'startDate', value ? new Date(value) : null)}
                    startIcon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    }
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <div className="flex items-center">
                    <Input
                      type="date"
                      value={vol.endDate ? formatDateForInput(vol.endDate) : ""}
                      onChange={(value) => handleVolunteerChange(index, 'endDate', value ? new Date(value) : null)}
                      className="flex-1"
                      startIcon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      }
                      disabled={!vol.endDate}
                    />
                    <label className="ml-3 flex items-center">
                      <input
                        type="checkbox"
                        checked={!vol.endDate}
                        onChange={(e) => handleVolunteerChange(
                          index, 
                          'endDate', 
                          e.target.checked ? null : new Date()
                        )}
                        className="h-4 w-4 text-green-600 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Ongoing</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={vol.description}
                  onChange={(e) => handleVolunteerChange(index, 'description', e.target.value)}
                  placeholder="Describe your responsibilities and contributions..."
                  rows={3}
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-300 focus:border-green-500 transition-all"
                />
              </div>
              
              <div className="mt-5 flex justify-end">
                <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Volunteer Experience</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VolunteerInput;