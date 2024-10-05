import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, ScrollView, Alert } from 'react-native';
import { AllStyles } from '../../shared/AllStyles';
import { useRoute } from '@react-navigation/native';
import ElectricChecklist from './ElectricChecklist';

export default function Electric_InspectionCh({ navigation }) {
  const route = useRoute();
  const { inspection, updateInspections } = route.params;

  const [electric, setElectric] = useState(inspection.busElectric);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    updateInspections({
      ...inspection,
      busElectric: electric
    });
  }, [electric]);

  const validateChecklist = () => {
    const allChecked = Object.values(electric).every(value => value === true);
    setIsValid(allChecked);
    return allChecked;
  };

  const handleNextPress = () => {
    if (validateChecklist()) {
      navigation.navigate("wheels", {
        inspection: {
          ...inspection,
          busElectric: electric
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
      <Text style={AllStyles.section}>Electric</Text>
      <ScrollView contentContainerStyle={{flexGrow:1}}>
        <ElectricChecklist
          electric={electric}
          setElectric={setElectric}
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