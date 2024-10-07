import React, { useEffect, useState} from 'react';
import { ScrollView,View, Text, TextInput } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { AllStyles } from '../../shared/AllStyles';

const labelMap = {
  licenceDisc: "Licence Disc",
  operatorsDisc: "Operator's Disc",
  permit: "Permit (Document is safe)",
  fuelCard: "Fuel Card",
};

const DocumentationChecklist = ({ documents, setDocuments, mileage, setMileage, setIsValid }) => {
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
    const allChecked = isAllChecked && mileage.trim() !== '';
    setIsValid(allChecked);
  }, [documents, mileage, setIsValid]);

  return (
    <View style={AllStyles.container}>
      <ScrollView>
      <View style={AllStyles.checklist}>
          <View style={[AllStyles.checkItem, { marginBottom: 20 }]}>
            <Text style={[AllStyles.label, { fontWeight: 'bold' }]}>Enter Mileage:</Text>
            <TextInput
              style={[AllStyles.input, { width: '50%', height: 40, borderColor: 'gray', borderWidth: 1, padding: 5, flexDirection:'row'}]}
              onChangeText={setMileage}
              value={mileage}
              keyboardType="numeric"
              placeholder=""
            />
          </View>
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
      </ScrollView>
    </View>
  );
};

export default DocumentationChecklist;