import Search from '../Pages/Search'
import React from 'react';
import { primaryColor } from '../shared/AllStyles';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import ViewStack from './ViewStack';

const Tab = createBottomTabNavigator();

const ManagerTabs=({navigation})=>{



    return(
      <Tab.Navigator  screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: { color: primaryColor,
          fontSize: 32    
  },
     tabBarStyle: {
      backgroundColor: 'white',

    },
  
    tabBarLabelStyle:{

    },
    
    tabBarActiveTintColor: primaryColor,
    tabBarInactiveTintColor: primaryColor,


      }}>
    <Tab.Screen name='Fleet' component={ViewStack}
        options={{
            tabBarIcon: ({ color, focused })=> <Ionicons name={focused?"bus":'bus-outline'} size={32} color={color} />
        }}
     />
   

    <Tab.Screen name='Search' component={Search} options={{
           tabBarIcon: ({ color, focused })=>
            focused? (
            <FontAwesome5 name="search" size={32} color={color} />
          ):
          (
            <Ionicons name="search-outline" size={32} color={color}/>
          )
    }}/>
   

    <Tab.Screen name='Profile' component={Search} options={{
        tabBarIcon: ({color,focused})=> <FontAwesome name={focused?"user":'user-o'} size={32} color={color} />
    }}/>
   
    </Tab.Navigator>
    )
}

export default ManagerTabs;