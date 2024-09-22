import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, ScrollView, Alert } from 'react-native';
import { AllStyles, primaryColor } from '../../shared/AllStyles';
import { useRoute } from '@react-navigation/native';
import EngineAirChecklist from "./EngineAirChecklist";
import { Firebase_DB } from "../../../FirebaseConfig";
import { doc, updateDoc } from 'firebase/firestore';

export default function EngineAir_InspectCh({ navigation }) {
  const route = useRoute();
  const { inspection, updateInspections } = route.params;

  const [engineAir, setEngineAir] = useState(inspection.engine_Air);
  const [isValid, setIsValid] = useState(false); // Track validation state

  useEffect(() => {
    // Update the inspection state in the parent component
    updateInspections({
      ...inspection,
      engine_Air: engineAir
    });
  }, [engineAir, isValid]); // Update inspection only when isValid changes

  return (
    <View style={AllStyles.container}>
      <Text style={AllStyles.section}>Engine Fluid & Air System </Text>
      <ScrollView>
        <EngineAirChecklist
          engineAir={engineAir}
          setEngineAir={setEngineAir}
          setIsValid={setIsValid} // Pass validation state to checklist
        />
      </ScrollView>

      <View style={AllStyles.btnContainer}>
        <TouchableOpacity
          style={AllStyles.btn}
          onPress={() => {
            if (isValid) {
              // Update the inspection state only if all checkboxes are checked
              updateInspections({
                ...inspection,
                engine_Air: engineAir
              });

              // Navigate to the next page
              navigation.navigate("InteractiveTest", {
                inspection: {
                  ...inspection,
                  engine_Air: engineAir
                },
                updateInspections
              });
            } else {
              Alert.alert(
                "Incomplete Checklist",
                "Please ensure all items are checked before proceeding.",
                [
                  { text: "OK", onPress: () => {} }
                ]
              );
            }
          }}
        >
          <Text style={AllStyles.textBtn}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}