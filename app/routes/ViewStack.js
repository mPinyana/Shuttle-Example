import React from 'react';
import Fleet from '../Pages/Fleet';
import VehicleTopTabs from './VehicleTopTabs';

import Driver_See from '../Pages/Sketching/Viewing/Driver_See';
import Front_See from '../Pages/Sketching/Viewing/Front_See';
import Passenger_See from '../Pages/Sketching/Viewing/Passenger_See';
import PassengerWchair_See from '../Pages/Sketching/Viewing/PasssengerWChair_See';
import Back_See from '../Pages/Sketching/Viewing/Back_See';

import Driver_SmallSee from '../Pages/Sketching/Viewing/SmallV/Driver_SmallSee';
import Front_SmallSee from '../Pages/Sketching/Viewing/SmallV/Front_SmallSee';
import Passenger_SmallSee from '../Pages/Sketching/Viewing/SmallV/Passenger_SmallSee';
import Back_SmallSee from '../Pages/Sketching/Viewing/SmallV/Back_SmallSee';

import { createStackNavigator } from "@react-navigation/stack";



const Stack = createStackNavigator();
const ViewStack=()=>{
  

    return(
        <Stack.Navigator initialRouteName="Vehicles">
            <Stack.Screen name="home" component={Fleet} options={{
                                            title:'Fleet',
                                            headerTitleAlign: 'center',
                                            headerTitleStyle: { color: '#004aad',
                                                fontSize: 25,
                                                
                                            },
                                            headerStyle:{borderBottomWidth: 2,},
                                            headerShown:true,
                                            headerLeft: () => null
                            }}/>
            <Stack.Screen name="details" component={VehicleTopTabs} options={{
                                 //title:'Vehicle',
                                            headerTitleStyle: { color: '#004aad',
                                                fontSize: 25,
                                            },
                                            headerStyle:{borderBottomWidth: 2,},
                                            headerShown:true,
                            }}/>
            <Stack.Screen name="Driver_See" component={Driver_See} 
                                    options={({  headerShown: false, 
                                    })}
                                />
            <Stack.Screen name="Front_See" component={Front_See} 
                                options={{
                                    title:'Front View',
                                    headerTitleStyle: { color: '#004aad',
                                        fontSize: 25,
                                    },
                                    headerStyle:{borderBottomWidth: 2,}
                                }}
                            />
            <Stack.Screen name="Passenger_See" component={Passenger_See} 
                                options={{
                                    headerShown:false
                                }}
                            />
            <Stack.Screen name="PassengerWchair_See" component={PassengerWchair_See} 
                                options={{
                                    headerShown:false
                                }}
                            />
            <Stack.Screen name="Back_See" component={Back_See} 
                                options={{
                                    title:'Back View',
                                    headerTitleStyle: { color: '#004aad',
                                        fontSize: 25,
                                    },
                                    headerStyle:{borderBottomWidth: 2,}
                                }}
                            />
            <Stack.Screen name="Driver_SmallSee" component={Driver_SmallSee} 
                                    options={({  headerShown: false, 
                                    })}
                                />
           <Stack.Screen name="Front_SmallSee" component={Front_SmallSee} 
                                options={{
                                    title:'Front View',
                                    headerTitleStyle: { color: '#004aad',
                                        fontSize: 25,
                                    },
                                    headerStyle:{borderBottomWidth: 2,}
                                }}
                            />
            <Stack.Screen name="Passenger_SmallSee" component={Passenger_SmallSee} 
                                options={{
                                    headerShown:false
                                }}
                            />
            <Stack.Screen name="Back_SmallSee" component={Back_SmallSee} 
                                options={{
                                    title:'Back View',
                                    headerTitleStyle: { color: '#004aad',
                                        fontSize: 25,
                                    },
                                    headerStyle:{borderBottomWidth: 2,}
                                }}
                            />
            
    </Stack.Navigator>
        
    );
}

export default ViewStack;

