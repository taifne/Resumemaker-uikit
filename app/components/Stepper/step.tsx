import React from 'react';

type StepProps = {
  label: string;
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
  optional?: boolean;
};

const Step: React.FC<StepProps> = ({ label, isActive, isCompleted, onClick, optional }) => {
  const stepStatusClass = isCompleted ? 'bg-blue-500 text-white' : isActive ? 'bg-gray-300 text-gray-700' : 'bg-gray-100 text-gray-500';

  return (
    <div className="flex flex-col items-center cursor-pointer" onClick={onClick}>
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full ${stepStatusClass}`}
      >
        {isCompleted ? '✔' : isActive ? '➔' : ''}
      </div>
      <span className="mt-2 text-sm">{label}</span>
      {optional && !isCompleted && (
        <span className="text-xs text-gray-500">Optional</span>
      )}
    </div>
  );
};

export default Step;
