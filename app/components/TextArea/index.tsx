import React from 'react';

type TextareaProps = {
  id?: string;
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  cols?: number;
  className?: string;
  disabled?: boolean;
};

const Textarea: React.FC<TextareaProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder = '',
  rows = 5,
  cols,
  className = '',
  disabled = false,
}) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={textareaId} className="font-medium text-sm text-gray-700">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
        className={`border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        disabled={disabled}
      />
    </div>
  );
};

export default Textarea;
