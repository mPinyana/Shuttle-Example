import React ,{ useState } from 'react';
import {View, Text,TextInput,TouchableOpacity,Alert, Image} from 'react-native'; 
import { AllStyles, primaryColor, secondaryColor}  from '../shared/AllStyles';
import { Firebase_DB } from '../../FirebaseConfig';
import { collection,getDocs,query,where, addDoc } from 'firebase/firestore';



const Vehicle=()=>{
    const [vehicle, setVehicle] = useState({
        fleetNo: '',
        regNo: '',
        model: '',
        type: '',
        mileage:'',
        inspections:[]
    });

    const handleInputChange = (text, field) => {
        setVehicle({ ...vehicle, [field]: text });
      };

     

      const handleAddvehicle =async ()=>{
        

        try {
          // Upload the inspection to Firestore
          const docRef = await addDoc(collection(Firebase_DB, 'vehicles'), vehicle);
    
          

          Alert.alert(
            'Vehice Added',
            `Vehicle was successfully added with ID: ${docRef.id}`,
            [{ text: 'OK' }]
          );
        } catch (e) {
          console.error('Error adding document: ', e);
    
          // Show error alert
          Alert.alert(
            'Error',
            'There was an error adding the inspection. Please try again.',
            [{ text: 'OK' }]
          );
        }

     


  }


    return(
        <View style = {AllStyles.container}>
            <View style={{marginTop:'10%'}}>
                <TextInput style={AllStyles.input}
                placeholder="Feet Number"
                value = {vehicle.fleetNo}
                onChangeText={(text) => handleInputChange(text, 'fleetNo')}
                />

                <TextInput style={AllStyles.input}
                placeholder="Registation Number"
                value = {vehicle.regNo}
                onChangeText={(text) => handleInputChange(text, 'regNo')}
                    />

                <TextInput style={AllStyles.input}
                placeholder="model"
                value = {vehicle.model}
                onChangeText={(text) => handleInputChange(text, 'model')}
                    />

                <TextInput style={AllStyles.input}
                placeholder="vehicle type "
                value = {vehicle.type}
                onChangeText={(text) => handleInputChange(text, 'type')}
                    />


                <TextInput style={AllStyles.input}
                placeholder="mileage "
                value = {vehicle.mileage}
                onChangeText={(text) => handleInputChange(text, 'mileage')}
                    />


                <TouchableOpacity 
                activeOpacity={0.8}
                style={AllStyles.btn} 
                onPress={handleAddvehicle}
                >
                <Text style={AllStyles.textBtn}>Add Vehice</Text>
                </TouchableOpacity>

                
                </View>
        </View>
    );
}

export default Vehicle;

