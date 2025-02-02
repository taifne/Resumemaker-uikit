"use client"
import React, { useState } from 'react';
 // Make sure the path to your Treeview component is correct
import { FaFolder, FaFile } from 'react-icons/fa';
import Treeview from '../../components/TreeView';

const sampleData = [
  {
    id: '1',
    label: 'Root Node 1',
    children: [
      {
        id: '1-1',
        label: 'Child Node 1-1',
        icon: <FaFolder />,
        children: [
          { id: '1-1-1', label: 'Sub Child Node 1-1-1' },
          { id: '1-1-2', label: 'Sub Child Node 1-1-2' },
        ],
      },
      { id: '1-2', label: 'Child Node 1-2' },
    ],
  },
  {
    id: '2',
    label: 'Root Node 2',
    icon: <FaFolder />,
    children: [
      { id: '2-1', label: 'Child Node 2-1' },
      { id: '2-2', label: 'Child Node 2-2' },
    ],
  },
];

const TreeviewDocumentation: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedNode(id);
  };
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Treeview Component Documentation</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">Introduction</h2>
        <p>
          The <strong>Treeview</strong> component is a flexible and customizable tree structure to display hierarchical data. It allows you to represent data with nested children and provides features like expand/collapse, selection, and more.
        </p>
        <ul className="list-disc pl-5">
          <li><strong>Expand/Collapse nodes:</strong> Toggle the visibility of child nodes.</li>
          <li><strong>Select nodes:</strong> Allows users to select or deselect individual nodes.</li>
          <li><strong>Accordion:</strong> When enabled, only one node can be expanded at a time.</li>
          <li><strong>Connectors:</strong> Optionally show connecting lines between nodes for better structure visualization.</li>
          <li><strong>Customizable icons:</strong> Use custom icons for each node.</li>
          <li><strong>Positioning:</strong> The component automatically positions child nodes relative to the parent node.</li>
        </ul>
      </section>

      <section className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Props</h2>
        <p>The following props are available for the <code>Treeview</code> component:</p>
        <table className="table-auto w-full mt-2 border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Prop Name</th>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2"><code>data</code></td>
              <td className="border px-4 py-2">TreeNode[]</td>
              <td className="border px-4 py-2">The hierarchical data to display in the tree. Each node can contain <code>id</code>, <code>label</code>, optional <code>icon</code>, and nested <code>children</code>.</td>
            </tr>
            <tr>
              <td className="border px-4 py-2"><code>onSelect</code></td>
              <td className="border px-4 py-2">function</td>
              <td className="border px-4 py-2">A callback function triggered when a node is selected. Receives the <code>id</code> of the selected node.</td>
            </tr>
            <tr>
              <td className="border px-4 py-2"><code>onToggle</code></td>
              <td className="border px-4 py-2">function</td>
              <td className="border px-4 py-2">A callback function triggered when a node is expanded or collapsed. Receives the <code>id</code> and <code>isOpen</code> state.</td>
            </tr>
            <tr>
              <td className="border px-4 py-2"><code>selectable</code></td>
              <td className="border px-4 py-2">boolean</td>
              <td className="border px-4 py-2">Determines whether the nodes are selectable. Default is <code>false</code>.</td>
            </tr>
            <tr>
              <td className="border px-4 py-2"><code>accordion</code></td>
              <td className="border px-4 py-2">boolean</td>
              <td className="border px-4 py-2">If <code>true</code>, only one node can be expanded at a time. Default is <code>false</code>.</td>
            </tr>
            <tr>
              <td className="border px-4 py-2"><code>showConnectors</code></td>
              <td className="border px-4 py-2">boolean</td>
              <td className="border px-4 py-2">If <code>true</code>, connector lines are displayed between nodes. Default is <code>true</code>.</td>
            </tr>
            <tr>
              <td className="border px-4 py-2"><code>className</code></td>
              <td className="border px-4 py-2">string</td>
              <td className="border px-4 py-2">Additional class names for customization. Default is an empty string.</td>
            </tr>
            <tr>
              <td className="border px-4 py-2"><code>expandAll</code></td>
              <td className="border px-4 py-2">boolean</td>
              <td className="border px-4 py-2">If <code>true</code>, all nodes will be expanded initially. Default is <code>false</code>.</td>
            </tr>
          </tbody>
        </table>
      </section>
      <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Treeview Example</h1>
      <Treeview
        data={sampleData}
        onSelect={handleSelect}
        selectable={true}
        showConnectors={true}
        expandAll={false}
        accordion={true}
      />
      {selectedNode && <p className="mt-4">Selected Node ID: {selectedNode}</p>}
    </div>
      <section className="mt-4">
        <h2 className="text-xl font-semibold mb-2">TreeNode Structure</h2>
        <p>The structure of each node should follow the <code>TreeNode</code> interface:</p>
        <pre className="bg-gray-100 p-4 rounded-md">
          {`type TreeNode = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TreeNode[];
  isDisabled?: boolean;
};`}
        </pre>
      </section>

      <section className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Usage Example</h2>
        <p>Here is an example of how to use the Treeview component in your application:</p>
        <pre className="bg-gray-100 p-4 rounded-md">
          {`import React, { useState } from 'react';
import Treeview from './Treeview';  // Adjust the path to where you have Treeview.tsx

const sampleData = [
  {
    id: '1',
    label: 'Root Node 1',
    children: [
      {
        id: '1-1',
        label: 'Child Node 1-1',
        icon: <FaFolder />,
        children: [
          { id: '1-1-1', label: 'Sub Child Node 1-1-1' },
          { id: '1-1-2', label: 'Sub Child Node 1-1-2' },
        ],
      },
      { id: '1-2', label: 'Child Node 1-2' },
    ],
  },
  {
    id: '2',
    label: 'Root Node 2',
    icon: <FaFolder />,
    children: [
      { id: '2-1', label: 'Child Node 2-1' },
      { id: '2-2', label: 'Child Node 2-2' },
    ],
  },
];

const App: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedNode(id);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Treeview Example</h1>
      <Treeview
        data={sampleData}
        onSelect={handleSelect}
        selectable={true}
        showConnectors={true}
        expandAll={false}
        accordion={true}
      />
      {selectedNode && <p className="mt-4">Selected Node ID: {selectedNode}</p>}
    </div>
  );
};

export default App;`}
        </pre>
      </section>

      <section className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Explanation</h2>
        <p>
          In the above example:
          <ul className="list-disc pl-5">
            <li><strong>sampleData</strong>: This is the tree structure data, which contains nodes with nested children.</li>
            <li><strong>onSelect</strong>: This function is used to update the state when a node is selected. It logs the selected node's ID.</li>
            <li><strong>Props used:</strong>
              <ul className="list-disc pl-5">
                <li><code>data</code>: Pass the tree data to the <code>Treeview</code> component.</li>
                <li><code>onSelect</code>: Pass the <code>handleSelect</code> callback to capture the selected node's ID.</li>
                <li><code>selectable</code>: Enables checkbox selection for each node.</li>
                <li><code>showConnectors</code>: Display connectors between parent-child nodes.</li>
                <li><code>expandAll</code>: If <code>true</code>, all nodes will be expanded initially. In this example, it is set to <code>false</code>.</li>
                <li><code>accordion</code>: When <code>true</code>, only one node can be expanded at a time.</li>
              </ul>
            </li>
          </ul>
        </p>
      </section>

      <section className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Styling & Customization</h2>
        <p>The component uses utility classes from Tailwind CSS for styling. You can easily customize the look of the tree by overriding these classes or passing your own <code>className</code> prop.</p>
        <p>The icons used by default for folders and files are from <code>react-icons</code> (<code>FaFolder</code>, <code>FaFolderOpen</code>, etc.), but you can pass your own custom icons if needed.</p>
      </section>
    </div>
  );
};

export default TreeviewDocumentation;
