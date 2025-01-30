import React, { useEffect, useState } from 'react';

type ToastProps = {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';  // New 'warning' type for custom toast status
  duration?: number;  // Duration in milliseconds before the toast disappears
  onClose: () => void; // Callback to close the toast manually
};

const Toast: React.FC<ToastProps> = ({ message, type = 'info', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Automatically close the toast after the specified duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  // Define dynamic classes based on the toast type
  const toastClasses = {
    success: 'bg-green-500 border-green-700 text-white',
    error: 'bg-red-500 border-red-700 text-white',
    info: 'bg-blue-500 border-blue-700 text-white',
    warning: 'bg-yellow-500 border-yellow-700 text-white',
  };

  return (
    <div
      className={`fixed bottom-5 right-5 w-72 p-4 rounded-lg border-2 shadow-lg flex items-center space-x-4 animate-fade-in ${toastClasses[type]}`}
    >
      <div className="flex-1">{message}</div>
      <button onClick={() => { setIsVisible(false); onClose(); }} className="text-white font-bold">
        &times;
      </button>
    </div>
  );
};

export { Toast };
