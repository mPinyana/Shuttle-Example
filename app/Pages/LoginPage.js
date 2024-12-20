import React,  { useState, useContext, useEffect } from 'react';
import {View, Text,TextInput,TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard} from 'react-native'; 
import LoadingDots from "react-native-loading-dots";
import LottieView from 'lottie-react-native';

import { Firebase_Auth, Firebase_DB, Firebase_Storage } from '../../FirebaseConfig';
import {  signInWithEmailAndPassword } from 'firebase/auth';
import { collection,getDocs,query,where,   } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL,listAll , getMetadata} from 'firebase/storage';

import { AllStyles, primaryColor,secondaryColor}  from '../shared/AllStyles';
import { ProfilesContext } from '../shared/ProfilesContext';
import { CurrentUserContext } from '../shared/CurrentUserContext';
import { VehicleContext } from '../shared/VehicleContext';
import { InspectContext } from '../shared/InspectionContext';
import { LoaderContext } from '../shared/LoaderContext';
//import DataFetcher from '../shared/DataFetcher';


const l_logo = require("../assets/L_logo.png")
const r_logo = require("../assets/R_logo.png")




const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  

function LoginPage({navigation}) {
    
        
    const [userNow, setUserNow] = useState({
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const { profiles, setProfiles } = useContext(ProfilesContext);
    const { user, setUser } = useContext(CurrentUserContext);
    const { vehicles, setVehicles } = useContext(VehicleContext);
    const { inspections, setInspection } = useContext(InspectContext);
    const { loader, setLoader } = useContext(LoaderContext);
    const [isProfileLoaded, setIsProfileLoaded] = useState(false);



    const auth = Firebase_Auth;
 

    const fetchProfilesAndVehicles = async () => {
      try {
          const profilesCollectionRef = collection(Firebase_DB, 'Profiles');
          const profilesSnapshot = await getDocs(profilesCollectionRef);
  
          const vehiclesCollectionRef = collection(Firebase_DB, 'vehicles');
          const vehiclesSnapshot = await getDocs(vehiclesCollectionRef);
  
          // Process profiles (as you're already doing)
                    const profilesArray = await Promise.all(
                        profilesSnapshot.docs.map(async (doc) => {
                            const profileData = doc.data();
                            const profilePicRef = ref(Firebase_Storage, `profile_pictures/${doc.id}`);
  
                  try {
                      const profilePicURL = await getDownloadURL(profilePicRef);
                      profileData.profilePic = profilePicURL;
                  } catch (error) {
                      console.error(`Error fetching profile picture for user ${doc.id}:`, error);
                      profileData.profilePic = require('../assets/defaultpfp.png');
                  }
  
                  return { id: doc.id, ...profileData };
              })
          );
  
          // Process vehicles and fetch inspection images
          const vehiclesArray = await Promise.all(
              vehiclesSnapshot.docs.map(async (doc) => {
                  const vehicleData = doc.data();
  
                  // Initialize an empty array for damage images
                  vehicleData.damageImages = {};
  
                  if (vehicleData.inspections && vehicleData.inspections.length > 0) {
                    // If inspections exist, fetch images for each inspection
                    await Promise.all(vehicleData.inspections.map(async (inspectionId) => {
                        const inspectionImagesPath = `Vehicles/${vehicleData.fleetNo}/${inspectionId}`;

                        try {
                            const listRef = ref(Firebase_Storage, inspectionImagesPath);
                            const listResult = await listAll(listRef); // Fetch all files in this directory

                            // Get download URLs for images, sorted by their creation time (newest first)
                            const inspectionImageUrls = await Promise.all(
                                listResult.items
                                    .map(async (imageRef) => {
                                        const metadata = await getMetadata(imageRef); // Fetch image metadata
                                        const downloadURL = await getDownloadURL(imageRef); // Get download URL for each image
                                        return { downloadURL, timeCreated: metadata.timeCreated }; // Return URL and creation time
                                    })
                            );

                            // Sort images by creation time, newest first
                            inspectionImageUrls.sort((a, b) => new Date(b.timeCreated) - new Date(a.timeCreated));

                            // Store only the sorted URLs in the damageImages object
                            vehicleData.damageImages[inspectionId] = inspectionImageUrls.map(item => item.downloadURL);
                        } catch (error) {
                            console.error(`Error fetching images for inspection ${inspectionId}:`, error);
                        }
                    }));
                } else {
                    // No inspections found, use placeholder image
                    vehicleData.damageImages.placeholder = [require('../assets/UCTShuttle.jpg')];
                }

                return { id: doc.id, ...vehicleData };
            })
        );

          // Sort vehicles by fleet number and update state
          vehiclesArray.sort((a, b) => a.fleetNo - b.fleetNo);
          setVehicles(vehiclesArray);
  
          // Process current user profile
          const currentUser = Firebase_Auth.currentUser;
          const filteredProfiles = profilesArray.filter(profile => profile.id !== currentUser.uid);
          const sortedProfiles = filteredProfiles.sort((a, b) => a.email.localeCompare(b.email));
          setProfiles(sortedProfiles);
  
          if (currentUser) {
              const currentUserProfile = profilesArray.find(profile => profile.id === currentUser.uid);
              setUser(currentUserProfile);
              return currentUserProfile;  // Return the user profile after successful fetching
          } else {
              console.log('No user is currently logged in.');
              return null;
          }
      } catch (error) {
          console.error('Error fetching profiles and vehicles:', error);
          throw error;
      }
  };
  
      
/*       const fetchInspections = async (currentUser) => {
        try {
          const inspectionsRef = collection(Firebase_DB, 'Inspections');
          const driverQuery = query(inspectionsRef, where('driverEmail', '==', currentUser.email));
          const fleetCtrlQuery = query(inspectionsRef, where('fleetCtrl_email', '==', currentUser.email));
    
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
        } catch (error) {
          console.error('Error fetching inspections:', error);
          throw error;
        }
      };
     */
      const fetchInspections = async () => {
        try {
            const inspectionsRef = collection(Firebase_DB, 'Inspections');
            const snapshot = await getDocs(inspectionsRef);
            
            const fetchedInspections = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            
            setInspection(fetchedInspections);
            console.log(fetchedInspections);
        } catch (error) {
            console.error('Error fetching inspections:', error);
            throw error;
        }
    };


    const logginIn = async() => {


        if (!validateEmail(userNow.email)) {
            alert('Invalid email format');
            return;
          }

            setLoading(true);
            try{
                const response = await signInWithEmailAndPassword(auth, userNow.email.toString(), userNow.password.toString());
                console.log(response);
                
                        // Fetch profiles and vehicles
                        const currentUserProfile = await fetchProfilesAndVehicles();

                        if (currentUserProfile) {
                            // Fetch inspections once profiles and vehicles are done loading
                            await fetchInspections(currentUserProfile);

                            // Navigate to the Home screen after all data is successfully fetched
                            navigation.navigate('Home');
                        }   
            }
            catch(error){
                console.log(error);
                alert('Log in failed: '+ error.message);
            }
            finally{
                setLoading(false);
            }

    }

 
   if(loading){
    return(
        <View style={{flex:1 /* alignItems:'center', justifyContent:'center' */}}>
                  
                 
                  <LottieView style={{flex:1}} source={require('../assets/BusLoader.json')} autoPlay loop />
 
     </View>
    );
   }



    return (

        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
                <View style ={AllStyles.container}>
                    
                    <View  style ={AllStyles.NavBar}>
                        <Image source={l_logo} style = {AllStyles.leftLogo}/>
                        <Text style={AllStyles.Heading} >Shuttle Inspector 
                        </Text>
                        <Image source={r_logo} style ={AllStyles.rightLogo}/>
                    </View>
                    
                    <View style={AllStyles.Salutations}>
                    <Text style={AllStyles.Hi}>Hello!</Text><Text style={AllStyles.Welkom}> Welcome, Please enter login details</Text>
                    </View>

                <View style={AllStyles.inputContainer}> 
                    <TextInput
                        style={AllStyles.input}
                        placeholder="Enter email"
                        value={userNow.email}
                        onChangeText={(text) => setUserNow({ ...userNow, email: text.trim() })}
                    />
                            

                    <TextInput
                        style={AllStyles.input}
                        placeholder="Enter password"
                        value={userNow.password}
                        onChangeText={(text) => setUserNow({ ...userNow, password: text.trim() })}
                        secureTextEntry={true}
                    />
                </View>
                        
                    <TouchableOpacity style={AllStyles.btnLogin} onPress={()=>{logginIn()}}>
                        <Text style={AllStyles.textBtn}>Login</Text>
                    </TouchableOpacity>
                    
                
                            <TouchableOpacity style={AllStyles.btnSignIn} onPress={() => navigation.navigate('SignUp')}>
                        <Text style={AllStyles.textBtn}>Sign Up</Text>
                    </TouchableOpacity>


                </View>

    </TouchableWithoutFeedback>

        
    );
}
export default LoginPage;