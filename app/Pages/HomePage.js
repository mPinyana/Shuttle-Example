import React, { useEffect, useState,  useRef, useContext } from 'react';
import { Firebase_Auth,Firebase_DB } from '../../FirebaseConfig';
import { doc,getDoc, collection,getDocs,query,where, addDoc } from 'firebase/firestore';
import FleetCtrlTabs from '../routes/FleetCtrlTabs';








const HomePage = () => {




    return (

                <FleetCtrlTabs/>

    );
};

 

export default HomePage;
