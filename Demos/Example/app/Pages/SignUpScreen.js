import React from 'react';
import { StyleSheet ,View, Text,TextInput,Platform, Button,TouchableOpacity} from 'react-native'; 

function SignUpScreen(){

    return(

        <View style={styles.container}>
        
            <View style={styles.header}>
            <Text style={styles.headerText}>
            Sign Up
            </Text>
            <Text style={styles.subheadingText}>
                Create your account
            </Text>

            <View style={styles.inputsContainer}>
                <TextInput style={styles.input}
                    placeholder="Enter name"
                />
                <TextInput style={styles.input}
                    placeholder="Enter surname"
                />
                <TextInput style={styles.input}
                    placeholder="Enter email"
                />
                <TextInput style={styles.input}
                    placeholder="Enter password"
                />
                
            </View>

            </View>

        </View>

    );

    
}
export default SignUpScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
    },

    header:{
        height: 0.2,
        width:'100%',
        backgroundColor: '#00308F',
        justifyContent:'space-evenly',
        alignItems:'center',

    },

    headerText:{

    },
})