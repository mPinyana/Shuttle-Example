import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { AllStyles } from '../../shared/AllStyles';




const labelMap = {
    cleanliness: "General Cleanliness",
    allSeats: "Check all seats & Seatbelts ",
    fireExtinguisher: "Check Fire Extinguisher (expiry date and seal):",
    triangle: "Check triangle",
    microphone: "Check microphone operational",
    vehicleSteps: "Check steps in Vehicle",
    wifi: "Check Wifi Working",
    airConditioner: "Check Air Conditioner Working",
    usbCovers: "Check USB COVERS",
  };
  
  const InteriorChecklist = ({ interior, setInterior }) => {
  
    // Update the `interior` state when a checkbox is toggled
    const handleCheckboxChange = (key) => {
      setInterior(prevState => {
        const newState = { ...prevState, [key]: !prevState[key] };
        return newState;
      });
    };
  
    return (
      <View style={AllStyles.container}>
        
        
          <View style={AllStyles.checklist}>
            {Object.entries(interior).map(([key, value]) => (
              <View key={key} style={AllStyles.checkItem}>
                <Text style={AllStyles.label}>{labelMap[key]}</Text>
                <BouncyCheckbox
                  size={30}
                  fillColor='green'
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
  
  export default InteriorChecklist;