import React, { useState, useEffect } from 'react';
import { View, TouchableWithoutFeedback, TouchableOpacity, Text, Alert,Dimensions } from 'react-native';
import Svg, { Path, Rect,Line,Circle } from 'react-native-svg';
import { AllStyles } from '../../../../shared/AllStyles';
import { useRoute, useNavigation } from '@react-navigation/native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AntDesign from '@expo/vector-icons/AntDesign';



const Front_SmallSee=()=>{


const navigation= useNavigation();
const route =useRoute();
const { inspection } = route.params;

const colors = ['white','yellow', '#fa0707'];
const [dimensions, setDimensions] = useState(Dimensions.get('window'));





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

       
        {inspection.frontSide.parts.map((part) => (
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


      <TouchableOpacity style={AllStyles.btnArrowR}    onPress={() => {
                                                                navigation.navigate('Passenger_SmallSee', {
                                                                  inspection
                                                                });
                                                            }}>
      <AntDesign name="arrowright" size={30} color="white" />
      </TouchableOpacity>
</View>
);


};



export default Front_SmallSee;