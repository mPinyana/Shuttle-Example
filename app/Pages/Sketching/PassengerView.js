import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View,ScrollView, TouchableWithoutFeedback, TouchableOpacity,Animated, Text, Alert, Dimensions } from 'react-native';
import Svg, { Path, Rect, Circle, Polyline, Line, Text as SvgText, TSpan } from 'react-native-svg';
import { AllStyles, primaryColor } from '../../shared/AllStyles';
import { useRoute, useNavigation } from '@react-navigation/native';

import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

const PassengerView = ({ navigation, aspectRatio = 300 / 100 }) => {

    
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


  const [Passengerparts, setPassenger] = useState([
    { id:'1P1',
    label: 'Back of bus (Passenger view)', d: "M 390 120 Q 395 100,150 105 V 130 H 390 Z", colorIndex: 0 },
    { id:'1P2',
    label: 'roof (passenger View)', x: 365, y: 130, width: 25, height: 920, colorIndex: 0 },
    { id: '1P3',
    label:'window 7', x: 260, y: 135, width: 100, height: 70, rx: 10, ry: 10, colorIndex: 0 },
    { id:'1P4',
    label: 'window 6', x: 260, y: 215, width: 100, height: 110, rx: 10, ry: 10, colorIndex: 0 },
    { id:'1P5',
    label: 'window 5', x: 260, y: 335, width: 100, height: 110, rx: 10, ry: 10, colorIndex: 0 },
    { id:'1P6',
    label: 'window 4', x: 260, y: 455, width: 100, height: 110, rx: 10, ry: 10, colorIndex: 0 },
    { id:'1P7',
    label: 'window 3', x: 260, y: 575, width: 100, height: 110, rx: 10, ry: 10, colorIndex: 0 },
    { id:'1P8',
    label: 'window 2', x: 260, y: 695, width: 100, height: 110, rx: 10, ry: 10, colorIndex: 0 },
    { id:'1P9',
    label: 'window 1', x: 260, y: 815, width: 100, height: 110, rx: 10, ry: 10, colorIndex: 0 },
    { id:'1P10',
    label: 'Passenger door left', x: 90, y: 938, width: 260, height: 45, colorIndex: 0 },
    { id:'1P11',
        label: 'Passenger door right', x:90, y:997, width:260, height: 45, colorIndex: 0 },
    { id:'1P12',
    label: 'Windscreen (Passenger view)', d: "M 390 1050 H 150 V 1080 Q 391 1070,390 1050 M 315 1050 Q 215 1050, 200 1078", colorIndex: 0 },
    { id:'1P13',
    label:'middle Sheet 7', d: "M 150 130 V 160 H 165 V 260 H 250 V 130 Z", colorIndex: 0 },
    { id:'1P14',
     label:'middle Sheet 6', x:150, y:260, width:100, height:120, colorIndex: 0 },
    { id:'1P15',
    label: 'middle Sheet 5', x:150, y:380, width:100, height:120, colorIndex: 0 },
    { id:'1P16',
    label: 'middle Sheet 4', x:150, y:500, width:100, height:120, colorIndex: 0 },
    { id:'1P17',
    label: 'middle Sheet 3', x:150, y:620, width:100, height:120, colorIndex: 0 },
    { id:'1P18',
    label:'middle Sheet 2', x:150, y:740, width:100, height:120, colorIndex: 0 },
    { id:'1P19',
    label: 'middle Sheet 1', x:150, y:860, width:100, height:70, colorIndex: 0 },
    { id:'1P20',
    label: 'bottom Back (Passenger)', d: "M 150 105 Q 100 105,80 120 V 130 H 150 Z", colorIndex: 0 },
    { id:'1P21',
     label:'lowerS heet 1', d: "M 80 130 H 150 V 160 H 165 V 260 H 80 Z", colorIndex: 0 },
    { id:'1P22', 
    label:'lower Sheet 2', x:80, y:260, width:70, height:60, colorIndex: 0 },
    { id:'1P23',
    label: 'back Wheel (Passenger side)', cx: 80, cy: 380, r: 50, colorIndex: 0 },
    { id:'1P24',
    label: 'lower Sheet 3',x:80, y:440, width:70,height:40, colorIndex: 0 },
    { id:'1P25',
    label: 'lower Sheet 4',x:80, y:480, width:70, height:100, colorIndex: 0 },
    { id:'1P26',
    label: 'lower Sheet 5', x:80, y:580, width:70, height:40, colorIndex: 0 },
    { id:'1P27',
    label: 'lower Sheet 6', x:80, y:620, width:70, height:90, colorIndex: 0 },
    { id:'1P28',
    label: 'lower Sheet 7', x:80, y:710, width:70, height:90, colorIndex: 0 },
    { id:'1P29',
    label: 'front Wheel (passenger side)', cx: 80, cy: 860, r: 50, colorIndex: 0 },
    { id:'1P30',
    label: 'lower Sheet 8', x: 80, y: 1050, width: 70, height: 30, colorIndex: 0 },
  ]);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  const screenWidth = dimensions.width;
  const screenHeight = dimensions.height;


 

  const handlePress = (id) => {
    setPassenger(Passengerparts.map(part => 
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
          onPress={()=> navigation.navigate('DriverSide')}
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
        <Svg height="100%" width="100%" viewBox="-50 120 600 600">

          {Passengerparts.map((part) => (
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
              ) : part.label == 'Passenger door left' || part.label == 'Passenger door right'  ?(
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
          <Path d="M 365 1050 Q 365 1085, 360 1080 Q 350 1090 , 325 1080 H 360" fill="none" stroke="black" strokeWidth="1" />
         
          <Rect x="220" y="870" width="20" height="50" fill={"none"} stroke={"black"} strokeWidth={2}/>

          <Polyline points="160,450 200,400 245,450" fill="none" stroke="#8c8f91" strokeWidth="4" />
          <SvgText font-family="Arial" fill="#8c8f91" transform="rotate(90 260,510)">
                <TSpan x="240" y="575" fontSize="25">UCT Shuttle</TSpan>
                <TSpan x="260" y="600" fontSize="18">Services</TSpan>
        </SvgText>
            <Polyline points="160,650 200,700 245,650"
                        fill="none" stroke="#8c8f91" strokeWidth="4" />
          
          <Line x1="160" y1="170" x2="90" y2="170" stroke="black" stroke-width="2" />
            <Line x1="160" y1="180" x2="90" y2="180" stroke="black" stroke-width="2" />
            <Line x1="160" y1="190" x2="90" y2="190" stroke="black" stroke-width="2" />
            <Line x1="160" y1="200" x2="90" y2="200" stroke="black" stroke-width="2" />
            <Line x1="160" y1="210" x2="90" y2="210" stroke="black" stroke-width="2" />
            <Line x1="160" y1="220" x2="90" y2="220" stroke="black" stroke-width="2" />
            <Line x1="160" y1="230" x2="90" y2="230" stroke="black" stroke-width="2" />
            <Line x1="160" y1="240" x2="90" y2="240" stroke="black" stroke-width="2" />
            <Line x1="160" y1="250" x2="90" y2="250" stroke="black" stroke-width="2" />
        <Path d="M 80 320 A 35,30 0 0,1 80,440" fill={"none"} stroke={"black"} />
        <Path d="M 80 800 A 35,30 0 0,1 80,920" fill={"none"} stroke='black'/>
        <Circle cx="80" cy="380" r="5" style="fill:black;stroke:black;stroke-width:1;" />
        <Circle cx="80" cy="860" r="5" style="fill:black;stroke:black;stroke-width:1;" />

        
        <Rect x="135" y="625" width="10" height="20" fill={"none"} stroke={"black"} strokeWidth={1.5}/>
        <Rect x="90" y="660" width="15" height="5" fill={"none"} stroke={"black"} strokeWidth={1.5} />
        <Rect x="90" y="750" width="15" height="5" fill={"none"} stroke={"black"} strokeWidth={1.5}/>

        <Line x1="80" y1="1050" x2="80" y2="920" stroke="black" stroke-width="1" />

        <Path d="M 80 930 H 150" fill="none" stroke="black" strokeWidth="1" /> 
        </Svg>

   
      </View>
      </ScrollView>

      <TouchableOpacity style={AllStyles.btnCamera}>
        <SimpleLineIcons name="camera" size={30} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={AllStyles.btnArrowR} onPress={()=> navigation.navigate('BackView')}>
      <AntDesign name="arrowright" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default PassengerView;