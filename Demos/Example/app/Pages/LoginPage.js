import React from 'react';
import { StyleSheet ,View, Text,TextInput,Platform, Button,TouchableOpacity} from 'react-native'; 
import  { useState } from 'react';
import { Firebase_Auth } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Firebase_DB } from '../../FirebaseConfig';
import { useNavigation } from '@react-navigation/native';


const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  

function LoginPage(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const auth = Firebase_Auth;
    const navigation = useNavigation();

    const logginIn = async() => {


        if (!validateEmail(email)) {
            alert('Invalid email format');
            return;
          }

            setLoading(true);
            try{
                const response = await signInWithEmailAndPassword(auth, email.toString(), password);
                console.log(response);
                navigation.navigate('Profile');
            }     
            catch(error){
                console.log(error);
                alert('Log in failed: '+ error.message);
            }
            finally{
                setLoading(false);
            }

    }

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
};

    return (
    <View style ={styles.Container}>

        <View  style ={styles.header}>
            <Text style={styles.headerText} >UCT Shuttle Services</Text>
        </View>
        
        <View style={styles.Salutations}>
        <Text style={styles.Hi}>Hello!</Text>
        {/* <Text style={styles.Welkom}> Welcome, Please enter login details</Text> */}
        </View>
        
        <View style={styles.InputBoxes}>
           
                <TextInput
                    style={styles.input}
                    placeholder="Enter email"
                    value={email}
                    onChangeText={(text) => setEmail(text.trim())}
                />
                

                <TextInput
                    style={styles.input}
                    placeholder="Enter password"
                    value={password}
                    onChangeText={(text) => setPassword(text.trim())}
                    secureTextEntry={true}
                /> 
        </View>
    
        <View style={styles.buttonContainer}>
            <TouchableOpacity 
            activeOpacity={0.8}
            style={styles.buttonLogin}  
            onPress={logginIn}>
            <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            activeOpacity={0.8}
            style={styles.buttonSignup}
            onPress={SignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            {/* <Button color={'red'} 
            style={styles.button} 
            title='SignUp' 
            onPress={SignUp}/> */}
        </View>
     
    </View>
        
    );
}

const styles = StyleSheet.create({
    Container:{
        flex:1,
        //backgroundColor: 'white',
    },

    header: {
        height: 100,
        width:'100%',
        backgroundColor: '#00308F',
        justifyContent:'space-evenly',
        alignItems:'center',
    },

    headerText:{
        color:'white',
        fontSize:Platform.OS==='android'? 22:0,// Remove this during implementation 
    }, 

    Salutations:{
        height: 120,
        alignItems:'center',
        justifyContent:'space-evenly',
        width:'100%',
      
    },

    Hi:{
        fontStyle:'italic',
        fontSize:Platform.OS==='android'? 35:0,
        color:'#00308F',
    },

    // Welkom:{
    //     fontStyle:'italic',
    //     fontSize:Platform.OS==='android'? 22:0,
    //     color:'#00308F',
    // },

    InputBoxes:{
        height: 130,
        width:'100%',
        justifyContent:'space-evenly',
        alignItems: 'center',
        
    },

    input: {
        height: '30%',
        width: '85%',
        padding: 10,
        borderRadius: 20,
        justifyContent: 'space-evenly',
        marginVertical: '5%',
        backgroundColor: '#d9d9d9',
        borderWidth: 0.2,
    },

    buttonContainer: {
        height: 120,
        width:'100%',
        justifyContent:'space-evenly',
        alignItems: 'center',
    },

    buttonLogin:{
        height: '35%',
        width:'70%',
        backgroundColor: '#00308F',
        borderRadius: 20,
        justifyContent:'space-evenly',
        alignItems: 'center',
        marginVertical: 10, 
    },

    buttonSignup:{
        height: '35%',
        width:'70%',
        backgroundColor: 'red',
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
export default LoginPage;