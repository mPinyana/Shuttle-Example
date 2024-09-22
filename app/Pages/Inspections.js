// UI and logic
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity,TouchableWithoutFeedback, ScrollView, Alert} from 'react-native';
import  Modal  from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';

//Database
import { collection,getDocs,query,where, addDoc } from 'firebase/firestore';
import { Firebase_DB,Firebase_Auth } from '../../FirebaseConfig';

//Styling,and ICONS
import { AllStyles, primaryColor, secondaryColor, height } from '../shared/AllStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

// Data sharing
import { UserContext,  ProfilesContext } from '../routes/InspectionStack';
import { LoaderContext } from '../shared/LoaderContext';
import { InspectContext } from '../shared/InspectionContext';
import { VehicleContext } from '../shared/VehicleContext';
import LoadingDots from "react-native-loading-dots";


export default function Inspection({ navigation ,route}){
 
 
  const profiles = useContext(ProfilesContext);// implement context as the same as below
  const currentUser = useContext(UserContext);//    ""        ""  as the same as below
  const { loader, setLoader } = useContext(LoaderContext);
  const {inspections, setInspection} = useContext(InspectContext);
  const {vehicles, setVehicles} = useContext(VehicleContext);

  const [formatedVecs, setFormated] = useState(vehicles.map(car => ({
    label: car.fleetNo+ ' '+ car.model,   // Label and value can be the same for strings
    value: car.fleetNo
   
  })));

  useEffect(() => {
    const checkDataReady = async () => {
        setLoader(true);
        // Check if necessary data is ready to render inspection
        if (profiles.length > 0 && currentUser/*  && inspections.length > 0 */) {
            setIsInspectionReady(true);
            setLoader(false);
        }
    };
  
    checkDataReady();
  }, [profiles, currentUser , inspections ]);


  const [addLoader, setAddLoader] = useState(false);
const [time, setTime] = useState(new Date());
const [drvEmail, setDrvEmail] = useState('');
const [isInspectionReady, setIsInspectionReady] = useState(false);


// Driver data structure
const [vec, setVec] =useState(0);
const [openCars, setCarsOpen] = useState(false);
const [vecItems,setVecItems] =useState(formatedVecs);


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



// INSPECTIONS Event Handling
  const handleAddInspect =async ()=>{

    if (!currentUser || !drvEmail) {
      Alert.alert('Error', 'Please ensure you have selected a driver and that you are logged in.');
      return;
    }

        const newInspection ={
            fleetCtrl_id:currentUser.id,
            time:time.toISOString(),
            fleetNo:vec,
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

    const formattedTime = time
    ? time.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Ensure 24-hour format
      })
    : 'Select Time';


 
    


         if (loader || !isInspectionReady) {
          return (
              <View style={{flex:1,alignItems:'center', justifyContent:'center', marginTop:'30%', justifyContent:'space-between'}}>
                  
                 
                 <LoadingDots dots={3} colors={[primaryColor,secondaryColor,'lightblue']}/>
          
              </View>
          );
      }
 
      if (!currentUser) {
        return (
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 40, color: primaryColor, padding: 70}}>User not logged in</Text>
          </View>
        );
      }

      if (!profiles || profiles.length === 0) {
        return( 
        <View style={{alignItems:'center'}}>
        <Text style ={{fontSize:40 ,color:primaryColor,padding:70}}>No profile data found.</Text>
        </View>

    );
    }

    return(

        <View style = {AllStyles.container}>
                
                <Text style ={AllStyles.section}>Welcome, {currentUser.name +" "+ currentUser.surname} your inspections are waiting for you</Text> 
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
                                alignItems:'center',
                                marginTop:'9%',
                                marginLeft:'43%'
                              
                          }}>


                            

                          <Feather name="clock" size={13} 
                          color="black"
                          style={{marginLeft:'5%'}}
                           />
                          <Text
                            style={{ fontSize:13}}
                          >{new Date(inspection.time).toLocaleTimeString('en-US',
                            {
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: false // 24-hour format
                            }
                          )}</Text>

                          
                          </View>
                          <TouchableWithoutFeedback
                          onPress={(e)=>{    e.stopPropagation();  // Prevents parent Touchable from triggering
                                    }}
                          >
                          <Feather name="more-vertical" size={18} color="black"
                                style={{
                                    height:'30%',
                                  marginBottom:'7%',
                                  marginRight:'5%'
                                }} 
                            />
                            </TouchableWithoutFeedback>
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
}