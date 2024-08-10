import { View,TouchableOpacity,Text } from "react-native";
import { AllStyles, primaryColor } from '../../shared/AllStyles';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import React from 'react'

 export default function Wheels_InspectionCh({navigation}){
    return(
            <View style={AllStyles.container}>
           
                    <Text style={AllStyles.section}>Wheels </Text>

                        <View style={AllStyles.checklist}>
                                    <View style={AllStyles.checkItem}>
                                        <Text style={AllStyles.label}>Check rim and tyres for visible damage </Text>
                                        <BouncyCheckbox
                                        size={30} 
                                        fillColor='blue' />
                                    </View>
                                    <View style={AllStyles.checkItem}>
                                        <Text style={AllStyles.label}>Check tyre pressure and remaining tread </Text>
                                        <BouncyCheckbox
                                        size={30} 
                                        fillColor='blue' />
                                    </View>
                                    <View style={AllStyles.checkItem}>
                                        <Text style={AllStyles.label}>Check oil leaks on wheel hubs </Text>
                                        <BouncyCheckbox
                                        size={30} 
                                        fillColor='blue' />
                                    </View>
                                    <View style={AllStyles.checkItem}>
                                        <Text style={AllStyles.label}>Check wheel nuts in place & secure </Text>
                                        <BouncyCheckbox
                                        size={30} 
                                        fillColor='blue' />
                                    </View>
                                    <View style={AllStyles.checkItem}>
                                        <Text style={AllStyles.label}>Check all missing {'\n'} wheel caps and extensions </Text>
                                        <BouncyCheckbox
                                        size={30} 
                                        fillColor='blue' />
                                    </View>
                                    <View style={AllStyles.checkItem}>
                                        <Text style={AllStyles.label}>Check all wheel nut indicators{'\n'} are aligned</Text>
                                        <BouncyCheckbox
                                        size={30} 
                                        fillColor='blue' />
                                    </View>
                                    <View style={AllStyles.checkItem}>
                                        <Text style={AllStyles.label}>Check abnormal tyre alignment </Text>
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
                            onPress={()=> navigation.navigate("bodyWorks")}  >
                            <Text style ={AllStyles.textBtn} >Next</Text>
                        </TouchableOpacity>
                
       </View>



       
    );
}