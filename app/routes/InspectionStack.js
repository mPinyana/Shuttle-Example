import { createStackNavigator } from "@react-navigation/stack";
import inspection from "../Pages/Inspections";
import docPage from "../Pages/Checklist/Documentation_inspectionCh"; // 1/7
import driverCompartmentPage from '../Pages/Checklist/DriverCompartment_inspectCh'; // 2/7
import interiorPage from '../Pages/Checklist/Interior_InspectionCh'; // 3/7
import engineAirPage from '../Pages/Checklist/EngineAir_InspectCh'; // 4/7
import wheelsPage from '../Pages/Checklist/Wheels_InspectionCh'; // 5/7
import bodyWorksPage from '../Pages/Checklist/BodyWorks_InspectionCh'; // 6/7
import electricPage from '../Pages/Checklist/Electric_InspectionCh'; // 7/7
import CustomHeader from '../shared/CustomHeader';


const Stack = createStackNavigator();

function InspectionStack(){

    return(
            <Stack.Navigator initialRouteName="Inspection">
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
                <Stack.Screen name="engineAir" component={ engineAirPage}
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
                <Stack.Screen name="electric" component={electricPage} 
                    options={{
                        title:'Checklist (7/7)',
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



