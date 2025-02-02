'use client';

import React, { useEffect, useState } from 'react';

type ToastProps = {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  icon?: React.ReactNode; // Custom icon override
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'; // Positioning options
};

const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  icon,
  position = 'bottom-right'
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);

  const startExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 300); // Matches exit animation duration
  };

  useEffect(() => {
    const timer = setTimeout(startExit, duration);
    
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.max(prev - (100 / (duration / 50)), 0));
    }, 50);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [duration]);

  const positions = {
    'top-right': 'top-5 right-5',
    'top-left': 'top-5 left-5',
    'bottom-right': 'bottom-5 right-5',
    'bottom-left': 'bottom-5 left-5',
  };

  const toastClasses = {
    success: 'bg-emerald-500 border-emerald-600',
    error: 'bg-rose-500 border-rose-600',
    info: 'bg-sky-500 border-sky-600',
    warning: 'bg-amber-500 border-amber-600',
  };

  const getIcon = () => icon || (
    <svg className={`w-6 h-6 ${toastClasses[type].replace('bg', 'text')}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {type === 'success' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />}
      {type === 'error' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />}
      {type === 'info' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
      {type === 'warning' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />}
    </svg>
  );

  if (!isVisible) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`fixed ${positions[position]} min-w-[300px] max-w-md rounded-lg border shadow-xl backdrop-blur-sm transition-all duration-300 ${
        isExiting ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'
      } ${toastClasses[type]}`}
    >
      {/* Progress bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-black/10">
        <div
          className="h-full bg-white/30 transition-all duration-50"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-start p-4 space-x-3">
        {/* Icon */}
        <div className="shrink-0">{getIcon()}</div>

        {/* Content */}
        <div className="flex-1 text-white">
          <p className="font-medium">{message}</p>
        </div>

        {/* Close button */}
        <button
          onClick={startExit}
          className="shrink-0 p-1 -m-1 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close toast"
        >
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export { Toast };
