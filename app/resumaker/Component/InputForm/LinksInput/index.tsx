import React, { useState } from 'react';
import { Input } from '../../../../components/Input';

type Link = {
  label: string;
  url: string;
};

type LinksInputProps = {
  links: Link[];
  onChange: (links: Link[]) => void;
};

const LinksInput: React.FC<LinksInputProps> = ({ 
  links, 
  onChange 
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const handleAddLink = () => {
    const newLink: Link = {
      label: "",
      url: ""
    };
    onChange([...links, newLink]);
    setActiveIndex(links.length);
  };

  const handleRemoveLink = (index: number) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    onChange(newLinks);
    setActiveIndex(null);
  };

  const handleLinkChange = (
    index: number, 
    field: keyof Link, 
    value: string
  ) => {
    const newLinks = [...links];
    newLinks[index] = {
      ...newLinks[index],
      [field]: value
    };
    onChange(newLinks);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
       
        <button
          type="button"
          onClick={handleAddLink}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-xl hover:opacity-90 transition-opacity shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          Add Link
        </button>
      </div>

      {links.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-emerald-200 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <h4 className="mt-4 text-xl font-semibold text-gray-700">No links added</h4>
          <p className="mt-2 text-gray-500 max-w-md mx-auto">
            Add important links to your portfolio, blog, or social profiles to showcase your work.
          </p>
          <button
            type="button"
            onClick={handleAddLink}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-xl hover:opacity-90 transition-opacity shadow-lg"
          >
            Add Link
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {links.map((link, index) => (
            <div 
              key={index}
              className={`relative border rounded-2xl p-6 transition-all duration-300 ${
                activeIndex === index 
                  ? "border-emerald-500 bg-gradient-to-br from-teal-50 to-emerald-50 shadow-lg ring-4 ring-emerald-100" 
                  : "border-gray-200 hover:border-teal-300 hover:shadow-md"
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <div className="absolute top-5 right-5 flex gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveLink(index);
                  }}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1.5 bg-white rounded-full shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              <div className="flex items-start gap-4 mb-5">
                <div className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white rounded-xl p-3 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800 line-clamp-1">
                    {link.label || "Link Label"}
                  </h4>
                  <p className="text-emerald-600 font-medium line-clamp-1">
                    {link.url || "https://example.com"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Link Label
                  </label>
                  <Input
                    value={link.label}
                    onChange={(value) => handleLinkChange(index, 'label', value)}
                    placeholder="e.g., Portfolio"
                    startIcon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    }
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL
                  </label>
                  <Input
                    value={link.url}
                    onChange={(value) => handleLinkChange(index, 'url', value)}
                    placeholder="https://example.com"
                    startIcon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    }
                  />
                </div>
              </div>

              {link.url && (
                <div className="mt-4">
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 rounded-xl transition-colors"
                    onClick={e => e.stopPropagation()}
                  >
                    <span>Visit Link</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LinksInput;