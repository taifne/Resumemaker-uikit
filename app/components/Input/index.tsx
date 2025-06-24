import React, { ForwardedRef, forwardRef, useState } from 'react';

type InputProps = {
  type?: 
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'search'
    | 'date'
    | 'datetime-local'
    | 'time'
    | 'url'
    | 'tel'
    | 'yearborn';
  label?: string;
  error?: string;
  success?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void; // ✅ added
  autoComplete?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      label,
      error,
      success,
      disabled = false,
      placeholder,
      className = '',
      startIcon,
      endIcon,
      size = 'md',
      fullWidth = false,
      value,
      onChange,
      onFocus,
      onBlur,
      onKeyDown, // ✅ added
      autoComplete,
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const currentYear = new Date().getFullYear();

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-5 py-3 text-lg',
    };

    const getInputType = () => {
      if (type === 'password' && showPassword) return 'text';
      if (type === 'yearborn') return 'number';
      return type;
    };

    const getExtraProps = () => {
      if (type === 'yearborn') {
        return {
          min: 1900,
          max: currentYear,
        };
      }
      return {};
    };

    return (
      <div className={`${fullWidth ? 'w-full' : 'w-fit'}`}>
        {label && (
          <label
            className={`block mb-2 text-sm font-bold ${
              disabled ? 'text-gray-400' : 'text-gray-700'
            }`}
          >
            {label}
          </label>
        )}

        <div
          className={`
            relative flex items-center
            ${sizeClasses[size]}
            ${fullWidth ? 'w-full' : 'w-fit'}
            rounded-lg border transition-all
            ${
              disabled
                ? 'bg-gray-100 border-gray-200 cursor-not-allowed'
                : `
                    ${
                      error
                        ? 'border-red-500 focus-within:border-red-500'
                        : success
                        ? 'border-green-500 focus-within:border-green-500'
                        : 'border-gray-300 focus-within:border-blue-500'
                    }
                    hover:border-${error ? 'red' : success ? 'green' : 'blue'}-400
                    bg-white
                  `
            }
            ${isFocused && !disabled && 'ring-1 ring-blue-200'}
            ${className}
          `}
        >
          {startIcon && (
            <span className="mr-3 text-gray-400 flex-shrink-0">
              {startIcon}
            </span>
          )}

          <input
            ref={ref}
            type={getInputType()}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
              onFocus?.();
            }}
            onBlur={() => {
              setIsFocused(false);
              onBlur?.();
            }}
            onKeyDown={onKeyDown} // ✅ pass it down
            placeholder={placeholder}
            disabled={disabled}
            autoComplete={autoComplete}
            {...getExtraProps()}
            className={`
              py-0
              w-full bg-transparent outline-none
              ${disabled ? 'cursor-not-allowed' : ''}
              ${startIcon ? 'ml-1' : ''}
              ${endIcon || type === 'password' ? 'mr-1' : ''}
              placeholder:text-gray-400
            `}
          />

          {type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
              disabled={disabled}
            >
              {showPassword ? '👁️' : '👁️'}
            </button>
          )}

          {endIcon && !(type === 'password') && (
            <span className="ml-2 text-gray-400">{endIcon}</span>
          )}

          {success && (
            <span className="ml-2 text-green-500">✔</span>
          )}
        </div>

        {type === 'yearborn' && !disabled && (
          <p className="mt-1 text-xs text-gray-500 italic">Beauty is required</p>
        )}

        {error && !disabled && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
