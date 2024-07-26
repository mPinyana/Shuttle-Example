import { createStackNavigator } from "@react-navigation/stack";
import inspection from "../Pages/Inspections";
import docPage from "../Pages/Documentation_inspectionCh"; // 1/7
import driverCompartmentPage from '../Pages/DriverCompartment_inspectCh'; // 2/7
import interiorPage from '../Pages/Interior_InspectionCh'; // 3/7
import engineAirPage from '../Pages/EngineAir_InspectCh'; // 4/7
import wheelsPage from '../Pages/Wheels_InspectionCh'; // 5/7
import bodyWorksPage from '../Pages/BodyWorks_InspectionCh'; // 6/7
import electricPage from '../Pages/Electric_InspectionCh'; // 7/7


const Stack = createStackNavigator();

function InspectionStack(){

    return(
            <Stack.Navigator initialRouteName="Inspection">
                <Stack.Screen name="Inspections" component={inspection} options={{
                            headerLeft: ()=>null,
                            headerTitleAlign: 'center',
                            headerTitleStyle: { color: '#004aad',
                                fontSize: 32      
                        },
                        headerStyle:{borderBottomWidth: 2,}
                       

                }}/>
                <Stack.Screen name="Documentation" component={docPage} options={{
                                title:'Inspection Checklist (1/7)',
                                headerTitleStyle: { color: '#004aad',
                                    fontSize: 25,
                                },
                                headerStyle:{borderBottomWidth: 2,}
                }}/>
                <Stack.Screen name="DiversCompartment" component={driverCompartmentPage }
                        options={{
                            title:'Inspection Checklist (2/7)',
                            headerTitleStyle: { color: '#004aad',
                                fontSize: 25,
                            },
                            headerStyle:{borderBottomWidth: 2,}
                }}/>
                <Stack.Screen name="Interior" component={interiorPage }
                    options={{
                        title:'Inspection Checklist (3/7)',
                        headerTitleStyle: { color: '#004aad',
                            fontSize: 25,
                        },
                        headerStyle:{borderBottomWidth: 2,}
                    }}/>
                <Stack.Screen name="engineAir" component={ engineAirPage}
                        options={{
                            title:'Inspection Checklist (4/7)',
                            headerTitleStyle: { color: '#004aad',
                                fontSize: 25,
                            },
                            headerStyle:{borderBottomWidth: 2,}
                        }}
                        
                        />
                <Stack.Screen name="wheels" component={wheelsPage} 
                    options={{
                        title:'Inspection Checklist (5/7)',
                        headerTitleStyle: { color: '#004aad',
                            fontSize: 25,
                        },
                        headerStyle:{borderBottomWidth: 2,}
                    }}
                />
                <Stack.Screen name="bodyWorks" component={bodyWorksPage} 
                    options={{
                        title:'Inspection Checklist (6/7)',
                        headerTitleStyle: { color: '#004aad',
                            fontSize: 25,
                        },
                        headerStyle:{borderBottomWidth: 2,}
                    }}
                
                
                />
                <Stack.Screen name="electric" component={electricPage} 
                    options={{
                        title:'Inspection Checklist (7/7)',
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



