import React, { useEffect, useState,  useContext } from 'react';


import { doc,getDoc, collection,getDocs,query,where, addDoc } from 'firebase/firestore';
import { Firebase_Auth,Firebase_DB } from '../../FirebaseConfig';

import { LoaderContext } from './LoaderContext';
import { InspectContext } from "./InspectionContext";
import { VehicleContext } from "./VehicleContext";
import { CurrentUserContext } from "./CurrentUserContext";
import { ProfilesContext } from "./ProfilesContext";

const DataFetcher=()=>{
    
    const {profiles, setProfiles} = useContext(ProfilesContext);
    const {user,setUser} = useContext(CurrentUserContext);
    const [isProfileLoaded,setIsprofileLoaded] = useState(false);
    const {inspections, setInspection } = useContext(InspectContext)
    const { loader, setLoader } = useContext(LoaderContext);
    const {vehicles, setVehicles} = useContext(VehicleContext)

    useEffect(() => {
        const fetchAllProfiles_n_Vehicles = async () => {
          try {
            // Fetch all user profiles
            const profilesCollectionRef = collection(Firebase_DB, 'Profiles');
            const profilesSnapshot = await getDocs(profilesCollectionRef);

            // Fetch all vehicles
            const VehiclesCollectionRef = collection(Firebase_DB, 'vehicles');
            const VehiclesSnapshot = await getDocs(VehiclesCollectionRef);
    
            // Convert the snapshot into an array of profiles
            const profilesArray = profilesSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));

            // get Vehicles array
            const vehiclesArray = VehiclesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
              }));

              vehiclesArray.sort((a, b) => a.fleetNo - b.fleetNo);

              setVehicles(vehiclesArray);
            
            const user = Firebase_Auth.currentUser;
     
            // Filter out current user from profile Array
            const filteredProfiles = profilesArray.filter(
              (profile) => profile.id !== user.uid
            );
    
            // sort them alphabetically
            const sortedProfiles = filteredProfiles.sort((a, b) =>
              a.email.localeCompare(b.email)
            );
            setProfiles(sortedProfiles);
    
            
            if (user) {
              const currentUserProfile = profilesArray.find(profile => profile.id === user.uid);
              setUser(currentUserProfile);
              setIsprofileLoaded(true);
             
            } else {
              console.log('No user is currently logged in.');
            }
          } catch (error) {
            console.error('Error fetching vehicles and profiles:', error);
          } finally {
            setLoader(false);
            console.log('done loading.');
          }
        };
    
        fetchAllProfiles_n_Vehicles();
      }, []);
    
    
      useEffect(() => {
        if (!isProfileLoaded) return;
    
        const fetchInspections = async () => {
          try {
    
            const inspectionsRef = collection(Firebase_DB, 'Inspections');
    
            const driverQuery = query(inspectionsRef, where('driverId', '==', user.id));
    
            const fleetCtrlQuery = query(inspectionsRef, where('fleetCtrl_id', '==', user.id));
    
            const [driverSnapshot, fleetCtrlSnapshot] = await Promise.all([
              getDocs(driverQuery),
              getDocs(fleetCtrlQuery),
            ]);
    
            const fetchedInspections = [...driverSnapshot.docs, ...fleetCtrlSnapshot.docs].map(doc => ({
              id: doc.id,
              ...doc.data(),
             
            }));
    
            setInspection(fetchedInspections);
            console.log(fetchedInspections);
          } catch (e) {
            console.error('Error fetching inspections: ', e);
          }
        };
    
        fetchInspections();
      }, [isProfileLoaded, user]);
}

export default DataFetcher; 