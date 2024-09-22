import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View,ScrollView, TouchableWithoutFeedback, TouchableOpacity,Animated, Text, Alert, Dimensions } from 'react-native';
import Svg, { Path, Rect, Circle, Polyline, Line, Text as SvgText, TSpan } from 'react-native-svg';
import { AllStyles, primaryColor } from '../../shared/AllStyles';
import { useRoute, useNavigation } from '@react-navigation/native';

import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

const DriverSide = ({ navigation, aspectRatio = 300 / 100 }) => {

    
  const route = useRoute();

  const translation = useRef(new Animated.Value(-100)).current;
  const [headerShown, setHeaderShown] = useState(false);


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
    { id:'1D1',
      label: 'Back driver perspective', 
      d: "M 655 70 Q 660 50, 415 55 V 80 H 655 Z", colorIndex: 0 },
    { id:'1D2',
      label: 'roof', x: 630, y: 80, width: 25, height: 925, colorIndex: 0 },
    { id:'1D3',
      label: 'window 7', x: 525, y: 85, width: 100, height: 70, rx: 10, ry: 10, colorIndex: 0 },
    { id:'1D4',
      label: 'window 6', x: 525, y: 165, width: 100, height: 110, rx: 10, ry: 10, colorIndex: 0 },
    { id:'1D5',
      label: 'window 5', x: 525, y: 285, width: 100, height: 110, rx: 10, ry: 10, colorIndex: 0 },
    { id:'1D6',
      label:'window 4', x: 525, y: 405, width: 100, height: 110, rx: 10, ry: 10, colorIndex: 0 },
    { id:'1D7',
      label: 'window 3', x: 525, y: 525, width: 100, height: 110, rx: 10, ry: 10, colorIndex: 0 },
    { id:'1D8',
      label: 'window 2', x: 525, y: 645, width: 100, height: 110, rx: 10, ry: 10, colorIndex: 0 },
    { id:'1D9',
      label: 'window 2', x: 525, y: 765, width: 100, height: 110, rx: 10, ry: 10, colorIndex: 0 },
    { id:'1D10',
      label:'driver Door', x: 425, y: 890, width: 170, height: 100, colorIndex: 0 },
    { id:'1D11',
      label:'windscreen driver view', d: "M 655 1000 H 415 V 1030 Q 656 1020, 655 1000 M 580 1000 Q 480 1000, 465 1028", colorIndex: 0 },
    { id:'1D12',
      label:'middle Sheet 7', d: "M 415 80 V 110 H 430 V 210 H 515 V 80 Z", colorIndex: 0 },
    { id:'1D13',
      label: 'middle Sheet 6', x:415, y:210, width:100, height:120, colorIndex: 0 },
    { id:'1D14',
      label: 'middle Sheet 5', x:415, y:330, width:100, height:120, colorIndex: 0 },
    { id:'1D15',
      label: 'middle Sheet 4', x:415, y:450, width:100, height:120, colorIndex: 0 },
    { id:'1D16',
      label: 'middle Sheet 3', x:415, y:570, width:100, height:120, colorIndex: 0 },
    { id:'1D17',
      label: 'middle Sheet 2', x:415, y:690, width:100, height:120, colorIndex: 0 },
    { id:'1D18',
      label: 'middle Sheet 1', x:415, y:810, width:100, height:70, colorIndex: 0 },
    { id:'1D19',
      label:'bottom Back', d: "M 415 55 Q 365 55, 345 70 V 80 H 415 Z", colorIndex: 0 },
    { id:'1D20',
      label: 'lower Sheet 9', d: "M 345 80 H 415  V 110 H 430 V 210 H 345 Z", colorIndex: 0 },
    { id:'1D21',
      label:'lower Sheet 8', x:345, y:210, width:70, height:60, colorIndex: 0 },
    { id:'1D22',
      label: 'back Wheel (diver side)', cx: 345, cy: 330, r: 50, colorIndex: 0 },
    { id:'1D23',
       label:'lower Sheet 7',x:345, y:390, width:70,height:40, colorIndex: 0 },
    { id:'1D24',
       label:'lower Sheet 6',x:345, y:430, width:70, height:100, colorIndex: 0 },
    { id:'1D25',
      label:'lower Sheet 5', x:345, y:530, width:70, height:40, colorIndex: 0 },
    { id:'1D26',
      label: 'lowerSheet 4', x:345, y:570, width:70, height:90, colorIndex: 0 },
    { id:'1D27',
      label: 'lower Sheet 3', x:345, y:660, width:70, height:90, colorIndex: 0 },
    { id:'1D28',
      label: 'front Wheel (driver side)', cx: 345, cy: 810, r: 50, colorIndex: 0 },
    { id:'1D29',
      label: 'lower Sheet 2', x: 345, y: 870, width: 70, height: 130, colorIndex: 0 },
    { id:'1D30',
      label:'lower Sheet 1', x: 345, y: 1000, width: 70, height: 30, colorIndex: 0 },
  ]);


  const screenWidth = dimensions.width;
  const screenHeight = dimensions.height;
  //const svgWidth = Math.min(screenWidth * 0.9, screenHeight * 0.9 * aspectRatio);
 //const svgHeight = svgWidth / aspectRatio;

 

  const handlePress = (id) => {
    setDriver(Driverparts.map(part => 
      part.id === id 
        ? { ...part, colorIndex: (part.colorIndex + 1) % colors.length }
        : part
    ));
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
      
      <TouchableOpacity
          onPress={()=>navigation.navigate('FrontView')}
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
        <Svg height="100%" width="100%" viewBox="200 100 600 600">

          {Driverparts.map((part) => (
            <TouchableWithoutFeedback key={part.id} onPress={() => handlePress(part.id)}>
              {part.d ? (
                <Path
                  d={part.d}
                  fill={colors[part.colorIndex]}
                  stroke="black"
                  strokeWidth="1"
                />
              ) : part.cx ? (
                <Circle
                  cx={part.cx}
                  cy={part.cy}
                  r={part.r}
                  fill={colors[part.colorIndex]}
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
                  fill={colors[part.colorIndex]}
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
                  fill={colors[part.colorIndex]}
                  stroke="black"
                  strokeWidth="1"
                />
              ) }
            </TouchableWithoutFeedback>
          ))}

          {/* Non-interactive elements */}
          <Path d="M 630 1000 Q 630 1035, 625 1030 Q 615 1040, 590 1030 H 625" fill="none" stroke="black" strokeWidth="1" />
          <Path d="M 415 810 V 1000" fill="none" stroke="black" strokeWidth="1" /> 

          <Polyline points="495,380 465,350 435,380" fill="none" stroke="#8c8f91" strokeWidth="4" />
          <SvgText font-family="Arial" fill="#8c8f91" transform="rotate(90 465,395)">
                <TSpan x="460" y="395" fontSize="25">UCT Shuttle</TSpan>
                <TSpan x="493" y="422" fontSize="18">Services</TSpan>
        </SvgText>
            <Polyline points="495,530 465,560 435,530"
                        fill="none" stroke="#8c8f91" strokeWidth="4" />
          
        <Line x1="425" y1="120" x2="355" y2="120" stroke="black" stroke-width="2" />
        <Line x1="425" y1="130" x2="355" y2="130" stroke="black" stroke-width="2" />
        <Line x1="425" y1="140" x2="355" y2="140" stroke="black" stroke-width="2" />
        <Line x1="425" y1="150" x2="355" y2="150" stroke="black" stroke-width="2" />
        <Line x1="425" y1="160" x2="355" y2="160" stroke="black" stroke-width="2" />
        <Line x1="425" y1="170" x2="355" y2="170" stroke="black" stroke-width="2" />
        <Line x1="425" y1="180" x2="355" y2="180" stroke="black" stroke-width="2" />
        <Line x1="425" y1="190" x2="355" y2="190" stroke="black" stroke-width="2" />
        <Line x1="425" y1="200" x2="355" y2="200" stroke="black" stroke-width="2" />
        <Path d="M 345 270 A 35,30 0 0,1 345,390" fill={"none"} stroke={"black"} />
        <Path d="M 345 750 A 35,30 0 0,1 345,870" fill={"none"} stroke='black'/>
        <Circle cx="345" cy="330" r="5" style="fill:black;stroke:black;stroke-width:1;" />
        <Circle cx="345" cy="810" r="5" style="fill:black;stroke:black;stroke-width:1;" />
        <Rect x="400" y="575" width="10" height="20" fill={"none"} stroke={"black"} strokeWidth={1.5}/>
        <Rect x="355" y="610" width="15" height="5" fill={"none"} stroke={"black"} strokeWidth={1.5} />
        <Rect x="355" y="700" width="15" height="5" fill={"none"} stroke={"black"} strokeWidth={1.5}/>
        </Svg>

   
      </View>
      </ScrollView>

      <TouchableOpacity style={AllStyles.btnCamera}>
        <SimpleLineIcons name="camera" size={30} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={AllStyles.btnArrowR} onPress={()=> navigation.navigate('FrontView')}>
      <AntDesign name="arrowright" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default DriverSide;