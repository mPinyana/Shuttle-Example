import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {Drawer} from 'expo-router/drawer'

import { createDrawerNavigator } from '@react-navigation/drawer';
import HomePage from '../Pages/HomePage';
import Profile from '../Pages/Profile';

//const drawer = createDrawerNavigator();

export default function MainDrawer() {
  return (
    <>
            {/* <drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerPosition: 'left',
            }}
            >
            <drawer.Screen name="MainTabs" component={HomePage} />
            <drawer.Screen name="Profile" component={Profile} />
            </drawer.Navigator> */}
            <Drawer/>
    </>
  );
}