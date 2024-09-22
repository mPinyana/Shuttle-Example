import React, { createContext, useState } from 'react';

export const InspectContext = createContext();

const InspectionProvider = ({ children }) => {
    const [inspections, setInspection] = useState([]); // Initial loader state
  
    return (
      <InspectContext.Provider value={{ inspections, setInspection }}>
        {children}
      </InspectContext.Provider>
    );
  };
  
  export default InspectionProvider;