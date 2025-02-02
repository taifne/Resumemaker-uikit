import React from 'react';

type LoadingProps = {
  isLoading: boolean;
  text?: string;
  spinnerColor?: string;
  textColor?: string;
  overlayColor?: string;
  overlayOpacity?: string;
  backgroundColor?: string;
  size?: 'sm' | 'md' | 'lg';
  modalWidth?: string;
  children?: React.ReactNode;
};

const Loading: React.FC<LoadingProps> = ({
  isLoading,
  text,
  spinnerColor = 'border-blue-500',
  textColor = 'text-gray-800',
  overlayColor = 'bg-gray-800',
  overlayOpacity = 'bg-opacity-50',
  backgroundColor = 'bg-white',
  size = 'md',
  modalWidth = 'w-80',
  children,
}) => {
  if (!isLoading) return null;

  const sizeConfig = {
    sm: {
      spinner: 'w-12 h-12 border-4',
      text: 'text-base',
    },
    md: {
      spinner: 'w-20 h-20 border-6',
      text: 'text-lg',
    },
    lg: {
      spinner: 'w-24 h-24 border-8',
      text: 'text-xl',
    },
  };

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center z-50 ${overlayColor} ${overlayOpacity}`}
      role="status"
      aria-live="polite"
    >
      <div className={`flex flex-col items-center space-y-6 ${backgroundColor} p-8 rounded-xl shadow-2xl ${modalWidth}`}>
        {children ? (
          children
        ) : (
          <>
            <div
              className={`${sizeConfig[size].spinner} border-t-[5px] border-solid rounded-full 
                animate-[spin_1.5s_linear_infinite,scalePulse_2s_ease-in-out_infinite] ${spinnerColor}`}
            />
            {text && (
              <p className={`${sizeConfig[size].text} ${textColor} font-semibold animate-pulse`}>
                {text}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export { Loading };