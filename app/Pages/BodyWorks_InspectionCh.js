import { View,TouchableOpacity,Text } from "react-native";
import { AllStyles } from '../shared/AllStyles';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import React from 'react';

 export default function BodyWorks_InspectionCh({navigation}){
    return(
        <View style={AllStyles.container}>
           
                    <Text style={AllStyles.section}>Bodyworks </Text>

                        <View style={AllStyles.checklist}>
                                    <View style={AllStyles.checkItem}>
                                        <Text style={AllStyles.label}>Check all exterior cleanliness </Text>
                                        <BouncyCheckbox
                                        size={30} 
                                        fillColor='blue' />
                                    </View>
                                    <View style={AllStyles.checkItem}>
                                        <Text style={AllStyles.label}>Check window and windscreen cracks </Text>
                                        <BouncyCheckbox
                                        size={30} 
                                        fillColor='blue' />
                                    </View>
                                    <View style={AllStyles.checkItem}>
                                        <Text style={AllStyles.label}>Check for body damage and{'\n'}mark on sheet  </Text>
                                        <BouncyCheckbox
                                        size={30} 
                                        fillColor='blue' />
                                    </View>
                                    <View style={AllStyles.checkItem}>
                                        <Text style={AllStyles.label}>Check rearview mirrors-secure </Text>
                                        <BouncyCheckbox
                                        size={30} 
                                        fillColor='blue' />
                                    </View>
                                    <View style={AllStyles.checkItem}>
                                        <Text style={AllStyles.label}>Check all reflectors and reflective tape</Text>
                                        <BouncyCheckbox
                                        size={30} 
                                        fillColor='blue' />
                                    </View>
                                    <View style={AllStyles.checkItem}>
                                        <Text style={AllStyles.label}>Check conditions of wipper blades </Text>
                                        <BouncyCheckbox
                                        size={30} 
                                        fillColor='blue' />
                                    </View>
                                    <View style={AllStyles.checkItem}>
                                        <Text style={AllStyles.label}>Check all passenger doors functional </Text>
                                        <BouncyCheckbox
                                        size={30} 
                                        fillColor='blue' />
                                    </View>
                                    <View style={AllStyles.checkItem}>
                                        <Text style={AllStyles.label}>Check all branding</Text>
                                        <BouncyCheckbox
                                        size={30} 
                                        fillColor='blue' />
                                    </View>
                                    <View style={AllStyles.checkItem}>
                                        <Text style={AllStyles.label}>Check mudflaps </Text>
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
                                onPress={()=> navigation.navigate("electric")}  >
                            <Text style ={AllStyles.textBtn} >Next</Text>
                        </TouchableOpacity>

                
       </View>
    );
}