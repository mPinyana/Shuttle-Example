import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, TouchableWithoutFeedback, TouchableOpacity, Text, Alert,Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { AllStyles } from '../../../../shared/AllStyles';
import { useRoute } from '@react-navigation/native';



const Back_SmallSee = ({navigation,}) => {


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
  const svgWidth =screenWidth*0.9;
  const svgHeight =screenHeight*0.9 ;




  return (
    <View style={AllStyles.container}>
     


      <View style={{ width: svgWidth, height: svgHeight,justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>
      <Svg height="100%" width="100%" viewBox="0 0 390 700">
        {inspection.backSide.parts.map((part) => (
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



      <View style={AllStyles.btnContainer}>
        <TouchableOpacity style={AllStyles.btn}
          onPress={() => navigation.navigate('home')}>
          <Text style={AllStyles.textBtn} >Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};



export default Back_SmallSee;