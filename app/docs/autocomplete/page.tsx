"use client"
import React, { useState } from 'react';
import Autocomplete from '../../components/Autocomplete';


const suggestions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Date', value: 'date' },
  { label: 'Grape', value: 'grape' },
];

const AutocompleteDocs: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Autocomplete Component</h1>
      <p className="text-gray-700 mb-6 text-lg text-center">
        The <strong>Autocomplete</strong> component provides an interactive search
        experience with a dropdown of matching suggestions. It supports keyboard
        navigation, debounce for input optimization, and custom styling options.
      </p>

      <div className="mb-8 p-6 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Example Usage</h2>
        <p className="text-gray-600 mb-4">Start typing to see suggestions:</p>
        <Autocomplete 
          suggestions={suggestions} 
          onSelect={(value) => setSelectedValue(value)} 
          placeholder="Search for a fruit..." 
        />

        {selectedValue && (
          <p className="mt-4 text-green-600 font-semibold">
            Selected Value: {selectedValue}
          </p>
        )}
      </div>

      <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">Code Example</h2>
      <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
        <code>
{`import Autocomplete from './Autocomplete';

const suggestions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
];

const MyComponent = () => {
  const handleSelect = (value) => {
    console.log('Selected:', value);
  };

  return (
    <Autocomplete 
      suggestions={suggestions} 
      onSelect={handleSelect} 
      placeholder="Search here..." 
    />
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
            <th className="border border-gray-300 p-3 text-left">Description</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr>
            <td className="border border-gray-300 p-3">suggestions</td>
            <td className="border border-gray-300 p-3">SuggestionItem[]</td>
            <td className="border border-gray-300 p-3">Array of suggestion objects with label and value.</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">onSelect</td>
            <td className="border border-gray-300 p-3">(selectedValue: string) ={'>'} void</td>
            <td className="border border-gray-300 p-3">Callback function when a suggestion is selected.</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">placeholder</td>
            <td className="border border-gray-300 p-3">string</td>
            <td className="border border-gray-300 p-3">Input placeholder text (default: "Search...").</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">emptyText</td>
            <td className="border border-gray-300 p-3">string</td>
            <td className="border border-gray-300 p-3">Text displayed when no matches are found (default: "No matches found").</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">debounceDelay</td>
            <td className="border border-gray-300 p-3">number</td>
            <td className="border border-gray-300 p-3">Debounce delay in milliseconds (default: 300ms).</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AutocompleteDocs;
