import React,  { useState, useContext, useEffect } from 'react';
import {View, Text,TextInput,TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard} from 'react-native'; 
import LoadingDots from "react-native-loading-dots";
import LottieView from 'lottie-react-native';



import { Firebase_Auth, Firebase_DB } from '../../FirebaseConfig';
import {  signInWithEmailAndPassword } from 'firebase/auth';
import { doc,getDoc, collection,getDocs,query,where, addDoc } from 'firebase/firestore';

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
    
          const VehiclesCollectionRef = collection(Firebase_DB, 'vehicles');
          const VehiclesSnapshot = await getDocs(VehiclesCollectionRef);
    
          const profilesArray = profilesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
    
          const vehiclesArray = VehiclesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          vehiclesArray.sort((a, b) => a.fleetNo - b.fleetNo);
          setVehicles(vehiclesArray);
    
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

      
      const fetchInspections = async (currentUser) => {
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