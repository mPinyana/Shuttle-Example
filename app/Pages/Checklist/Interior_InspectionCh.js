import { View,TouchableOpacity,Text, ScrollView } from "react-native";
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { AllStyles, primaryColor } from '../../shared/AllStyles';
import InteriorChecklist from './InteriorChecklist'

 export default function Interior_InspectionCh({navigation}){

        const route = useRoute();
        const { inspection, updateInspections } = route.params;
      
        const [interior, setInterior] = useState(inspection.busInterior);
      
        useEffect(() => {
          // Update the inspection state in the parent component
          updateInspections({
            ...inspection,
            busInterior: interior
          });
        }, [interior]);    

    return(
        <View style={AllStyles.container}>
           
        <Text style={AllStyles.section}>Interior </Text>
            <ScrollView>
                <InteriorChecklist
                    interior={interior}
                    setInterior={setInterior}
                />
           </ScrollView>
            <View style = {AllStyles.btnContainer}>
            <TouchableOpacity style ={AllStyles.btn}
                    onPress={()=> navigation.navigate("electric",{
                        inspection: {
                          ...inspection,
                          busInterior: interior
                        },
                        updateInspections
                      })}  >
                <Text style ={AllStyles.textBtn} >Next</Text>
            </TouchableOpacity>
            </View>
    
</View>
    );
}
