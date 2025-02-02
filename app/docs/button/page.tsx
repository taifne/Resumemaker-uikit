import React from 'react';
import Button from '../../components/Button';

const ButtonDocs: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Button Component Documentation</h1>
      <p className="text-gray-700 mb-6">
        The <strong>Button</strong> component is a versatile and customizable button designed for various use cases. It supports different variants, sizes, icons, loading states, and an optional ripple effect.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Usage</h2>
      <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
{`import Button from '../components/Button';

<Button variant="primary">Click Me</Button>`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Examples</h2>

      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-medium mb-2">Variants</h3>
          <div className="space-x-2">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-2">Sizes</h3>
          <div className="space-x-2">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-2">Icons</h3>
          <div className="space-x-2">
            <Button leftIcon={<span>🚀</span>}>Left Icon</Button>
            <Button rightIcon={<span>➡️</span>}>Right Icon</Button>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-2">Loading State</h3>
          <Button isLoading>Loading...</Button>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-2">Rounded Button</h3>
          <Button rounded>Rounded</Button>
        </div>
      </div>
    </div>
  );
};

export default ButtonDocs;
