import { View,TouchableOpacity,Text } from "react-native";
import { AllStyles, primaryColor } from '../../shared/AllStyles';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import React from 'react';

export default function DriverCompartment_inspectCh({navigation}){
    return(
        <View style={AllStyles.container}>
           
                    <Text style={AllStyles.section}>Driver's component </Text>

                        <View style={AllStyles.checklist}>
                                    <View style={AllStyles.checkItem}>
                                        <Text style={AllStyles.label}>Check all warning Lights and gauges </Text>
                                        <BouncyCheckbox
                                        size={30} 
                                        fillColor='blue' />
                                    </View>
                                    <View style={AllStyles.checkItem}>
                                        <Text style={AllStyles.label}>Check Handbrake functions correctly </Text>
                                        <BouncyCheckbox
                                        size={30} 
                                        fillColor='blue' />
                                    </View>
                                    <View style={AllStyles.checkItem}>
                                        <Text style={AllStyles.label}>Check Steering Wheel for {'\n'} Excessive Play </Text>
                                        <BouncyCheckbox
                                        size={30} 
                                        fillColor='blue' />
                                    </View>
                                    <View style={AllStyles.checkItem}>
                                        <Text style={AllStyles.label}>Check Driver's Seat & Seatbelt </Text>
                                        <BouncyCheckbox
                                        size={30} 
                                        fillColor='blue' />
                                    </View>
                                    <View style={AllStyles.checkItem}>
                                        <Text style={AllStyles.label}>Check AdBlue Level </Text>
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
                                onPress={()=> navigation.navigate("Interior")}  >
                            <Text style ={AllStyles.textBtn} >Next</Text>
                        </TouchableOpacity>

                
       </View>
    );
}