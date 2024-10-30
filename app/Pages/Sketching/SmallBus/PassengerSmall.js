import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View,ScrollView, TouchableWithoutFeedback, TouchableOpacity,Animated, Text, Alert, Dimensions } from 'react-native';
import Svg, { Path, Rect, Circle, Polyline, Line, Text as SvgText, TSpan } from 'react-native-svg';
import { AllStyles, primaryColor } from '../../../shared/AllStyles';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

const PassengerSmall = ({ navigation, aspectRatio = 300 / 100 }) => {

    
  const route =useRoute();
  const { inspection, updateInspections } = route.params;
  
  const [passenger_Side, setPassengerSide] = useState(inspection.passengerSide); 
  const [damageImgs, setDamageImgs] = useState({});
  const translation = useRef(new Animated.Value(-100)).current;
  const [headerShown, setHeaderShown] = useState(false);


  useEffect(() => {
    updateInspections({
      ...inspection,
      passengerSide: passenger_Side,
    });
  }, [passenger_Side]);

  useEffect(() => {
    Animated.timing(translation, {
      toValue: headerShown ? 0 : -100,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [headerShown]);


  const colors = ['white', 'yellow', '#fa0707']; // Define the color sequence
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));


  const psgParts= [
    { id:'2P1',
    label: 'Bottom Back (Side View)', 
    d: "M270 1300 Q195 1305,195 1305 Q 190 1295,190 1245 H 270 V 1300", damageLvl: 0 },
    { id:'2P2',
    label: 'Upper Back (Side View)', 
    d: "M270 1300 Q 540 1290,540 1280 Q 555 1275,550 1245 H 270 Z M520 1245 Q405 1290,390 1245 M300 1299 Q 325 1285,325 1270 H 333 V 1297", damageLvl: 0 },
    { id:'2P3',
    label: 'roof (passenger View)', x: 520, y: 245, width: 30, height: 1000, damageLvl: 0 },
    { id: '2P4',
    label:'window 6', x: 395, y: 1090, width: 115, height: 150, rx: 5, ry: 5, damageLvl: 0 },
    { id:'2P5',
    label: 'window 5', x: 395, y: 930, width: 115, height: 150, rx: 5, ry: 5, damageLvl: 0 },
    { id:'2P6',
    label: 'window 4', x: 395, y: 775, width: 115, height: 145, rx: 5, ry: 5, damageLvl: 0 },
    { id:'2P7',
    label: 'window 3', x: 395, y: 625, width: 115, height: 135, rx: 5, ry: 5, damageLvl: 0 },
    { id:'2P8',
    label: 'window 2', x: 395, y: 480, width: 115, height: 135, rx: 5, ry: 5, damageLvl: 0 },
    
    { id:'2P9',
    label: 'Front window',
     d:'M395 322 H 515 Q 515 250,510 242 Q 490 195,385 170 Q 368 220,383 255 Q400 290,395 322 ', damageLvl: 0 },
    { id:'2P10',
    label: 'WindScreen (Side View)', 
    d: "M520 245 Q 480 180,385 165 L 405,135 Q 530 170,550 245 Z M 540 218 L 530,225 L 410, 155 L 420, 140", damageLvl: 0 },
    { id:'2P11',
    label:'Bumper (Side View)', 
    d: "M385 165 L 405, 135 Q 310 100,200 130 L 170,165 Z M 385 165 Q 300 120,190 140 M 315 140 L 345 120 Q 325 116,315 117 L 305, 122 Q 315 130,315 140", damageLvl: 0 },
    { id:'2P12',
     label:'Lower metal Sheet 1', 
     d:'M 170,165 V 190 Q 250 170,270 260 V 165 Z', damageLvl: 0 },
    { id:'2P13',
    label: 'Lower metal Sheet 2', 
    d:'M 270 260 Q 260 325,170 325 V 340 H 270 V 260', damageLvl: 0 },
    { id:'2P14',
    label: 'Door 1', 
    x: 185, y: 355, width: 320, height: 45, damageLvl: 0 },
    { id:'2P15',
    label: 'Door 2', 
    x: 185, y: 415, width: 320, height: 45, damageLvl: 0 },
    { id:'2P16',
    label: 'lower metal Sheet 4', 
    x:170, y:480, width:100, height:80, damageLvl: 0 },
    { id:'2P17',
    label: 'lower metal Sheet 5', 
    x:170, y:560, width:100, height:120, damageLvl: 0 },
    { id:'2P18',
    label:'lower metal Sheet 6',
     x:170, y:660, width:100, height:110, damageLvl: 0 },
     { id:'2P19',
    label:'lower metal Sheet 7',
    d:'M 170 770 V820 Q 260 800,270 900 V 770', damageLvl: 0 },
    { id:'2P20',
    label:'lower metal Sheet 8',
    d:'M 270 900 Q 270 990,170 980 L 175,1030 H 270 Z', damageLvl: 0 },
    { id:'2P21',
    label:'lower metal Sheet 9',
    d:'M175,1030 L 180,1110 H 270  V 1030 H175', damageLvl: 0 },
    { id:'2P22',
    label:'lower metal Sheet 10',
    d:'M180,1109 L190,1245 H 270 V 1109 Z', damageLvl: 0 },
    { id:'2P23',
    label: 'middle Sheet 8', 
    x:270, y:1115, width:120, height:130, damageLvl: 0 },
    { id:'2P24',
        label: 'middle Sheet 7', 
        x:270, y:985, width:120, height:130, damageLvl: 0 },
    { id:'2P25',
    label: 'middle Sheet 6', 
     x:270, y:855, width:120, height:130, damageLvl: 0 },
     { id:'2P26',
    label: 'middle Sheet 5', 
    x:270, y:725, width:120, height:130, damageLvl: 0 },
    { id:'2P27',
    label: 'middle Sheet 4', 
    x:270, y:595, width:120, height:130, damageLvl: 0 },
    { id:'2P28',
    label: 'middle Sheet 3', 
    x:270, y:480, width:120, height:130, damageLvl: 0 },
    { id:'2P29',
    label: 'middle Sheet 1', 
    x:270, y:165, width:100, height:160, damageLvl: 0 },
    { id:'2P30',
    label: 'back Wheel ', cx: 180, cy: 900, r: 70, damageLvl: 0 },
    { id:'2P31',
    label: 'front Wheel', cx: 180, cy: 255, r: 60, damageLvl: 0 },
    
  ];

  const [Passengerparts, setPassenger] = useState(
    inspection.inspStatus === 'Complete' ? inspection.passengeSide.parts : psgParts
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  const screenWidth = dimensions.width;
  const screenHeight = dimensions.height;


  
  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 1,
    });
  
    if (!result.canceled) {
      // Create a unique key for the new image (e.g., using the current timestamp or an incrementing number)
      const newImageKey = `Passenger image${Object.keys(damageImgs).length + 1}`;
  
      // Update the damageImgs object with the new image URI
      setDamageImgs((prevState) => ({
        ...prevState,
        [newImageKey]: result.assets[0].uri, // Add the new image URI with the generated key
      }));
    }
  };
  
  

  const handlePress = (id) => {
    setPassenger(Passengerparts.map(part => 
      part.id === id 
        ? { ...part, damageLvl: (part.damageLvl + 1) % colors.length }
        : part
    ));
  };

  const handleDamageLog = () => {
    // Update the driver side parts state
    const updatedPassengerSide = { ...passenger_Side, parts: Passengerparts, damagePics:damageImgs };
    setPassengerSide(updatedPassengerSide);
    return updatedPassengerSide; // Return the updated state for use
  };

  return (
    <View style={AllStyles.container}>
         <ScrollView 
      onScroll={(event) => {
        const scrolling = event.nativeEvent.contentOffset.y;
        
        if (scrolling > 100) {
          setHeaderShown(true);
        } else {
          setHeaderShown(false);
        }
      }}
      // onScroll will be fired every 16ms
      scrollEventThrottle={16}
      style={{ flex: 1 }}
    >
        <Animated.View
        style={{
          pointerEvents:"box-none",
          position: 'absolute',
          alignItems:'center',
          justifyContent:'center',
          flexDirection:'row',
        //alignContent:'space-between',
          top: 0,
          left: 0,
          right: 0,
          borderBottomWidth:1,
          borderBottomColor:'grey',
          height: 70,
          width:'130%',
          backgroundColor: 'white',
          marginBottom:'3%',
          transform: [
            { translateX: translation },
          ],
        }}
      >
        
       
        <Text
        style={{
          color:primaryColor,
          fontSize:25,
          marginTop:'4%'
          //fontWeight:'bold',
         //S flexWrap: 'wrap'
        }}
        >
          Passenger's Side
        </Text>
      </Animated.View>

      <TouchableOpacity
          onPress={()=> navigation.navigate('FrontSmall', {
            inspection: {
              ...inspection,
              passengerSide: passenger_Side,
            },
            updateInspections,
          })}
          style={{
            padding: 10, // Make sure there is enough space to touch
          }}
        >
        <Ionicons name="arrow-back" size={26} color="black"
        style={{
          marginRight:'5%',
          marginTop:'4%',
          //paddingLeft:'10%',
        }} 
        />
        </TouchableOpacity>

      <View style={{ width: screenWidth, height: screenHeight, justifyContent: 'center', alignItems: 'center'}}>
        <Svg height="100%" width="100%" viewBox="30 150 720 800">

          {Passengerparts.map((part) => (
            <TouchableWithoutFeedback key={part.id} onPress={() => handlePress(part.id)}>
              {part.d ? (
                <Path
                  d={part.d}
                  fill={colors[part.damageLvl]}
                  stroke="black"
                  strokeWidth="1"
                />
              ) : part.cx ? (
                <Circle
                  cx={part.cx}
                  cy={part.cy}
                  r={part.r}
                  fill={colors[part.damageLvl]}
                  stroke="black"
                  strokeWidth="1"
                />
              ) : part.label == 'Door 1' || part.label == 'Door 2'  ?(
                <Rect
                  x={part.x}
                  y={part.y}
                  width={part.width}
                  height={part.height}
                  rx={part.rx}
                  ry={part.ry}
                  fill={colors[part.damageLvl]}
                  stroke="black"
                  strokeWidth="4"
                />
              ) : (
                <Rect
                  x={part.x}
                  y={part.y}
                  width={part.width}
                  height={part.height}
                  rx={part.rx}
                  ry={part.ry}
                  fill={colors[part.damageLvl]}
                  stroke="black"
                  strokeWidth="1"
                />
              ) }
            </TouchableWithoutFeedback>
          ))}

          {/* Non-interactive elements */}
          
          
         
        <Path d="M 170 340
           V480" fill={"none"} stroke={"black"} />
        
        <Circle cx="180" cy="900" r="5" fill={'black'} />
        <Circle cx="180" cy="255" r="5" fill={'black'} />

        
 
        </Svg>

   
      </View>
      </ScrollView>

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
       

      <TouchableOpacity style={AllStyles.btnArrowR}    onPress={() => {
                                                              const updatedPassengerSide = handleDamageLog(); // Get updated driver side
                                                              navigation.navigate('BackSmall', {
                                                                inspection: {
                                                                  ...inspection,
                                                                  passengeSide: updatedPassengerSide, // Pass the updated driver side
                                                                },
                                                                updateInspections,
                                                              });
                                                            }}>
      <AntDesign name="arrowright" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};



export default PassengerSmall;