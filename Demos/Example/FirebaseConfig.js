// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"; 

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZF4NUdEqWdHVAb3fw59ZBlFuamx4SeP8",
  authDomain: "uctshuttle.firebaseapp.com",
  projectId: "uctshuttle",
  storageBucket: "uctshuttle.appspot.com",
  messagingSenderId: "314034881491",
  appId: "1:314034881491:web:4b4d51907c5bf1d3c66526",
  measurementId: "G-WRXQRVCBTR"
};

// Initialize Firebase
 const Firebase_App = initializeApp(firebaseConfig);
 const Firebase_Auth = initializeAuth(Firebase_App, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
 const Firebase_DB = getFirestore(Firebase_App);

 export { Firebase_App, Firebase_Auth, Firebase_DB };

  
