import React, {useContext}from 'react';
import { View, Text, TouchableOpacity, Image,ImageBackground,FlatList,StyleSheet, ScrollView } from 'react-native';
import { AllStyles, primaryColor, secondaryColor}  from '../shared/AllStyles';

import { ProfilesContext } from '../shared/ProfilesContext';
import { InspectContext } from '../shared/InspectionContext';
import { VehicleContext } from '../shared/VehicleContext';
import { CurrentUserContext } from '../shared/CurrentUserContext';


const Fleet = ({navigation}) => {
  const { profiles, setProfiles } = useContext(ProfilesContext);
  const { user } = useContext(CurrentUserContext);
  const { inspections, setInspection } = useContext(InspectContext);
  const { vehicles, setVehicles } = useContext(VehicleContext);

  return (
    <ScrollView contentContainerStyle={{flexGrow:1}}>
      {vehicles.map((vehicle, index) => {
        // Check if there are inspection images, if not, use the placeholder image
        const vehicleImages = vehicle.damageImages 
          ? Object.values(vehicle.damageImages).flat() // Flattening all images from different inspections
          : [require('../assets/UCTShuttle.jpg')]; // Default image if no damage images

        return (
          <View
          key={vehicle.fleetNo}
          
          >
          <TouchableOpacity
            
            style={ { flexDirection: 'column',
              alignItems: 'center',
              width:320,
              top:10,
              borderWidth:0.2,
              marginLeft:20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              borderColor:'white',
              elevation: 5,
              padding: 10,
              marginBottom: 10,
              backgroundColor: 'white',
              borderRadius: 10,}}
            onPress={() =>{navigation.navigate('details', {vehicle, index})}}
          >
            <Image
              source={typeof vehicleImages[0] === 'string'
                ? { uri: vehicleImages[0] }
                : vehicleImages[0]}  // Display the first image as thumbnail
              style={{
                backgroundColor: 'lightgrey',
                width: 200,
                height: 150,
                borderRadius: 20,
                marginBottom: 10,
                marginTop: 10,
                marginRight: 50,
              }}
            />
             <View style={{ flexDirection: 'column' ,marginRight:150}}>
            <Text style={{ fontSize: 16, color: 'black' }}>{vehicle.fleetNo}</Text>
            <Text style={{ fontSize: 12, color: 'black' }}>{vehicle.regNo}</Text>
          </View>
          </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
};


export default Fleet;



