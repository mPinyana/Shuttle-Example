import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, TouchableWithoutFeedback, TouchableOpacity, Text, Alert,Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { AllStyles,primaryColor,secondaryColor } from '../../shared/AllStyles';
import { useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Firebase_DB,Firebase_Storage } from '../../../FirebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc ,getDoc} from 'firebase/firestore';
import LoadingDots from "react-native-loading-dots";

import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { VehicleContext } from '../../shared/VehicleContext';

const BackView = ({navigation, aspectRatio = 350 / 320}) => {


  const route =useRoute();
  const { inspection, updateInspections } = route.params;

  const {vehicles, setVehicles} = useContext(VehicleContext);
  const filteredcar= vehicles.filter(car=>car.fleetNo === inspection.fleetNo);
  const [carNow, setCarNow]= useState(filteredcar[0]);
  const [isloading, setIsloaing] = useState(false);
  
  const [back_Side, setBackSide] = useState(inspection.backSide);
  const [damageImgs, setDamageImgs] = useState({});
  useEffect(() => {

    updateInspections({
      ...inspection,
      backSide: back_Side,
    });
  }, [back_Side]);


  const colors = ['white','yellow', '#fa0707'];
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [BackParts, setBack] = useState([
    { id:'1B1',
      label: 'top mid back Bar', 
      d: "M20 17 Q 150 1, 300 17 L300,40 Q 150 15,20 40 L20,17", damageLvl: 0 },
    { id:'1B2',
      label: 'Top left Side Bar', 
      d: "M20 17 L20,30 Q 15 50,20 150 L5,150 Q 0 10,20 18", damageLvl: 0 },
    { id:'1B3',
      title: 'Upper mid sheet', 
      d: "M20 30 Q 15 50,20 150 L 300,150 Q 305 50,300 30 Q 150 15,20 30 M 25 50 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 M 25 70 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 M 280 50 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 M 280 70 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0", damageLvl: 0 },
    { id:'1B4',
      title: 'top right Side Bar', 
      d: "M300 17 L 300,30 Q 305 50,300 150 L 315, 150 Q 320 10, 300 18", damageLvl: 0 },
    { id:'1B5',
      title: 'Center horizontal bar', 
      d: "M5 150 H 315 V 170 H 5 V 150", damageLvl: 0 },
    { id:'1B6',
      title: 'Middle Sheet', 
      d: "M20 170 L 40,170 Q 150 200 ,280 170 L 300,170 Q 305 195 ,300 220 H 20 Q 15 195,20 170", damageLvl: 0 },
    { id :'1B7',
      title: 'Left Mid Bar', 
      d: "M5 170 H 20 Q 15 195,20 220 H 5 Q 0 225, 5 170", damageLvl: 0 },
    { id:'1B8',
      title: 'Right Mid Bar',
      d: "M315 170 H 300 Q 305 195 ,300 220 H 315 Q 320 225, 315 170", damageLvl: 0 },
    { id:'1B9',
      title: 'Bottom Sheet', 
      d: "M300 220 Q 290 270 ,280 280 H 45 Q 25 260, 20 220 M130,250 H 190 V 265 H 130 V 250", damageLvl: 0 },
    { id:'1B10',
      title: 'Left Back Lights', 
      d: "M20 220 H 3 Q 4 280, 15 280 H 45 Q 25 260, 20 220 M 6 230 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 M 11 250 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 M 19 270 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0", damageLvl: 0 },
    { id:'1B11',
      id: 'Right Back Lights', 
      d: "M300 220 H 317 Q 320 280, 300 280 H 280 Q 290 270 ,300 220 M 303 230 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 M 298 250 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 M 290 270 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0", damageLvl: 0 },
    { id:'1B12',
      title: 'Bottom left back bumper', 
      d: "M5 250 Q 0 289 ,45 280 V 310 H 9 Z M 20 295 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0", damageLvl: 0 },
    { id:'1B13',
      title: 'Middle bottom bumper', 
      d: "M45 280 H 280 V 310 H 45 M 90 289 L 97, 305 H 105 L 97, 289 H 90  M 220 289 L 210, 305 H 218L 228,289 Z", damageLvl: 0 },
    { id:'1B14',
      title: 'Bottom right back Bumper', 
      d: "M280 280 Q 315 288 , 316 258 V 310 H 280 M 290 295 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0", damageLvl: 0 },
  ]);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  const screenWidth = dimensions.width;
  const screenHeight = dimensions.height;
  const svgWidth = Math.min(screenWidth * 0.9, screenHeight * 0.9 * aspectRatio);
  const svgHeight = svgWidth / aspectRatio;

  const handlePress = (id) => {
    setBack(BackParts.map(part => 
      part.id === id 
        ? { ...part, damageLvl: (part.damageLvl + 1) % colors.length }
        : part
    ));
  };


  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 1,
    });
  
    if (!result.canceled) {
      // Create a unique key for the new image (e.g., using the current timestamp or an incrementing number)
      const newImageKey = `Back image${Object.keys(damageImgs).length + 1}`;
  
      // Update the damageImgs object with the new image URI
      setDamageImgs((prevState) => ({
        ...prevState,
        [newImageKey]: result.assets[0].uri, // Add the new image URI with the generated key
      }));
    }
  };
  
  

  const handleDamageLog = () => {
    return new Promise((resolve) => {
      setBackSide((prevBackSide) => {
        const updatedBackSide = { ...prevBackSide, parts: BackParts , damagePics:damageImgs};
        resolve(updatedBackSide); // Resolving the updated state
        return updatedBackSide;   // Returning the updated state
      });
    });
  };

  const handleUpdateInspection = async () => {
    try {
      setIsloaing(true);
      const updatedBackSide = await handleDamageLog();  // Wait for `back_Side` to be updated
  
      const updatedInspection = {
        ...inspection,
        backSide: updatedBackSide,
        time:new Date().toISOString(),
        //update  to latest time
       // Now we use the updated backSide
      };

      handleUpdateVehicle(updatedInspection);
      
      uploadAllImages(updatedInspection);
      const inspectionRef = doc(Firebase_DB, 'Inspections', inspection.id);
      await updateDoc(inspectionRef, updatedInspection);  // Update Firestore with synced state
  
      console.log('Inspection updated successfully');
      Alert.alert('', 'Inspection updated successfully');
      
      navigation.navigate("Inspections");
    } catch (error) {
      console.error('Failed to update inspection:', error);
      Alert.alert('Failed to update inspection ', 'Unsuccessful: ' + error);
      
    } finally {
      setIsloaing(false);
    }
  };


  const handleUpdateVehicle = async (inspected) => {
    try {
      // Get a fresh reference to the vehicle document
      const vehicleRef = doc(Firebase_DB, 'vehicles', carNow.id);
  
      // Fetch the current data from Firestore
      const vehicleSnapshot = await getDoc(vehicleRef);
      const currentVehicleData = vehicleSnapshot.data();
  
      // Prepare the update
      const updatedInspections = [inspected.id, ...(currentVehicleData.inspections || [])];
  
      // Update only the inspections field in Firestore
      await updateDoc(vehicleRef, {
        inspections: updatedInspections
      });
  
      console.log('Inspection added to vehicle in database');
  
      // Optionally, fetch the updated document to confirm the change
      const updatedSnapshot = await getDoc(vehicleRef);
      console.log('Updated vehicle data:', updatedSnapshot.data());
  
      // If you still want to update the local state, do it here
      // but be aware it might not reflect in your component immediately
      setCarNow(prevState => ({
        ...prevState,
        inspections: updatedInspections
      }));
  
    } catch (error) {
      console.error('Failed to update vehicle:', error);
    }
  };
  
 
const uploadImage = async (uri, path) => {
  const response = await fetch(uri); // Fetch the image file from its URI
  const blob = await response.blob(); // Convert the image to a blob for upload
  
  const storageRef = ref(Firebase_Storage, path); // Create a reference in Cloud Storage
  
  // Upload the blob to Cloud Storage
  await uploadBytes(storageRef, blob); 
  
  // Get and return the download URL after upload is complete
  return await getDownloadURL(storageRef);
};
  const uploadAllImages = async (newInspection) => {
    const sides = ['driverSide', 'frontSide', 'passengerSide', 'backSide'];
    
    // Iterate over each side
    for (const side of sides) {
      const damagePics = newInspection[side].damagePics; // Access the damagePics object for the side
      
      // Loop through the images in damagePics (assuming it's an object with image URIs)
      for (const [key, imageUri] of Object.entries(damagePics)) {
        // Define the path in Cloud Storage for the image
        const path = `Vehicles/${newInspection.fleetNo}/${newInspection.id}/${key}.jpg`;
        
        // Upload the image and get its download URL
        const downloadUrl = await uploadImage(imageUri, path);
  
        // Optionally store the download URL back in Firestore or elsewhere
        console.log(`Image uploaded to: ${downloadUrl}`);
      }
    }
  };



  
   
  if(isloading){
    return(
        <View style={{alignItems:'center', marginTop:'50%'}} >
                  
                  <LoadingDots dots={3} colors={[primaryColor,secondaryColor,'lightblue']}/>              
 
     </View>
    );
   }

  

  return (
    <View style={AllStyles.container}>
    


      <View style={{ width: svgWidth, height: svgHeight,justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>
      <Svg height="100%" width="100%" viewBox="-15 0 350 320">
        {BackParts.map((part) => (
          <TouchableWithoutFeedback key={part.id} onPress={() => handlePress(part.id)}>
            <Path
              d={part.d}
              fill={colors[part.damageLvl]}
              stroke="black"
              strokeWidth="1"
            />
          </TouchableWithoutFeedback>
        ))}
      </Svg>
      </View>

      <TouchableOpacity style={AllStyles.btnCamera} onPress={takePhoto}>
              <SimpleLineIcons name="camera" size={30} color="white" />
              {/* Badge to display the number of images */}
              {Object.keys(damageImgs).length > 0 && (
                <View style={AllStyles.badgeContainer}>
                  <Text style={AllStyles.badgeText}>
                    {Object.keys(damageImgs).length}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
       

      <View style={AllStyles.btnContainer}>
        <TouchableOpacity style={AllStyles.btn}
          onPress={() => {handleDamageLog();handleUpdateInspection()}}>
          <Text style={AllStyles.textBtn} >Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};



export default BackView;