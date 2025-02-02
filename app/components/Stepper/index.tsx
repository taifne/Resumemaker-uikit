import React from 'react';
import cn from 'classnames';
import Step from './step';

type ColorTheme = {
  active: string;
  completed: string;
  inactive: string;
};

type StepperProps = {
  activeStep: number;
  steps: {
    label: string;
    optional?: boolean;
    optionalLabel?: string;
    icon?: React.ReactNode;
    completedIcon?: React.ReactNode;
  }[];
  onStepChange?: (stepIndex: number) => void;
  colorTheme?: ColorTheme;
  connectorStyle?: React.CSSProperties;
  stepClassName?: string;
  className?: string;
  alternativeLabel?: boolean;
  stepSize?: 'sm' | 'md' | 'lg';
  showCheckOnComplete?: boolean;
  orientation?: 'horizontal' | 'vertical';
};

const defaultTheme: ColorTheme = {
  active: 'bg-blue-500 border-blue-500',
  completed: 'bg-green-500 border-green-500',
  inactive: 'bg-gray-300 border-gray-300'
};

const Stepper: React.FC<StepperProps> = ({
  activeStep,
  steps,
  onStepChange,
  colorTheme = defaultTheme,
  connectorStyle,
  stepClassName,
  className,
  alternativeLabel = false,
  stepSize = 'md',
  showCheckOnComplete = true,
  orientation = 'horizontal'
}) => {
  const isVertical = orientation === 'vertical';
  const stepSizes = {
    sm: 'w-6 h-6 text-sm',
    md: 'w-8 h-8 text-base',
    lg: 'w-10 h-10 text-lg'
  };

  return (
    <div className={cn(isVertical ? 'flex flex-col' : 'flex items-center', 'gap-4', className)}>
      {steps.map((step, index) => {
        const isActive = index === activeStep;
        const isCompleted = index < activeStep;
        const isClickable = !!onStepChange && (isCompleted || index === activeStep);

        return (
          <React.Fragment key={index}>
            <div className={cn('flex items-center', isVertical ? 'gap-4' : 'gap-2')}>
              <Step
                index={index}
                label={step.label}
                isActive={isActive}
                isCompleted={isCompleted}
                onClick={isClickable ? () => onStepChange(index) : undefined}
                optional={step.optional}
                optionalLabel={step.optionalLabel}
                colorTheme={colorTheme}
                className={stepClassName}
                sizeClass={stepSizes[stepSize]}
                showCheckOnComplete={showCheckOnComplete}
                alternativeLabel={alternativeLabel}
                icon={step.icon}
                completedIcon={step.completedIcon}
                aria-label={`Step ${index + 1}: ${step.label}`}
              />
              
              {!isVertical && index < steps.length - 1 && (
                <div
                  style={connectorStyle}
                  className={cn(
                    'flex-1 h-1 transition-colors duration-300',
                    isCompleted ? colorTheme.completed : colorTheme.inactive
                  )}
                />
              )}
            </div>

            {isVertical && index < steps.length - 1 && (
              <div
                style={connectorStyle}
                className={cn(
                  'ml-4 h-6 w-px transition-colors duration-300',
                  isCompleted ? colorTheme.completed : colorTheme.inactive
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Stepper;