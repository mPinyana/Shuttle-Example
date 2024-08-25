import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, TouchableOpacity, Text, Alert } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { AllStyles } from '../shared/AllStyles';
import { useRoute } from '@react-navigation/native';

import { Firebase_DB } from '../../FirebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

const InteractiveTest = ({navigation}) => {

  const route = useRoute();
  const { inspection, updateInspections } = route.params;

  const colors = ['white', 'green', 'yellow']; // Define the color sequence

  const [blocks, setBlocks] = useState([
    { id: 0, colorIndex: 0 },
    { id: 1, colorIndex: 0 },
    { id: 2, colorIndex: 0 },
    { id: 3, colorIndex: 0 },
  ]);

  const handlePress = (id) => {
    setBlocks(blocks.map(block =>
      block.id === id
        ? { ...block, colorIndex: (block.colorIndex + 1) % colors.length }
        : block
    ));
  };

  const handleUpdateInspection = async () => {

    try {
      const inspectionRef = doc(Firebase_DB, 'Inspections', inspection.id);
      await updateDoc(inspectionRef, inspection);

      console.log('Inspection updated successfully');
      Alert.alert('', 'Inspection updated successfully');
    } catch (error) {
      console.error('Failed to update inspection:', error);
      Alert.alert('Failed to update inspection ', 'Unseccesfull :' + error);
    }
    finally {
      navigation.navigate("Inspections");
    }

  };


  return (
    <View style={AllStyles.container}>
      <Text style={AllStyles.Welkom}>Bus Sketch</Text>


      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>
        <Svg height="200" width="200">
          {blocks.map((block, index) => (
            <TouchableWithoutFeedback key={block.id} onPress={() => handlePress(block.id)}>
              <Rect
                x={index % 2 * 100}
                y={Math.floor(index / 2) * 100}
                width="100"
                height="100"
                fill={colors[block.colorIndex]}
                stroke="black"
              />
            </TouchableWithoutFeedback>
          ))}
        </Svg>
      </View>

      <View style={AllStyles.btnContainer}>
        <TouchableOpacity style={AllStyles.btn}
          onPress={() => handleUpdateInspection()}>
          <Text style={AllStyles.textBtn} >Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InteractiveTest;