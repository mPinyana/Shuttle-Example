// Architecture
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity,TouchableWithoutFeedback, ScrollView, Alert, StyleSheet, FlatList,Image, ImageBackground,Dimensions} from 'react-native';
import  Modal  from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import LoadingDots from "react-native-loading-dots";

//Database
import { collection, addDoc,deleteDoc, doc, updateDoc } from 'firebase/firestore';
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



const { width, height } = Dimensions.get('window');

export default function Inspection({ navigation ,route}){
  
  const [showDeleteIcon, setShowDeleteIcon] = useState({});
 
 
  const {profiles, setProfiles} = useContext(ProfilesContext);// implement context as the same as below
  const { user } = useContext(CurrentUserContext);//    ""        ""  as the same as below
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
  if (user.role !== 'Driver') {
    setShowDeleteIcon(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  }
};



// INSPECTIONS Event Handling
  const handleAddInspect =async ()=>{

    if (!user || !drvEmail) {
      Alert.alert('Error', 'Please ensure you have selected a driver and that you are logged in.');
      return;
    }
    setAddLoader(true);

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
          // Add the new inspection to the local array
        setInspection(prevInspections => [
         ...prevInspections,
         { id: docRef.id, ...newInspection }
         ]);
         // Immediately update the status to "Pending"
      await updateDoc(doc(Firebase_DB, 'Inspections', docRef.id), {
        inspStatus: 'Pending'
      });

      // Update the local state to reflect the new status
      setInspection(prevInspections => 
        prevInspections.map(insp => 
          insp.id === docRef.id ? { ...insp, inspStatus: 'Pending' } : insp
        )
      );
          Alert.alert(
            'Inspection Added',
            `Inspection was successfully added`,
            [{ text: 'OK' }]
          );

          setIsModalVisible(false);
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

    const renderInspectionItem = ({ item, index }) => (
      <TouchableOpacity
        style={styles.inspectItem}
        onPress={() => navigation.navigate('Documentation', { inspection: item, setInspection })}
      >
        <View style={styles.inspectItemContent}>
          <Text style={styles.fleetNoText}>{item.fleetNo} Inspection</Text>
          <Text style={styles.statusText}>{item.inspStatus}</Text>
          <View style={styles.timeContainer}>
            <Feather name="clock" size={13} color="black" style={styles.clockIcon} />
            <Text style={styles.timeText}>
              {new Date(item.time).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
              })}
            </Text>
          </View>
        </View>
        
        {user.role !== 'Driver' && (
          <TouchableWithoutFeedback onPress={(e) => {
            e.stopPropagation();
            toggleDeleteIcon(index);
          }}>
            {showDeleteIcon[index] ? (
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation();
                  handleDeleteInspection(item.id);
                }}
                style={styles.deleteIcon}
              >
                <Feather name="trash-2" size={24} color="red" />
              </TouchableOpacity>
            ) : (
              <Feather name="more-vertical" size={22} color="black" style={styles.moreIcon} />
            )}
          </TouchableWithoutFeedback>
        )}
      </TouchableOpacity>
    );

    return(

      <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {user.name} {user.surname}</Text>
      <Text style={styles.subText}> Find Inspections assigned..</Text>
      
      <FlatList
        data={inspections}
        renderItem={renderInspectionItem}
        
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />

      {user.role !== 'Driver' && (
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Feather name="plus-circle" size={50} color={primaryColor} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05,
    backgroundColor: '#f5f5f5',
  },
  welcomeText: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginBottom: height * 0.01,
  },
  subText: {
    fontSize: width * 0.04,
    color: 'gray',
    marginBottom: height * 0.02,
  },
  listContainer: {
    flexGrow: 1,
  },
  inspectItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: width * 0.03,
    marginBottom: height * 0.02,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  inspectItemContent: {
    flex: 1,
  },
  fleetNoText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: primaryColor,
    marginBottom: height * 0.005,
  },
  statusText: {
    fontSize: width * 0.035,
    color: 'black',
    fontStyle: 'italic',
    marginBottom: height * 0.005,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clockIcon: {
    marginRight: width * 0.01,
  },
  timeText: {
    fontSize: width * 0.03,
  },
  deleteIcon: {
    padding: width * 0.02,
  },
  moreIcon: {
    padding: width * 0.02,
  },
  addButton: {
    position: 'absolute',
    right: width * 0.05,
    bottom: height * 0.05,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: width * 0.02,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});



