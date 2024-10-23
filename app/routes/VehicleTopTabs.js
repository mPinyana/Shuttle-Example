import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Settings from "../Pages/Settings";
import Vehicle from "../Pages/Vehicle";
import ViewCtrl from "../Pages/Sketching/Viewing/ViewCtrl";
import { useRoute, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';


const Tab = createMaterialTopTabNavigator();

const VehicleTopTabs=() =>{

    const route = useRoute(); // Access the current route to get the params
    const navigation = useNavigation();
    const { vehicle } = route.params; 

    useEffect(() => {
        if (vehicle && vehicle.fleetNo) {
          // Dynamically set the header title to the vehicle's fleetNo
          navigation.setOptions({ title: ` ${vehicle.fleetNo}` });
        }
      }, [vehicle, navigation]);
    

    return (
      <Tab.Navigator>
        <Tab.Screen name="Details" component={Vehicle} initialParams={{ vehicle }} />
         <Tab.Screen name="Inspections" component={Settings} initialParams={{ vehicle }} /> 
      </Tab.Navigator>
    );
  }

  export default VehicleTopTabs;