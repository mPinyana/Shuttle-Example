import React from 'react';
import { StyleSheet ,View, Text,TextInput,TouchableOpacity} from 'react-native'; 
import  { useState } from 'react';

function SignUpScreen(){

    const [user, setUser] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
    });

    // const [newUser, setNewUser] = useState('');

    // const handleInputChange = (text, field) => {
    //     setUser({ ...user, [field]: text }); // Update specific car property
    //   };

    // const handleFormSubmit = () => {
    //     console.log("User Created:", user);
    //     //setNewUser('');
    //   };

      const auth = Firebase_Auth;
    const navigation = useNavigation();

    const SignUp = async() => {

        if (!validateEmail(email)) {
            alert('Invalid email format');
            return;
          }

        setLoading(true);
        try{
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            const userID = userCredentials.user.uid;

            const userData = {
                id: userID,
                email: email
            }

            const userRef = doc(Firebase_DB, 'Profiles', userID);
            await setDoc(userRef, userData);

            setEmail('');
            setPassword('');

            console.log('User added to database collection - Profiles');
            console.log('User successfully registered');

            alert('Succcesful, Check your email')
        }  

        catch(error){
            console.log(error);
            alert('Sign up failed: '+ error.message);
        }
        finally{
            setLoading(false);
        }

}
    



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
                    placeholder="Name"
                    value = {user.name}
                    onChangeText={(text) => handleInputChange(text, 'name')}
                    />

                <TextInput style={styles.input}
                    placeholder="Surname"
                    value = {user.surname}
                    onChangeText={(text) => handleInputChange(text, 'surname')}
                    />
            </View>

            <View style={styles.inputContainerB}>
                <TextInput style={styles.inputB}
                    placeholder="Email"
                    value = {user.email}
                    onChangeText={(text) => handleInputChange(text, 'email')}
                    />

                <TextInput style={styles.inputB}
                    placeholder="Password"
                    value = {user.password}
                    onChangeText={(text) => handleInputChange(text, 'password')}
                    />
          
            </View>

            <View style={styles.buttonContainer}>
            <TouchableOpacity 
            activeOpacity={0.8}
            style={styles.buttonSignup} 
            onPress={handleFormSubmit}
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