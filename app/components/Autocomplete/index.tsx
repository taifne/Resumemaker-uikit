import React, { useState, useEffect, useRef } from 'react';

type AutocompleteProps = {
  suggestions: string[];
  onSelect: (selectedValue: string) => void;
};

const Autocomplete: React.FC<AutocompleteProps> = ({ suggestions, onSelect }) => {
  const [query, setQuery] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLUListElement>(null);

  // Filter suggestions based on query
  useEffect(() => {
    if (query === '') {
      setFilteredSuggestions([]);
      setIsOpen(false);
    } else {
      const matches = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(matches);
      setIsOpen(matches.length > 0); // Open dropdown only if there are matches
    }
  }, [query, suggestions]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current && !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSelect = (value: string) => {
    setQuery(value);
    onSelect(value);
    setIsOpen(false); // Close dropdown after selection
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      setActiveIndex((prev) => Math.min(prev + 1, filteredSuggestions.length - 1));
    } else if (event.key === 'ArrowUp') {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (event.key === 'Enter' && activeIndex >= 0) {
      handleSelect(filteredSuggestions[activeIndex]);
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (value: string) => {
    handleSelect(value);
  };

  return (
    <div className="relative w-80">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
        placeholder="Search..."
      />

      {/* Dropdown Suggestions */}
      {isOpen && filteredSuggestions.length > 0 && (
        <ul
          ref={suggestionsRef}
          className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-auto transition-opacity ease-in-out duration-300"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              onMouseEnter={() => setActiveIndex(index)}
              className={`p-3 cursor-pointer text-gray-700 hover:bg-blue-100 rounded-md ${
                index === activeIndex ? 'bg-blue-500 text-white' : ''
              }`}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
