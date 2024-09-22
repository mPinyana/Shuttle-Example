import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState,  useRef, useContext } from 'react';
import { Firebase_Auth,Firebase_DB } from '../../FirebaseConfig';
import { doc,getDoc, collection,getDocs,query,where, addDoc } from 'firebase/firestore';


import inspection from "../Pages/Inspections";
import docPage from "../Pages/Checklist/Documentation_inspectionCh"; // 1/7
import driverCompartmentPage from '../Pages/Checklist/DriverCompartment_inspectCh'; // 2/7
import interiorPage from '../Pages/Checklist/Interior_InspectionCh'; // 3/7
import electricPage from '../Pages/Checklist/Electric_InspectionCh'; // 4/7
import engineAirPage from '../Pages/Checklist/EngineAir_InspectCh'; // 5/7
import wheelsPage from '../Pages/Checklist/Wheels_InspectionCh'; // 6/7
import bodyWorksPage from '../Pages/Checklist/BodyWorks_InspectionCh'; // 7/7
//Sketching
import FrontView from "../Pages/Sketching/FrontView";
import BackView from "../Pages/Sketching/BackView";
import DriverSide from "../Pages/Sketching/DriverSide";
import PassengerSide from "../Pages/Sketching/PassengerView";
import CustomHeader from '../shared/CustomHeader';

//Data sharing
import { LoaderContext } from "../shared/LoaderContext";
import { InspectContext } from "../shared/InspectionContext";
import { VehicleContext } from "../shared/VehicleContext";

export const ProfilesContext = React.createContext();
export const UserContext = React.createContext();
export const LoadingContext = React.createContext();



const Stack = createStackNavigator();



function InspectionStack(){

    const [profiles, setProfiles] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
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
              setCurrentUser(currentUserProfile);
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
    
            setInspection(fetchedInspections);
            console.log(fetchedInspections);
          } catch (e) {
            console.error('Error fetching inspections: ', e);
          }
        };
    
        fetchInspections();
      }, [isProfileLoaded, currentUser]);
    
    

    return(
        <UserContext.Provider value={currentUser}>
                <ProfilesContext.Provider value={profiles}>
                    
                        <Stack.Navigator initialRouteName="Inspections">
                            <Stack.Screen name="Inspections" component={inspection} options={{
                                        headerLeft: ()=> <CustomHeader /*navigation={navigation}*//>,
                                        headerTitleAlign: 'center',
                                        headerShown: true,
                                        headerTitleStyle: { color: '#004aad',
                                            fontSize: 32      
                                    },
                                    headerStyle:{borderBottomWidth: 2,}
                                

                            }}/>
                        
                            <Stack.Screen name="Documentation" component={docPage} options={{
                                            title:'Checklist (1/7)',
                                            headerTitleStyle: { color: '#004aad',
                                                fontSize: 25,
                                            },
                                            headerStyle:{borderBottomWidth: 2,}
                            }}/>
                            <Stack.Screen name="DiversCompartment" component={driverCompartmentPage }
                                    options={{
                                        title:'Checklist (2/7)',
                                        headerTitleStyle: { color: '#004aad',
                                            fontSize: 25,
                                        },
                                        headerStyle:{borderBottomWidth: 2,}
                            }}/>
                            <Stack.Screen name="Interior" component={interiorPage }
                                options={{
                                    title:'Checklist (3/7)',
                                    headerTitleStyle: { color: '#004aad',
                                        fontSize: 25,
                                    },
                                    headerStyle:{borderBottomWidth: 2,}
                                }}/>
                            <Stack.Screen name="electric" component={ electricPage}
                                    options={{
                                        title:'Checklist (4/7)',
                                        headerTitleStyle: { color: '#004aad',
                                            fontSize: 25,
                                        },
                                        headerStyle:{borderBottomWidth: 2,}
                                    }}
                                    
                                    />
                            <Stack.Screen name="wheels" component={wheelsPage} 
                                options={{
                                    title:'Checklist (5/7)',
                                    headerTitleStyle: { color: '#004aad',
                                        fontSize: 25,
                                    },
                                    headerStyle:{borderBottomWidth: 2,}
                                }}
                            />
                            <Stack.Screen name="bodyWorks" component={bodyWorksPage} 
                                options={{
                                    title:'Checklist (6/7)',
                                    headerTitleStyle: { color: '#004aad',
                                        fontSize: 25,
                                    },
                                    headerStyle:{borderBottomWidth: 2,}
                                }}
                            
                            />
                            <Stack.Screen name="engineAir" component={engineAirPage} 
                                options={{
                                    title:'Checklist (7/7)',
                                    headerTitleStyle: { color: '#004aad',
                                        fontSize: 25,
                                    },
                                    headerStyle:{borderBottomWidth: 2,}
                                }}
                            />
                            <Stack.Screen name="FrontView" component={FrontView} 
                                options={{
                                    title:'Front View',
                                    headerTitleStyle: { color: '#004aad',
                                        fontSize: 25,
                                    },
                                    headerStyle:{borderBottomWidth: 2,}
                                }}
                            />
                                <Stack.Screen name="DriverSide" component={DriverSide} 
                                    options={({ route }) => ({
                                        title: 'Driver\'s side',
                                        headerTitleStyle: { 
                                            color: '#004aad',
                                            fontSize: 25,
                                        },
                                        headerStyle: { 
                                            borderBottomWidth: 2,
                                        },
                                        headerShown: false, // Use the param to control visibility
                                    })}
                                />
                                    <Stack.Screen name="PassengerSide" component={PassengerSide} 
                                    options={({ route }) => ({
                                        title: 'Passener\'s side',
                                        headerTitleStyle: { 
                                            color: '#004aad',
                                            fontSize: 25,
                                        },
                                        headerStyle: { 
                                            borderBottomWidth: 2,
                                        },
                                        headerShown: route.params?.headerVisible ?? false, // Use the param to control visibility
                                    })}
                                />
                            <Stack.Screen name="BackView" component={BackView} 
                                options={{
                                    title:'Back View',
                                    headerTitleStyle: { color: '#004aad',
                                        fontSize: 25,
                                    },
                                    headerStyle:{borderBottomWidth: 2,}
                                }}
                            />
                        </Stack.Navigator>
                 
                </ProfilesContext.Provider>
            </UserContext.Provider>
    )

}

export default InspectionStack;



