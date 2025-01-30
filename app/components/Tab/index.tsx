import React, { useState } from 'react';

type TabProps = {
  label: string;
  children: React.ReactNode;
};

type TabsProps = {
  children: React.ReactNode;
};

const Tab: React.FC<TabProps> = ({ label, children }) => {
  return (
    <div className="tab-content">
      {children}
    </div>
  );
};

const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabHeaders = React.Children.map(children, (child: any) => child.props.label);
  const tabContents = React.Children.map(children, (child: any) => child.props.children);

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg border shadow-md">
      <div className="tabs flex border-b">
        {tabHeaders?.map((label:any, index:any) => (
          <button
            key={index}
            className={`tab-button py-2 px-4 w-full text-center text-gray-600 hover:text-blue-500 focus:outline-none ${
              index === activeTab ? 'border-b-2 border-blue-500 text-blue-500' : ''
            }`}
            onClick={() => setActiveTab(index)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="tab-panels p-4">
        {tabContents?.[activeTab]}
      </div>
    </div>
  );
};

export { Tabs, Tab };
