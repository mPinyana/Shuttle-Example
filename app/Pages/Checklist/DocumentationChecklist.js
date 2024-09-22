import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { AllStyles } from '../../shared/AllStyles';

const labelMap = {
  licenceDisc: "Licence Disc",
  operatorsDisc: "Operator's Disc",
  permit: "Permit (Document is safe)",
  fuelCard: "Fuel Card",
};

const DocumentationChecklist = ({ documents, setDocuments, setIsValid }) => {
  const handleCheckboxChange = (key) => {
    setDocuments((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const handleSelectAll = (isChecked) => {
    const updatedDocuments = Object.keys(documents).reduce((acc, key) => {
      acc[key] = isChecked;
      return acc;
    }, {});
    setDocuments(updatedDocuments);
  };

  const isAllChecked = Object.values(documents).every(value => value === true);

  useEffect(() => {
    setIsValid(isAllChecked);
  }, [documents, setIsValid]);

  return (
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
      {Object.entries(documents).map(([key, value]) => (
        <View key={key} style={AllStyles.checkItem}>
          <Text style={AllStyles.label}>{labelMap[key]}</Text>
          <BouncyCheckbox
            size={30}
            fillColor="green"
            unfillColor="#FFFFFF"
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