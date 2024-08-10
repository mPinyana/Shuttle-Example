import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Platform} from 'react-native';
import  Modal  from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { collection,getDocs,query,where } from 'firebase/firestore';
import { Firebase_DB,Firebase_Auth } from '../../FirebaseConfig';
import { AllStyles, primaryColor } from '../shared/AllStyles';
import Ionicons from '@expo/vector-icons/Ionicons';



export default function Inspection({ navigation }){

  //Database communication
    const [profiles, setProfiles] = useState([]);
    const [currentUserProfile, setCurrentUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
  

  // Modal conrtols & Data
    const [isModalVisible, setIsModalVisible] =useState(false);
  //Dropdown picker
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

  // Time variables & event handlers
    const [time, setTime] = useState(null);
    const [show, setShow] = useState(false);
    const [emailData, setEmails]= useState([]);
    const [selectedEmail, setSelectedEmail] = useState('');

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
  
          setProfiles(profilesArray);

          const user = Firebase_Auth.currentUser;
          if (user) {
            const currentUserProfile = profilesArray.find(profile => profile.id === user.uid);
            setCurrentUserProfile(currentUserProfile);

           
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


    const extractEmails = (profilesArray, currentUserEmail) => {
      return profilesArray
        .filter(profile => profile.email !== currentUserEmail) // Exclude the current user's email
        .map(profile => profile.email);
    };


        if (loading) {
          return (
              <View style={{alignItems:'center'}}>
                  
                  <Text style ={{fontSize:40 ,color:primaryColor,padding:70}}>Loading...</Text>
          
              </View>
          );
      }

      if (!profiles) {
        return( 
        <View style={AllStyles.loader}>
        <Text>No profile data found.</Text>
        </View>

    );
    }

    return(

        <View style = {AllStyles.container}>

                <Text style ={AllStyles.section}>Welcome, your inpections are waiting for you</Text>
                <TouchableOpacity style={AllStyles.inspectItem} onPress={()=> navigation.navigate("Documentation")} > 
                    <Text style={{fontSize:17, color:'white',fontWeight:'bold'}}>M103 Inspection</Text>
                </TouchableOpacity>
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
                      }}>Add a new Inspection</Text>

                      <View style={{flexDirection:'row'}}>
                      <Text style={{
                        fontSize:20,
                        marginBottom:50
                      }}>Driver: </Text>
                      {/*
                      <DropDownPicker
                        open={open}
                        // data={emailData.map(email => ({ label: email, value: email }))}
                        setOpen={setOpen}
                        value={selectedEmail} // Controlled value for the dropdown
                        onChange={item => setSelectedEmail(item.value)}
                        searchable={true}
                        placeholder="Select Driver"
                        style={AllStyles.dropdown}
                        dropDownContainerStyle={AllStyles.dropdownContainer}
                        listMode="SCROLLVIEW"
                        searchablePlaceholder="Search Driver"
                      /> 
                      */}
                      </View>
                      
                      <View style={{flexDirection:'row',
                                    justifyContent:'space-between'
                                                          }}>
                      <Text style={{
                        fontSize:20,
                        marginBottom:20,
                       
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
                              onCancel={hideTimePicker}
                              onConfirm={handleConfirm}
                              
                          />
                          
                       
                      </View>
                    </View>
 
                </Modal>
        </View>
    );
}