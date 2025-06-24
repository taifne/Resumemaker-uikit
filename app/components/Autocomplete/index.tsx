import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';

type SuggestionItem = {
  label: string;
  value: string;
};

type AutocompleteProps = {
  suggestions: SuggestionItem[];
  onSelect: (selectedValue: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  dropdownClassName?: string;
  itemClassName?: string;
  emptyText?: string;
  debounceDelay?: number;
};

const Autocomplete: React.FC<AutocompleteProps> = React.memo(({
  suggestions,
  onSelect,
  placeholder = 'Search...',
  className = 'w-80',
  inputClassName = '',
  dropdownClassName = '',
  itemClassName = '',
  emptyText = 'No matches found',
  debounceDelay = 150,
}) => {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  // Memoized filtered suggestions
  const filteredSuggestions = useMemo(() => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return suggestions.filter(({ label }) =>
      label.toLowerCase().includes(lowerQuery)
    );
  }, [query, suggestions]);

  // Debounced input handling
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setQuery(value);
      setActiveIndex(-1);
      setIsOpen(!!value);
    }, debounceDelay);
  }, [debounceDelay]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(prev => Math.min(prev + 1, filteredSuggestions.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        if (activeIndex >= 0) {
          e.preventDefault();
          handleSelect(filteredSuggestions[activeIndex].value);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'Tab':
        setIsOpen(false);
        break;
    }
  }, [activeIndex, filteredSuggestions, isOpen]);

  // Suggestion selection
  const handleSelect = useCallback((value: string) => {
    const selected = suggestions.find(s => s.value === value);
    if (selected) {
      setQuery(selected.label);
      onSelect(value);
      setIsOpen(false);
      inputRef.current?.blur();
    }
  }, [onSelect, suggestions]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex >= 0 && containerRef.current) {
      const activeItem = containerRef.current.querySelector(
        `[data-index="${activeIndex}"]`
      );
      activeItem?.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onClick={() => setIsOpen(!!query)}
        aria-autocomplete="list"
        aria-controls="autocomplete-list"
        aria-expanded={isOpen}
        aria-activedescendant={activeIndex >= 0 ? `option-${activeIndex}` : undefined}
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${inputClassName}`}
        placeholder={placeholder}
        role="combobox"
      />

      {isOpen && (
        <ul
          id="autocomplete-list"
          role="listbox"
          className={`absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-auto ${dropdownClassName}`}
        >
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map(({ label, value }, index) => (
              <li
                key={value}
                role="option"
                data-index={index}
                id={`option-${index}`}
                aria-selected={index === activeIndex}
                onClick={() => handleSelect(value)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`p-3 cursor-pointer transition-colors ${
                  index === activeIndex 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-700 hover:bg-blue-100'
                } ${itemClassName}`}
              >
                {label}
              </li>
            ))
          ) : (
            <li className="p-3 text-gray-500 italic">{emptyText}</li>
          )}
        </ul>
      )}
    </div>
  );
});

export default Autocomplete;