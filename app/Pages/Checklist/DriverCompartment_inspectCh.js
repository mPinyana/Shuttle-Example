import { View, TouchableOpacity, Text, ScrollView, Alert } from "react-native";
import React, { useState, useEffect } from 'react';
import { AllStyles, primaryColor } from '../../shared/AllStyles';
import { useRoute } from '@react-navigation/native';
import DriverCompartmentChecklist from './DriverCompartmentChecklist'

export default function DriverCompartment_inspectCh({navigation}){
    const route = useRoute();
    const { inspection, updateInspections } = route.params;
    const [driverCompartment, setDriverCompartment] = useState(inspection.drvCompartment);

    useEffect(() => {
        updateInspections({
          ...inspection,
          drvCompartment: driverCompartment
        });
    }, [driverCompartment]);

    const handleNextPress = () => {
        const allChecked = Object.values(driverCompartment).every(value => value === true);
        
        if (allChecked) {
            navigation.navigate("Interior", {
                inspection: {
                    ...inspection,
                    drvCompartment: driverCompartment
                },
                updateInspections
            });
        } else {
            Alert.alert(
                "Incomplete Checklist",
                "Please check all items before proceeding.",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }]
            );
        }
    };

    return(
        <View style={AllStyles.container}>
            <Text style={AllStyles.section}>Driver's component</Text>
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <DriverCompartmentChecklist
                    driverCompartment={driverCompartment}
                    setDriverCompartment={setDriverCompartment}
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