import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { AllStyles } from "../../shared/AllStyles";
import { ScrollView } from 'react-native-gesture-handler';

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

const ElectricChecklist = ({ electric, setElectric, setIsValid }) => {
  const handleCheckboxChange = (key) => {
    setElectric(prevState => ({
      ...prevState,
      [key]: !prevState[key]
    }));
  };

  const handleSelectAll = (isChecked) => {
    const updatedElectric = Object.keys(electric).reduce((acc, key) => {
      acc[key] = isChecked;
      return acc;
    }, {});
    setElectric(updatedElectric);
  };

  const isAllChecked = Object.values(electric).every(value => value === true);

  useEffect(() => {
    const allChecked = Object.values(electric).every(value => value === true);
    setIsValid(allChecked);
  }, [electric, setIsValid]);

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
      </ScrollView>
    </View>
    
  );
  
};

export default ElectricChecklist;