import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, ScrollView, Alert } from 'react-native';
import { AllStyles, primaryColor } from '../../shared/AllStyles';
import { useRoute, useNavigation } from '@react-navigation/native';
import DocumentationChecklist from "./DocumentationChecklist";

export default function Documentation_inspectionCh() {
  const route = useRoute();
  const navigation = useNavigation();
  
  const { inspection, setInspection } = route.params;

  const [documents, setDocuments] = useState(inspection.documentation);
  const [mileage, setMileage] = useState(inspection.mileage || '');
  const [isValid, setIsValid] = useState(false);

  const updateInspections = (updatedInspection) => {
    setInspection(prevInspections =>
      prevInspections.map(item =>
        item.id === updatedInspection.id ? updatedInspection : item
      )
    );
  };

  useEffect(() => {
    updateInspections({
      ...inspection,
      documentation: documents,
      mileage: mileage
    });
  }, [documents, mileage]);

  const validateChecklist = () => {
    const allChecked = Object.values(documents).every(value => value === true);
    const mileageEntered = mileage.trim() !== '';
    return allChecked && mileageEntered;
  };

  const handleNextPress = () => {
    if (validateChecklist()) {
      navigation.navigate("DiversCompartment", {
        inspection: {
          ...inspection,
          documentation: documents,
          mileage: mileage
        },
        updateInspections
      });
    } else {
      Alert.alert(
        "Incomplete Checklist",
        "Please ensure all inspection items are checked and mileage is entered before proceeding.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <View style={AllStyles.container}>
      <Text style={AllStyles.section}>Documentation</Text>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <DocumentationChecklist
          documents={documents}
          setDocuments={setDocuments}
          mileage={mileage}
          setMileage={setMileage}
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