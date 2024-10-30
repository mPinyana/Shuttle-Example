import React, { useEffect, useState,  useRef, useContext } from 'react';

import FleetCtrlTabs from '../routes/FleetCtrlTabs';
//import { CurrentUserContext } from '../shared/CurrentUserContext';
import ManagerTabs from '../routes/ManagerTabs';

import { CurrentUserContext } from "../shared/CurrentUserContext";



const HomePage = () => {


    const {user,setUser} = useContext(CurrentUserContext);


    if(user.role === "Fleet Controller" ||user.role === "Driver"  ){
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
