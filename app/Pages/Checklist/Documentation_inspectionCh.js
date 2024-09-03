import { View,TouchableOpacity,Text, ScrollView } from "react-native";
import { AllStyles, primaryColor } from '../../shared/AllStyles';
import { useRoute, useNavigation } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import DocumentationChecklist from "./DocumentationChecklist";

 export default function Documentation_inspectionCh(){
    

  

    const route = useRoute();
    const navigation = useNavigation();
    
    // Accessing parameters passed via navigation
    const { inspection, setInspection } = route.params;

    const [documents, setDocuments] = useState(inspection.documentation);

    // Function to update the inspections in the parent component
    const updateInspections = (updatedInspection) => {
      setInspection(prevInspections =>
        prevInspections.map(item =>
          item.id === updatedInspection.id ? updatedInspection : item
        )
      );
    };
    


    useEffect(() => {
      // Update the inspection state in the parent component
      updateInspections({
        ...inspection,
        documentation:documents
      });
    }, [documents]);


    return(
        <View style={AllStyles.container}>
           
                    <Text style={AllStyles.section}>Documentation </Text>
                        <ScrollView contentContainerStyle={{flexGrow:1}}>
                       
                        <DocumentationChecklist
                            // inspection={inspection}
                             documents={documents}
                            // setInspection={updateInspections}
                             setDocuments={setDocuments}

                        />
                        </ScrollView>
                        <View style={AllStyles.btnContainer}>
                        <TouchableOpacity style ={AllStyles.btn}
                                onPress={()=> navigation.navigate("DiversCompartment",{
                                  inspection: {
                                    ...inspection,
                                    documentation: documents
                                  },
                                  updateInspections
                                })}  >
                            <Text style ={AllStyles.textBtn} >Next</Text>
                        </TouchableOpacity>
                        </View>

                
       </View>
    );
}