import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';

type PopupCommonProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  overlayColor?: string;
  overlayOpacity?: number;
  width?: string;
  height?: string;
  animation?: 'fade' | 'slide' | 'zoom' | 'none';
  closeButtonColor?: string;
  closeButtonPosition?: 'top-right' | 'top-left' | 'bottom-center';
  customCloseButton?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  borderRadius?: string;
  shadow?: string;
  closeOnEscape?: boolean;
  closeOnOverlayClick?: boolean;
  preventScroll?: boolean;
  zIndex?: number;
  title?:string;
};

const BasePopup: React.FC<PopupCommonProps> = ({
  isOpen,
  onClose,
  children,
  overlayColor = 'black',
  overlayOpacity = 50,
  width = 'w-96',
  height = 'min-h-[200px]',
  animation = 'fade',
  closeButtonColor = 'red-500',
  closeButtonPosition = 'top-right',
  customCloseButton,
  title,
  header,
  footer,
  borderRadius = 'rounded-lg',
  shadow = 'shadow-2xl',
  closeOnEscape = true,
  closeOnOverlayClick = true,
  preventScroll = true,
  zIndex = 9999,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && closeOnEscape) {
      onClose();
    }
  }, [closeOnEscape, onClose]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      if (preventScroll) {
        document.body.style.overflow = 'hidden';
      }
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown, preventScroll]);

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const animationClasses = {
    fade: 'animate-fadeIn',
    slide: 'animate-slideIn',
    zoom: 'animate-zoomIn',
    none: '',
  };

  const positionClasses = {
    'top-right': 'top-3 right-3',
    'top-left': 'top-3 left-3',
    'bottom-center': 'bottom-3 left-1/2 -translate-x-1/2',
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={clsx(
          'absolute inset-0 transition-opacity',
          `bg-${overlayColor}`,
          isVisible ? 'opacity-100' : 'opacity-0'
        )}
        style={{ opacity: overlayOpacity / 100 }}
        onClick={handleOverlayClick}
        aria-label="Close popup"
      />
      
      <div className={clsx(
        'relative',
        width,
        height,
        borderRadius,
        shadow,
        'bg-white',
        animationClasses[animation],
        'transform transition-all duration-300'
      )}>
        {header || (
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>
        )}

        {customCloseButton || (
          <button
            className={clsx(
              'absolute',
              positionClasses[closeButtonPosition],
              `bg-${closeButtonColor}`,
              'text-white rounded-full w-8 h-8 flex items-center justify-center',
              'hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2'
            )}
            onClick={onClose}
            aria-label="Close"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </button>
        )}

        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {children}
        </div>

        {footer && (
          <div className="p-4 border-t border-gray-200">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

type PopupProps = PopupCommonProps & {
  showNestedButton?: boolean;
  nestedPopupContent?: React.ReactNode;
  nestedZIndex?: number;
  maxNestedDepth?: number;

};

const Popup: React.FC<PopupProps> = ({
  showNestedButton = true,
  nestedPopupContent,
  zIndex = 9999,
  nestedZIndex = 10000,
  maxNestedDepth = 3,
  ...props
}) => {
  const [nestedOpenStack, setNestedOpenStack] = useState<boolean[]>([]);

  const openNestedPopup = () => {
    if (nestedOpenStack.length < maxNestedDepth) {
      setNestedOpenStack(prev => [...prev, true]);
    }
  };

  const closeNestedPopup = () => {
    setNestedOpenStack(prev => prev.slice(0, -1));
  };

  return (
    <>
      <BasePopup 
        {...props}
        zIndex={zIndex + nestedOpenStack.length}
        onClose={() => {
          props.onClose();
          setNestedOpenStack([]);
        }}
      >
        {props.children}

        {showNestedButton && nestedOpenStack.length < maxNestedDepth && (
          <button
            className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={openNestedPopup}
            type="button"
          >
            Open Nested Popup ({nestedOpenStack.length + 1}/{maxNestedDepth})
          </button>
        )}
      </BasePopup>

      {nestedOpenStack.map((_, index) => (
        <BasePopup
        {...props}
        onClose={() => {
          closeNestedPopup();  // Ensure the main popup closes
          setNestedOpenStack([]);  // Reset nested popups
        }}
        zIndex={zIndex + nestedOpenStack.length}
        >
          {nestedPopupContent || props.children}
        </BasePopup>
      ))}
    </>
  );
};

export { Popup };