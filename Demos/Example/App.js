import React from 'react';
import LoginPage from './app/Pages/LoginPage';
import UserProfile from  './app/Pages/DisplayprofilePage';
import HomePage from './app/Pages/HomePage.js';
import SignUpScreen from './app/Pages/SignUpScreen.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  //console.log(useDimensions());
  return (
    <NavigationContainer>  
        {/* <Stack.Navigator initialRouteName='Login'> */}
        <Stack.Navigator initialRouteName='SignUp'>
          <Stack.Screen name= "SignUp" component={SignUpScreen} options={{ headerShown: false}} /> 
          {/* <Stack.Screen name = 'Home Page' component = {HomePage}/> */}
          <Stack.Screen name="Profile" component={UserProfile} options={{ headerShown: false}} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}


