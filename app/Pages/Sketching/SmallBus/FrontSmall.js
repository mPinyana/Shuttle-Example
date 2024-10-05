import React, { useState, useEffect } from 'react';
import { View, TouchableWithoutFeedback, TouchableOpacity, Text, Alert,Dimensions } from 'react-native';
import Svg, { Path, Rect,Line,Circle } from 'react-native-svg';
import { AllStyles } from '../../../shared/AllStyles';
import { useRoute, useNavigation } from '@react-navigation/native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AntDesign from '@expo/vector-icons/AntDesign';


const FrontSmall=()=>{


const navigation= useNavigation();
const route =useRoute();
const { inspection, updateInspections } = route.params;

const [front_Side, setFrontSide] = useState(inspection.frontSide); 


const colors = ['white','yellow', '#fa0707'];
const [dimensions, setDimensions] = useState(Dimensions.get('window'));


useEffect(() => {
  updateInspections({
    ...inspection,
    frontSide: front_Side,
  });
}, [front_Side]);

const [frontParts,SetFront] = useState([
    { id:'2F1',
        label: 'Bus roof (Front View)', 
        d: "M90 60 Q 95 35,100 30 Q 260 17,400 30 Q 405 35,410 60 Q 250 45,90 60 ", damageLvl: 0 },
    { id:'2F2',
        label: 'left outside Mirror', 
        d: "M79 110 L 60,103 Q 61 88,50 88  H 35 Q 25 90,29 130 Q 33 140,55 135 Q 58 120,59 110 L 79,117 Z", damageLvl: 0 },
      { id:'2F3',
        label: 'Right ouside mirror', 
        d: "M420 110 L 440,103 Q 441 88,450 88 H 463 Q 473 90,470 130 Q 465 140,443 135 Q 442 120,442 115 L 421,120 Z", damageLvl: 0 },
      { id:'2F4',
        label: 'WindScreen', 
        d: "M90 60 Q 80 100,80 200 Q 240 220,420 200 Q 420 100,410 60  Q 250 45,90 60 M 80 200 H 420 M 80 195 H 100  Q 140 160,180 195 H 390 Q 410 198,410 200", damageLvl: 0 },
      { id:'2F5',
        label: 'Whippers', 
        d: "M80 200 Q 240 220,420 200 Q 410 240,240 240 Q 80 240,80 200 M 130 230 L 180,215 H 300 M 240 240 L 280,225 L 380,210", damageLvl: 0 },
      { id:'2F6',
        label: 'Left Bonnet', 
        d: "M80 200 Q 75 280,95 290 Q 100 300,140 310 L 130,232 Q 80 220,80 200", damageLvl: 0 },
      { id:'2F7',
        label: 'Mid Bonnet', 
        d: "M130 232 Q 250 250,360 233 L 350,310 Q 250 305,140 310 Z M150 235 L 160,310 M 330 310 L 340,236", damageLvl: 0 },
        { id:'2F8',
        label: 'right Bonnet', 
            d: "M350,310 Q 410 305,410 290 Q 420 255,420 200 Q 395 230,360 232 Z", damageLvl: 0 },
      { id:'2F9',
        label: 'Left Front Ligts ', 
        d: "M83 270 Q 86 300,140 310 L 145,350 Q 110 330,90 310 Z M 93 304 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 M 107 315 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 M 123 327 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0", damageLvl: 0 },
      { id:'2F10',
        label: 'Mid Bumper (Liscence Plate)', 
        d: "M140 310 Q 250 305,350 310 Q 340 400,315 400 H 170 Q 150 400,140 310 M 160 310 Q 165 380,180 385 H 300 Q 320 380,330 310 M 200 340 V 360 H 280  V 340 Z M 160 315 H 330 M 162 325 H 325 M 163 335 H 325 M 167 365 H 317 M 172 375 H 311 M 175 310 V 335 M 195 307 V 335 M 215 307 V 335 M 235 307 V 335 M 255 307 V 335 M 275 307 V 335 M 295 307 V 335 M 315 307 V 335 M 185 364 V 385 M 205 364 V 385 M 225 364 V 385 M 245 364 V 385 M 265 364 V 385 M 285 364 V 385 M 300 364 V 385", damageLvl: 0 },
    { id:'2F11',
        label: 'Right Lights ', 
        d: "M 409 295 Q 400 305,350 310 Q 350 320,345 350 Q 400 330, 405 315 Z M 393 310 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 M 375 320 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 M 355 330 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0", damageLvl: 0 },
    { id:'2F12',
       label: 'left bottom corner light ', 
       d: "M82 273 Q 85 400,100 405 H 165 V 400 Q 150 375,145 350 Q 110 330,90 310 Z M 95 348 L 110 400 M 96 350 L 130,370 L 140, 400 H 110  M 113 380 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 ", damageLvl: 0 },
    { id:'2F13',
       label: 'Right bottom corner light', 
       d: "M323 398 Q 346 365,345 350 Q 400 330, 405 315 L 411,290 Q 405 405,395 405 H 323  Z M390 355  L383,398 H 350  L 360 365 Z M 365 380 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0", damageLvl: 0 },
]);

const handlePress = (id) => {
    SetFront(frontParts.map(part => 
      part.id === id 
        ? { ...part, damageLvl: (part.damageLvl + 1) % colors.length }
        : part
    ));
  };

  const handleDamageLog = () => {
    // Update the driver side parts state
    const updatedFrontSide = { ...front_Side, parts: frontParts };
    setFrontSide(updatedFrontSide);
    return updatedFrontSide; // Return the updated state for use
  };

   useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  const screenWidth = dimensions.width;
  const screenHeight = dimensions.height;
  const svgWidth = screenWidth
  const svgHeight = screenHeight; 

return (
<View style={AllStyles.container}>
    <View style={{width:svgWidth, height:svgHeight, justifyContent: 'center',alignItems: 'center'}}>
        <Svg height="100%" width="100%" viewBox="45 -100 400 890">

       
        {frontParts.map((part) => (
            <TouchableWithoutFeedback key={part.id} onPress={() => handlePress(part.id)}>
            <Path
              d={part.d}
              fill={colors[part.damageLvl]}
              stroke="black"
              strokeWidth="1"
            />
          </TouchableWithoutFeedback>
          ))} 

        
     

          <Path d='M100 30
           Q 70 95,80 200' stroke={'black'} strokeWidth="1" fill="none"/>
          <Path d='M400 30
           Q 430 95,420 200' stroke={'black'} strokeWidth="1" fill="none"/>

          <Path d='M165 405
           		H 323
                V398'
                 stroke={'black'} strokeWidth="1" fill="none"/>
      
        </Svg>

        
    
    </View>
    <TouchableOpacity style={AllStyles.btnCamera}>
        <SimpleLineIcons name="camera" size={37} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={AllStyles.btnArrowR}    onPress={() => {
                                                              const updatedFrontSide = handleDamageLog(); // Get updated driver side
                                                                navigation.navigate('PassengerSmall', {
                                                                  inspection: {
                                                                    ...inspection,
                                                                    frontSide: updatedFrontSide, // Pass the updated front side
                                                                  },
                                                                  updateInspections,
                                                                });
                                                            }}>
      <AntDesign name="arrowright" size={30} color="white" />
      </TouchableOpacity>
</View>
);









}

export default FrontSmall;