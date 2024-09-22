import React, { useState, useEffect } from 'react';
import { View, TouchableWithoutFeedback, TouchableOpacity, Text, Alert,Dimensions } from 'react-native';
import Svg, { Path, Rect,Line,Circle } from 'react-native-svg';
import { AllStyles } from '../../shared/AllStyles';
import { useRoute, useNavigation } from '@react-navigation/native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AntDesign from '@expo/vector-icons/AntDesign';


const FrontView=({aspectRatio = 900/900})=>{

const navigation= useNavigation();
const route =useRoute();
const { inspection, updateInspections } = route.params;


const colors = ['white','yellow', '#fa0707'];
const [dimensions, setDimensions] = useState(Dimensions.get('window'));




const [frontParts,SetFront] = useState([
    { id:'1F1',
        label: 'Bus roof', 
        d: "M 100 70  Q 100 25,350 20   Q 600 25, 600 70  Q 370 30,100 70", colorIndex: 0 },
    { id:'1F2',
        label: 'station sign holder', 
        d: "M 100 70 Q 370 30,600 70 Q 605 100, 605 110 Q 370 115,95 110 L 100,70 M 150 68 H 550 V 95 H 150 V 68", colorIndex: 0 },
      { id:'1F3',
        label: 'left ouside mirror', 
        d: "M100 83 L 80,80 L 70,120 Q 55 120, 45 180 L 70, 185 Q 90 120, 77 120 L 85,90 L 99,93", colorIndex: 0 },
      { id:'1F4',
        label: 'right ouside mirror', 
        d: "M 600 83 L 640,80 L 650,120 Q 670 120,670 180 L 640, 178 Q 630 120,640 120 L 635,90 L 600,93", colorIndex: 0 },
      { id:'1F5',
        label: 'windscreen 1', 
        d: "M 350 115 Q 370 115,95 110 Q 80 305,90 300 Q 95 310,350 330 V 115  M 350 195 L 240,115 M 120 250  Q 155 230, 190 250", colorIndex: 0 },
     { id:'1F6',
        label: 'windscreen 2', 
        d: "M 350 115 Q 370 115,605 110 Q 620 305,610 300 Q 605 310,350 330  M 350 195  L 460, 115", colorIndex: 0 },
      { id:'1F7',
        label: 'Bonnet sheet 1', 
        d: "M 85 290 Q 95 350,140 365 Q 175 340,350 332 Q 95 310,85 300", colorIndex: 0 },
      { id:'1F8',
        label: 'Bonnet sheet 2', 
        d: "M 86 290 Q 81 360,85 370 Q 105 378 ,115 387  Q 125 370 , 140 365 Q 95 350,86 290", colorIndex: 0 },
      { id:'1F9',
        label: 'Bonnet sheet 3', 
        d: "M 612 300 Q 590 355,555 365 Q 475 340,350 332 Q 605 310,612 300", colorIndex: 0 },
      { id:'1F10',
        label: 'Bonnet sheet 4 ', 
        d: "M 614 290 Q 620 345, 615 370 Q 590 375 ,580 383 Q 565 369,553 365 Q 590 355,616 290", colorIndex: 0 },
      { id:'1F11',
        label: 'Bonnet sheet 5 (with emblem) ', 
        d: "M 140 365 Q 175 340,350 332 Q 475 340,555 365 Q 503 385,480 385 H 200 Q 180 380, 140 365", colorIndex: 0 },
    { id:'1F12',
        label: 'Bonnet sheet 6 (with engine) ', 
        d: "M 140 365 Q 180 380,200 385 H 480 Q 503 385,555 365 Q 565 369, 580 383 Q 525 400,510 430 H 185 Q 120 386, 115 387 Q 125 370 , 140 365", colorIndex: 0 },
    { id:'1F13',
       label: 'left lights ', 
       d: "M 85 370 Q 165 410, 185 430 H 140 Q 120 430 ,85 395 Q 82 375,84 370 ", colorIndex: 0 },
    { id:'1F14',
       label: 'right lights', 
       d: "M 510 430 H 550 Q 570 430,615 385 Q 617 373,616 370 Q 520 400,510 430", colorIndex: 0 },
    { id:'1F15',
        label: 'left bumper', 
        d: "M  85 395 Q 85 500 ,100 500 H 155 V 430 H 130 Q 120 428 ,85 395 M 135 430 L 85,440", colorIndex: 0 },
    { id:'1F16',
       label: 'middle bumper', 
         d: "M 155 500 H 530 V 430 H 155 Z M 400 485 H 295 V 460 H 400 V 485", colorIndex: 0 },
    { id:'1F17',
        label: 'Right bumper', 
        d: "M 530 500 V 430 H 558 Q 570 430,615 385 Q 617 500 ,600 500 H 530 M 558 430 L 615,440", colorIndex: 0 }, 

]);

const handlePress = (id) => {
    SetFront(frontParts.map(part => 
      part.id === id 
        ? { ...part, colorIndex: (part.colorIndex + 1) % colors.length }
        : part
    ));
  };
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

return (
<View style={AllStyles.container}>
    <View style={{width:svgWidth+80, height:svgHeight+160, justifyContent: 'center',alignItems: 'center'}}>
        <Svg height="100%" width="100%" viewBox="0 0 710 560">

       
        {frontParts.map((part) => (
            <TouchableWithoutFeedback key={part.id} onPress={() => handlePress(part.id)}>
              {part.label === 'windscreen 1' || part.label === 'windscreen 2' ? (
                <Path
                  d={part.d}
                  fill={colors[part.colorIndex]}
                  stroke="black"
                  strokeWidth="3"
                />
              ) :(
                <Path
                  d={part.d}
                  fill={colors[part.colorIndex]}
                  stroke="black"
                  strokeWidth="1"
                />
              )  }
            </TouchableWithoutFeedback>
          ))} 

        
         <Rect x= "100" y="250" width="110" height="30" rx="10" ry="10" fill={"none"} stroke ={"black"} strokeWidth={1}/>
        <Rect x= "160" y="120" width="90" height="30" rx="4" ry="4" fill={"none"} stroke={"black"} strokeWidth={1}/>
        <Circle cx="350" cy="360" r="8" fill="black" />
        <Line x1="175" y1="420" x2="515" y2="420" stroke={"black"} strokeWidth={1} />

        <Circle cx="95" cy="390" r="4" fill={"none"} stroke={"black"}strokeWidth={1}/>
        <Circle cx="115" cy="405" r="4" fill={"none"} stroke={"black"} strokeWidth={1}/>
        <Circle cx="140" cy="420" r="4"  fill={"none"} stroke={"black"} strokeWidth={1}/>


        <Circle cx="595" cy="390" r="4"  fill={"none"} stroke={"black"} strokeWidth={1}/>
    <Circle cx="565" cy="405" r="4"  fill={"none"} stroke={"black"} strokeWidth={1} />
     <Circle cx="540" cy="420" r="4"   fill={"none"} stroke={"black"} strokeWidth={1} />
        </Svg>

        
    
    </View>
    <TouchableOpacity style={AllStyles.btnCamera}>
        <SimpleLineIcons name="camera" size={30} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={AllStyles.btnArrowR} onPress={()=> navigation.navigate('PassengerSide')}>
      <AntDesign name="arrowright" size={30} color="white" />
      </TouchableOpacity>
</View>
);









}

export default FrontView;