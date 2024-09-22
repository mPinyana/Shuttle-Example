import React from 'react';
import {View, Text,TextInput,TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard} from 'react-native'; 

import  { useState } from 'react';
import { Firebase_Auth } from '../../FirebaseConfig';
import {  signInWithEmailAndPassword } from 'firebase/auth';
import { AllStyles, primaryColor}  from '../shared/AllStyles';



const l_logo = require("../assets/L_logo.png")
const r_logo = require("../assets/R_logo.png")




const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  

function LoginPage({navigation}) {
    
        
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);



    const auth = Firebase_Auth;
 

    const logginIn = async() => {


        if (!validateEmail(user.email)) {
            alert('Invalid email format');
            return;
          }

            setLoading(true);
            try{
                const response = await signInWithEmailAndPassword(auth, user.email.toString(), user.password.toString());
                console.log(response);
                navigation.navigate('Home',);
            }     
            catch(error){
                console.log(error);
                alert('Log in failed: '+ error.message);
            }
            finally{
                setLoading(false);
            }

    }

 
   


    return (

        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
                <View style ={AllStyles.container}>
                    
                    <View  style ={AllStyles.NavBar}>
                        <Image source={l_logo} style = {AllStyles.leftLogo}/>
                        <Text style={AllStyles.Heading} >UCT Shuttle Services
                        </Text>
                        <Image source={r_logo} style ={AllStyles.rightLogo}/>
                    </View>
                    
                    <View style={AllStyles.Salutations}>
                    <Text style={AllStyles.Hi}>Hello!</Text><Text style={AllStyles.Welkom}> Welcome, Please enter login details</Text>
                    </View>

                <View style={AllStyles.inputContainer}> 
                    <TextInput
                        style={AllStyles.input}
                        placeholder="Enter email"
                        value={user.email}
                        onChangeText={(text) => setUser({ ...user, email: text.trim() })}
                    />
                            

                    <TextInput
                        style={AllStyles.input}
                        placeholder="Enter password"
                        value={user.password}
                        onChangeText={(text) => setUser({ ...user, password: text.trim() })}
                        secureTextEntry={true}
                    />
                </View>
                        
                    <TouchableOpacity style={AllStyles.btnLogin} onPress={logginIn}>
                        <Text style={AllStyles.textBtn}>Login</Text>
                    </TouchableOpacity>
                    
                
                            <TouchableOpacity style={AllStyles.btnSignIn} onPress={() => navigation.navigate('SignUp')}>
                        <Text style={AllStyles.textBtn}>Sign Up</Text>
                    </TouchableOpacity>


                </View>

    </TouchableWithoutFeedback>

        
    );
}
export default LoginPage;