import React, { useState } from 'react';

type PopupProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

type NestedPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const NestedPopup: React.FC<NestedPopupProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative w-96 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Nested Popup</h2>
          {children}
        </div>
        <button
          className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
          onClick={onClose}
        >
          ✖
        </button>
      </div>
    </div>
  );
};

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children }) => {
  const [isNestedOpen, setNestedOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative w-96 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Main Popup</h2>
          {children}
          <button
            className="mt-4 py-2 px-4 bg-blue-500 text-white rounded"
            onClick={() => setNestedOpen(true)}
          >
            Open Nested Popup
          </button>
        </div>
        <button
          className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
          onClick={onClose}
        >
          ✖
        </button>
      </div>

      {/* Nested Popup */}
      <NestedPopup isOpen={isNestedOpen} onClose={() => setNestedOpen(false)}>
        <p>This is a nested popup. You can put any content here!</p>
      </NestedPopup>
    </div>
  );
};

export { Popup };
