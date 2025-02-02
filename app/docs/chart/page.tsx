"use client"
import React, { useState, useEffect } from 'react';
import Chart from '../../components/Chart';

const BarChartDocs: React.FC = () => {
  const [data, setData] = useState([
    { label: "January", value: 30 },
    { label: "February", value: 40 },
    { label: "March", value: 50 },
    { label: "April", value: 60 },
    { label: "May", value: 70 },
  ]);

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">BarChart Component</h1>
      <p className="text-gray-700 mb-6 text-lg text-center">
        The <strong>BarChart</strong> component provides a customizable bar chart with the ability to display data values, adjust bar orientation, and filter data with a range slider.
      </p>

      <div className="mb-8  p-6 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Example Usage</h2>
        <p className="text-gray-600 mb-4">Here’s how to use the BarChart component:</p>
        <Chart 
          data={data} 
          title="Monthly Sales" 
          orientation="vertical" 
          barColor="#3B82F6" 
          showValues={true} 
          rangeSlider={true} 
          padding={8}
        />
      </div>

      <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">Code Example</h2>
      <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
        <code>
{`import BarChart from './BarChart';

const salesData = [
  { label: 'January', value: 30 },
  { label: 'February', value: 40 },
  { label: 'March', value: 50 },
  { label: 'April', value: 60 },
  { label: 'May', value: 70 },
];

const MyComponent = () => {
  return (
    <BarChart 
      data={salesData} 
      title="Monthly Sales"
      orientation="vertical" 
      barColor="#3B82F6" 
      showValues={true} 
      rangeSlider={true} 
      padding={8} 
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
            <td className="border border-gray-300 p-3">data</td>
            <td className="border border-gray-300 p-3">Array label: string; value: number </td>
            <td className="border border-gray-300 p-3">The data to display on the chart, where each item has a `label` and `value`.</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">title</td>
            <td className="border border-gray-300 p-3">string (optional)</td>
            <td className="border border-gray-300 p-3">Title for the chart (optional).</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">orientation</td>
            <td className="border border-gray-300 p-3">'horizontal' | 'vertical'</td>
            <td className="border border-gray-300 p-3">Orientation of the bars. Default is 'vertical'.</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">barColor</td>
            <td className="border border-gray-300 p-3">string</td>
            <td className="border border-gray-300 p-3">Color of the bars. Default is '#3B82F6'.</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">barGradient</td>
            <td className="border border-gray-300 p-3">[string, string] (optional)</td>
            <td className="border border-gray-300 p-3">An array of two colors for a gradient background on the bars (optional).</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">axisColor</td>
            <td className="border border-gray-300 p-3">string</td>
            <td className="border border-gray-300 p-3">Color of the axis lines. Default is '#6B7280'.</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">showValues</td>
            <td className="border border-gray-300 p-3">boolean</td>
            <td className="border border-gray-300 p-3">Whether to display the values on top of the bars. Default is true.</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">showAxis</td>
            <td className="border border-gray-300 p-3">boolean</td>
            <td className="border border-gray-300 p-3">Whether to show the axis on the chart. Default is true.</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">rangeSlider</td>
            <td className="border border-gray-300 p-3">boolean</td>
            <td className="border border-gray-300 p-3">Whether to show the range slider for filtering the chart's data. Default is true.</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">className</td>
            <td className="border border-gray-300 p-3">string</td>
            <td className="border border-gray-300 p-3">Additional class names for custom styling (optional).</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">barRadius</td>
            <td className="border border-gray-300 p-3">number</td>
            <td className="border border-gray-300 p-3">The radius of the bar corners (optional). Default is 4.</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">padding</td>
            <td className="border border-gray-300 p-3">number</td>
            <td className="border border-gray-300 p-3">Padding around the bars. Default is 8.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BarChartDocs;
