import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View,ScrollView, TouchableWithoutFeedback, TouchableOpacity,Animated, Text, Alert, Dimensions } from 'react-native';
import Svg, { Path, Rect, Circle, Polyline, Line, Text as SvgText, TSpan } from 'react-native-svg';
import { AllStyles,primaryColor } from '../../../../shared/AllStyles';
import { useRoute, useNavigation } from '@react-navigation/native';

import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

const Driver_SmallSee = () => {

    
  const navigation= useNavigation();
  const route =useRoute();
  const { inspection } = route.params;
  const { vehicle} = route.params;

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


  const screenWidth = dimensions.width;
  const screenHeight = dimensions.height;
  //const svgWidth = Math.min(screenWidth * 0.9, screenHeight * 0.9 * aspectRatio);
 //const svgHeight = svgWidth / aspectRatio;

 


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
          Driver View
        </Text>
      </Animated.View>
      
    {/*   previous page navigation */}
      <TouchableOpacity
          onPress={()=>navigation.navigate('details', {vehicle})}
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

          {inspection.driverSide.parts.map((part) => (
            <TouchableWithoutFeedback key={part.id} >
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
 

      <TouchableOpacity style={AllStyles.btnArrowR}    onPress={() => { 
                                                              navigation.navigate('Front_SmallSee', {
                                                                inspection
                                                              });
                                                            }}>
      <AntDesign name="arrowright" size={30} color="white" />
      </TouchableOpacity>


    </View>
  );
};




export default Driver_SmallSee;