import { View,TouchableOpacity,Text } from "react-native";
import { AllStyles } from '../shared/AllStyles';
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
                            <Text style={AllStyles.label}>Check all seats & Seatbealts </Text>
                            <BouncyCheckbox
                            size={30} 
                            fillColor='blue' />
                        </View>
                        <View style={AllStyles.checkItem}>
                            <Text style={AllStyles.label}>Check Fire Extinguiser   {'\n'}(expiry date and seal): </Text>
                            <BouncyCheckbox
                            size={30} 
                            fillColor='blue' />
                        </View>
                        <View style={AllStyles.checkItem}>
                            <Text style={AllStyles.label}>Check triangle </Text>
                            <BouncyCheckbox
                            size={30} 
                            fillColor='blue' />
                        </View>
                        <View style={AllStyles.checkItem}>
                            <Text style={AllStyles.label}>Check microphone operational </Text>
                            <BouncyCheckbox
                            size={30} 
                            fillColor='blue' />
                        </View>
                        <View style={AllStyles.checkItem}>
                            <Text style={AllStyles.label}>Check steps in Vehicle </Text>
                            <BouncyCheckbox
                            size={30} 
                            fillColor='blue' />
                        </View>
                        <View style={AllStyles.checkItem}>
                            <Text style={AllStyles.label}>Check Wifi Working </Text>
                            <BouncyCheckbox
                            size={30} 
                            fillColor='blue' />
                        </View>
                        <View style={AllStyles.checkItem}>
                            <Text style={AllStyles.label}>Check Air Conditioner Working </Text>
                            <BouncyCheckbox
                            size={30} 
                            fillColor='blue' />
                        </View>
                        <View style={AllStyles.checkItem}>
                            <Text style={AllStyles.label}>Check USB COVERS </Text>
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
                    onPress={()=> navigation.navigate("engineAir")}  >
                <Text style ={AllStyles.textBtn} >Next</Text>
            </TouchableOpacity>

    
</View>
    );
}