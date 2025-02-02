"use client";

import React, { useState } from "react";
import { Loading } from "../../components/Loading";

const LoadingDocs: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleLoading = () => {
    setIsLoading((prev) => !prev);
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Loading Component
      </h1>
      <p className="text-gray-700 mb-6 text-lg text-center">
        The <strong>Loading</strong> component displays a loading spinner and
        optional text, often used to indicate a background task or operation in
        progress. It can be customized with various styles, sizes, and
        behaviors.
      </p>

      <div className="mb-8 p-6 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          Example Usage
        </h2>
        <p className="text-gray-600 mb-4">
          Click the button to toggle the loading state:
        </p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg mb-4"
          onClick={toggleLoading}
        >
          Toggle Loading
        </button>

        <Loading
          isLoading={isLoading}
          overlayColor="bg-black"
          overlayOpacity="bg-opacity-25"
          backgroundColor="bg-transparent"
        >
          <div className="w-16 h-16 border-4 border-t-white rounded-full animate-spin" />
        </Loading>
      </div>

      <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">
        Code Example
      </h2>
      <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
        <code>
          {`import { Loading } from './Loading';

const MyComponent = () => {
  const [isLoading, setIsLoading] = useState(false);

  const toggleLoading = () => setIsLoading(!isLoading);

  return (
    <div>
      <button onClick={toggleLoading}>Toggle Loading</button>
      <Loading isLoading={isLoading} text="Loading..." size="md">
        {/* Custom loading content */}
      </Loading>
    </div>
  );
};`}
        </code>
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">Props</h2>
      <table className="w-full border-collapse border border-gray-300 shadow-md">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="border border-gray-300 p-3 text-left">Prop</th>
            <th className="border border-gray-300 p-3 text-left">Type</th>
            <th className="border border-gray-300 p-3 text-left">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr>
            <td className="border border-gray-300 p-3">isLoading</td>
            <td className="border border-gray-300 p-3">boolean</td>
            <td className="border border-gray-300 p-3">
              Determines whether the loading spinner should be displayed.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">text</td>
            <td className="border border-gray-300 p-3">string</td>
            <td className="border border-gray-300 p-3">
              Optional text to display below the spinner (e.g., "Loading...").
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">spinnerColor</td>
            <td className="border border-gray-300 p-3">string</td>
            <td className="border border-gray-300 p-3">
              Sets the color of the spinner (default: 'border-blue-500').
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">textColor</td>
            <td className="border border-gray-300 p-3">string</td>
            <td className="border border-gray-300 p-3">
              Sets the color of the loading text (default: 'text-gray-800').
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">overlayColor</td>
            <td className="border border-gray-300 p-3">string</td>
            <td className="border border-gray-300 p-3">
              Sets the background color of the overlay (default: 'bg-gray-800').
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">overlayOpacity</td>
            <td className="border border-gray-300 p-3">string</td>
            <td className="border border-gray-300 p-3">
              Sets the opacity of the overlay (default: 'bg-opacity-50').
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">backgroundColor</td>
            <td className="border border-gray-300 p-3">string</td>
            <td className="border border-gray-300 p-3">
              Sets the background color of the modal (default: 'bg-white').
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">size</td>
            <td className="border border-gray-300 p-3">'sm' | 'md' | 'lg'</td>
            <td className="border border-gray-300 p-3">
              Sets the size of the spinner (default: 'md').
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">modalWidth</td>
            <td className="border border-gray-300 p-3">string</td>
            <td className="border border-gray-300 p-3">
              Sets the width of the modal (default: 'w-80').
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">children</td>
            <td className="border border-gray-300 p-3">React.ReactNode</td>
            <td className="border border-gray-300 p-3">
              Custom content to be displayed inside the loading modal (e.g., a
              custom spinner or other elements).
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LoadingDocs;
