import React, { createContext, useState, useEffect, useContext } from 'react';
import { Firebase_Auth, Firebase_DB } from '../../FirebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';


export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [inspections, setInspections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileLoaded,setIsprofileLoaded] = useState(false);

  useEffect(() => {
    const fetchAllProfiles = async () => {
      try {
        // Fetch all user profiles
        const profilesCollectionRef = collection(Firebase_DB, 'Profiles');
        const profilesSnapshot = await getDocs(profilesCollectionRef);

        // Convert the snapshot into an array of profiles
        const profilesArray = profilesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        const user = Firebase_Auth.currentUser;

        const filteredProfiles = profilesArray.filter(
          (profile) => profile.id !== user.uid
        );


        const sortedProfiles = filteredProfiles.sort((a, b) =>
          a.email.localeCompare(b.email)
        );
        setProfiles(sortedProfiles);

        
        if (user) {
          const currentUserProfile = profilesArray.find(profile => profile.id === user.uid);
          setCurrentUser(currentUserProfile);
          setIsprofileLoaded(true);
         
        } else {
          console.log('No user is currently logged in.');
        }
      } catch (error) {
        console.error('Error fetching profiles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllProfiles();
  }, []);


  useEffect(() => {
    if (!isProfileLoaded) return;

    const fetchInspections = async () => {
      try {

        const inspectionsRef = collection(Firebase_DB, 'Inspections');

        const driverQuery = query(inspectionsRef, where('driverId', '==', currentUser.id));

        const fleetCtrlQuery = query(inspectionsRef, where('fleetCtrl_id', '==', currentUser.id));

        const [driverSnapshot, fleetCtrlSnapshot] = await Promise.all([
          getDocs(driverQuery),
          getDocs(fleetCtrlQuery),
        ]);

        const fetchedInspections = [...driverSnapshot.docs, ...fleetCtrlSnapshot.docs].map(doc => ({
          id: doc.id,
          ...doc.data(),
         
        }));

        setInspections(fetchedInspections);
      } catch (e) {
        console.error('Error fetching inspections: ', e);
      }
    };

    fetchInspections();
  }, [isProfileLoaded, currentUser]);

  return (
    <GlobalContext.Provider value={{ currentUser, profiles, inspections, isLoading }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);