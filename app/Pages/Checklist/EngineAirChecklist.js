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

    const handleSelectAll = (isChecked) => {
        const updatedEngineAir = Object.keys(engineAir).reduce((acc, key) => {
            acc[key] = isChecked;
            return acc;
        }, {});
        setEngineAir(updatedEngineAir);
    };

    const areAllChecked = Object.values(engineAir).every(value => value === true);

    return (
        <View style={AllStyles.checklist}>
            <View style={AllStyles.checkItem}>
                <Text style={[AllStyles.label, { fontWeight: 'bold' }]}>Select All</Text>
                <BouncyCheckbox
                    size={30}
                    fillColor="green"
                    isChecked={areAllChecked}
                    onPress={(isChecked) => handleSelectAll(isChecked)}
                    style={AllStyles.checkbox}
                />
            </View>
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