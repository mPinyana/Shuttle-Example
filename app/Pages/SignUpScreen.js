import React ,{ useState } from 'react';
import { StyleSheet ,View, Text,TextInput,TouchableWithoutFeedback,TouchableOpacity, Image,Keyboard} from 'react-native'; 
import { Firebase_DB, Firebase_Auth, Firebase_Storage} from '../../FirebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { AllStyles, primaryColor, secondaryColor}  from '../shared/AllStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import  Modal  from 'react-native-modal';
import * as FileSystem from 'expo-file-system';
import Toast from 'react-native-toast-message'; 



const defaultpfp = require("../assets/defaultpfp.png")



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
        role:'',
        profilePic:null
    });


    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Driver', value: 'Driver' },
        { label: 'Fleet Controller', value: 'Fleet Controller' },
        {label: 'Management', value: 'Management'},   
    ]);

    const imageSource = image ? { uri: image } : defaultpfp;
    

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
      setModalVisible(false);
    };

    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
        setModalVisible(false);
      };


    const handleInputChange = (text, field) => {
        setUser({ ...user, [field]: text }); // Update specific  property
      };

 
      const auth = Firebase_Auth;
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
                surname:user.surname,
                role:value,
                profilePic:imageSource
            }

           
            if (imageSource) {
                let imageBlob;
                if (imageSource === defaultpfp) {
                  // If it's the default image, read it as a blob
                  const response = await fetch(Image.resolveAssetSource(defaultpfp).uri);
                  imageBlob = await response.blob();
                } else if (imageSource.uri) {
                  // If it's a photo taken/picked by the user
                  const response = await fetch(imageSource.uri);
                  imageBlob = await response.blob();
                }
          
                if (imageBlob) {
                  const storageRef = ref(Firebase_Storage, `profile_pictures/${userID}`);
                  const uploadResult = await uploadBytes(storageRef, imageBlob);
                  const downloadURL = await getDownloadURL(uploadResult.ref);
                  
                  // Add the download URL to userData
                  userData.pfp = downloadURL;
                }
              }


            const userRef = doc(Firebase_DB, 'Profiles', userID);
            await setDoc(userRef, userData);

            setUser({
                name: '',
                email: '',
                surname: '',
                password: '',
                role:''
              });



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

            setUser({
              name: '',
              email: '',
              surname: '',
              password: '',
              role:''
            });
        }
    }



    return(
        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss();setOpen(false);setModalVisible(false);} }>
        <View style={AllStyles.container}>
            <View style={AllStyles.pfp}>
                    <Image source={imageSource} style={{ backgroundColor: 'lightgrey',width:'100%', height:'100%', borderRadius:100, marginBottom:10, marginTop:'15%'}}  resizeMode="contain" />

                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Ionicons name="camera-outline" size={40} color={secondaryColor} />
                    </TouchableOpacity>
                    <Modal
                    animationType="none"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalView}>
                        <TouchableOpacity
                        style={AllStyles.btnClose}
                        onPress={()=> setModalVisible(false)}
                      >
                          <Ionicons name='close' size={24} color='black'/>
                      </TouchableOpacity>
                      
                      <TouchableOpacity style={styles.modalButton} onPress={takePhoto}>
                            <Text>Take Photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={pickImage}>
                            <Text>Choose from Library</Text>
                        </TouchableOpacity>
                        </View>
                    </Modal>
                  

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

            
            <View style={{flexDirection:'row', marginTop:'9%', marginLeft:'15%'}}>
                <Text style={{}}>User Role:</Text>
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
        </TouchableWithoutFeedback>

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
       // justifyContent:'flex-end',
        alignItems:'center',
       // paddingBottom: 20,

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
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      modalButton: {
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginVertical: 5,
        minWidth: 200,
        alignItems: 'center'
      }





   
})