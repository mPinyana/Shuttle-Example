import React from 'react';
import {View, Text,TextInput,TouchableOpacity, Image, ImageBackground} from 'react-native'; 
import  { useState } from 'react';
import { Firebase_Auth } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Firebase_DB } from '../../FirebaseConfig';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { AllStyles, primaryColor}  from '../shared/AllStyles';


const l_logo = require("../assets/L_logo.png")
const r_logo = require("../assets/R_logo.png")
const background = require("../assets/uct buses.webp")



const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  

function LoginPage(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Driver', value: 'Driver' },
        { label: 'Fleet Controller', value: 'Fleet Controller' },
        
  ]);

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
                navigation.navigate('Home');
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



    return (
    <View style ={AllStyles.container}>
  
        <View  style ={AllStyles.NavBar}>
            <Image source={l_logo} style = {AllStyles.leftLogo}/>
            <Text style={AllStyles.Heading} >UCT Shuttle Services</Text>
            <Image source={r_logo} style ={AllStyles.rightLogo}/>
        </View>

        
        <View style={AllStyles.Salutations}>
        <Text style={AllStyles.Hi}>Hello!</Text><Text style={AllStyles.Welkom}> Welcome, Please enter login details</Text>
        </View>
        
        
    <View style={AllStyles.InputBoxes}> 
        <TextInput
            style={AllStyles.input}
            placeholder="Enter email"
            value={email}
            onChangeText={(text) => setEmail(text.trim())}
        />
                

        <TextInput
            style={AllStyles.input}
            placeholder="Enter password"
            value={password}
            onChangeText={(text) => setPassword(text.trim())}
            secureTextEntry={true}
        />
    </View>

        <Text style = {AllStyles.Role}>User Role:</Text>
        
        <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        searchable={true}
        placeholder="Choose your Role"
        style={AllStyles.dropdown}
        dropDownContainerStyle={AllStyles.dropdownContainer}
        listMode="SCROLLVIEW" // Use a scroll view to display the items
        searchablePlaceholder="Type to search..."
        searchableError="No items found"
      />
    <View style={AllStyles.buttonContainer}>
        <TouchableOpacity style={AllStyles.btnLogin} onPress={logginIn}>
            <Text style={AllStyles.textBtn}>Login</Text>
        </TouchableOpacity>
        
    
        <TouchableOpacity style={AllStyles.btnSignIn} onPress={SignUp}>
            <Text style={AllStyles.textBtn}>Sign Up</Text>
        </TouchableOpacity>

    </View>
    </View>
        
    );
}
export default LoginPage;