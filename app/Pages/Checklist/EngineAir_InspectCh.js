import { View, TouchableOpacity, Text, ScrollView, Alert } from "react-native";
import { AllStyles, primaryColor } from '../../shared/AllStyles';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import EngineAirChecklist from "./EngineAirChecklist";
import { Firebase_DB } from "../../../FirebaseConfig";
import { doc, updateDoc } from 'firebase/firestore';

export default function EngineAir_InspectCh({ navigation }) {
    const route = useRoute();
    const { inspection, updateInspections } = route.params;

    const [engineAir, setEngineAir] = useState(inspection.engine_Air);

    useEffect(() => {
        // Update the inspection state in the parent component
        updateInspections({
            ...inspection,
            engine_Air: engineAir
        });
    }, [engineAir]);

    const handleNext = () => {
        const allChecked = Object.values(engineAir).every(value => value === true);
        if (allChecked) {
            navigation.navigate("DriverSide", {
                inspection: {
                    ...inspection,
                    engine_Air: engineAir
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
            <Text style={AllStyles.section}>Engine Fluid & Air System</Text>
            <ScrollView>
                <EngineAirChecklist
                    engineAir={engineAir}
                    setEngineAir={setEngineAir}
                />
            </ScrollView>

            <View style={AllStyles.btnContainer}>
                <TouchableOpacity style={AllStyles.btn} onPress={handleNext}>
                    <Text style={AllStyles.textBtn}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}