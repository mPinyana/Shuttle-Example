import React ,{ useState } from 'react';
import {View, Text,TextInput,TouchableOpacity,Alert, Image} from 'react-native'; 
import { AllStyles, primaryColor, secondaryColor}  from '../shared/AllStyles';
import Fleet from '../Pages/Fleet';

import { createStackNavigator } from "@react-navigation/stack";


const Stack = createStackNavigator();
const ViewStack=()=>{
  

    return(
        <Stack.Navigator initialRouteName="Vehicles">
                  <Stack.Screen name="Fleet" component={Fleet} options={{
                                            title:'Fleet',
                                            headerTitleStyle: { color: '#004aad',
                                                fontSize: 25,
                                            },
                                            headerStyle:{borderBottomWidth: 2,},
                                            headerShown:false,
                            }}/>
        </Stack.Navigator>
    );
}

export default ViewStack;

