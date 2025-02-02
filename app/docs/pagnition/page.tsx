"use client"
import React, { useState } from 'react';
import Pagination from '../../components/Pagnition';

const PaginationDocs: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Pagination Component</h1>
      <p className="text-gray-700 mb-6 text-lg text-center">
        The <strong>Pagination</strong> component allows navigation through a paginated dataset, showing previous and next buttons, and page numbers with ellipsis handling.
      </p>

      <div className="mb-8 p-6 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Example Usage</h2>
        <p className="text-gray-600 mb-4">Here’s how to use the Pagination component:</p>
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
      </div>

      <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">Code Example</h2>
      <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
        <code>
{`import Pagination from './Pagination';

const MyComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Pagination 
      currentPage={currentPage} 
      totalPages={totalPages} 
      onPageChange={handlePageChange} 
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
            <td className="border border-gray-300 p-3">currentPage</td>
            <td className="border border-gray-300 p-3">number</td>
            <td className="border border-gray-300 p-3">The current page number.</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">totalPages</td>
            <td className="border border-gray-300 p-3">number</td>
            <td className="border border-gray-300 p-3">The total number of pages available.</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">onPageChange</td>
            <td className="border border-gray-300 p-3">(page: number) ={'>'} void</td>
            <td className="border border-gray-300 p-3">Callback function that is called when a page is changed.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PaginationDocs;
