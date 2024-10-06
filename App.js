import 'react-native-gesture-handler';
import React from 'react';
import SignUpScreen from './app/Pages/SignUpScreen';
import LoginPage from './app/Pages/LoginPage';
import HomePage from  './app/Pages/HomePage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Context
import LoaderProvider from './app/shared/LoaderContext';
import InspectionProvider from './app/shared/InspectionContext';
import VehicleProvider from './app/shared/VehicleContext';
import CurrentUserProvider from './app/shared/CurrentUserContext';
import ProfilesProvider from './app/shared/ProfilesContext';



const Stack = createNativeStackNavigator();

export default function App() {
      


    return (
      <ProfilesProvider>
      <CurrentUserProvider>
        <LoaderProvider>
          <VehicleProvider>
          <InspectionProvider>
           <NavigationContainer>   
             <Stack.Navigator initialRouteName='Login'>
             <Stack.Screen name= "Login" component={LoginPage} options={{ headerShown: false}} /> 
             <Stack.Screen name= "SignUp" component={SignUpScreen} options={{ headerBackVisible: true}} /> 
             <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
             </Stack.Navigator>
           </NavigationContainer>
           </InspectionProvider>
          </VehicleProvider>
        </LoaderProvider>
      </CurrentUserProvider>
    </ProfilesProvider>
  

  );

}


