"use client"
import React, { forwardRef, useEffect } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  ripple?: boolean;
  rounded?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      ripple = true,
      rounded = false,
      className = '',
      ...props
    },
    ref
  ) => {
    useEffect(() => {
      if (ripple) {
        const buttons = document.querySelectorAll('.btn-ripple');
        const createRipple = (e: MouseEvent) => {
          const button = e.currentTarget as HTMLButtonElement;
          const circle = document.createElement('span');
          const diameter = Math.max(button.clientWidth, button.clientHeight);
          const radius = diameter / 2;

          circle.style.width = circle.style.height = `${diameter}px`;
          circle.style.left = `${e.clientX - (button.offsetLeft + radius)}px`;
          circle.style.top = `${e.clientY - (button.offsetTop + radius)}px`;
          circle.classList.add('ripple');

          const rippleEl = button.getElementsByClassName('ripple')[0];
          if (rippleEl) rippleEl.remove();

          button.appendChild(circle);
        };

        buttons.forEach(button => {
            button.addEventListener('click', createRipple as EventListener);
          });
          

        return () => {
          buttons.forEach(button => {
            button.removeEventListener('click', createRipple as EventListener);

          });
        };
      }
    }, [ripple]);

    const baseStyles = `inline-flex items-center justify-center font-medium transition-all 
      duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 
      disabled:pointer-events-none ${rounded ? 'rounded-full' : 'rounded-lg'}`;

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    const variantStyles = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-500',
      outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
      ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} 
          ${isLoading ? 'cursor-wait' : ''} ${className} ${ripple ? 'btn-ripple' : ''}`}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}

        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
