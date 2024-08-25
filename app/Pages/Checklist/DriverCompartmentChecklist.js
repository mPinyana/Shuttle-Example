import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { AllStyles } from '../../shared/AllStyles';


const labelMap = {
    warningLightsGauges: "Check all warning Lights and gauges",
    handbrake: "Check Handbrake functions correctly",
    steering: "Check Steering Wheel for Excessive Play ",
    driverSeat: "Check Driver's Seat & Seatbelt",
    adBlueLvl: "Check AdBlue Level",
  };
  
  const DriverCompartmentChecklist = ({ driverCompartment, setDriverCompartment }) => {
  
   

    const handleCheckboxChange = (key) => {
      setDriverCompartment((prevState) => ({
        ...prevState,
        [key]: !prevState[key],
      }));
    };
  
  
    return (
      <View style={AllStyles.container}>
        <ScrollView>
          <View style={AllStyles.checklist}>
            {Object.entries(driverCompartment).map(([key, value]) => (
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
        </ScrollView>
      </View>
    );
  };
  
  export default DriverCompartmentChecklist;