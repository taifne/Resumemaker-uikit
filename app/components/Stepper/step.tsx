import React from 'react';
import cn from 'classnames';
type ColorTheme = {
  active: string;
  completed: string;
  inactive: string;
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
  sizeClass: string;
  showCheckOnComplete: boolean;
  alternativeLabel: boolean;
  icon?: React.ReactNode;
  completedIcon?: React.ReactNode;
  'aria-label': string;
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
  sizeClass,
  showCheckOnComplete,
  alternativeLabel,
  icon,
  completedIcon,
  'aria-label': ariaLabel,
}) => {
  const getStateStyles = () => {
    if (isActive) return colorTheme.active;
    if (isCompleted) return colorTheme.completed;
    return colorTheme.inactive;
  };

  const renderIconContent = () => {
    if (isCompleted) {
      return completedIcon || (showCheckOnComplete ? '✓' : null);
    }
    return icon || index + 1;
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        'flex items-center justify-center rounded-full border-2 font-medium transition-all',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        sizeClass,
        getStateStyles(),
        className,
        {
          'cursor-pointer hover:brightness-110': onClick,
          'cursor-default': !onClick,
          'flex-col': alternativeLabel,
        }
      )}
    >
      <div className={cn('flex items-center justify-center', { 'mb-2': alternativeLabel })}>
        {renderIconContent()}
      </div>
      
      <div className={cn('flex flex-col', alternativeLabel ? 'text-center' : 'ml-2')}>
        <span className="text-sm font-medium text-gray-700">{label}</span>
        
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