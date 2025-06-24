import React, { useState } from 'react';
import { Input } from '../../../../components/Input';
import { Certification } from '../../../../type/resume.type';



type CertificationsInputProps = {
  certifications: Certification[];
  onChange: (certifications: Certification[]) => void;
};

const CertificationsInput: React.FC<CertificationsInputProps> = ({ 
  certifications, 
  onChange 
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const handleAddCertification = () => {
    const newCertification: Certification = {
      cerName: "",
      issuer: "",
      date: new Date()
    };
    onChange([...certifications, newCertification]);
    setActiveIndex(certifications.length);
  };

  const handleRemoveCertification = (index: number) => {
    const newCertifications = [...certifications];
    newCertifications.splice(index, 1);
    onChange(newCertifications);
    setActiveIndex(null);
  };

  const handleCertificationChange = (
    index: number, 
    field: keyof Certification, 
    value: string | Date | null
  ) => {
    const newCertifications = [...certifications];
    newCertifications[index] = {
      ...newCertifications[index],
      [field]: value
    };
    onChange(newCertifications);
  };

const formatDateForInput = (date: Date | null): string => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

  // Function to format date for display
  const formatDateDisplay = (date: Date | null): string => {
    if (!date) return "Present";
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
      
        <button
          type="button"
          onClick={handleAddCertification}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl hover:opacity-90 transition-opacity shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          Add Certification
        </button>
      </div>

      {certifications.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-purple-200 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <h4 className="mt-4 text-xl font-semibold text-gray-700">No certifications added</h4>
          <p className="mt-2 text-gray-500 max-w-md mx-auto">
            Showcase your professional certifications to demonstrate your expertise and qualifications.
          </p>
          <button
            type="button"
            onClick={handleAddCertification}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl hover:opacity-90 transition-opacity shadow-lg"
          >
            Add Certification
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {certifications.map((cert, index) => (
            <div 
              key={index}
              className={`relative border rounded-2xl p-6 transition-all duration-300 ${
                activeIndex === index 
                  ? "border-indigo-500 bg-gradient-to-br from-purple-50 to-indigo-50 shadow-lg ring-4 ring-indigo-100" 
                  : "border-gray-200 hover:border-purple-300 hover:shadow-md"
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <div className="absolute top-5 right-5 flex gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveCertification(index);
                  }}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1.5 bg-white rounded-full shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              <div className="flex items-start gap-4 mb-5">
                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-xl p-3 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800 line-clamp-1">
                    {cert.cerName || "Certification Name"}
                  </h4>
                  <p className="text-indigo-600 font-medium">
                    {cert.issuer || "Issuing Organization"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certification Name
                  </label>
                  <Input
                    value={cert.cerName}
                    onChange={(value) => handleCertificationChange(index, 'cerName', value)}
                    placeholder="e.g., AWS Certified Developer"
                    startIcon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    }
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Issuing Organization
                  </label>
                  <Input
                    value={cert.issuer}
                    onChange={(value) => handleCertificationChange(index, 'issuer', value)}
                    placeholder="e.g., Amazon Web Services"
                    startIcon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    }
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Earned
                  </label>
                  <Input
                    type="date"
                    value={cert.date ? formatDateForInput(cert.date) : ""}
                    onChange={(value) => handleCertificationChange(index, 'date', value ? new Date(value) : null)}
                    startIcon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    }
                  />
                </div>
              </div>

              {cert.date && (
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Earned on {formatDateDisplay(cert.date)}
                  </span>
                  <div className="flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Certified</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificationsInput;