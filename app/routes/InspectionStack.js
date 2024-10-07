//Atchitecture 
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState, useContext } from 'react';


//Checlisting
import inspection from "../Pages/Inspections";
import docPage from "../Pages/Checklist/Documentation_inspectionCh"; // 1/7
import driverCompartmentPage from '../Pages/Checklist/DriverCompartment_inspectCh'; // 2/7
import interiorPage from '../Pages/Checklist/Interior_InspectionCh'; // 3/7
import electricPage from '../Pages/Checklist/Electric_InspectionCh'; // 4/7
import engineAirPage from '../Pages/Checklist/EngineAir_InspectCh'; // 5/7
import wheelsPage from '../Pages/Checklist/Wheels_InspectionCh'; // 6/7
import bodyWorksPage from '../Pages/Checklist/BodyWorks_InspectionCh'; // 7/7
//Sketching
import FrontView from "../Pages/Sketching/FrontView";
import BackView from "../Pages/Sketching/BackView";
import DriverSide from "../Pages/Sketching/DriverSide";
import PassengerSide from "../Pages/Sketching/PassengerView";
import CustomHeader from '../shared/CustomHeader';
import PassengerWchair from "../Pages/Sketching/PassengerWchair";
    //Small bus (volaire)
import BackSmall from "../Pages/Sketching/SmallBus/BackSmall";
import DriverSmall from "../Pages/Sketching/SmallBus/DriverSmall";
import FrontSmall from "../Pages/Sketching/SmallBus/FrontSmall";
import PassengerSmall from "../Pages/Sketching/SmallBus/PassengerSmall";







const Stack = createStackNavigator();



function InspectionStack(){


    

    return(
                
                        <Stack.Navigator initialRouteName="Inspections">
                            <Stack.Screen name="Inspections" component={inspection} options={{
                                        headerLeft: ()=> <CustomHeader /*navigation={navigation}*//>,
                                        headerTitleAlign: 'center',
                                        headerShown: true,
                                        headerTitleStyle: { color: '#004aad',
                                            fontSize: 32      
                                    },
                                    headerStyle:{borderBottomWidth: 2,}
                                

                            }}/>
                        
                            <Stack.Screen name="Documentation" component={docPage} options={{
                                            title:'Checklist (1/7)',
                                            headerTitleStyle: { color: '#004aad',
                                                fontSize: 25,
                                            },
                                            headerStyle:{borderBottomWidth: 2,}
                            }}/>
                            <Stack.Screen name="DiversCompartment" component={driverCompartmentPage }
                                    options={{
                                        title:'Checklist (2/7)',
                                        headerTitleStyle: { color: '#004aad',
                                            fontSize: 25,
                                        },
                                        headerStyle:{borderBottomWidth: 2,}
                            }}/>
                            <Stack.Screen name="Interior" component={interiorPage }
                                options={{
                                    title:'Checklist (3/7)',
                                    headerTitleStyle: { color: '#004aad',
                                        fontSize: 25,
                                    },
                                    headerStyle:{borderBottomWidth: 2,}
                                }}/>
                            <Stack.Screen name="electric" component={ electricPage}
                                    options={{
                                        title:'Checklist (4/7)',
                                        headerTitleStyle: { color: '#004aad',
                                            fontSize: 25,
                                        },
                                        headerStyle:{borderBottomWidth: 2,}
                                    }}
                                    
                                    />
                            <Stack.Screen name="wheels" component={wheelsPage} 
                                options={{
                                    title:'Checklist (5/7)',
                                    headerTitleStyle: { color: '#004aad',
                                        fontSize: 25,
                                    },
                                    headerStyle:{borderBottomWidth: 2,}
                                }}
                            />
                            <Stack.Screen name="bodyWorks" component={bodyWorksPage} 
                                options={{
                                    title:'Checklist (6/7)',
                                    headerTitleStyle: { color: '#004aad',
                                        fontSize: 25,
                                    },
                                    headerStyle:{borderBottomWidth: 2,}
                                }}
                            
                            />
                            <Stack.Screen name="engineAir" component={engineAirPage} 
                                options={{
                                    title:'Checklist (7/7)',
                                    headerTitleStyle: { color: '#004aad',
                                        fontSize: 25,
                                    },
                                    headerStyle:{borderBottomWidth: 2,}
                                }}
                            />
                            <Stack.Screen name="FrontView" component={FrontView} 
                                options={{
                                    title:'Front View',
                                    headerTitleStyle: { color: '#004aad',
                                        fontSize: 25,
                                    },
                                    headerStyle:{borderBottomWidth: 2,}
                                }}
                            />
                                <Stack.Screen name="DriverSide" component={DriverSide} 
                                    options={({ route }) => ({
                                        title: 'Driver\'s side',
                                        headerTitleStyle: { 
                                            color: '#004aad',
                                            fontSize: 25,
                                        },
                                        headerStyle: { 
                                            borderBottomWidth: 2,
                                        },
                                        headerShown: false, // Use the param to control visibility
                                    })}
                                />
                                    <Stack.Screen name="PassengerSide" component={PassengerSide} 
                                    options={({ route }) => ({
                                        title: 'Passener\'s side',
                                        headerTitleStyle: { 
                                            color: '#004aad',
                                            fontSize: 25,
                                        },
                                        headerStyle: { 
                                            borderBottomWidth: 2,
                                        },
                                        headerShown: route.params?.headerVisible ?? false, // Use the param to control visibility
                                    })}
                                />
                                       <Stack.Screen name="PassengerWchair" component={PassengerWchair} 
                                    options={ {headerShown:  false,} }
                                />
                            <Stack.Screen name="BackView" component={BackView} 
                                options={{
                                    title:'BackSide',
                                    headerTitleStyle: { color: '#004aad',
                                        fontSize: 25,
                                    },
                                    headerStyle:{borderBottomWidth: 2,}
                                }}
                            />
                            <Stack.Screen name="FrontSmall" component={FrontSmall} 
                                options={{
                                    title:'Front Side',
                                    headerTitleStyle: { color: '#004aad',
                                        fontSize: 25,
                                    },
                                    headerStyle:{borderBottomWidth: 2,}
                                }}
                            />
                            <Stack.Screen name="DriverSmall" component={DriverSmall} 
                                    options={({ route }) => ({
                                     
                                        headerShown: false, 
                                    })}
                                />
                            <Stack.Screen name="PassengerSmall" component={PassengerSmall} 
                                    options={({ route }) => ({
                                     
                                        headerShown: false, 
                                    })}
                                />
                            <Stack.Screen name="BackSmall" component={BackSmall} 
                                options={{
                                    title:'Back Side ',
                                    headerTitleStyle: { color: '#004aad',
                                        fontSize: 25,
                                    },
                                    headerStyle:{borderBottomWidth: 2,}
                                }}
                            />
                        </Stack.Navigator>
               
    )

}

export default InspectionStack;



