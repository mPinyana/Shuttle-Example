
import React, { useEffect, useState } from 'react';
import { View, Text} from 'react-native';
import { Firebase_Auth } from '../../FirebaseConfig';
import { doc,getDoc } from 'firebase/firestore';
import { Firebase_DB } from '../../FirebaseConfig';
import { AllStyles, primaryColor } from '../shared/AllStyles';
import CustomHeader from '../shared/CustomHeader';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InspectionStack from '../routes/InspectionStack';
import Search from './Search';
import Settings from './Settings';



import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();


const HomePage = ({navigation}) => {


  /*
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const user = Firebase_Auth.currentUser;
    


    
    useEffect(() => {
        const fetchUserProfile = async () => {
          try {
            //const user = Firebase_Auth.currentUser;
            if (user) {
              const profileDocRef = doc(Firebase_DB, 'Profiles', user.uid);
              const profileDoc = await getDoc(profileDocRef);

    
              if (profileDoc.exists()) {
                setProfile(profileDoc.data());
              } else {
                console.log('No such document!');
              }
            }
          } catch (error) {
            console.error('Error fetching profile:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchUserProfile();
      }, []);
    
    

     if (loading) {
        return (
            <View style={{alignItems:'center'}}>
                
                <Text style ={{fontSize:40 ,color:primaryColor,padding:70}}>Loading...</Text>
        
            </View>
        );
    }

    if (!profile) {
        return( 
        <View style={AllStyles.loader}>
        <Text>No profile data found.</Text>
        </View>
    
    );
    } */

    return (
            <Tab.Navigator screenOptions={{
              headerTitleAlign: 'center',
              headerTitleStyle: { color: primaryColor,
                fontSize: 32    
        },
           headerLeft:()=> <CustomHeader navigation={navigation}/>,
           tabBarStyle: {
            backgroundColor: 'white',
          
            
          },
          //tabBarLabel: ()=>false,
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
    );
};

 

export default HomePage;
