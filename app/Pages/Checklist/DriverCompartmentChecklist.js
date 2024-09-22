import React from 'react';
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

  const handleSelectAll = (isChecked) => {
    const updatedCompartment = Object.keys(driverCompartment).reduce((acc, key) => {
      acc[key] = isChecked;
      return acc;
    }, {});
    setDriverCompartment(updatedCompartment);
  };

  const isAllChecked = Object.values(driverCompartment).every(value => value === true);

  return (
    <View style={AllStyles.container}>
      <ScrollView>
        <View style={AllStyles.checklist}>
          <View style={[AllStyles.checkItem, { marginBottom: 10 }]}>
            <Text style={[AllStyles.label, { fontWeight: 'bold' }]}>Select All</Text>
            <BouncyCheckbox
              size={30}
              fillColor='green'
              unfillColor="#FFFFFF"
              isChecked={isAllChecked}
              onPress={(isChecked) => handleSelectAll(isChecked)}
              style={AllStyles.checkbox}
            />
          </View>
          {Object.entries(driverCompartment).map(([key, value]) => (
            <View key={key} style={AllStyles.checkItem}>
              <Text style={AllStyles.label}>{labelMap[key]}</Text>
              <BouncyCheckbox
                size={30}
                fillColor='green'
                unfillColor="#FFFFFF"
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