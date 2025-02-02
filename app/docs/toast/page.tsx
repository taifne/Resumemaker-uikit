/**
 * @file ToastDocumentation.tsx
 * @description Documentation for the Toast component, explaining its purpose, key features, usage, and available properties.
 */
"use client"
import React, { useState } from "react";
import { Toast } from "../../components/Toast";

/**
 * ## Toast Component Documentation
 *
 * The `Toast` component is a notification popup used to display messages to users. 
 * It supports different types of messages (success, error, info, and warning), auto-dismiss functionality, and customizable icons and positions.
 *
 * ### Key Features:
 * - Supports different toast types: `success`, `error`, `info`, and `warning`
 * - Auto-dismiss functionality with a customizable duration
 * - Customizable icons and styles
 * - Four different screen positions: `top-right`, `top-left`, `bottom-right`, and `bottom-left`
 * - Smooth enter and exit animations
 * - Includes a progress bar indicating the remaining time before dismissal
 *
 * ### Example Usage:
 * ```tsx
 * import React, { useState } from "react";
 * import { Toast } from "./Toast";
 *
 * const App = () => {
 *   const [showToast, setShowToast] = useState(true);
 *
 *   return (
 *     <div>
 *       {showToast && (
 *         <Toast
 *           message="Operation successful!"
 *           type="success"
 *           duration={5000}
 *           position="top-right"
 *           onClose={() => setShowToast(false)}
 *         />
 *       )}
 *     </div>
 *   );
 * };
 *
 * export default App;
 * ```
 *
 * ### Props:
 * | Prop       | Type                                   | Default       | Description |
 * |-----------|--------------------------------|---------------|-------------|
 * | `message`  | `string`                              | `-`           | The message to display inside the toast |
 * | `type`     | `'success' | 'error' | 'info' | 'warning'` | `'info'`     | The type of notification, which changes the style |
 * | `duration` | `number`                              | `3000`        | Duration in milliseconds before the toast auto-dismisses |
 * | `onClose`  | `() => void`                          | `-`           | Callback function triggered when the toast is dismissed |
 * | `icon`     | `React.ReactNode`                     | `undefined`   | Custom icon to override the default icon |
 * | `position` | `'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'` | `'bottom-right'` | The screen position where the toast appears |
 *
 */
const ToastDocumentation: React.FC = () => {
    const [showToast, setShowToast] = useState(false);

  // Function to trigger toast
  const triggerToast = () => {
    setShowToast(true);

    // Hide the toast after 4 seconds (duration)
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">Toast Component Documentation</h1>
      <p className="mt-2 text-gray-700">
        The `Toast` component provides a simple way to show temporary notifications.
        You can customize its appearance, duration, and behavior.
      </p>
      <h2 className="mt-4 text-xl font-semibold">Example:</h2>
      <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
        { <div className="p-8">
      <button
        onClick={triggerToast}
        className="p-4 bg-blue-500 text-white rounded-lg"
      >
        Show Toast
      </button>

      {/* Conditionally render the Toast component */}
      {showToast && (
        <Toast
          message="This is a success message!"
          type="success" // 'success', 'error', 'info', or 'warning'
          duration={4000} // Toast duration in ms
          position="top-right" // 'top-right', 'top-left', 'bottom-right', 'bottom-left'
        />
      )}
    </div>}
      </pre>
    </div>
  );
};

export default ToastDocumentation;
