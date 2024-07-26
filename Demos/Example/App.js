import React from 'react';
import LoginPage from './app/Pages/LoginPage';
import UserProfile from  './app/Pages/DisplayprofilePage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  //console.log(useDimensions());
  return (
    <NavigationContainer>  
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name= "Login" component={LoginPage} options={{ headerShown: false}} /> 
          <Stack.Screen name="Profile" component={UserProfile} options={{ headerShown: false}} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}


