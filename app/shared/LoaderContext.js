import React, { createContext, useState } from 'react';

// Create the LoaderContext
export const LoaderContext = createContext();

const LoaderProvider = ({ children }) => {
  const [loader, setLoader] = useState(true); // Initial loader state

  return (
    <LoaderContext.Provider value={{ loader, setLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderProvider;