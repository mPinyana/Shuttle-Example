import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, ScrollView, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { AllStyles, primaryColor } from '../../shared/AllStyles';
import InteriorChecklist from './InteriorChecklist';

export default function Interior_InspectionCh({ navigation }) {
  const route = useRoute();
  const { inspection, updateInspections } = route.params;

  const [interior, setInterior] = useState(inspection.busInterior);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    updateInspections({
      ...inspection,
      busInterior: interior
    });
  }, [interior]);

  const validateChecklist = () => {
    const allChecked = Object.values(interior).every(value => value === true);
    setIsValid(allChecked);
    return allChecked;
  };

  const handleNextPress = () => {
    if (validateChecklist()) {
      navigation.navigate("electric", {
        inspection: {
          ...inspection,
          busInterior: interior
        },
        updateInspections
      });
    } else {
      Alert.alert(
        "Incomplete Checklist",
        "Please ensure all interior items are checked before proceeding.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <View style={AllStyles.container}>
      <Text style={AllStyles.section}>Interior</Text>
      <ScrollView>
        <InteriorChecklist
          interior={interior}
          setInterior={setInterior}
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