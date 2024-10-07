import React ,{ useState } from 'react';
import {View, Text,TextInput,TouchableOpacity,Alert, Image} from 'react-native'; 
import { AllStyles, primaryColor, secondaryColor}  from '../shared/AllStyles';
import { Firebase_DB } from '../../FirebaseConfig';
import { collection,getDocs,query,where, addDoc } from 'firebase/firestore';



const Vehicle=()=>{
  

    return(
        <View style = {AllStyles.container}>
    
        </View>
    );
}

export default Vehicle;

