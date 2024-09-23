import React, { useEffect } from 'react';
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

const InteriorChecklist = ({ interior, setInterior, setIsValid }) => {
  const handleCheckboxChange = (key) => {
    setInterior(prevState => ({
      ...prevState,
      [key]: !prevState[key]
    }));
  };

  const handleSelectAll = (isChecked) => {
    const updatedInterior = Object.keys(interior).reduce((acc, key) => {
      acc[key] = isChecked;
      return acc;
    }, {});
    setInterior(updatedInterior);
  };

  const isAllChecked = Object.values(interior).every(value => value === true);

  useEffect(() => {
    const allChecked = Object.values(interior).every(value => value === true);
    setIsValid(allChecked);
  }, [interior, setIsValid]);

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
      </ScrollView>
    </View>
  );
};

export default InteriorChecklist;