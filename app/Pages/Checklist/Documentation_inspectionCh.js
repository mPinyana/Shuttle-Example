import { View,TouchableOpacity,Text } from "react-native";
import { AllStyles, primaryColor } from '../../shared/AllStyles';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import React from 'react';

 export default function Documentation_inspectionCh({navigation}){
    return(
        <View style={AllStyles.container}>
           
                    <Text style={AllStyles.section}>Documentation </Text>

                        <View style={AllStyles.checklist}>
                                    <View style={AllStyles.checkItem}>
                                        <Text style={AllStyles.label}>Licence Disc </Text>
                                        <BouncyCheckbox
                                        size={30} 
                                        fillColor='blue' />
                                    </View>
                                    <View style={AllStyles.checkItem}>
                                        <Text style={AllStyles.label}>Operator's Disc </Text>
                                        <BouncyCheckbox
                                        size={30} 
                                        fillColor='blue' />
                                    </View>
                                    <View style={AllStyles.checkItem}>
                                        <Text style={AllStyles.label}>Permit (Document is safe) </Text>
                                        <BouncyCheckbox
                                        size={30} 
                                        fillColor='blue' />
                                    </View>
                                    <View style={AllStyles.checkItem}>
                                        <Text style={AllStyles.label}>Fuel Card </Text>
                                        <BouncyCheckbox
                                        size={30} 
                                        fillColor='blue' />
                                    </View>
                                 
                        </View>

                        <TouchableOpacity style ={{ width:'60%',
                                 borderRadius:10,
                                 backgroundColor: primaryColor,
                                 padding: 10,
                                marginBottom:'10%',}}
                                onPress={()=> navigation.navigate("DiversCompartment")}  >
                            <Text style ={AllStyles.textBtn} >Next</Text>
                        </TouchableOpacity>

                
       </View>
    );
}