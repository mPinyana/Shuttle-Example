import React ,{ useState,useContext } from 'react';
import {View, Text,TextInput,TouchableOpacity,TouchableWithoutFeedback,Alert,ScrollView,StyleSheet, Image, Keyboard,Animated} from 'react-native'; 
import { AllStyles, primaryColor, secondaryColor}  from '../shared/AllStyles';
import { Firebase_DB } from '../../FirebaseConfig';
import { collection,getDocs,query,where, addDoc,setDoc, doc } from 'firebase/firestore';
import { useRoute, useNavigation } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';// utilise "check"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';// will use the cross/cancel



import { VehicleContext } from '../shared/VehicleContext';


const Vehicle=()=>{

    const route = useRoute(); // Access the current route to get the params
    const navigation = useNavigation();
    const { vehicle } = route.params; 
    const [car, setCar] = useState(vehicle);

    const { vehicles, setVehicles } = useContext(VehicleContext);

    const [pop, setPop] = useState(false);

    const [isEditable, setIsEditable] = useState(false);

    const [confirm] = useState(new Animated.Value(40));
    const [cancel] = useState(new Animated.Value(40));

    const handleEdit = () => {
        setIsEditable(true); // Make the input active when pencil button is pressed
      };

    const handleInputChange = (text, field) => {
        setCar({ ...car, [field]: text }); // Update specific  property
      };
      
      const handleVehicleUpdate = async () => {
       
      
        // Filter out the current vehicle receiving updates
        const tester = vehicles.filter(carNow => carNow.fleetNo !== vehicle.fleetNo);
      
        // Check if user inserted a fleet number that already exists in the local vehicles array
        const tester2 = tester.filter(carNow => carNow.fleetNo === car.fleetNo);
      
        if (tester2.length > 0) {
          Alert.alert(
            'Fleet number already in use',
            'Fleet is already used for another vehicle. Please select a different one.'
          );
        } else {
          try {
            // Update the values locally
            setVehicles([
              ...vehicles.filter(carNow => carNow.fleetNo !== car.fleetNo),
              car
            ]);
      
            // Update Firestore with the modified vehicles array
            await setDoc(doc(Firebase_DB, 'vehicles', car.id), car);
      
            Alert.alert('Success', 'Vehicle details updated successfully!');
          } catch (error) {
            console.error("Error updating vehicle: ", error);
            Alert.alert('Error', 'There was an error updating the vehicle in the database.');
          }
        }
      };

      const popOut = () => {
        setPop(false);
        Animated.timing(confirm, {
          toValue: 40,
          duration: 500,
          useNativeDriver: false,
        }).start();
        Animated.timing(cancel, {
          toValue: 40,
          duration: 500,
          useNativeDriver: false,
        }).start();
      }

      const popIn = () => {
        setPop(true);
        Animated.timing(confirm, {
          toValue: 130,
          duration: 500,
          useNativeDriver: false,
        }).start();
        Animated.timing(cancel, {
          toValue: 110,
          duration: 500,
          useNativeDriver: false,
        }).start();
        
      }

    return(
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        <View style = {AllStyles.container}>

        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 30, marginTop:20,justifyContent: 'space-between'}}>
                    <Text style={{ marginRight: 100, fontSize:20}}>
                    Fleet number</Text>  

                <TextInput
                    keyboardType="numeric"
                    style={{
                        height: 45,
                        width: 100,
                        borderWidth: 1,
                        borderRadius: 10,
                        paddingHorizontal: 10 ,
                        borderColor:'grey',
                        borderColor: isEditable ? 'lightblue' : 'gray',
                        }}
                    placeholder={car.fleetNo}   
                    value={car.fleetNo}  
                    onChangeText={(text) => handleInputChange(text, 'fleetNo')}
                    editable={isEditable}
                />
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 30, marginTop:2, justifyContent: 'space-between' }}>
                    <Text style={{ marginRight: 150, fontSize:20}}>
                    Model</Text>  

                <TextInput
                   
                   style={{
                    height: 45,
                    width: 100,
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingHorizontal: 10 ,
                    borderColor:'grey',
                    borderColor: isEditable ? 'lightblue' : 'gray',
                    }}
                    placeholder={car.model}   
                    value={car.model}  
                    onChangeText={(text) => handleInputChange(text, 'model')}
                    editable={isEditable}
                />
        </View>


        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 30, marginTop:2 }}>
                    <Text style={{ marginRight: 30, fontSize:20}}>
                    Registration Number</Text>  

                <TextInput
                   
                   style={{
                    height: 45,
                    width: 100,
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingHorizontal: 10 ,
                    borderColor:'grey',
                    borderColor: isEditable ? 'lightblue' : 'gray',
                    }}
                    placeholder={car.regNo}   
                    value={car.regNo}  
                    onChangeText={(text) => handleInputChange(text, 'regNo')}
                    editable={isEditable}
                />
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 30, marginTop:2, justifyContent: 'space-Between' }}>
                    <Text style={{ marginRight: 90, fontSize:20}}>
                    Mileage (km)</Text>  

                <TextInput
                   keyboardType='Numeric'
                   style={{
                    height: 45,
                    width: 100,
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingHorizontal: 10 ,
                    borderColor:'grey',
                    borderColor: isEditable ? 'lightblue' : 'gray',
                    }}
                    placeholder={car.mileage}   
                    value={car.mileage}  
                    onChangeText={(text) => handleInputChange(text, 'mileage')}
                    editable={isEditable}
                />
        </View>

                <Animated.View style={[styles.confirm, { bottom: confirm}]}>
                    <TouchableOpacity
                    onPress={()=>handleVehicleUpdate()}
                    >
                    <FontAwesome name="check" size={24} color="white" />
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={[styles.cancel, { bottom: cancel, right: cancel}]}>
                    <TouchableOpacity
                    onPress={()=>{Keyboard.dismiss();pop === false ? popIn() : popOut();}} 
                    >
                    <Entypo name="cross" size={24} color="white" />
                    </TouchableOpacity>
                </Animated.View>

            <TouchableOpacity style={{width:70,height:70,borderRadius:15,position: 'absolute', alignItems: 'center', justifyContent:'center', right: 40, bottom: 30, backgroundColor:primaryColor}}
                    onPress={() => {
                        pop === false ? popIn() : popOut();
                        handleEdit();
                      }}
                    >
                     <MaterialCommunityIcons name="pencil" size={30} color="white" />
            </TouchableOpacity>
        </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    confirm: {
       backgroundColor: 'green',
       width: 45,
       height: 45,
       position: 'absolute',
       bottom: 35,
       right: 40,
       borderRadius: 50,
       justifyContent: 'center',
       alignItems: 'center',
    },
    cancel: {
        backgroundColor: 'red',
        width: 45,
        height: 45,
        position: 'absolute',
        bottom: 35,
        right: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
     }
  })

export default Vehicle;

