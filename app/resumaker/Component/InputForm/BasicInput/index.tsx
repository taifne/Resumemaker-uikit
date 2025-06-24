import React, { useState } from 'react';
import Autocomplete from '../../../../components/Autocomplete';
import { Input } from '../../../../components/Input';
import YearPickerInput from '../../../../components/YearPicker';
export type PersonalInfo = {
  title: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  yearBorn: number | null;
  address: string;
  avatarUrl: string;
};

type PersonalInfoSectionProps = {
  info: PersonalInfo;
  onChange: (info: PersonalInfo) => void;
};

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  info,
  onChange,
}) => {
  const handleFieldChange = <K extends keyof PersonalInfo>(
    field: K,
    value: PersonalInfo[K]
  ) => {
    onChange({ ...info, [field]: value });
  };

 const suggestions = [
  { label: "Software Engineer", value: "software_engineer" },
  { label: "Product Manager", value: "product_manager" },
  { label: "UX Designer", value: "ux_designer" },
  { label: "DevOps Specialist", value: "devops_specialist" },
  { label: "Data Scientist", value: "data_scientist" },
  { label: "Frontend Developer", value: "frontend_developer" },
  { label: "Backend Developer", value: "backend_developer" },
  { label: "Full Stack Developer", value: "full_stack_developer" },
  { label: "Mobile Developer", value: "mobile_developer" },
  { label: "QA Engineer", value: "qa_engineer" },
  { label: "Technical Lead", value: "technical_lead" },
  { label: "CTO", value: "cto" },
  { label: "Engineering Manager", value: "engineering_manager" },
  { label: "Cloud Architect", value: "cloud_architect" },
  { label: "Security Analyst", value: "security_analyst" },
  { label: "Machine Learning Engineer", value: "machine_learning_engineer" },
  { label: "AI Researcher", value: "ai_researcher" },
  { label: "Blockchain Developer", value: "blockchain_developer" },
  { label: "Game Developer", value: "game_developer" },
  { label: "AR/VR Developer", value: "ar_vr_developer" },
  { label: "Site Reliability Engineer", value: "site_reliability_engineer" },
  { label: "Data Engineer", value: "data_engineer" },
  { label: "Data Analyst", value: "data_analyst" },
  { label: "Business Analyst", value: "business_analyst" },
  { label: "Solutions Architect", value: "solutions_architect" },
  { label: "Scrum Master", value: "scrum_master" },
  { label: "Agile Coach", value: "agile_coach" },
  { label: "IT Support Specialist", value: "it_support_specialist" },
  { label: "Network Engineer", value: "network_engineer" },
  { label: "Database Administrator", value: "database_administrator" },
  { label: "Penetration Tester", value: "penetration_tester" },
  { label: "Digital Marketing Specialist", value: "digital_marketing_specialist" },
  { label: "SEO Specialist", value: "seo_specialist" },
  { label: "Content Strategist", value: "content_strategist" },
  { label: "Graphic Designer", value: "graphic_designer" },
  { label: "Technical Writer", value: "technical_writer" }
];


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
    
      <div className="space-y-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Basic Details
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title - Autocomplete */}
          <div className="space-y-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Professional Title
            </label>
            <Autocomplete
              suggestions={suggestions}
              onSelect={(value) => handleFieldChange("title", value)}
              placeholder="Enter or select job title..."
            />
          </div>
          
          {/* Full Name */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Full Name
            </label>
            <Input
              value={info.fullName}
              onChange={(value) => handleFieldChange("fullName", value)}
              placeholder="e.g., Jane Doe"
              startIcon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
            />
          </div>
          
          {/* Email */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </label>
            <Input
                value={info.email}
              onChange={(value) => handleFieldChange("email", value)}
              placeholder="e.g., jane.doe@example.com"
              startIcon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
            />
          </div>
          
          {/* Phone Number */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Phone Number
            </label>
            <Input
              value={info.phoneNumber}
              onChange={(value) => handleFieldChange("phoneNumber", value)}
              placeholder="e.g., +1 (555) 123-4567"
              startIcon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              }
            />
          </div>
          
          {/* Birth Year */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Birth Year
            </label>
            <YearPickerInput
            value={info.yearBorn}
              onChange={(value) => handleFieldChange("yearBorn", value)}
              minYear={1975}
              maxYear={2015}
              placeholder="Select birth year"
              disabled={false}
            />
            {info.yearBorn && (
              <p className="mt-2 text-sm text-gray-500">
                Born in {info.yearBorn} • {new Date().getFullYear() - info.yearBorn} years old
              </p>
            )}
          </div>
          
          {/* Address */}
          <div className="space-y-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Address
            </label>
            <Input
                value={info.address}
              onChange={(value) => handleFieldChange("address", value)}
              placeholder="e.g., 123 Main St, San Francisco, CA"
              startIcon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
            />
          </div>
          
          {/* Avatar URL */}
          <div className="space-y-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Avatar URL
            </label>
            <Input
            value={info.avatarUrl}
              onChange={(value) => handleFieldChange("avatarUrl", value)}
              placeholder="https://example.com/avatar.jpg"
              startIcon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
            />
          </div>
          
          {/* Avatar Preview */}
          {info.avatarUrl && (
            <div className="md:col-span-2 flex justify-center">
              <div className="mt-4 border-2 border-dashed border-purple-200 rounded-2xl p-4 bg-gradient-to-br from-purple-50 to-indigo-50">
                <h4 className="text-center font-medium text-gray-700 mb-3">Avatar Preview</h4>
                <div className="w-32 h-32 mx-auto rounded-full bg-gray-200 border-2 border-white shadow-lg overflow-hidden">
                  <img 
                    src={info.avatarUrl} 
                    alt="Avatar preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/128';
                      e.currentTarget.onerror = null;
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;