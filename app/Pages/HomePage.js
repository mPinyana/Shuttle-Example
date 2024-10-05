import React, { useEffect, useState,  useRef, useContext } from 'react';
import { Firebase_Auth,Firebase_DB } from '../../FirebaseConfig';
import { doc,getDoc, collection,getDocs,query,where, addDoc } from 'firebase/firestore';
import FleetCtrlTabs from '../routes/FleetCtrlTabs';
//import { CurrentUserContext } from '../shared/CurrentUserContext';
import ManagerTabs from '../routes/ManagerTabs';


import Search from './Search';
import InspectionStack from '../routes/InspectionStack';
//import React from 'react';
import { primaryColor } from '../shared/AllStyles';
import CustomHeader from '../shared/CustomHeader';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { LoaderContext } from "../shared/LoaderContext";
import { InspectContext } from "../shared/InspectionContext";
import { VehicleContext } from "../shared/VehicleContext";
import { CurrentUserContext } from "../shared/CurrentUserContext";





const HomePage = () => {


    const {user,setUser} = useContext(CurrentUserContext);


    if(user.role === "Fleet Controller"){
            return (
                    <FleetCtrlTabs/>
            );
    }
    else if(user.role === "Management"){
        return(
            <ManagerTabs/>
        );
    }
};

 

export default HomePage;
