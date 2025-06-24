import React, { FC, ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
  backgroundColor?: string;
  textColor?: string;
  hoverEffect?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  clickAnimation?: boolean;
}

const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  isLoading = false,
  loadingText,
  fullWidth = false,
  backgroundColor,
  textColor,
  hoverEffect = true,
  rounded = 'md',
  shadow = 'none',
  clickAnimation = false,
  className = '',
  children,
  disabled,
  ...rest
}) => {
  const isIconOnly = !children && (iconLeft || iconRight) && !isLoading;

  const baseStyles = `inline-flex items-center justify-center border font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
    fullWidth ? 'w-full' : ''
  } ${
    clickAnimation
      ? 'transition-all duration-100 active:scale-95'
      : 'transition-colors'
  }`;

  const variants = {
    primary: {
      base: 'bg-indigo-600 text-white border-transparent hover:bg-indigo-700',
      focusRing: 'focus:ring-indigo-500',
    },
    secondary: {
      base: 'bg-emerald-600 text-white border-transparent hover:bg-emerald-700',
      focusRing: 'focus:ring-emerald-500',
    },
    outline: {
      base: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50',
      focusRing: 'focus:ring-gray-500',
    },
    ghost: {
      base: 'bg-transparent text-gray-700 hover:bg-gray-100 border-transparent',
      focusRing: 'focus:ring-gray-500',
    },
    glass: {
      base: 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white',
      focusRing: 'focus:ring-white/50',
    },
  };

  const sizeConfig = {
    sm: { padding: 'px-3 py-1.5', text: 'text-sm', iconPadding: 'p-1.5' },
    md: { padding: 'px-4 py-2', text: 'text-base', iconPadding: 'p-2' },
    lg: { padding: 'px-6 py-3', text: 'text-lg', iconPadding: 'p-3' },
  };

  const roundedStyles = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  const shadowStyles = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  const sizeClasses = isIconOnly
    ? `${sizeConfig[size].iconPadding} ${sizeConfig[size].text}`
    : `${sizeConfig[size].padding} ${sizeConfig[size].text}`;

  const customStyles = {
    backgroundColor,
    color: textColor,
    borderColor: variant === 'outline' ? backgroundColor : undefined,
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant].base}
        ${variants[variant].focusRing}
        ${sizeClasses}
        ${roundedStyles[rounded]}
        ${shadowStyles[shadow]}
        ${hoverEffect ? 'hover:brightness-95' : ''}
        ${disabled || isLoading ? 'opacity-75 cursor-not-allowed' : ''}
        ${className}
      `}
      style={customStyles}
      disabled={disabled || isLoading}
      aria-disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <>
          <svg
            className={`animate-spin -ml-1 mr-3 h-4 w-4 ${
              ['primary', 'secondary'].includes(variant)
                ? 'text-white'
                : 'text-current'
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {loadingText || 'Processing...'}
        </>
      ) : (
        <>
          {iconLeft && <span className="mr-2">{iconLeft}</span>}
          {children}
          {iconRight && <span className="ml-2">{iconRight}</span>}
        </>
      )}
    </button>
  );
};

export default React.memo(Button);