import React, { createContext, useState } from 'react';

export const VehicleContext = createContext();

const VehicleProvider = ({ children }) => {
    const [vehicles, setVehicles] = useState([]); // Initial loader state
  
    return (
      <VehicleContext.Provider value={{ vehicles, setVehicles }}>
        {children}
      </VehicleContext.Provider>
    );
  };
  
  export default VehicleProvider;