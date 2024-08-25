import { View,TouchableOpacity,Text, ScrollView } from "react-native";
import { AllStyles, primaryColor } from '../../shared/AllStyles';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import WheelsChecklist from './WheelsChecklist';

 export default function Wheels_InspectionCh({navigation}){
    const route = useRoute();
    const { inspection, updateInspections } = route.params;
  
    const [wheels, setWheels] = useState(inspection.busWheels);

    useEffect(() => {
        // Update the inspection state in the parent component
        updateInspections({
          ...inspection,
          busWheels: wheels,
        });
      }, [wheels]);

    return(
            <View style={AllStyles.container}>
           
                    <Text style={AllStyles.section}>Wheels </Text>
                        
                            <WheelsChecklist
                            wheels={wheels}
                            setWheels={setWheels}
                            />

                        <View style={AllStyles.btnContainer}>
                                <TouchableOpacity style ={AllStyles.btn}
                                    onPress={()=> navigation.navigate("bodyWorks",{
                                      inspection: {
                                        ...inspection,
                                        busWheels: wheels
                                      },
                                      updateInspections
                                    },
                                        updateInspections )}  >
                                    <Text style ={AllStyles.textBtn} >Next</Text>
                                </TouchableOpacity>
                        </View>
                
       </View>



       
    );
}

