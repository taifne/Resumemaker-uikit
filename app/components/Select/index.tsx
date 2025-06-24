'use client';

import React, { useState, useRef, useEffect } from 'react';

type Option = {
  label: string;
  value: string;
};

type CustomSelectProps = {
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  fullWidth?: boolean;
};

export function CustomSelect({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  label,
  disabled = false,
  fullWidth = false,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`w-full`} ref={selectRef}>
      {label && (
        <label className="block mb-1 text-sm font-bold text-gray-700">{label}</label>
      )}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        className={`
          w-full px-4  h-[48px] text-left bg-white border rounded-lg shadow-sm text-sm
          ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'cursor-pointer'}
          ${isOpen ? 'border-blue-500 ring-1 ring-blue-300' : 'border-gray-300'}
        `}
      >
        {selectedOption ? selectedOption.label : (
          <span className="text-gray-400">{placeholder}</span>
        )}
        <span className="float-right">▼</span>
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-10 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-md max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange?.(option.value);
                setIsOpen(false);
              }}
              className={`
                px-4 py-2 text-sm cursor-pointer
                hover:bg-blue-100 ${value === option.value ? 'bg-blue-50 font-semibold' : ''}
              `}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
