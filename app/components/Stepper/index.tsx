import React from 'react';
import Step from './step';

type StepperProps = {
  activeStep: number;
  steps: { label: string; optional?: boolean }[];
  onStepChange: (stepIndex: number) => void;
};

const Stepper: React.FC<StepperProps> = ({ activeStep, steps, onStepChange }) => {
  return (
    <div className="flex items-center justify-center space-x-8">
      {steps.map((step, index) => {
        const isActive = index === activeStep;
        const isCompleted = index < activeStep;

        return (
          <div key={index} className="flex items-center">
            <Step
              label={step.label}
              isActive={isActive}
              isCompleted={isCompleted}
              onClick={() => onStepChange(index)}
              optional={step.optional}
            />
            {index < steps.length - 1 && (
              <div
                className={`w-8 h-1 bg-gray-300 ${isCompleted ? 'bg-blue-500' : 'bg-gray-300'}`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
