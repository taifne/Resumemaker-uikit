import React, { useState, useRef, useEffect } from 'react';

type DropdownProps = {
  options: { label: string; value: string; icon?: string }[]; // Options with labels, values, and optional icons
  onSelect: (selectedOptions: string[]) => void; // Callback for multi-selection
  buttonLabel: string; // Button label to trigger the dropdown
  isMultiSelect?: boolean; // Toggle for multi-select functionality
};

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, buttonLabel, isMultiSelect = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectOption = (option: string) => {
    if (isMultiSelect) {
      setSelectedItems((prevSelected) => {
        const isSelected = prevSelected.includes(option);
        const updatedSelected = isSelected
          ? prevSelected.filter(item => item !== option)
          : [...prevSelected, option];

        onSelect(updatedSelected);
        return updatedSelected;
      });
    } else {
      setSelectedItems([option]);
      onSelect([option]);
      setIsOpen(false);
    }
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left w-64">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between w-full bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none transition duration-200 ease-in-out"
      >
        <span>{buttonLabel}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 transform ${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-200`}
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg transition-transform duration-300 ease-in-out opacity-100 transform scale-100 z-10">
          <div className="px-4 py-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <ul className="max-h-60 overflow-y-auto">
            {filteredOptions.length === 0 && (
              <li className="px-4 py-2 text-gray-500">No results found</li>
            )}
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelectOption(option.value)}
                className={`px-4 py-2 text-gray-800 cursor-pointer flex items-center space-x-3 ${
                  selectedItems.includes(option.value)
                    ? 'bg-indigo-100'
                    : 'hover:bg-indigo-100'
                } transition duration-200 ease-in-out`}
              >
                {option.icon && <img src={option.icon} alt={option.label} className="w-5 h-5" />}
                <span>{option.label}</span>
                {selectedItems.includes(option.value) && (
                  <span className="ml-auto text-indigo-600">✓</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export { Dropdown };
