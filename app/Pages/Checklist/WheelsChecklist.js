import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
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

const WheelsChecklist = ({ wheels, setWheels, setIsValid }) => {
  const handleCheckboxChange = (key) => {
    setWheels((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const handleSelectAll = (isChecked) => {
    const updatedWheels = Object.keys(wheels).reduce((acc, key) => {
      acc[key] = isChecked;
      return acc;
    }, {});
    setWheels(updatedWheels);
  };

  const isAllChecked = Object.values(wheels).every(value => value === true);

  useEffect(() => {
    const allChecked = Object.values(wheels).every(value => value === true);
    setIsValid(allChecked);
  }, [wheels, setIsValid]);

  return (
    <View style={AllStyles.container}>
    <View style={AllStyles.checklist}>
    <View style={[AllStyles.checkItem, { marginBottom: 10 }]}>
            <Text style={[AllStyles.label, { fontWeight: 'bold' }]}>Select All</Text>
            <BouncyCheckbox
              size={30}
              fillColor='green'
              unfillColor="#FFFFFF"
              isChecked={isAllChecked}
              onPress={(isChecked) => handleSelectAll(isChecked)}
              style={AllStyles.checkbox}
            />
          </View>

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
    </View>
  );
};

export default WheelsChecklist;