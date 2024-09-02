import { View,TouchableOpacity,Text, ScrollView } from "react-native";
import { AllStyles, primaryColor } from '../../shared/AllStyles';
import React, {useState, useEffect} from 'react';
import { useRoute} from '@react-navigation/native';
import BodyWorksChecklist from "./BodyworksChecklist";

 export default function BodyWorks_InspectionCh({navigation}){
    const route = useRoute();
    const { inspection, updateInspections } = route.params;
  
    const [bodyworks, setBody] = useState(inspection.body);

    useEffect(() => {
        // Update the inspection state in the parent component
        updateInspections({
          ...inspection,
          body: bodyworks,
        });
      }, [bodyworks]);
    

    return(
        <View style={AllStyles.container}>
           
                    <Text style={AllStyles.section}>Bodyworks </Text>
                        <ScrollView>
                        <BodyWorksChecklist
                                bodyWorks={bodyworks}
                                setBody={setBody}
                            />
                        </ScrollView>
                        <View style={AllStyles.btnContainer}>
                        <TouchableOpacity style ={AllStyles.btn}
                                onPress={()=> navigation.navigate("engineAir",{
                                    inspection: {
                                      ...inspection,
                                      body: bodyworks
                                    },
                                    updateInspections
                                  })}  >
                            <Text style ={AllStyles.textBtn} >Next</Text>
                        </TouchableOpacity>
                        </View>

                
       </View>
    );
}