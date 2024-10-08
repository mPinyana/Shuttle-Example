import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { AllStyles, primaryColor, secondaryColor } from "../shared/AllStyles";
import { CurrentUserContext } from '../shared/CurrentUserContext';
import { Firebase_Auth } from '../../FirebaseConfig';
import { signOut } from 'firebase/auth';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Profile({ navigation }) {
    const { user, setUser } = useContext(CurrentUserContext);

    const handleLogout = async () => {
        try {
            await signOut(Firebase_Auth);
         
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image 
                    source={{ uri: user.profilePic }} 
                    style={styles.profilePic}
                />
                <Text style={styles.name}>{user.name} {user.surname}</Text>
                <Text style={styles.email}>{user.email}</Text>
                <Text style={styles.role}>{user.role}</Text>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={24} color="white" />
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: primaryColor,
    },
    profilePic: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    email: {
        fontSize: 16,
        color: 'white',
        marginBottom: 5,
    },
    role: {
        fontSize: 18,
        color: 'white',
        fontStyle: 'italic',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: secondaryColor,
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 20,
        marginTop: 'auto',
        marginBottom: 20,
    },
    logoutText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});