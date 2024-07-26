import { View,TouchableOpacity,Text } from "react-native";
import { AllStyles } from '../shared/AllStyles';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import React from 'react';

export default function EngineAir_InspectCh({navigation}){
    return(
        <View style={AllStyles.container}>
           
                    <Text style={AllStyles.section}>Engine Fluid & Air System </Text>

                        <View style={AllStyles.checklist}>
                                    <View style={AllStyles.checkItem}>
                                        <Text style={AllStyles.label}>Check Engine Oil Level </Text>
                                        <BouncyCheckbox
                                        size={30} 
                                        fillColor='blue' />
                                    </View>
                                    <View style={AllStyles.checkItem}>
                                        <Text style={AllStyles.label}>Operator Engine Coolant Level </Text>
                                        <BouncyCheckbox
                                        size={30} 
                                        fillColor='blue' />
                                    </View>
                                    <View style={AllStyles.checkItem}>
                                        <Text style={AllStyles.label}>Derain Air Tanks </Text>
                                        <BouncyCheckbox
                                        size={30} 
                                        fillColor='blue' />
                                    </View>
                                    
                                 
                        </View>

                        <TouchableOpacity style ={{ width:'60%',
                                 borderRadius:10,
                                 backgroundColor: '#004aad',
                                 padding: 10,
                                marginBottom:'10%',}}
                                onPress={()=> navigation.navigate("wheels")}  >
                            <Text style ={AllStyles.textBtn} >Next</Text>
                        </TouchableOpacity>

                
       </View>
    );
}