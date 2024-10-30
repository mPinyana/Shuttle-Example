import { View, Text, TouchableOpacity, ScrollView, FlatList, StyleSheet,Dimensions } from "react-native";
import React, {useContext, useState, useEffect} from "react";
import { AllStyles, primaryColor,secondaryColor } from "../shared/AllStyles";
import { InspectContext } from "../shared/InspectionContext";
import { VehicleContext } from '../shared/VehicleContext';
import { ProfilesContext } from "../shared/ProfilesContext";
import { useRoute, useNavigation } from '@react-navigation/native';


const { width, height } = Dimensions.get('window');

export default function InspectPerBus(){

    const route = useRoute(); 
    const navigation = useNavigation();
    const {vehicles, setVehicles} = useContext(VehicleContext);
    const {inspections, setInspection} = useContext(InspectContext);
    const {profiles, setProfiles} = useContext(ProfilesContext);
    const {vehicle} = route.params; 
    const [busInspect, setInspects] = useState([]);


    useEffect(() => {
        if (vehicle?.inspections && inspections) {
       
            const filteredInspections = inspections.filter(inspection => 
                vehicle.inspections.includes(inspection.id)
            );
            setInspects(filteredInspections);
          
        }
    }, [vehicle, inspections]);
 

    const renderInspectedItem = ({ item,index }) => {
        const currentDate = new Date();
        const itemDate = new Date(item.time);

        const Driver = profiles.filter(user => user.email===item.driverEmail)[0];

        const fleetCtrl =profiles.filter(user => user.email===item.fleetCtrl_email)[0];
    
        const isToday =
            itemDate.getDate() === currentDate.getDate() &&
            itemDate.getMonth() === currentDate.getMonth() &&
            itemDate.getFullYear() === currentDate.getFullYear();
        
        const handleNext=()=>{
          if (Number(item.fleetNo) >= 200 && Number(item.fleetNo) < 300) {
            navigation.navigate('Driver_SmallSee', {
                inspection: item, vehicle
            });
          } else {
            navigation.navigate('Driver_See', {
                inspection: item, vehicle
            });}
        } 
    
        return (
            <TouchableOpacity
            onPress={handleNext}
             style={{ flexDirection: 'column', marginTop: 15, height: 60, width: '100%', marginBottom: 5, borderBottomWidth: 0.425, padding:width*0.03,justifyContent: 'flex-end' }}>
                <View style={{ marginBottom:5,flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 22, color:'#3593db' }}>
                        {itemDate.toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                        })}
                    </Text>
                    <Text style={{ fontSize: 15, color:secondaryColor }}>
                        {isToday ? 'Today' : `${String(itemDate.getDate()).padStart(2, '0')}/${String(itemDate.getMonth() + 1).padStart(2, '0')}`}
                    </Text>
                </View>
                <Text style={{ flexDirection:'row',fontSize: 14, color: 'grey' }}>
                            {'Driver : '}
                            <Text style={{ fontWeight: 'bold', }}>
                                {Driver.name} {Driver.surname}
                            </Text>
                            {'    Controller : '}
                            <Text style={{ fontWeight: 'bold' }}>
                                {fleetCtrl.name} {fleetCtrl.surname}
                            </Text>
                 </Text>
            </TouchableOpacity>
        );
    };


    return(
    
      <FlatList
        data={busInspect}
        renderItem={renderInspectedItem}
        
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{flexGrow:1,backgroundColor:'white'}}
      />
    
    );

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      //width x factor ensure proper spacing
      padding: width * 0.05,
      backgroundColor: '#f5f5f5',
    },
    welcomeText: {
      fontSize: width * 0.06,
      fontWeight: 'bold',
      marginBottom: height * 0.01,
    },
    subText: {
      fontSize: width * 0.04,
      color: 'gray',
      marginBottom: height * 0.02,
    },
    listContainer: {
      flexGrow: 1,
    },
    inspectItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 10,
      padding: width * 0.03,
      marginBottom: height * 0.02,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    inspectItemContent: {
      flex: 1,
    },
    fleetNoText: {
      fontSize: width * 0.045,
      fontWeight: 'bold',
      color: primaryColor,
      marginBottom: height * 0.005,
    },
    statusText: {
      fontSize: width * 0.035,
      color: 'black',
      fontStyle: 'italic',
      marginBottom: height * 0.005,
    },
    timeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    clockIcon: {
      marginRight: width * 0.01,
    },
    timeText: {
      fontSize: width * 0.03,
    },
    deleteIcon: {
      padding: width * 0.02,
    },
    moreIcon: {
      padding: width * 0.02,
    },
    addButton: {
      position: 'absolute',
      right: width * 0.05,
      bottom: height * 0.05,
      backgroundColor: 'white',
      borderRadius: 30,
      padding: width * 0.02,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
  });
  
