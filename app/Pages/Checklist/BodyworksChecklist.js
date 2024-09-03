import React, { useState } from 'react';
import { View, Text } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { useRoute, useNavigation } from '@react-navigation/native';
import { AllStyles } from '../../shared/AllStyles';



const BodyWorksChecklist = ({ bodyWorks, setBody }) => {
  const labelMap = {
    extCleanliness: "Check all exterior cleanliness",
    windowWindscreen: "Check window and windscreen cracks",
    bodydamageSheetmarks: "Check for body damage and mark on sheet",
    rearviewMirrors: "Check rearview mirrors-secure",
    reflection: "Check all reflectors and reflective tape",
    wipperBlades: "Check conditions of wipper blades",
    passengerDoors: "Check all passenger doors functional",
    branding: "Check mudflaps",
  };

  const handleCheckboxChange = (key) => {
    setBody((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <View style={AllStyles.checklist}>
      {Object.entries(bodyWorks).map(([key, value]) => (
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
  );
};

export default BodyWorksChecklist;

