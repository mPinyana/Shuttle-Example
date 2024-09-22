import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
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

  const handleSelectAll = (isChecked) => {
    const updatedBodyworks = Object.keys(bodyWorks).reduce((acc, key) => {
      acc[key] = isChecked;
      return acc;
    }, {});
    setBody(updatedBodyworks);
  };

  const isAllChecked = Object.values(bodyWorks).every(value => value === true);

 
  return (
    <ScrollView style={{flex:1}}>
    <View style={AllStyles.checklist}>

      <View style={[AllStyles.checkItem, { marginBottom: 10 }]}>
        <Text style={[AllStyles.label, { fontWeight: 'bold' }]}>Select All</Text>
        <BouncyCheckbox
          size={30}
          fillColor="green"
          unfillColor="#FFFFFF"
          isChecked={isAllChecked}
          onPress={(isChecked) => handleSelectAll(isChecked)}
          style={AllStyles.checkbox}
        />
      </View>


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
    </ScrollView>
  );
};

export default BodyWorksChecklist;


