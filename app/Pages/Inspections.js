import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import  Modal  from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-gesture-handler';

import { collection,getDocs,query,where, addDoc } from 'firebase/firestore';
import { Firebase_DB,Firebase_Auth } from '../../FirebaseConfig';
import { AllStyles, primaryColor } from '../shared/AllStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';




export default function Inspection({ navigation ,route}){

  //Database communication
    const [profiles, setProfiles] = useState([]);
    const [currentUserProfile, setCurrentUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isProfileLoaded, setIsProfileLoaded] = useState(false);
  

//Inspection Data Structure
const [inspections, setInspection] = useState([]);

const [time, setTime] = useState(new Date());
const [drvEmail, setDrvEmail] = useState('');
const [busNo, setBusNo] =useState(0);

const [documents, setDocuments] = useState({
  licenceDisc: false,
  operatorsDisc: false,
  permit: false,
  fuelCard: false,
});

const [driverCompartment, setCompartment] = useState({
  warningLightsGauges:false,
  handbrake: false,
  steering: false,
  driverSeat: false,
  adBlueLvl: false,
});

const [interior, setInterior] = useState({
  cleanliness: false,
  allSeats: false,
  fireExtinguisher:false,
  triangle:false,
  microphone:false,
  vehicleSteps:false,
  wifi:false,
  airConditioner:false,
  usbCovers: false,
});

const [engineAir, setEngineAir] = useState({
  checkEngineOilLevel: false,
  engineCoolantLevel: false,
  drainAirTanks: false,
});

const [wheels,setWheels] = useState({
  rimTyreDamage:false,
  tyrePressure:false,
  oilLeaks:false,
  wheelNuts:false,
  wheelCaps:false,
  wheelNutIndicator:false,
  tyreAlignment:false,
});

const [bodyWorks, setBody] =useState({
  extCleanliness:false,
  windowWindscreen:false,
  bodydamageSheetmarks:false,
  rearviewMirrors:false,
  reflection:false,
  wipperBlades:false,
  passengerDoors:false,
  branding:false,
})

const [electric, setElectric] = useState({
  interiorLights:false,
  parkingLights:false,
  headlights:false,
  rearviewMirrorsSecure:false,
  indicatorLights:false,
  stopLights:false,
  windscreenWipes:false,
  reverseLight:false,
})



// INSPECTIONS Event Handling
  const handleAddInspect =async ()=>{
        const newInspection ={
            fleetCtrl_id:currentUserProfile.id,
            time:time.toISOString(),
            fleetNo:busNo,
            documentation:documents,
            drvCompartment:driverCompartment,
            busInterior:interior,
            busElectric:electric,
            busWheels:wheels,
            body:bodyWorks,
            engine_Air:engineAir,
            driverId: profiles.find(profile => profile.email === drvEmail).id,
        };

        try {
          // Upload the inspection to Firestore
          const docRef = await addDoc(collection(Firebase_DB, 'Inspections'), newInspection);
    
          // Add the new inspection to the local array
          setInspection(I => [
            ...I,
            { id: docRef.id, ...newInspection }
          ]);

          Alert.alert(
            'Inspection Added',
            `Inspection was successfully added with ID: ${docRef.id}`,
            [{ text: 'OK' }]
          );
        } catch (e) {
          console.error('Error adding document: ', e);
    
          // Show error alert
          Alert.alert(
            'Error',
            'There was an error adding the inspection. Please try again.',
            [{ text: 'OK' }]
          );
        }

        setTime(new Date());
        setBusNo("")


  }


// Modal, Datetime Picker conrtols & event handling
  const [isModalVisible, setIsModalVisible] =useState(false);  
  const [show, setShow] = useState(false);
 

    const showPicker =()=>{
      setShow(true);
    }
    const hideTimePicker = () => {
      setShow(false);
    };

    const handleConfirm = (selectedTime) => {
      setTime(selectedTime);
      hideTimePicker();
    };

    const formattedTime = time
    ? time.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Ensure 24-hour format
      })
    : 'Select Time';


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
            setCurrentUserProfile(currentUserProfile);
            setIsProfileLoaded(true);
           
          } else {
            console.log('No user is currently logged in.');
          }
        } catch (error) {
          console.error('Error fetching profiles:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchAllProfiles();
    }, []);
    

    useEffect(() => {
      if (!isProfileLoaded) return;

      const fetchInspections = async () => {
        try {

          const inspectionsRef = collection(Firebase_DB, 'Inspections');

          const driverQuery = query(inspectionsRef, where('driverId', '==', currentUserProfile.id));

          const fleetCtrlQuery = query(inspectionsRef, where('fleetCtrl_id', '==', currentUserProfile.id));

          const [driverSnapshot, fleetCtrlSnapshot] = await Promise.all([
            getDocs(driverQuery),
            getDocs(fleetCtrlQuery),
          ]);

          const fetchedInspections = [...driverSnapshot.docs, ...fleetCtrlSnapshot.docs].map(doc => ({
            id: doc.id,
            ...doc.data(),
            // inspectionTime: new Date(doc.data().time) // Convert ISO string to Date object
          }));

          setInspection(fetchedInspections);
        } catch (e) {
          console.error('Error fetching inspections: ', e);
        }
      };
  
      fetchInspections();
    }, [isProfileLoaded, currentUserProfile]);

 
    


        if (loading) {
          return (
              <View style={{alignItems:'center'}}>
                  
                  <Text style ={{fontSize:40 ,color:primaryColor,padding:70}}>Loading...</Text>
          
              </View>
          );
      }

      if (!profiles) {
        return( 
        <View style={{alignItems:'center'}}>
        <Text style ={{fontSize:40 ,color:primaryColor,padding:70}}>No profile data found.</Text>
        </View>

    );
    }

    return(

        <View style = {AllStyles.container}>
                
                <Text style ={AllStyles.section}>Welcome, {currentUserProfile.email} your inspections are waiting for you</Text>
                <ScrollView contentContainerStyle={{flexGrow:1, width:'100%'}}>
                {inspections.map((inspection, index) => (
                        <TouchableOpacity
                          key={index}
                          style={AllStyles.inspectItem}
                          onPress={() => navigation.navigate('Documentation', { inspection, setInspection })}
                        >
                          <Text style={{ fontSize: 17, color: primaryColor, fontWeight: 'bold', marginLeft:'5%' }}>
                            {inspection.fleetNo} Inspection
                          </Text>
                          <View style={{
                                flexDirection:'row',
                                justifyContent:'space-between',
                                alignItems:'center'
                          }}>
                          <Feather name="clock" size={15} 
                          color="black"
                          style={{marginLeft:'5%'}}
                           />
                          <Text
                            style={{margintop:'-5%'}}
                          >{new Date(inspection.time).toLocaleTimeString('en-US',
                            {
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: false // 24-hour format
                            }
                          )}</Text>
                          </View>
                        </TouchableOpacity>
                  ))}
                 </ScrollView>
                
                <TouchableOpacity style ={AllStyles.btnAdd}>
                  <Ionicons name="add-circle" size={60} color={primaryColor} onPress={()=> setIsModalVisible(true)} />
                </TouchableOpacity>
               
                <Modal
                    visible={isModalVisible}
                    onRequestClose={()=> setIsModalVisible(false)}
                    animationType='slide'
                    onBackdropPress={()=> setIsModalVisible(false)}
                    onBackButtonPress={()=> setIsModalVisible(false)}
                    style={AllStyles.modal}
                >
                  
                    <View style ={AllStyles.modalContent}>
                      <TouchableOpacity
                        style={AllStyles.btnClose}
                        onPress={()=> setIsModalVisible(false)}
                      >
                          <Ionicons name='close' size={24} color='black'/>
                      </TouchableOpacity>
                      <Text style={{
                        fontSize:25,
                        marginBottom:30
                      }}>Create a new Inspection</Text>

                      <View style={AllStyles.inspectionFeild}>
                              <Text style={{
                                fontSize:20,
                              
                              }}>Driver: </Text>

                                <Picker
                                  selectedValue={drvEmail}
                                  onValueChange={(itemValue) => setDrvEmail(itemValue)}
                                  style={{
                                    width:'80%',
                                    marginTop:'-3%'
                                    }}
                                >
                                  {profiles.map((profile)=> (
                                        <Picker.Item
                                          key={profile.id}
                                          label={profile.email}
                                          value={profile.email}
                                        />))}
                                </Picker> 
                      </View>
                      
                      <View style={AllStyles.inspectionFeild}>
                      <Text style={{
                        fontSize:20,
                        

                      }}
                      >Time: </Text>
                      <TouchableOpacity
                          style={{
                            fontSize:5,
                            fontWeight:'bold',
                            borderRadius:15,
                            height:40,
                            width:100,
                            borderWidth:1,
                            borderColor:primaryColor,
                            justifyContent:'center',
                            alignItems:'center'
                          }}
                          onPress={showPicker}
                      ><Text>{formattedTime}</Text></TouchableOpacity>
                           <DateTimePickerModal
                              isVisible={show}
                              value={time}
                              mode='time'
                              is24Hour={true}
                              textColor='black'
                              onCancel={hideTimePicker}
                              onConfirm={handleConfirm}
                              
                          />
                      </View>
                      <View style={AllStyles.inspectionFeild}>
                        <Text style={{
                        fontSize:18,
                       

                      }} >
                          Bus Number: 
                        </Text>
                        <TextInput
                          value={busNo}
                          onChangeText={(num)=>setBusNo(num)}
                          style={{
                            borderBottomWidth: 1,  
                            borderBottomColor: 'gray',
                            width:'20%',
                            paddingVertical: 5,
                            fontSize: 16,
                            alignItems:'center',
                            marginRight:'5%'
                            
                        }}
                          keyboardType="numeric" 
                          
                        />
                      </View>
                      
                      <TouchableOpacity style ={{ width:'50%',
                                                borderRadius:10,
                                                backgroundColor: primaryColor,
                                                padding: 10,
                                                marginTop:'30%',
                                                marginLeft:'25%'
                                              }}
                                        >
                                    <Text style ={AllStyles.textBtn}
                                          onPress={()=>handleAddInspect()}
                                     >Create</Text>
                      </TouchableOpacity>
                      
                    </View>
 
                </Modal>

            
        </View>
    );
}