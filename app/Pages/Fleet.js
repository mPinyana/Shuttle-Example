import React, {useContext}from 'react';
import { View, Text, TouchableOpacity, Image,ImageBackground, ScrollView } from 'react-native';
import { AllStyles, primaryColor, secondaryColor}  from '../shared/AllStyles';

import { ProfilesContext } from '../shared/ProfilesContext';
import { InspectContext } from '../shared/InspectionContext';
import { VehicleContext } from '../shared/VehicleContext';
import { CurrentUserContext } from '../shared/CurrentUserContext';


const Fleet=()=>{
  
    const {profiles, setProfiles} = useContext(ProfilesContext);// implement context as the same as below
    const { user } = useContext(CurrentUserContext);//    ""        ""  as the same as below
    const {inspections, setInspection} = useContext(InspectContext);
    const {vehicles, setVehicles} = useContext(VehicleContext);
    
    return(
        <View style = {AllStyles.container}>
                   <ScrollView contentContainerStyle={{padding:20}}>
                        {vehicles.map((vehicle, index) => {
                            // Check if there are inspection images, if not, use the placeholder image
                            const vehicleImages = vehicle.damageImages 
                            ? Object.values(vehicle.damageImages).flat() // Flattening all images from different inspections
                            : [require('../assets/UCTShuttle.jpg')]; // Default image if no damage images

                            return (
                            <TouchableOpacity
                                key={vehicle.fleetNo}
                                Style={{width:'80%', Height:150}}
                                //onPress={() => onVehiclePress(vehicle)}
                            >
                                <ImageBackground
                                source={vehicleImages[0]}  
                                  style={{ backgroundColor: 'lightgrey',width:'300%', height:'100%', borderRadius:100, marginBottom:10, marginTop:'15%'}}  resizeMode="contain"
                                />
                                <View style={{flexDirection: 'Row'}}>
                                <Text style={ { fontSize: 16, color: '#333',}}>{vehicle.model}</Text>
                                <Text style={ { fontSize: 16, color: '#333',}}>{vehicle.regNo}</Text>
                                </View>
                            </TouchableOpacity>
                            );
      })}
    </ScrollView>
        </View>
    );
}

export default Fleet;

