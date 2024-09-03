 import { AllStyles } from "../../shared/AllStyles";
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const labelMap = {
    interiorLights: "Check all interior lights",
    parkingLights: "Check all parking lights",
    headlights: "Check for Headlights, Dim & Bright",
    rearviewMirrorsSecure: "Check rearview mirrors-secure",
    indicatorLights: "Check all indicator lights left, right, front & rear",
    stopLights: "Check stop light",
    windscreenWipes: "Check windscreen wipes",
    reverseLight: "Check reverse lights",
  };

  const ElectricChecklist = ({ electric, setElectric }) => {
    
  
    // Update the `electric` state when a checkbox is toggled

    const handleCheckboxChange = (key) => {
      setElectric(prevState => {
        const newState = { ...prevState, [key]: !prevState[key] };
        return newState;
      });
    };
  
    // Map through the `electric` object and `labelMap`
  return (
    <View style={AllStyles.container}>
      <View style={AllStyles.checklist}>
        {Object.entries(electric).map(([key, value]) => (
          <View key={key} style={AllStyles.checkItem}>
            <Text style={AllStyles.label}>{labelMap[key]}</Text>
            <BouncyCheckbox
              size={30}
              fillColor="green"
              isChecked={value}
              onPress={() => handleCheckboxChange(key)}
              style={AllStyles.checkbox}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default ElectricChecklist; 