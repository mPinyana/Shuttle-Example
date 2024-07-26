import React, { useEffect, useState } from 'react';
import { View, Text} from 'react-native';
import { Firebase_Auth } from '../../FirebaseConfig';
import { doc,getDoc } from 'firebase/firestore';
import { Firebase_DB } from '../../FirebaseConfig';
import { AllStyles } from '../shared/AllStyles';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import InspectionStack from '../routes/InspectionStack';
import Search from './Search';
import Settings from './Settings';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const HomePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const user = Firebase_Auth.currentUser;
    


    
    useEffect(() => {
        const fetchUserProfile = async () => {
          try {
            const user = Firebase_Auth.currentUser;
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
                
                <Text style ={{fontSize:40 ,color:'#004aad',padding:70}}>Loading...</Text>
        
            </View>
        );
    }

    if (!profile) {
        return( 
        <View style={AllStyles.loader}>
        <Text>No profile data found.</Text>
        </View>
    
    );
    }

    return (
            <Tab.Navigator screenOptions={{

            }}>
                <Tab.Screen name ='Inspection' component={InspectionStack} options={{
                            headerShown:false,
                            tabBarIcon:()=> <FontAwesome name="check-circle" size={32} color='#004aad' />
                        }}/>
                <Tab.Screen name ='Search' component={Search} options={{
                            headerTitleAlign: 'center',
                            headerTitleStyle: { color: '#004aad',
                                fontSize: 32      
                        },
                        tabBarIcon:()=> <FontAwesome5 name="search" size={32} color='#004aad' />
                }}/>
                <Tab.Screen name ='Settings' component ={Settings} options={{
                            headerTitleAlign: 'center',
                            headerTitleStyle: { color: '#004aad',
                                fontSize: 32      
                        },
                        tabBarIcon:()=>  <Ionicons name="settings-sharp" size={32} color='#004aad' />

                }}/>
            </Tab.Navigator> 
    );
};

 

export default HomePage;
