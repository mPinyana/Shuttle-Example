import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { AllStyles } from '../../shared/AllStyles';


const EngineAirChecklist = ({ engineAir, setEngineAir }) => {
    const labelMap = {
        checkEngineOilLevel: "Check Engine Oil Level",
        engineCoolantLevel: "Operator Engine Coolant Level",
        drainAirTanks: "Drain Air Tanks",
    };

    return (
        <View style={AllStyles.checklist}>
          {Object.entries(labelMap).map(([key, label]) => (
            <View key={key} style={AllStyles.checkItem}>
              <Text style={AllStyles.label}>{label}</Text>
              <BouncyCheckbox
                size={30}
                fillColor="green"
                isChecked={engineAir[key]}
                onPress={() =>
                  setEngineAir((prevState) => ({
                    ...prevState,
                    [key]: !prevState[key]
                  }))
                }
                style={AllStyles.checkbox}
              />
            </View>
          ))}
        </View>
      );
    };
    
    export default EngineAirChecklist;



