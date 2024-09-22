 import { View,TouchableOpacity,Text, ScrollView, Alert } from "react-native";
import { AllStyles, primaryColor } from '../../shared/AllStyles';
import React, {useState, useEffect} from 'react';
import { useRoute } from '@react-navigation/native';
import EngineAirChecklist from "./EngineAirChecklist";
import { Firebase_DB } from "../../../FirebaseConfig";
import { doc, updateDoc } from 'firebase/firestore';




export default function EngineAir_InspectCh({navigation}){

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



    
  

    return(
        <View style={AllStyles.container}>
           
                    <Text style={AllStyles.section}>Engine Fluid & Air System </Text>
                    <ScrollView>
                        <EngineAirChecklist
                        engineAir={engineAir}
                        setEngineAir={setEngineAir}
                        />
                        </ScrollView>

                        <View style={AllStyles.btnContainer}>
                                <TouchableOpacity style ={AllStyles.btn}
                                         onPress={()=> navigation.navigate("DriverSide", {
                                          inspection: {
                                            ...inspection,
                                            engine_Air: engineAir
                                          },
                                          updateInspections
                                        })} >
                                    <Text style ={AllStyles.textBtn} >Next</Text>
                                </TouchableOpacity>
                        </View>

                
       </View>
    );
} 