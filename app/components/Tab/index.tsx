import React, { useState, useEffect } from 'react';

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
  
  // Filter children to only include Tab components
  const tabs = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<TabProps> =>
      React.isValidElement(child) && child.type === Tab
  );

  useEffect(() => {
    if (activeTab >= tabs.length) {
      setActiveTab(Math.max(0, tabs.length - 1));
    }
  }, [tabs.length, activeTab]);

  return (
    <div className="w-full  mx-auto bg-white rounded-lg border shadow-md">
      <div className="tabs flex border-b" role="tablist">
        {tabs.map((child, index) => {
          const isActive = index === activeTab;
          return (
            <button
              key={index}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${index}`}
              id={`tab-${index}`}
              className={`tab-button py-2 px-4 w-full text-center focus:outline-none ${
                isActive 
                  ? 'border-b-2 border-blue-500 text-blue-500' 
                  : 'text-gray-600 hover:text-blue-500'
              }`}
              onClick={() => setActiveTab(index)}
              tabIndex={isActive ? 0 : -1}
            >
              {child.props.label} {/* Accessing label from Tab component */}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        id={`panel-${activeTab}`}
        className="tab-panels p-4"
      >
        {tabs[activeTab]?.props.children}
      </div>
    </div>
  );
};


export { Tabs, Tab };