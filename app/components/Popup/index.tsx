import React, { useState } from 'react';
import clsx from 'clsx'; // For conditional classNames

type PopupCommonProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  overlayColor?: string;
  overlayOpacity?: string;
  width?: string;
  height?: string;
  animation?: 'fade' | 'slide' | 'zoom';
  closeButtonColor?: string;
  closeButtonPosition?: 'top-right' | 'top-left' | 'bottom-center';
  customCloseButton?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  borderRadius?: string;
  shadow?: string;
};

const BasePopup: React.FC<PopupCommonProps> = ({
  isOpen,
  onClose,
  children,
  overlayColor = 'black',
  overlayOpacity = '50',
  width = 'w-96',
  height = 'min-h-[200px]',
  animation = 'fade',
  closeButtonColor = 'red-500',
  closeButtonPosition = 'top-right',
  customCloseButton,
  header,
  footer,
  borderRadius = 'rounded-lg',
  shadow = 'shadow-2xl',
}) => {
  if (!isOpen) return null;

  const animationClasses = {
    fade: 'transition-opacity opacity-0 opacity-100',
    slide: 'transform translate-y-[-50px] opacity-0 translate-y-0',
    zoom: 'scale-50 opacity-0 scale-100',
  };

  const positionClasses = {
    'top-right': 'top-3 right-3',
    'top-left': 'top-3 left-3',
    'bottom-center': 'bottom-3 left-1/2 transform -translate-x-1/2',
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-[9999]" 
      role="dialog" 
      aria-modal="true"
    >
      <div
        className={clsx(
          'absolute inset-0 bg-opacity-50',
          `bg-${overlayColor}`,
          `bg-opacity-${overlayOpacity}`,
          'transition-opacity'
        )}
        onClick={onClose}
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
        'transition-all'
      )}>
        {/* Custom header or default */}
        {header || (
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Popup Title</h2>
          </div>
        )}

        {/* Close Button */}
        {customCloseButton || (
          <button
            className={clsx(
              'absolute', 
              positionClasses[closeButtonPosition], 
              `bg-${closeButtonColor}`, 
              'text-white rounded-full w-8 h-8 flex items-center justify-center hover:scale-110 transition-transform'
            )}
            onClick={onClose}
            aria-label="Close"
          >
            ✖
          </button>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {children}
        </div>

        {/* Footer */}
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
};

const Popup: React.FC<PopupProps> = ({
  showNestedButton = true,
  nestedPopupContent,
  isOpen,   // Do not pass `isOpen` to BasePopup from here
  onClose,  // Do not pass `onClose` to BasePopup from here
  ...props
}) => {
  const [isNestedOpen, setNestedOpen] = useState(false);

  return (
    <>
      <BasePopup 
        {...props} // Pass other props, but don't pass isOpen and onClose directly
        isOpen={isOpen} 
        onClose={onClose}
      >
        {props.children}

        {showNestedButton && (
          <button
            className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            onClick={() => setNestedOpen(true)}
          >
            Open Nested Popup
          </button>
        )}
      </BasePopup>

      {nestedPopupContent && (
        <BasePopup
          isOpen={isNestedOpen}
          onClose={() => setNestedOpen(false)}
          width="w-[600px]"
          animation="slide"
          overlayOpacity="70"
          {...props}
        >
          {nestedPopupContent}
        </BasePopup>
      )}
    </>
  );
};

export { Popup };
