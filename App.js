import React, { useState } from 'react';
import LoginPage from './app/Pages/LoginPage';
import HomePage from  './app/Pages/HomePage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView} from 'react-native';
import * as Font from 'expo-font';
import SignUpScreen from './app/Pages/SignUpScreen';




const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);


    return (
   
        
           <NavigationContainer>  
             <Stack.Navigator initialRouteName='Login'>
             <Stack.Screen name= "Login" component={LoginPage} options={{ headerShown: false}} /> 
             <Stack.Screen name="Home" component={HomePage} options={{
                    headerBackVisible: false,
                    title: 'Home',
                    headerTitleStyle: { color: '#004aad',
                                        fontSize: 25
                     },
                    headerTitleAlign: 'center',
                    headerShown: false
                    }} />
              <Stack.Screen name= "SignUp" component={SignUpScreen} options={{ headerShown: false}} /> 
             </Stack.Navigator>
           </NavigationContainer>
  

  );

}


