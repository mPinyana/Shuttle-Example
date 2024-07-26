import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { Firebase_Auth } from '../../FirebaseConfig';
import { doc,getDoc } from 'firebase/firestore';
import { Firebase_DB } from '../../FirebaseConfig';
import { AllStyles } from '../shared/AllStyles';

export default function Inspection({ navigation }){
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const user = Firebase_Auth.currentUser;

/* 
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
 */
    return(

        <View style = {AllStyles.container}>

                <Text style ={AllStyles.section}>Welcome, your inpections are waiting for you</Text>
                <TouchableOpacity style={AllStyles.inspectItem} onPress={()=> navigation.navigate("Documentation")} > 
                    <Text style={{fontSize:17, color:'white',fontWeight:'bold'}}>M103 Inspection</Text>
                </TouchableOpacity>
        </View>
    );
}