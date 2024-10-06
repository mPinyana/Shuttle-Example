import React, { createContext, useState } from 'react';

export const ProfilesContext = createContext();

const ProfilesProvider = ({ children }) => {
    const [profiles,setProfiles] = useState([]); // Initial loader state
  
    return (
      <ProfilesContext.Provider value={{ profiles,setProfiles }}>
        {children}
      </ProfilesContext.Provider>
    );
  };
  
  export default ProfilesProvider;