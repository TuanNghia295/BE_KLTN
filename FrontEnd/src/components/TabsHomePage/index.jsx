import React, { useState, useEffect, createContext, useContext } from 'react';

const TabContext = createContext();

const tabNames = [
  "Jordan",
  "Men",
  "Famale",
  "Children"
];

const tabs = tabNames.map((name, index) => ({
  id: index + 1,
  label: name,
  content: `Content for ${name}`
}));

const TabsHomePage = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowButtons(window.innerWidth > 600);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelect = (event) => {
    setActiveTab(parseInt(event.target.value));
  };

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
          <select onChange={handleSelect} value={activeTab} className="px-4 py-2 border rounded-md">
            {tabs.map(tab => (
              <option key={tab.id} value={tab.id}>{tab.label}</option>
            ))}
          </select>
        {/* <div className="p-4 border rounded-md bg-gray-50 mb-4">
          {tabs.find(tab => tab.id === activeTab)?.content}
        </div> */}
    </TabContext.Provider>
  );
};

export default TabsHomePage;
