import InspectionStack from './InspectionStack';
import Search from '../Pages/Search'
import Settings from '../Pages/Settings';
import React from 'react';
import { primaryColor } from '../shared/AllStyles';
import CustomHeader from '../shared/CustomHeader';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

const FleetCtrlTabs =({navigation})=>{


    return(
        <Tab.Navigator screenOptions={{
            headerTitleAlign: 'center',
            headerTitleStyle: { color: primaryColor,
              fontSize: 32    
      },
         headerLeft:()=> <CustomHeader navigation={navigation}/>,
         tabBarStyle: {
          backgroundColor: 'white',
        
          
        },
      
        tabBarLabelStyle:{

        },
        
        tabBarActiveTintColor: primaryColor,
        tabBarInactiveTintColor: primaryColor,


          }}>
              <Tab.Screen name ='Inspection' component={InspectionStack} options={{
                          headerShown:false,
                          tabBarIcon: ({ color, focused })=> <Ionicons name={focused?"checkmark-circle":'checkmark-circle-outline'} size={32} color={color} />
                      }}/>
              <Tab.Screen name ='Search' component={Search} options={{
                      tabBarIcon: ({ color, focused })=>
                        focused? (
                        <FontAwesome5 name="search" size={32} color={color} />
                      ):
                      (
                        <Ionicons name="search-outline" size={32} color={color}/>
                      )
              }}/>
              <Tab.Screen name ='Settings' component ={Settings} options={{
                      tabBarIcon:({ color, focused}) =>  <Ionicons name={focused? "settings-sharp":"settings-outline"} size={32} color={color} />

              }}/>
          </Tab.Navigator>
    )

}

export default FleetCtrlTabs;