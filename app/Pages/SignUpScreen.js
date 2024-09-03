import React from 'react';
import { StyleSheet ,View, Text,TextInput,TouchableOpacity, Image} from 'react-native'; 
import  { useState } from 'react';
import { Firebase_DB } from '../../FirebaseConfig';
import { Firebase_Auth } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { AllStyles, primaryColor}  from '../shared/AllStyles';
import DropDownPicker from 'react-native-dropdown-picker';


const l_logo = require("../assets/L_logo.png")
const r_logo = require("../assets/R_logo.png")
const background = require("../assets/uct buses.webp")


const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

function SignUpScreen(){

    const [user, setUser] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Driver', value: 'Driver' },
        { label: 'Fleet Controller', value: 'Fleet Controller' },
        {label: 'Management', value: 'Management'},
        
  ]);

    const auth = Firebase_Auth;
    //const navigation = useNavigation();


    // const [newUser, setNewUser] = useState('');

    const handleInputChange = (text, field) => {
        setUser({ ...user, [field]: text }); // Update specific car property
      };

    const handleFormSubmit = () => {
        console.log("User Created:", user);
        //setNewUser('');
      };

      const SignUp = async() => {

        if (!validateEmail(user.email)) {
            alert('Invalid email format');
            return;
          }

        setLoading(true);
        try{
            const userCredentials = await createUserWithEmailAndPassword(auth, user.email, user.password);
            const userID = userCredentials.user.uid;

            const userData = {
                id: userID,
                email: user.email,
                name: user.name,
                surname:user.surname
            }

            const userRef = doc(Firebase_DB, 'Profiles', userID);
            await setDoc(userRef, userData);

            setUser({ ...user, name: '' });
            setUser({ ...user, email: '' });
            setUser({ ...user, surname: '' });
            setUser({ ...user, password: '' });



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

        <View style={AllStyles.container}>

            <View  style ={AllStyles.NavBar}>
                <Image source={l_logo} style = {AllStyles.leftLogo}/>
                <Text style={AllStyles.Heading} >UCT Shuttle Services</Text>
                <Image source={r_logo} style ={AllStyles.rightLogo}/>
            </View>

        
            <View style={AllStyles.header}>
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
                    secureTextEntry={true}
                    />
            </View>

            
            <View style={AllStyles.rolesContainer}>
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
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                activeOpacity={0.8}
                style={styles.buttonSignup} 
                onPress={SignUp}
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