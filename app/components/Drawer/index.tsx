import React, { useEffect, useCallback } from 'react';
import clsx from 'clsx';

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  items: { label: string; onClick: () => void }[];
  isDark: boolean; // Added dark mode prop
  children:React.ReactNode;
};

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, items, isDark,children }) => {
  const handleOverlayClick = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [onClose, isOpen]);

  // Focus management for accessibility
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const firstItem = document.getElementById('drawer-item-0');
      firstItem?.focus();
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={clsx(
        "fixed inset-0 z-50 transition-opacity duration-300",
        isOpen ? "visible bg-black/50" : "invisible opacity-0",
        isDark && "bg-black/70" // Dark mode overlay adjustment
      )}
      onClick={handleOverlayClick}
    >
      <div
        className={clsx(
          "w-[500px] h-full fixed left-0 top-0 z-50 pt-10 px-4  shadow-xl transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isDark ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
        )}
        onClick={(e) => e.stopPropagation()}
        role="region"
        aria-label="Navigation drawer"
      >
        <button
          onClick={onClose}
          className={clsx(
            "absolute top-4 right-4 text-lg transition-colors",
            isDark ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-800"
          )}
          aria-label="Close drawer"
        >
          &times;
        </button>
        
        {/* <nav className="mt-8">
          <ul className="flex flex-col space-y-2">
            {items.map((item, index) => (
              <li key={item.label}>
                <button
                  id={`drawer-item-${index}`}
                  className={clsx(
                    "w-full text-left p-3 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
                    isDark
                      ? "text-gray-200 hover:bg-gray-700 focus:ring-blue-400"
                      : "text-gray-800 hover:bg-gray-100 focus:ring-blue-500"
                  )}
                  onClick={() => {
                    item.onClick();
                    onClose();
                  }}
                  role="menuitem"
                  tabIndex={isOpen ? 0 : -1}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav> */}
        {children}
      </div>
    </div>
  );
};

export default React.memo(Drawer);
