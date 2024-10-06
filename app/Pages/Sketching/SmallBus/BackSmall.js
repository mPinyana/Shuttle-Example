import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableWithoutFeedback, TouchableOpacity, Text, Alert,Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { AllStyles } from '../../../shared/AllStyles';
import { useRoute } from '@react-navigation/native';

import { Firebase_DB } from '../../../../FirebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

const BackSmall = ({navigation,}) => {


  const route =useRoute();
  const { inspection, updateInspections } = route.params;

  const [back_Side, setBackSide] = useState(inspection.backSide);

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

  const handlePress = (id) => {
    setBack(BackParts.map(part => 
      part.id === id 
        ? { ...part, damageLvl: (part.damageLvl + 1) % colors.length }
        : part
    ));
  };

/*  handleDamageLog=()=>{
    setBackSide({...back_Side, parts:BackParts})
  }
  */

  const handleDamageLog = () => {
    return new Promise((resolve) => {
      setBackSide((prevBackSide) => {
        const updatedBackSide = { ...prevBackSide, parts: BackParts };
        resolve(updatedBackSide); // Resolving the updated state
        return updatedBackSide;   // Returning the updated state
      });
    });
  };

  const handleUpdateInspection = async () => {
    try {
      const updatedBackSide = await handleDamageLog();  // Wait for `back_Side` to be updated
  
      const updatedInspection = {
        ...inspection,
        backSide: updatedBackSide,   // Now we use the updated backSide
      };
  
      const inspectionRef = doc(Firebase_DB, 'Inspections', inspection.id);
      await updateDoc(inspectionRef, updatedInspection);  // Update Firestore with synced state
  
      console.log('Inspection updated successfully');
      Alert.alert('', 'Inspection updated successfully');
    } catch (error) {
      console.error('Failed to update inspection:', error);
      Alert.alert('Failed to update inspection ', 'Unsuccessful: ' + error);
    } finally {
      navigation.navigate("Inspections");
    }
  };
  


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

      <TouchableOpacity style ={AllStyles.btnCamera}>
          <SimpleLineIcons name="camera" size={30} color="white" />
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