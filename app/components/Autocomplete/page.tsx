import React, { useState } from 'react';
import Autocomplete from '.';

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
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Autocomplete Component</h1>
      <p className="text-gray-700 mb-6">
        The <strong>Autocomplete</strong> component provides an interactive search
        experience with a dropdown of matching suggestions. It supports keyboard
        navigation, debounce for input optimization, and custom styling options.
      </p>

      <h2 className="text-xl font-semibold mb-2">Example Usage</h2>
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

      <h2 className="text-xl font-semibold mt-6 mb-2">Props</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-left">Prop</th>
            <th className="border border-gray-300 p-2 text-left">Type</th>
            <th className="border border-gray-300 p-2 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 p-2">suggestions</td>
            <td className="border border-gray-300 p-2">SuggestionItem[]</td>
            <td className="border border-gray-300 p-2">Array of suggestion objects with label and value.</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">onSelect</td>
            <td className="border border-gray-300 p-2">(selectedValue: string) ={'>'} void</td>
            <td className="border border-gray-300 p-2">Callback function when a suggestion is selected.</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">placeholder</td>
            <td className="border border-gray-300 p-2">string</td>
            <td className="border border-gray-300 p-2">Input placeholder text (default: "Search...").</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">emptyText</td>
            <td className="border border-gray-300 p-2">string</td>
            <td className="border border-gray-300 p-2">Text displayed when no matches are found (default: "No matches found").</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">debounceDelay</td>
            <td className="border border-gray-300 p-2">number</td>
            <td className="border border-gray-300 p-2">Debounce delay in milliseconds (default: 300ms).</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AutocompleteDocs;