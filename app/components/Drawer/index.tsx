import React, { useState, useEffect, useCallback } from 'react';

// Define the types for the props of the Drawer component
type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  items: { label: string; onClick: () => void }[];
};

// Drawer component with the correct prop types
const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, items }) => {
  const handleOverlayClick = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  return (
    <>
      {isOpen && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()} // Prevent closing the drawer when clicking inside
            className="w-72 h-full bg-white fixed left-0 top-0 z-50 p-4 shadow-xl transition-transform transform"
            style={{ transform: isOpen ? 'translateX(0)' : 'translateX(-100%)' }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-600 text-lg"
            >
              &times;
            </button>
            <div className="flex flex-col space-y-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="cursor-pointer p-2 text-gray-800 hover:bg-gray-100 rounded-md"
                  onClick={() => {
                    item.onClick();
                    onClose();
                  }}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Drawer;
