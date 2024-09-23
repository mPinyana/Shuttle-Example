import { View, TouchableOpacity, Text, ScrollView, Alert } from "react-native";
import { AllStyles, primaryColor } from '../../shared/AllStyles';
import React, { useState, useCallback } from 'react';
import { useRoute } from '@react-navigation/native';
import BodyWorksChecklist from "./BodyworksChecklist";

export default function BodyWorks_InspectionCh({ navigation }) {
    const route = useRoute();
    const { inspection, updateInspections } = route.params;
  
    const [bodyworks, setBody] = useState(inspection.body || {});

    const validateBodyworks = useCallback(() => {
        return Object.values(bodyworks).every(value => value === true);
    }, [bodyworks]);

    const handleNextPress = useCallback(() => {
        try {
            if (validateBodyworks()) {
                const updatedInspection = {
                    ...inspection,
                    body: bodyworks,
                };
                updateInspections(updatedInspection);
                
                // Ensure engine_Air exists in the inspection object
                if (!updatedInspection.engine_Air) {
                    updatedInspection.engine_Air = {};
                }

                navigation.navigate("engineAir", {
                    inspection: updatedInspection,
                    updateInspections
                });
            } else {
                Alert.alert(
                    "Incomplete Checklist",
                    "Please ensure all inspection items are checked before proceeding.",
                    [{ text: "OK" }]
                );
            }
        } catch (error) {
            console.error("Error in handleNextPress:", error);
            Alert.alert(
                "Error",
                "An unexpected error occurred. Please try again.",
                [{ text: "OK" }]
            );
        }
    }, [bodyworks, inspection, updateInspections, navigation, validateBodyworks]);

    return (
        <View style={AllStyles.container}>
            <Text style={AllStyles.section}>Bodyworks</Text>
            <ScrollView>
                <BodyWorksChecklist
                    bodyWorks={bodyworks}
                    setBody={setBody}
                />
            </ScrollView>
            
            <View style={AllStyles.btnContainer}>
                <TouchableOpacity style={AllStyles.btn} onPress={handleNextPress}>
                    <Text style={AllStyles.textBtn}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}