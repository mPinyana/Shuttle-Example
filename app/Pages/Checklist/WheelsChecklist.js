import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { AllStyles } from '../../shared/AllStyles';


const labelMap = {
    rimTyreDamage: "Check rim and tyres for visible damage",
    tyrePressure: "Check tyre pressure and remaining tread",
    oilLeaks: "Check oil leaks on wheel hubs",
    wheelNuts: "Check wheel nuts in place & secure",
    wheelCaps: "Check all missing wheel caps and extensions",
    wheelNutIndicator: "Check all wheel nut indicators are aligned",
    tyreAlignment: "Check abnormal tyre alignment",
};

const WheelsChecklist = ({ wheels, setWheels }) => {

  const handleCheckboxChange = (key) => {
    setWheels((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };



  return (
    <View style={AllStyles.checklist}>
      {Object.entries(wheels).map(([key, value]) => (
        <View key={key} style={AllStyles.checkItem}>
          <Text style={AllStyles.label}>{labelMap[key]}</Text>
          <BouncyCheckbox
            size={30}
            fillColor="green"
            isChecked={value}
            onPress={() => handleCheckboxChange(key)}
            style={AllStyles.checkbox}
          />
        </View>
      ))}
    </View>
  );
};

export default WheelsChecklist;