import React ,{ useState } from 'react';
import {View, Text,TextInput,TouchableOpacity,Alert, Image} from 'react-native'; 
import { AllStyles, primaryColor, secondaryColor}  from '../shared/AllStyles';
import Fleet from '../Pages/Fleet';
import VehicleTopTabs from './VehicleTopTabs';

import { createStackNavigator } from "@react-navigation/stack";


const Stack = createStackNavigator();
const ViewStack=()=>{
  

    return(
        <Stack.Navigator initialRouteName="Vehicles">
                  <Stack.Screen name="home" component={Fleet} options={{
                                            title:'Fleet',
                                            headerTitleAlign: 'center',
                                            headerTitleStyle: { color: '#004aad',
                                                fontSize: 25,
                                                
                                            },
                                            headerStyle:{borderBottomWidth: 2,},
                                            headerShown:true,
                                            headerLeft: () => null
                            }}/>
                 <Stack.Screen name="details" component={VehicleTopTabs} options={{
                                 //title:'Vehicle',
                                            headerTitleStyle: { color: '#004aad',
                                                fontSize: 25,
                                            },
                                            headerStyle:{borderBottomWidth: 2,},
                                            headerShown:true,
                            }}/>
        </Stack.Navigator>
        
    );
}

export default ViewStack;

