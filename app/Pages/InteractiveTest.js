import React, { useState, useEffect } from 'react';
import { View, TouchableWithoutFeedback, TouchableOpacity, Text, Alert,Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { AllStyles } from '../shared/AllStyles';
import { useRoute } from '@react-navigation/native';

import { Firebase_DB } from '../../FirebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

import AntDesign from '@expo/vector-icons/AntDesign';

const InteractiveTest = ({navigation, aspectRatio = 350 / 320}) => {

  const route = useRoute();
  const { inspection, updateInspections } = route.params;

  const colors = ['white','#fca708', '#fa0707']; // Define the color sequence
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [parts, setParts] = useState([
    { id:'B11',
      label: 'top mid back Bar', 
      d: "M20 17 Q 150 1, 300 17 L300,40 Q 150 15,20 40 L20,17", colorIndex: 0 },
    { id:'B12',
      label: 'Top left Side Bar', 
      d: "M20 17 L20,30 Q 15 50,20 150 L5,150 Q 0 10,20 18", colorIndex: 0 },
    { id:'B13',
      title: 'Upper mid sheet', 
      d: "M20 30 Q 15 50,20 150 L 300,150 Q 305 50,300 30 Q 150 15,20 30 M 25 50 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 M 25 70 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 M 280 50 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 M 280 70 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0", colorIndex: 0 },
    { id:'B14',
      title: 'top right Side Bar', 
      d: "M300 17 L 300,30 Q 305 50,300 150 L 315, 150 Q 320 10, 300 18", colorIndex: 0 },
    { id:'B15',
      title: 'Center horizontal bar', 
      d: "M5 150 H 315 V 170 H 5 V 150", colorIndex: 0 },
    { id:'B16',
      title: 'Middle Sheet', 
      d: "M20 170 L 40,170 Q 150 200 ,280 170 L 300,170 Q 305 195 ,300 220 H 20 Q 15 195,20 170", colorIndex: 0 },
    { id :'B17',
      title: 'Left Mid Bar', 
      d: "M5 170 H 20 Q 15 195,20 220 H 5 Q 0 225, 5 170", colorIndex: 0 },
    { id:'B18',
      title: 'Right Mid Bar',
      d: "M315 170 H 300 Q 305 195 ,300 220 H 315 Q 320 225, 315 170", colorIndex: 0 },
    { id:'B19',
      title: 'Bottom Sheet', 
      d: "M300 220 Q 290 270 ,280 280 H 45 Q 25 260, 20 220 M130,250 H 190 V 265 H 130 V 250", colorIndex: 0 },
    { id:'B20',
      title: 'Left Back Lights', 
      d: "M20 220 H 3 Q 4 280, 15 280 H 45 Q 25 260, 20 220 M 6 230 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 M 11 250 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 M 19 270 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0", colorIndex: 0 },
    { id:'B21',
      id: 'Right Back Lights', 
      d: "M300 220 H 317 Q 320 280, 300 280 H 280 Q 290 270 ,300 220 M 303 230 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 M 298 250 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 M 290 270 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0", colorIndex: 0 },
    { id:'B22',
      title: 'Bottom left back bumper', 
      d: "M5 250 Q 0 289 ,45 280 V 310 H 9 Z M 20 295 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0", colorIndex: 0 },
    { id:'B21',
      title: 'Middle bottom bumper', 
      d: "M45 280 H 280 V 310 H 45 M 90 289 L 97, 305 H 105 L 97, 289 H 90  M 220 289 L 210, 305 H 218L 228,289 Z", colorIndex: 0 },
    { id:'B22s',
      title: 'Bottom right back Bumper', 
      d: "M280 280 Q 315 288 , 316 258 V 310 H 280 M 290 295 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0", colorIndex: 0 },
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
    setParts(parts.map(part => 
      part.id === id 
        ? { ...part, colorIndex: (part.colorIndex + 1) % colors.length }
        : part
    ));
  };

  const handleUpdateInspection = async () => {

    try {
      const inspectionRef = doc(Firebase_DB, 'Inspections', inspection.id);
      await updateDoc(inspectionRef, inspection);

      console.log('Inspection updated successfully');
      Alert.alert('', 'Inspection updated successfully');
    } catch (error) {
      console.error('Failed to update inspection:', error);
      Alert.alert('Failed to update inspection ', 'Unseccesfull :' + error);
    }
    finally {
      navigation.navigate("Inspections");
    }

  };


  return (
    <View style={AllStyles.container}>
      <Text style={AllStyles.Welkom}>Bus Sketch</Text>


      <View style={{ width: svgWidth, height: svgHeight,justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>
      <Svg height="100%" width="100%" viewBox="-15 0 350 320">
        {parts.map((part) => (
          <TouchableWithoutFeedback key={part.id} onPress={() => handlePress(part.id)}>
            <Path
              d={part.d}
              fill={colors[part.colorIndex]}
              stroke="black"
              strokeWidth="1"
            />
          </TouchableWithoutFeedback>
        ))}
      </Svg>
      </View>

      <TouchableOpacity style ={AllStyles.btnAdd}>
          <AntDesign name="camerao" size={40} color="blue" />
      </TouchableOpacity>

      <View style={AllStyles.btnContainer}>
        <TouchableOpacity style={AllStyles.btn}
          onPress={() => handleUpdateInspection()}>
          <Text style={AllStyles.textBtn} >Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InteractiveTest;