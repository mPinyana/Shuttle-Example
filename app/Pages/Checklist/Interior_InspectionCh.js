import { View,TouchableOpacity,Text } from "react-native";
import { AllStyles, primaryColor } from '../../shared/AllStyles';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import React from 'react';

 export default function Interior_InspectionCh({navigation}){
    return(
        <View style={AllStyles.container}>
           
        <Text style={AllStyles.section}>Interior </Text>

            <View style={AllStyles.checklist}>
                        <View style={AllStyles.checkItem}>
                            <Text style={AllStyles.label}>General Cleanliness </Text>
                            <BouncyCheckbox
                            size={30} 
                            fillColor='blue' />
                        </View>
                        <View style={AllStyles.checkItem}>
                            <Text style={AllStyles.label}>Seats & Seatbealts </Text>
                            <BouncyCheckbox
                            size={30} 
                            fillColor='blue' />
                        </View>
                        <View style={AllStyles.checkItem}>
                            <Text style={AllStyles.label}>Fire Extinguiser (expiry date and seal) </Text>
                            <BouncyCheckbox
                            size={30} 
                            fillColor='blue' />
                        </View>
                        <View style={AllStyles.checkItem}>
                            <Text style={AllStyles.label}>Triangle </Text>
                            <BouncyCheckbox
                            size={30} 
                            fillColor='blue' />
                        </View>
                        <View style={AllStyles.checkItem}>
                            <Text style={AllStyles.label}>Microphone operational </Text>
                            <BouncyCheckbox
                            size={30} 
                            fillColor='blue' />
                        </View>
                        <View style={AllStyles.checkItem}>
                            <Text style={AllStyles.label}>Vehicle steps </Text>
                            <BouncyCheckbox
                            size={30} 
                            fillColor='blue' />
                        </View>
                        <View style={AllStyles.checkItem}>
                            <Text style={AllStyles.label}>Wifi operational </Text>
                            <BouncyCheckbox
                            size={30} 
                            fillColor='blue' />
                        </View>
                        <View style={AllStyles.checkItem}>
                            <Text style={AllStyles.label}>Air-conditioner functional </Text>
                            <BouncyCheckbox
                            size={30} 
                            fillColor='blue' />
                        </View>
                        <View style={AllStyles.checkItem}>
                            <Text style={AllStyles.label}>USB covers </Text>
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
                    onPress={()=> navigation.navigate("engineAir")}  >
                <Text style ={AllStyles.textBtn} >Next</Text>
            </TouchableOpacity>

    
</View>
    );
}