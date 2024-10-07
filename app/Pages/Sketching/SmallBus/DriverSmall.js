import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View,ScrollView, TouchableWithoutFeedback, TouchableOpacity,Animated, Text, Alert, Dimensions } from 'react-native';
import Svg, { Path, Rect, Circle, Polyline, Line, Text as SvgText, TSpan } from 'react-native-svg';
import { AllStyles, primaryColor } from '../../../shared/AllStyles';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';


import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

const DriverSmall = () => {

    
  const navigation= useNavigation();
  const route =useRoute();
  const { inspection, updateInspections } = route.params;

  const [driver_Side, setDriverSide] = useState(inspection.driverSide);
  const [damageImgs, setDamageImgs] = useState({});
  const translation = useRef(new Animated.Value(-100)).current;
  const [headerShown, setHeaderShown] = useState(false);


  useEffect(() => {
    updateInspections({
      ...inspection,
      driverSide: driver_Side,
    });
  }, [driver_Side]);

  useEffect(() => {
    Animated.timing(translation, {
      toValue: headerShown ? 0 : -100,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [headerShown]);

  const colors = ['white', 'yellow', '#fa0707']; // Define the color sequence
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [Driverparts, setDriver] = useState([
     { id:'2D1',
      label: 'Bottom Back (Side View)', 
      d: "M270 100 Q195 95,195 95 Q 190 105,190 155 H 270 V 100", damageLvl: 0 },
    { id:'2D2',
      label: 'Upper Back (Side View)', 
      d: "M270 100 Q540 110,540 120  Q 555 125,550 155 H 270 Z M520 155 Q 405 110,390 155 M300 101 Q 325 115,325 130  H 333 V 103", damageLvl: 0 },
     { id:'2D3',
      label: 'Bus roof sideView', x: 520, y: 155, width: 30, height: 1000, damageLvl: 0 },
     { id:'2D4',
      label: 'window 6', x: 395, y: 160, width: 115, height: 150, rx: 5, ry: 5, damageLvl: 0 },
     { id:'2D5',
      label: 'window 5', x: 395, y: 320, width: 115, height: 150, rx: 5, ry: 5, damageLvl: 0 },
     { id:'2D6',
      label:'window 4', x: 395, y: 480, width: 115, height: 150, rx: 5, ry: 5, damageLvl: 0 },
     { id:'2D7',
      label: 'window 3', x: 395, y: 640, width: 115, height: 135, rx: 5, ry: 5, damageLvl: 0 },
   { id:'2D8',
      label: 'window 2', x: 395, y: 785, width: 115, height: 135, rx: 5, ry: 5, damageLvl: 0 },
    { id:'2D9',
      label: 'window 1', x: 395, y: 930, width: 115, height: 140, rx: 5, ry: 5, damageLvl: 0 },
    { id:'2D10',
      label:'Front window', 
      d: "M395 1078 H 515 Q 515 1150,510 1158 Q 490 1205,385 1230 Q 368 1180,383 1145 Q 400 1110 ,395 1078  ", damageLvl: 0 },
    { id:'2D11',
      label:'WindScreen(Side View)',
       d: "M520 1155 Q 480 1220,385 1235 L 405,1265 Q 530 1230,550 1155 Z M 540 1182 L 530,1175 L 410, 1245 L 420, 1260", damageLvl: 0 },
    { id:'2D12',
      label:'Bumper Side View', 
      d: "M385 1235 L405, 1265 Q 310 1300,200 1270  L 170,1235  Z  M385 1235 Q 300 1280,190 1260  M 315 1260  L 345 1280  Q 325 1284,315 1283  L 305, 1278 Q 315 1270,315 1260", damageLvl: 0 },
    { id:'2D13',
      label: 'Lower metal sheet 1', 
      d:'M 170,1235 V 1210 Q 250 1230,270 1140 V 1235 Z', damageLvl: 0 },
    { id:'2D14',
      label: 'Lower metal sheet 2',
       d:'M 270 1140 Q 260 1075,170 1075 V 1040 H 270 V 1140', damageLvl: 0 },
    { id:'2D15',
      label: 'Lower metal sheet 3', x:170, y:940, width:100, height:100, damageLvl: 0 },
    { id:'2D16',
      label: 'Lower metal sheet 4', x:170, y:840, width:100, height:100, damageLvl: 0 },
    { id:'2D17',
      label: 'Lower Metal Sheet 5', x:170, y:740, width:100, height:110, damageLvl: 0 },
      { id:'2D18',
        label: 'Lower Metal Sheet 5', x:170, y:630, width:100, height:110, damageLvl: 0 },
    { id:'2D19',
      label: 'Lower metal sheet 7', 
      d:'M 170 630 V 580 Q 260 600 ,270 500 V 630', damageLvl: 0 },
     { id:'2D20',
      label: 'Lower metal sheet 8', 
      d:'M 270 500 Q 270 410 ,170 420 L 175,370 H 270 Z', damageLvl: 0 },
    { id:'2D21',
    label: 'Lower metal sheet 9', 
    d:'M175 370 L 185,255 H 270 V 370 175', damageLvl: 0 },
    { id:'2D22',
    label: 'Lower metal sheet 10', 
    d:'M185 255 L 190,155 H 270 V 255 Z', damageLvl: 0 },
    { id:'2D23',
      label: 'Middle Sheet 9', 
      x:270, y:155, width:120, height:130, damageLvl: 0 },
    { id:'2D24',
      label:'Middle sheet 8',
       x:270, y:285, width:120, height:130, damageLvl: 0 },
    { id:'2D25',
      label: 'Middle sheet 7', x: 270, y: 415,width:120,height:130, damageLvl: 0 },
      { id:'2D26',
        label:'Middle Sheet 6',
        x:270, y:545, width:120,height:130, damageLvl: 0 },

    { id:'2D27',
       label:'Middle Sheet 5',
       x:270, y:285, width:120,height:130, damageLvl: 0 },
    { id:'2D28',
       label:'Middle Sheet 4',
       x:270, y:675, width:120, height:130, damageLvl: 0 },
    { id:'2D29',
      label:'Middle Sheet 3', 
      x:270, y:805, width:120, height:130, damageLvl: 0 },
    { id:'2D30',
      label: 'Middle Sheet 2', 
      x:270, y:935, width:120, height:140, damageLvl: 0 },
      { id:'2D31',
        label: 'Middle Sheet 1', 
        x:270, y:1075, width:100, height:160, damageLvl: 0 },
    { id:'2D32',
      label: 'front Wheel ', 
      cx: 180, cy: 1145, r: 60, damageLvl: 0 },
      { id:'2D33',
        label: 'Back Wheel ', 
        cx: 180, cy: 500, r: 70, damageLvl: 0 },
   
  ]);


  const screenWidth = dimensions.width;
  const screenHeight = dimensions.height;
  //const svgWidth = Math.min(screenWidth * 0.9, screenHeight * 0.9 * aspectRatio);
 //const svgHeight = svgWidth / aspectRatio;

 

 const takePhoto = async () => {
  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: false,
    quality: 1,
  });

  if (!result.canceled) {
    // Create a unique key for the new image (e.g., using the current timestamp or an incrementing number)
    const newImageKey = `Driver image${Object.keys(damageImgs).length + 1}`;

    // Update the damageImgs object with the new image URI
    setDamageImgs((prevState) => ({
      ...prevState,
      [newImageKey]: result.assets[0].uri, // Add the new image URI with the generated key
    }));
  }
};


  const handlePress = (id) => {
    setDriver(Driverparts.map(part => 
      part.id === id 
        ? { ...part, damageLvl: (part.damageLvl + 1) % colors.length }
        : part
    ));
  };

  const handleDamageLog = () => {
    // Update the driver side parts state
    const updatedDriverSide = { ...driver_Side, parts: Driverparts , damagePics:damageImgs};
    setDriverSide(updatedDriverSide);
    return updatedDriverSide; // Return the updated state for use
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
          Driver's Side 
        </Text>
      </Animated.View>
      
    {/*   previous page navigation */}
      <TouchableOpacity
          onPress={()=>navigation.navigate('engineAir', {
            inspection: {
              ...inspection,
              driverSide: driver_Side,
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
          marginTop:'4%'
        }} 
        />
        </TouchableOpacity>


      <View style={{ width: screenWidth, height: screenHeight, justifyContent: 'center', alignItems: 'center'}}>
        <Svg height="100%" width="100%" viewBox="30 60 700 1100">

          {Driverparts.map((part) => (
            <TouchableWithoutFeedback key={part.id} onPress={() =>handlePress(part.id)}>
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
              ) : part.label == 'driver Door' ?(
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

    
    
        {/* Back & front Axle (Non Interactive)  */}
        <Circle cx="180" cy="500" r="5"  />
        <Circle cx="180" cy="1145" r="5"  />
    
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
                                                              const updatedDriverSide = handleDamageLog(); // Get updated driver side
                                                              navigation.navigate('FrontSmall', {
                                                                inspection: {
                                                                  ...inspection,
                                                                  driverSide: updatedDriverSide, // Pass the updated driver side
                                                                },
                                                                updateInspections,
                                                              });
                                                            }}>
      <AntDesign name="arrowright" size={30} color="white" />
      </TouchableOpacity>


    </View>
  );
};




export default DriverSmall;