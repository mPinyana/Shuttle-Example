import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableWithoutFeedback, TouchableOpacity, Text, Alert,Dimensions, TextInput, Modal } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { AllStyles, primaryColor } from '../../shared/AllStyles';
import { useRoute } from '@react-navigation/native';

import { Firebase_DB } from '../../../FirebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

const BackView = ({navigation, aspectRatio = 350 / 320}) => {


  const route =useRoute();
  const { inspection, updateInspections } = route.params;

  const [back_Side, setBackSide] = useState(inspection.backSide);

  useEffect(() => {

    updateInspections({
      ...inspection,
      backSide: back_Side,
    });
  }, [back_Side]);


  const colors = ['white','yellow', '#fa0707'];
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [BackParts, setBack] = useState([
    { id:'1B1',
      label: 'top mid back Bar', 
      d: "M20 17 Q 150 1, 300 17 L300,40 Q 150 15,20 40 L20,17", damageLvl: 0 },
    { id:'1B2',
      label: 'Top left Side Bar', 
      d: "M20 17 L20,30 Q 15 50,20 150 L5,150 Q 0 10,20 18", damageLvl: 0 },
    { id:'1B3',
      title: 'Upper mid sheet', 
      d: "M20 30 Q 15 50,20 150 L 300,150 Q 305 50,300 30 Q 150 15,20 30 M 25 50 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 M 25 70 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 M 280 50 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 M 280 70 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0", damageLvl: 0 },
    { id:'1B4',
      title: 'top right Side Bar', 
      d: "M300 17 L 300,30 Q 305 50,300 150 L 315, 150 Q 320 10, 300 18", damageLvl: 0 },
    { id:'1B5',
      title: 'Center horizontal bar', 
      d: "M5 150 H 315 V 170 H 5 V 150", damageLvl: 0 },
    { id:'1B6',
      title: 'Middle Sheet', 
      d: "M20 170 L 40,170 Q 150 200 ,280 170 L 300,170 Q 305 195 ,300 220 H 20 Q 15 195,20 170", damageLvl: 0 },
    { id :'1B7',
      title: 'Left Mid Bar', 
      d: "M5 170 H 20 Q 15 195,20 220 H 5 Q 0 225, 5 170", damageLvl: 0 },
    { id:'1B8',
      title: 'Right Mid Bar',
      d: "M315 170 H 300 Q 305 195 ,300 220 H 315 Q 320 225, 315 170", damageLvl: 0 },
    { id:'1B9',
      title: 'Bottom Sheet', 
      d: "M300 220 Q 290 270 ,280 280 H 45 Q 25 260, 20 220 M130,250 H 190 V 265 H 130 V 250", damageLvl: 0 },
    { id:'1B10',
      title: 'Left Back Lights', 
      d: "M20 220 H 3 Q 4 280, 15 280 H 45 Q 25 260, 20 220 M 6 230 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 M 11 250 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 M 19 270 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0", damageLvl: 0 },
    { id:'1B11',
      id: 'Right Back Lights', 
      d: "M300 220 H 317 Q 320 280, 300 280 H 280 Q 290 270 ,300 220 M 303 230 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 M 298 250 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 M 290 270 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0", damageLvl: 0 },
    { id:'1B12',
      title: 'Bottom left back bumper', 
      d: "M5 250 Q 0 289 ,45 280 V 310 H 9 Z M 20 295 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0", damageLvl: 0 },
    { id:'1B13',
      title: 'Middle bottom bumper', 
      d: "M45 280 H 280 V 310 H 45 M 90 289 L 97, 305 H 105 L 97, 289 H 90  M 220 289 L 210, 305 H 218L 228,289 Z", damageLvl: 0 },
    { id:'1B14',
      title: 'Bottom right back Bumper', 
      d: "M280 280 Q 315 288 , 316 258 V 310 H 280 M 290 295 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0", damageLvl: 0 },
  ]);

  const [isCommentModalVisible, setCommentModalVisible] = useState(false);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  const screenWidth = dimensions.width;
  const screenHeight = dimensions.height;
  const svgWidth = Math.min(screenWidth * 0.9, screenHeight * 0.9 * aspectRatio);
  const svgHeight = svgWidth / aspectRatio;

  const handlePress = (id) => {
    setBack(BackParts.map(part => 
      part.id === id 
        ? { ...part, damageLvl: (part.damageLvl + 1) % colors.length }
        : part
    ));
  };

  const handleCommentButton = () => {
    setCommentModalVisible(true);
  };

  const handleSaveComment = () => {
    setBackSide(prevBackSide => ({
      ...prevBackSide,
      comment: comment
    }));
    setCommentModalVisible(false);
    Alert.alert('Comment Saved', 'Your comment has been saved successfully.');
  };
/*  handleDamageLog=()=>{
    setBackSide({...back_Side, parts:BackParts})
  }
  */

  const handleDamageLog = () => {
    return new Promise((resolve) => {
      setBackSide((prevBackSide) => {
        const updatedBackSide = { ...prevBackSide, parts: BackParts };
        resolve(updatedBackSide); // Resolving the updated state
        return updatedBackSide;   // Returning the updated state
      });
    });
  };

  const handleUpdateInspection = async () => {
    try {
      const updatedBackSide = await handleDamageLog();  // Wait for `back_Side` to be updated
  
      const updatedInspection = {
        ...inspection,
        backSide: updatedBackSide, 
        inspStatus:'Complete',  // Now we use the updated backSide
      };
  
      const inspectionRef = doc(Firebase_DB, 'Inspections', inspection.id);
      await updateDoc(inspectionRef, updatedInspection);  // Update Firestore with synced state
  
      console.log('Inspection updated successfully');
      Alert.alert('', 'Inspection updated successfully');
    } catch (error) {
      console.error('Failed to update inspection:', error);
      Alert.alert('Failed to update inspection ', 'Unsuccessful: ' + error);
    } finally {
      navigation.navigate("Inspections");
    }
  };
  


  return (
    <View style={AllStyles.container}>
    


      <View style={{ width: svgWidth, height: svgHeight,justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>
      <Svg height="100%" width="100%" viewBox="-15 0 350 320">
        {BackParts.map((part) => (
          <TouchableWithoutFeedback key={part.id} onPress={() => handlePress(part.id)}>
            <Path
              d={part.d}
              fill={colors[part.damageLvl]}
              stroke="black"
              strokeWidth="1"
            />
          </TouchableWithoutFeedback>
        ))}
      </Svg>
      </View>

      <TouchableOpacity style ={AllStyles.btnCamera}>
          <SimpleLineIcons name="camera" size={30} color="white" />
      </TouchableOpacity>

      <View style={AllStyles.btnContainer}>
        <TouchableOpacity style={AllStyles.btn}
          onPress={() => {handleDamageLog();handleUpdateInspection()}}>
          <Text style={AllStyles.textBtn} >Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[AllStyles.btn, { marginLeft: 10 }]}
          onPress={handleCommentButton}
        >
          <Text style={AllStyles.textBtn}>Comment</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isCommentModalVisible}
        onRequestClose={() => setCommentModalVisible(false)}
      >
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            onChangeText={setComment}
            value={comment}
            placeholder="Enter your comment"
            multiline
          />
          <TouchableOpacity
            style={[AllStyles.btn, styles.saveButton]}
            onPress={handleSaveComment}
          >
            <Text style={AllStyles.textBtn}>Save Comment</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = {
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  btn: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  input: {
    height: 100,
    width: '100%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    textAlignVertical: 'top'
  },
  saveButton: {
    marginTop: 10,
    width: '100%',
  }
};
export default BackView;