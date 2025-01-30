import React from 'react';

type LoadingProps = {
  isLoading: boolean;
  text?: string;  // Optional loading text
};

const Loading: React.FC<LoadingProps> = ({ isLoading, text }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="flex flex-col items-center space-y-6 bg-white p-10 rounded-lg shadow-2xl w-80">
        {/* Spinning + Scaling Animation */}
        <div className="w-20 h-20 border-8 border-t-8 border-blue-500 border-solid rounded-full animate-spin-slow animate-scale-spin"></div>
        {text && <p className="text-lg text-gray-800 font-semibold">{text}</p>}
      </div>
    </div>
  );
};

export { Loading };
