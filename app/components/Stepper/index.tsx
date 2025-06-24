import React from 'react';
import cn from 'classnames';

type ColorTheme = {
    active: string;
    completed: string;
    inactive: string;
    textActive: string;
    textCompleted: string;
    textInactive: string;
    connector: string;
    connectorOptional: string;
    connectorDisabled: string;
    connectorError: string;
    connectorCompleted: string; // Add color for completed connectors
};

type StepperProps = {
    activeStep: number;
    steps: {
        label: string;
        optional?: boolean;
        optionalLabel?: string;
        disabled?: boolean;
        error?: boolean;
    }[];
    onStepChange?: (stepIndex: number) => void;
    colorTheme?: ColorTheme;
    className?: string;
    linear?: boolean;
    circleSize?: 'sm' | 'md' | 'lg';
};

const defaultTheme: ColorTheme = {
    active: 'bg-blue-600 border-blue-600',
    completed: 'bg-green-600 border-green-600',
    inactive: 'bg-gray-200 border-gray-200',
    textActive: 'text-white',
    textCompleted: 'text-white',
    textInactive: 'text-gray-700',
    connector: 'bg-gray-300',
    connectorOptional: 'bg-gray-300',
    connectorDisabled: 'bg-gray-500',
    connectorError: 'bg-red-500',
    connectorCompleted: 'bg-green-600', // Default to completed color
};

const Stepper: React.FC<StepperProps> = ({
    activeStep,
    steps,
    onStepChange,
    colorTheme = defaultTheme,
    className,
    linear = false,
    circleSize = 'md',
}) => {

    const isClickable = (index: number) => {
        if (!onStepChange) return false;
        if (!linear) return index <= activeStep;
        return index === activeStep || index === activeStep - 1;
    };

    const handleStepClick = (index: number) => {
        if (onStepChange && isClickable(index)) {
            onStepChange(index);
        }
    }

    const circleSizes = {
        sm: 'w-6 h-6 text-xs',
        md: 'w-8 h-8 text-base',
        lg: 'w-10 h-10 text-lg',
    };

    const textSize = {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
    };
    return (
        <div className={cn('flex items-center justify-between', className)}>
            {steps.map((step, index) => {
                const isActive = index === activeStep;
                const isCompleted = index < activeStep;
                const isDisabled = step.disabled;
                const hasError = step.error;

                let circleClasses = cn(
                    'rounded-full flex items-center justify-center',
                    'transition-colors duration-300',
                    circleSizes[circleSize],
                    {
                        [colorTheme.active]: isActive && !hasError,
                        [colorTheme.completed]: isCompleted && !hasError,
                        [colorTheme.inactive]: !isActive && !isCompleted && !hasError,
                        'bg-red-500 border-red-500 text-white': hasError,
                        'cursor-pointer hover:brightness-110':
                            isClickable(index) && !isDisabled,
                        'cursor-not-allowed opacity-50': isDisabled,
                    }
                );

                let labelClasses = cn(
                    textSize[circleSize],
                    'mt-2 transition-colors duration-300',
                    {
                        [colorTheme.textActive]: isActive && !hasError,
                        [colorTheme.textCompleted]: isCompleted && !hasError,
                        [colorTheme.textInactive]: !isActive && !isCompleted && !hasError,
                        'text-red-500': hasError,
                    }
                );

                // Determine connector style
                let nextStep = steps[index + 1];
                let connectorClasses = cn(
                    'h-px flex-1 transition-colors duration-300',
                     index < steps.length -1 ? colorTheme.connector : 'hidden', // hide the last connector
                    {
                         [colorTheme.connectorCompleted]: isCompleted, // Use completed connector color
                         [colorTheme.connector]: !nextStep && !isCompleted,
                        [colorTheme.connectorOptional]: nextStep?.optional && !isCompleted,
                        [colorTheme.connectorDisabled]: nextStep?.disabled && !isCompleted,
                        [colorTheme.connectorError]: nextStep?.error && !isCompleted,
                    }
                );

                return (
                    <div key={index} className="flex items-center">
                        <div className="flex flex-col items-center">
                            <button
                                type="button"
                                onClick={isClickable(index) && !isDisabled ? () => handleStepClick(index) : undefined}
                                className={circleClasses}
                                aria-label={`Step ${index + 1}: ${step.label}`}
                                disabled={isDisabled}
                            >
                                 <span className={cn({ 'text-white': isActive || isCompleted }, { 'text-gray-700': !isActive && !isCompleted })}>
                                    {isCompleted ? '✓' : index + 1}
                                </span>
                            </button>
                            <div className={labelClasses}>{step.label}</div>
                        </div>
                        {/* Connector Line */}
                        {index < steps.length - 1 && <div className={connectorClasses} />}
                    </div>
                );
            })}
        </div>
    );
};

export default Stepper;