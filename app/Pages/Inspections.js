// Architecture
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity,TouchableWithoutFeedback, ScrollView, Alert, StyleSheet, FlatList,Image, ImageBackground} from 'react-native';
import  Modal  from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';

//Database
import { collection, addDoc,deleteDoc, doc } from 'firebase/firestore';
import { Firebase_DB} from '../../FirebaseConfig';

//Styling,and ICONS
import { AllStyles, primaryColor, secondaryColor} from '../shared/AllStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

// Data sharing
import { ProfilesContext } from '../shared/ProfilesContext';
import { LoaderContext } from '../shared/LoaderContext';
import { InspectContext } from '../shared/InspectionContext';
import { VehicleContext } from '../shared/VehicleContext';
import { CurrentUserContext } from '../shared/CurrentUserContext';
import LoadingDots from "react-native-loading-dots";


export default function Inspection({ navigation ,route}){
  
  const [showDeleteIcon, setShowDeleteIcon] = useState({});
 
 
  const {profiles, setProfiles} = useContext(ProfilesContext);// implement context as the same as below
  const {user,setUser} = useContext(CurrentUserContext);//    ""        ""  as the same as below
  const {inspections, setInspection} = useContext(InspectContext);
  const {vehicles, setVehicles} = useContext(VehicleContext);
  


//const drivers = profiles.filter(profile=> profile.role ==='Driver')

  useEffect(() => {
    if (vehicles.length > 0) {
      const formattedVehicles = vehicles.map(car => ({
        label: car.fleetNo + ' ' + car.model,
        value: car.fleetNo,
      }));
      setVecItems(formattedVehicles); // Update once vehicles are loaded
    }
  }, [vehicles]);


  const [addLoader, setAddLoader] = useState(false);
const [time, setTime] = useState(new Date());
const [drvEmail, setDrvEmail] = useState(null);



// Driver data structure
const [vec, setVec] =useState(0);
const [openCars, setCarsOpen] = useState(false);
const [openProfile, setProfileOpen] = useState(false);
const [vecItems,setVecItems] =useState(vehicles.map(car => ({
  label: car.fleetNo+ ' '+ car.model,   // Label and value can be the same for strings
  value: car.fleetNo
 
})));


// Checlist 
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
//handle delete
const handleDeleteInspection = async (inspectionId) => {
  try {
    await deleteDoc(doc(Firebase_DB, 'Inspections', inspectionId));
    setInspection(prevInspections => prevInspections.filter(inspection => inspection.id !== inspectionId));
    Alert.alert('Success', 'Inspection deleted successfully');
  } catch (error) {
    console.error('Error deleting inspection: ', error);
    Alert.alert('Error', 'Failed to delete inspection. Please try again.');
  }
};

const toggleDeleteIcon = (index) => {
  setShowDeleteIcon(prev => ({
    ...prev,
    [index]: !prev[index]
  }));
};



// INSPECTIONS Event Handling
  const handleAddInspect =async ()=>{

    if (!user || !drvEmail) {
      Alert.alert('Error', 'Please ensure you have selected a driver and that you are logged in.');
      return;
    }

        const newInspection ={
            fleetCtrl_email:user.email,
            time:time.toISOString(),
            fleetNo:vec,
            documentation:documents,
            drvCompartment:driverCompartment,
            busInterior:interior,
            busElectric:electric,
            busWheels:wheels,
            body:bodyWorks,
            engine_Air:engineAir,
            driverEmail: drvEmail,
            inspStatus:'Incomplete',
            driverSide:{
              parts:{},
              damagePics:{},
              comments:null
            },
            frontSide:{
              parts:{},
              damagePics:{},
              comments:''
            },
            passengerSide:{
              parts:{},
              damagePics:{},
              comments:''
            },
            backSide:{
              parts:{},
              damagePics:{},
              comments:''
            },
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
            `Inspection was successfully added`,
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
        finally{
          setTime(new Date());
          setAddLoader(false);
        }

        
  


  }


// Modal, Datetime Picker conrtols & event handling
  const [isModalVisible, setIsModalVisible] =useState(false);  
  const [show, setShow] = useState(false);
 

    const showTimePicker =()=>{
      setShow(true);
    }
    const hideTimePicker = () => {
      setShow(false);
    };

    const handleConfirm = (selectedTime) => {
      setTime(selectedTime);
      hideTimePicker();
    };

    const handleSelect = (value) => {
      setDrvEmail(value);
      setProfileOpen(false);
    };

    const formattedTime = time
    ? time.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Ensure 24-hour format
      })
    : 'Select Time';




    return(

      <View style={AllStyles.container}>
      <Text style={AllStyles.section}>Welcome, {user.name +" "+ user.surname} inspections are waiting for you</Text>
      <ScrollView contentContainerStyle={{flexGrow: 1, width: '100%'}}>
        {inspections.map((inspection, index) => (
          <TouchableOpacity
            key={index}
            style={[AllStyles.inspectItem, { flexDirection: 'row', justifyContent: 'space-between'}]}
            onPress={() => navigation.navigate('Documentation', { inspection, setInspection })}
          >
            <Text style={{ top:15,fontSize: 17, color: primaryColor, fontWeight: 'bold', marginLeft: '5%' }}>
              {inspection.fleetNo} Inspection
            </Text>
           
            <Text style={{ top:25,fontSize: 15, color: 'black',fontStyle:'italic'}}>
              {inspection.inspStatus}
            </Text>

  
            
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '8%',
              height:'40%',
              marginRight: '-25%'
            }}>
              <Feather name="clock" size={13} color="black" style={{marginLeft: '2%'}} />
              <Text style={{ fontSize: 13 }}>
                {new Date(inspection.time).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false
                })}
              </Text>
            </View>

            <TouchableWithoutFeedback
              onPress={(e) => {
                e.stopPropagation();
                toggleDeleteIcon(index);
              }}

            >
              
                {showDeleteIcon[index] ? (
                  <TouchableOpacity
                    onPress={(e) => {
                      e.stopPropagation();
                      handleDeleteInspection(inspection.id);
                    }}
                  >
                    <Feather name="trash-2" size={24} color="red" />
                  </TouchableOpacity>
                ) : (
                  <Feather style={{height:'40%', marginRight:'5%'}} name="more-vertical" size={22} color="black" />
                )}
              
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        ))}

                      
      </ScrollView>
                
      {user.role !== 'Driver' && (
                <TouchableOpacity style ={AllStyles.btnAdd}>
                  <Ionicons name="add-circle" size={65} color={primaryColor} onPress={()=> setIsModalVisible(true)} />
                </TouchableOpacity>
      )}
               
                <Modal
                    visible={isModalVisible}
                    onRequestClose={()=> setIsModalVisible(false)}
                    animationType='slide'
                    onBackdropPress={()=> setIsModalVisible(false)}
                    onBackButtonPress={()=> setIsModalVisible(false)}
                    style={AllStyles.modal}
                >
                      {addLoader? (
                          <View style ={{
                            marginTop:'10%',
                            height:'60%',
                            padding: 100,
                            backgroundColor: 'white',
                            borderRadius: 15,
                            borderWidth:2,
                            borderColor:'#6495ED',
                            shadowColor: 'black',
                            shadowOffset: {
                                width: 0,
                                height: 2
                              },
                              shadowOpacity: 0.25,
                              shadowRadius: 4,
                              //elevation: 5
                          
                          }}>
                                
                              
                          <LoadingDots dots={3} colors={[primaryColor,secondaryColor,'lightblue']}/>
                  
                      </View>
                      ):
                      (
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

                                      <TouchableOpacity onPress={() => setProfileOpen(true)} style={{width: '50%', padding: 10, backgroundColor: '#fff', borderRadius: 5, borderColor:primaryColor, borderWidth:1 }}>
                                              <Text>{drvEmail ? drvEmail : 'Select Driver'}</Text>
                                            </TouchableOpacity>

                                            {/* Modal for Custom Picker */}
                                            <Modal visible={openProfile}  transparent={true} animationType='fade'>
                                              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
                                                <View style={{ width: '90%', backgroundColor: '#fff', borderRadius: 10, padding: 20, height: '85%' }}>
                                                  <FlatList
                                                    data={profiles.filter(profile=>profile.role==='Driver')}
                                                    keyExtractor={(item) => item.id}
                                                   
                                                    renderItem={({ item }) => (
                          
                                                      <TouchableOpacity  onPress={() => handleSelect(item.email)} style={{ flexDirection:'row', padding: 10 }}>
                                                        <Image
                                                        source ={{uri: item.profilePic}}
                                                        style={{ backgroundColor: 'lightgrey',width:'20%', height:50, borderRadius:100, marginBottom:10, marginTop:'5%'}}  resizeMode="contain" 
                                                            />

                                                            <View style={{marginLeft:20,top:20,flexDirection:'column'}}>
                                                       <Text style={{ fontSize: 16 }}>{item.name + " " + item.surname}</Text>
                                                        <Text style={{ fontSize: 10, color:'grey' }}>{item.email}</Text>
                                                        </View>
                                                       
                                                      </TouchableOpacity>
                                                    )}
                                                  />
                                                  <TouchableOpacity onPress={() => setProfileOpen(false)} style={{ padding: 10, marginTop: 20 }}>
                                                    <Text style={{ textAlign: 'center', color: 'red' }}>Cancel</Text>
                                                  </TouchableOpacity>
                                                </View>
                                              </View>
                                            </Modal>

                                
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
                            onPress={showTimePicker}
                        ><Text>{formattedTime}</Text></TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={show}
                                value={time}
                                mode='time'
                                is24Hour={true}
                                textColor='black'
                                accentColor='black'
                                onCancel={hideTimePicker}
                                onConfirm={handleConfirm}
                                
                            />
                        </View>
                        <View style={AllStyles.inspectionFeild}>
                          <Text style={{
                          fontSize:18,
                          marginRight:'15%'

                        }} >
                            Vehicle: 
                          </Text>
                          <DropDownPicker
                            open={openCars}
                            value={vec}
                            items={vecItems}
                            setOpen={setCarsOpen}
                            setValue={setVec}
                            setItems={setVecItems}
                            searchable={true}
                            placeholder="Choose a Vehicle"
                            style={AllStyles.dropdown}
                            dropDownContainerStyle={AllStyles.dropdownContainer}
                            listMode="SCROLLVIEW" // Use a scroll view to display the items
                            searchablePlaceholder="Type to search..."
                            searchableError="No items found"
                          //  keyExtractor={(item) => item.key} 
                        />
                        </View>
                        
                        <TouchableOpacity style ={{ width:'50%',
                                                  borderRadius:10,
                                                  backgroundColor: primaryColor,
                                                  padding: 10,
                                                  marginTop:'5%',
                                                  marginLeft:'25%'
                                                }}
                                          >
                                      <Text style ={AllStyles.textBtn}
                                            onPress={()=>{setAddLoader(true);
                                              handleAddInspect()}}
                                      >Create</Text>
                        </TouchableOpacity>
                        
                      </View>
                      )}     

 
                </Modal>

            
        </View>
    );
};



