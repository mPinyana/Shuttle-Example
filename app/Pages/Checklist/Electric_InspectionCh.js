import { View,TouchableOpacity,Text, ScrollView } from "react-native";
import { AllStyles } from '../../shared/AllStyles';
import { useRoute } from '@react-navigation/native';

import ElectricChecklist from './ElectricChecklist';
import React, { useState, useEffect } from 'react';

export default function Electric_InspectionCh({navigation }){

    const route = useRoute();
    const { inspection, updateInspections } = route.params;

    const [electric, setElectric] = useState(inspection.busElectric);

    useEffect(() => {
        // Update the inspection state in the parent component
        updateInspections({
          ...inspection,
          busElectric: electric
        });
      }, [electric]);

    return(
        <View style={AllStyles.container}>
           
                    <Text style={AllStyles.section}>Electric </Text>

                        <ScrollView style={{flexGrow:1}}>
                            <ElectricChecklist
                             electric={electric}
                             setElectric={setElectric}       
                            />
                        </ScrollView>
                        <View style={AllStyles.btnContainer}>
                                <TouchableOpacity style ={AllStyles.btn}
                                        onPress={()=> navigation.navigate("wheels", {
                                            inspection: {
                                                ...inspection,
                                                busElectric: electric
                                              },
                                              updateInspections
                                          })}>
                                    <Text style ={AllStyles.textBtn} >Next</Text>
                                </TouchableOpacity>

                        </View>

                
       </View>
    );
}