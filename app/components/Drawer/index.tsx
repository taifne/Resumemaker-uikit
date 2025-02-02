import React, { useEffect, useCallback } from 'react';

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  items: { label: string; onClick: () => void }[];
};

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, items }) => {
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
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen 
          ? 'visible bg-black bg-opacity-50' 
          : 'invisible opacity-0'
      }`}
      onClick={handleOverlayClick}
    >
      <div
        className={`w-72 h-full bg-white fixed left-0 top-0 z-50 p-4 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
        role="region"
        aria-label="Navigation drawer"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 text-lg hover:text-gray-800 transition-colors"
          aria-label="Close drawer"
        >
          &times;
        </button>
        
        <nav className="mt-8">
          <ul className="flex flex-col space-y-2">
            {items.map((item, index) => (
              <li key={item.label}>
                <button
                  id={`drawer-item-${index}`}
                  className="w-full text-left p-3 text-gray-800 hover:bg-gray-100 rounded-md 
                           transition-colors duration-200 focus:outline-none focus:ring-2 
                           focus:ring-blue-500 focus:ring-offset-2"
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
        </nav>
      </div>
    </div>
  );
};

export default React.memo(Drawer);