import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, TouchableWithoutFeedback, TouchableOpacity, Text, Alert,Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { AllStyles, primaryColor,secondaryColor } from '../../../shared/AllStyles';
import { useRoute } from '@react-navigation/native';
import LoadingDots from "react-native-loading-dots";

import { Firebase_DB ,Firebase_Storage} from '../../../../FirebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc ,getDoc} from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';

import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { VehicleContext } from '../../../shared/VehicleContext';

const BackSmall = ({navigation,}) => {


  const route =useRoute();
  const { inspection, updateInspections } = route.params;

  const [back_Side, setBackSide] = useState(inspection.backSide);
  const [damageImgs, setDamageImgs] = useState({});
  const {vehicles, setVehicles} = useContext(VehicleContext);
  const [isloading, setIsloaing] = useState(false);

  const filteredcar= vehicles.filter(car=>car.fleetNo === inspection.fleetNo);
  const [carNow, setCarNow]= useState(filteredcar[0]);
  
  useEffect(() => {

    updateInspections({
      ...inspection,
      backSide: back_Side,
    });
  }, [back_Side]);


  const colors = ['white','yellow', '#fa0707'];
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [BackParts, setBack] = useState([
    { id:'2B1',
      label: 'Roof (back View)', 
      d: "M50 17  Q 210 5,350 17  L353,40 Q 210 45,47 40 Z", damageLvl: 0 },
    { id:'2B2',
      label: 'left upper back', 
      d: "M50 17 Q 38 80,40 250 L15,240 Q 10 20,50 17 ", damageLvl: 0 },
    { id:'2B3',
      title: 'Left back Lights', 
      d: "M15 240 L40, 250 Q 40 275,47 350 L 43,350 Q 30 270,25 270 Q 28 270 ,15 245 Z", damageLvl: 0 },
    { id:'2B4',
      title: 'back window', 
      d: "M47 40 Q 210 45,353 40 Q 362 80,360 190 Q 200 210,40 190 Q 43 50,47 40", damageLvl: 0 },
    { id:'2B5',
      title: 'center metal sheet', 
      d: "M40 190 Q 200 210,360 190 Q 360 300,357 320 H 250 L 250,307 H 149 L 150,320 H 45 Q 37 200,40 190", damageLvl: 0 },
    { id:'2B6',
      title: 'Below left lights sheet', 
      d: "M15 245 Q 30 270,38 320 L 15,320 Q 13 265,15 240", damageLvl: 0 },
    { id :'2B7',
      title: 'Left bottom sheet', 
      d: "M15 320 L 38,320 Q 40 330,43 350 L 47, 350  Q 49 360,52 380  L 20,380 Q 13 335,15 320 M25 380  Q 25 355,48 352  M 20 375 L 50 ,375 M 18 370 L 50 ,370", damageLvl: 0 },
    { id:'2B8',
      title: 'Bottom mid sheet',
      d: "M52 375 Q 42 325,45 320 H 150 Q 148 310,150 308 H 250  Q 250 335,240 345 H 160 Q 150 325,150 320 M 160 315  H 240  V 335 H 160 V 315  M 250 320  H 359 Q 355 370,345 380 H 52 M 48 352 H 355  Q 353 356,352 360 H 50  L 50,370 H 350 L 348,375 H 52", damageLvl: 0 },
    { id:'2B10',
      title: 'Below right lights sheet', 
      d: "M385 250 Q 363 290,365 320 H 384  Q 386 255,385 250", damageLvl: 0 },
    { id:'2B11',
      id: 'right bottom sheet', 
      d: "M384 320 H 364 Q 363 330,363 350 H 355 Q 355 370,345 380 H 377 Q 386 340,384 320 M 355 352 Q 370 355,370 380 M349 375  H 378 L 379,370 H 349", damageLvl: 0 },
    { id:'2B12',
      title: 'Right upper back', 
      d: "M350 17 Q 362 80,360 250 L385,240 Q 388 20,350 17", damageLvl: 0 },
    { id:'2B13',
      title: ' Right Lights', 
      d: "M385 240  L360,250 Q 360 300 ,356 350 H 362 Q 363 305,373 275 Q 380 255 ,385 250 V 240", damageLvl: 0 },
   
  ]);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  const screenWidth = dimensions.width;
  const screenHeight = dimensions.height;
  const svgWidth =screenWidth*0.9;
  const svgHeight =screenHeight*0.9 ;


  
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
  
  

  const handlePress = (id) => {
    setBack(BackParts.map(part => 
      part.id === id 
        ? { ...part, damageLvl: (part.damageLvl + 1) % colors.length }
        : part
    ));
  };


  const handleDamageLog = () => {
    return new Promise((resolve) => {
      setBackSide((prevBackSide) => {
        const updatedBackSide = { ...prevBackSide, parts: BackParts,damagePics:damageImgs  };
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
      <Svg height="100%" width="100%" viewBox="0 0 390 700">
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



export default BackSmall;