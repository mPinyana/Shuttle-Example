import React, { useState } from 'react';
import { View, Text } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { useRoute, useNavigation } from '@react-navigation/native';
import { AllStyles } from '../../shared/AllStyles';


const labelMap = {
    licenceDisc: "Licence Disc",
    operatorsDisc: "Operator's Disc",
    permit: "Permit (Document is safe)",
    fuelCard: "Fuel Card",
  };
  
  const DocumentationChecklist = ({ /*inspection, setInspection,*/ documents, setDocuments }) => {
   // const [documents, setDocuments] = useState(inspection.documentation);
  
    // Update the `documents` state when a checkbox is toggled
/*     const handleCheckboxChange = (key) => {
      setDocuments((prevState) => {
        const newState = { ...prevState, [key]: !prevState[key] };
        const updatedInspection = { ...inspection, documentation: newState };
        // Update the inspection object in the parent component
        setInspection(updatedInspection);
        return newState;
      });
    }; */


    const handleCheckboxChange = (key) => {
      setDocuments((prevState) => ({
        ...prevState,
        [key]: !prevState[key],
      }));
    };

    
  
    // Map through the `documentation` object and `labelMap`
    return (
      <View style={AllStyles.checklist}>
        {Object.entries(documents).map(([key, value]) => (
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
  
  export default DocumentationChecklist;