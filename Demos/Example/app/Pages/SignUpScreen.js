import React from 'react';
import { StyleSheet ,View, Text,TextInput,TouchableOpacity} from 'react-native'; 

function SignUpScreen(){

    return(

        <View style={styles.container}>
        
            <View style={styles.header}>
                <Text 
                style={styles.headerText}>
                Create Profile
                </Text>
            </View>

            <View style={styles.inputContainerA}>

                <TextInput style={styles.input}
                    placeholder="Name"/>

                <TextInput style={styles.input}
                    placeholder="Surname"/>
            </View>

            <View style={styles.inputContainerB}>
                <TextInput style={styles.inputB}
                    placeholder="Email"/>

                <TextInput style={styles.inputB}
                    placeholder="Password"/>
          
            </View>

            <View style={styles.buttonContainer}>
            <TouchableOpacity 
            activeOpacity={0.8}
            style={styles.buttonSignup}  
            >
            <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>

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
        height: 140,
        width:'100%',
        justifyContent:'flex-end',
        alignItems:'center',
        paddingBottom: 20,

    },

    headerText:{
        fontSize: 24,
        fontWeight: 'bold',
        alignItems: '',
    },

    inputContainerA:{
    flexDirection: 'row',
    height: 90,
    width:'100%',
    justifyContent:'space-evenly',
    alignItems: 'center',
    },

    inputContainerB:{
        height: 90,
        width:'100%',
        justifyContent:'space-evenly',
        alignItems: 'flex-start',
        paddingLeft: 14,
        },

    input:{
        height: '40%',
        width: '45%',
        padding: 10,
        paddingLeft: 12,
        borderRadius: 20,
        justifyContent: 'space-evenly',
        marginVertical: '5%',
        backgroundColor: '#d9d9d9',
        borderWidth: 0.2,
    },

    inputB:{
        height: '40%',
        width: '80%',
        padding: 10,
        paddingLeft: 12,
        borderRadius: 20,
        justifyContent: 'space-evenly',
        marginVertical: '8%',
        backgroundColor: '#d9d9d9',
        borderWidth: 0.2,
    },

    buttonContainer: {
        height: 120,
        width:'100%',
        justifyContent:'space-evenly',
        alignItems: 'center',
    },

    buttonSignup:{
        height: '35%',
        width:'60%',
        backgroundColor: '#FF5757',
        borderRadius: 20,
        justifyContent:'space-evenly',
        alignItems: 'center',
        marginVertical: 10, 
    },

    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },





   
})