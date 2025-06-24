import React from 'react';
import cn from 'classnames';
type ColorTheme = {
  active: string;
  completed: string;
  inactive: string;
  textActive: string;   // Added text colors for better contrast
  textCompleted: string;
  textInactive: string;
};

export type StepProps = {
  index: number;
  label: string;
  isActive: boolean;
  isCompleted: boolean;
  onClick?: () => void;
  optional?: boolean;
  optionalLabel?: string;
  colorTheme: ColorTheme;
  className?: string;
  size: 'sm' | 'md' | 'lg'; // Use explicit type instead of sizeClass
  showCheckOnComplete: boolean;
  alternativeLabel: boolean;
  icon?: React.ReactNode;
  completedIcon?: React.ReactNode;
  'aria-label': string;
  disabled?: boolean; // Added disabled prop
  error?: boolean;  // Added error prop
};

 const Step: React.FC<StepProps> = ({
  index,
  label,
  isActive,
  isCompleted,
  onClick,
  optional,
  optionalLabel,
  colorTheme,
  className,
  size,
  showCheckOnComplete,
  alternativeLabel,
  icon,
  completedIcon,
  'aria-label': ariaLabel,
  disabled,
  error,
}) => {
  const getStateStyles = () => {
    if (error) return 'bg-red-500 border-red-500 text-white'; // Error state style
    if (isActive) return colorTheme.active + ' ' + colorTheme.textActive;
    if (isCompleted) return colorTheme.completed + ' ' + colorTheme.textCompleted;
    return colorTheme.inactive + ' ' + colorTheme.textInactive;
  };

  const iconSizes = {
    sm: 'w-3 h-3 text-xs',  // Adjusted icon sizes
    md: 'w-4 h-4 text-sm',
    lg: 'w-5 h-5 text-base',
  };

  const textSize = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
  }

  const renderIconContent = () => {
    if (isCompleted) {
      return completedIcon || (showCheckOnComplete ? <span aria-hidden="true">✓</span> : null); // Use span for better accessibility
    }
    return icon || <span aria-hidden="true">{index + 1}</span>; // Use span for accessibility
  };

  const buttonClasses = cn(
    'flex items-center justify-center rounded-full border-2 font-medium transition-all',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    getStateStyles(),
    className,
    iconSizes[size],
    {
      'cursor-pointer hover:brightness-110': onClick && !disabled,
      'cursor-not-allowed opacity-50': disabled,  // Indicate disabled state
      'flex-col': alternativeLabel,
    }
  );

  return (
    <button
      type="button"
      onClick={onClick && !disabled ? onClick : undefined} // Only call onClick if not disabled
      aria-label={ariaLabel}
      disabled={disabled}
      className={buttonClasses}
    >
      <div className={cn('flex items-center justify-center', { 'mb-1': alternativeLabel })}>
        {renderIconContent()}
      </div>

      <div className={cn('flex flex-col', alternativeLabel ? 'text-center' : 'ml-2')}>
        <span className={cn('font-medium', textSize[size])}>{label}</span>

        {optional && (
          <span className="text-xs font-normal text-gray-500">
            {optionalLabel || 'Optional'}
          </span>
        )}
      </div>
    </button>
  );
};
export default Step;