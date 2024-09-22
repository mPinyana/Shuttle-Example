import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, ScrollView, Alert } from 'react-native';
import { AllStyles, primaryColor } from '../../shared/AllStyles';
import { useRoute } from '@react-navigation/native';
import WheelsChecklist from './WheelsChecklist';

export default function Wheels_InspectionCh({ navigation }) {
  const route = useRoute();
  const { inspection, updateInspections } = route.params;

  const [wheels, setWheels] = useState(inspection.busWheels);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    updateInspections({
      ...inspection,
      busWheels: wheels,
    });
  }, [wheels]);

  const validateChecklist = () => {
    const allChecked = Object.values(wheels).every(value => value === true);
    setIsValid(allChecked);
    return allChecked;
  };

  const handleNextPress = () => {
    if (validateChecklist()) {
      navigation.navigate("bodyWorks", {
        inspection: {
          ...inspection,
          busWheels: wheels
        },
        updateInspections
      });
    } else {
      Alert.alert(
        "Incomplete Checklist",
        "Please ensure all inspection items are checked before proceeding.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <View style={AllStyles.container}>
      <Text style={AllStyles.section}>Wheels</Text>
      <ScrollView>
        <WheelsChecklist
          wheels={wheels}
          setWheels={setWheels}
          setIsValid={setIsValid}
        />
      </ScrollView>
      <View style={AllStyles.btnContainer}>
        <TouchableOpacity 
          style={AllStyles.btn}
          onPress={handleNextPress}
        >
          <Text style={AllStyles.textBtn}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}