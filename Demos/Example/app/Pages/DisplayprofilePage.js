import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,Platform, ActivityIndicator } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Firebase_Auth } from '../../FirebaseConfig';
import { doc,getDoc } from 'firebase/firestore';
import { Firebase_DB } from '../../FirebaseConfig';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const UserProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    //const auth = getAuth();
    const user = Firebase_Auth.currentUser;
    const [isSelected, setSelection] = useState(false);

/*
    const fetchUserProfile = async (userId) => {
        try {
            const userDoc = await getDoc(doc(Firebase_DB, 'profiles', userId));
            if (userDoc.exists()) {
                return userDoc.data();
            } else {
                console.log('No such document!');
                return null;
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
            return null;
        }
    }

  */  
    
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
            <View style={styles.container}>
                <View  style ={styles.NavigationBar}>
                    <Text style={styles.Heading} >UCT Shuttle Services
                 </Text>
            </View>
                <Text>Loading...</Text>
        
            </View>
        );
    }

    if (!profile) {
        return( 
        
        
        <View style={styles.container}>
        <View  style ={styles.NavigationBar}>
            <Text style={styles.Heading} >UCT Shuttle Services
         </Text>
        </View>
        <Text>No profile data found.</Text>
    </View>
    
    );
    }

    return (
        <View style={styles.container}>
           <View  style ={styles.NavigationBar}> 
           <Text style={styles.Heading} >UCT Shuttle Services
           </Text>
            
            </View>
            <Text style={styles.Hi}>Greetings: {profile.email} !! </Text>

             
                <Text style={styles.whl}>Wheels:</Text>

             
         <View style={styles.Checklist}>
               <View style={styles.checkItem}>
                    <Text style={styles.Label}>Check rim and tyres for visible damage: </Text>
                    <BouncyCheckbox />
                </View>
                <View style={styles.checkItem}>
                    <Text style={styles.Label}>Check tyre pressure and remaining tread: </Text>
                    <BouncyCheckbox />
                </View>
                <View style={styles.checkItem}>
                    <Text style={styles.Label}>Check oil leaks on wheel hubs: </Text>
                    <BouncyCheckbox />
                </View>
                <View style={styles.checkItem}>
                    <Text style={styles.Label}>Check all missing wheel caps and extensions: </Text>
                    <BouncyCheckbox />
                </View>
                <View style={styles.checkItem}>
                    <Text style={styles.Label}>Check abnormal tyre alignment: </Text>
                    <BouncyCheckbox />
                </View>
            </View>

                 
        </View>
    );
};

 
           {/* <Text><strong>Created At:</strong> {profile.createdAt.toDate().toString()}</Text>
            {/* Add more fields as needed */}

const styles = StyleSheet.create({
    container: {
        //padding: 20,
        flex:1,
        backgroundColor: 'white',
        
    },
    whl:{
        left:'10%',
        top:'10%'
    },

    Checklist:{
        flex:0.7,
        top:'5%',
        left:'5%',
        alignItems:'Center',
        margin:4
    },
    checkItem:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        top:'15%',
        left: '5%'
        
    },
    checkbox:{


    },
    Label:{
        fontStyle:'italic'
    },

    NavigationBar: {
        //flex: 0.5,
        width:'100%',
        height:'15%',
        backgroundColor: '#00308F',
        justifyContent:'Top',
        alignItems:'Center',
        
    },
    Hi:{
       
        fontStyle:'italic',
        fontSize:Platform.OS==='android'? 17:0,
        color:'black',
        alignItems:'center',
        top:'3%',
        left:'5%'
    },
    Heading:{
        color:'white',
        fontSize:Platform.OS==='android'? 22:0,// Remove this during implementation 
        top:'40%',
        left:'22%',
        fontWeight: 'bold'
        
    },
    Welkom:{
        fontStyle:'italic',
        fontSize:Platform.OS==='android'? 22:0,
        color:'#00308F',
        alignItems:'center'
    }
});

export default UserProfile;
