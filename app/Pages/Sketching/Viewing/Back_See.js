import React, { useState, useEffect,useRef } from 'react';
import { View, TouchableWithoutFeedback, TouchableOpacity, Text, Alert,Dimensions, FlatList, Modal,StyleSheet, ScrollView } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { AllStyles,primaryColor } from '../../../shared/AllStyles';

import { useRoute } from '@react-navigation/native';


import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';



const Back_See = ({navigation, aspectRatio = 350 / 320}) => {

  
  const route =useRoute();
  const { inspection } = route.params;



  const colors = ['white','yellow', '#fa0707'];
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));


  const [isCommentModalVisible, setCommentModalVisible] = useState(false);
  const [comment, setComment] = useState(inspection.backSide.comment || '');

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





  const handleCommentButtonPress = () => {
    setCommentModalVisible(true);
  };


  const renderComments = ({ item,index }) => {
    
  
    return (
            <View
            style={{ marginTop:10, height:130, borderBottomWidth:0.3}}
            >
                    <View
                    style={{flexDirection:'row',alignItems:'center', marginTop:10,marginLeft:15,height:30}}
                    >
                    <Text
                    style={{fontSize:19}}
                    >
                    {item.commenter.name} {item.commenter.surname}
                    </Text>

                    <Text
                    style={{fontSize:13}} 
                    >
                    {'\u2B24    '} 
                    </Text>


                    <Text
                    style={{fontStyle:'italic'}}
                    >
                    {item.commenter.email}
                    </Text>

                    </View>

                    <View
                    style={{
                      
                      width:'80%',
                      height:'60%',
                       marginTop:5,
                       padding:7,
                       marginLeft:30,
                       borderWidth:0.5,
                       borderRadius:15,
                       backgroundColor:'#f2f2f2'
                       }}
                    >
                      <Text
                      style={{fontSize:15}}
                      >
                        {item.text} 
                      </Text>
                    </View>
          </View>


    );
};

  

  return (
    <View style={AllStyles.container}>
    
      <View style={{ width: svgWidth, height: svgHeight,justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>
      <Svg height="100%" width="100%" viewBox="-15 0 350 320">
        {inspection.backSide.parts.map((part) => (
          <TouchableWithoutFeedback key={part.id} >
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

    
       

      <TouchableOpacity style={styles.btnComment} onPress={handleCommentButtonPress}>
          <FontAwesome name="comment" size={30} color="white" />
          {Object.keys(inspection.backSide.comments).length > 0 && (
                <View style={AllStyles.badgeContainer}>
                  <Text style={AllStyles.badgeText}>
                    {Object.keys(inspection.backSide.comments).length}
                  </Text>
                </View>
              )}
        </TouchableOpacity>

      <View style={AllStyles.btnContainer}>
        <TouchableOpacity style={AllStyles.btn}
          onPress={() =>navigation.navigate('home')}
          >
          <Text style={AllStyles.textBtn} >Close</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity 
          style={[AllStyles.btn, styles.viewButton]}
          onPress={handleViewInspectionDetails}
        >
          <Text style={AllStyles.textBtn}>View Details</Text>
        </TouchableOpacity> */}
    
      </View>
      

      <Modal
          animationType="slide"
          style={{flex:1}}
          transparent={true}
          visible={isCommentModalVisible}
          onRequestClose={() => setCommentModalVisible(false)}
        >
          
            <View style={{
                  marginTop:'80%',
                  height:'60%',
                  padding: 10,
                  backgroundColor: 'white',
                  borderRadius: 15,
                  borderWidth:2, 
                  borderColor:'#6495ED',
                  shadowColor: 'black',
                  shadowOffset: {
                      width: 0,
                      height: 2
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    //elevation: 5
            }}>
              
               <TouchableOpacity
                          style={AllStyles.btnClose}
                          onPress={()=> setCommentModalVisible(false)}
                        >
                            <Ionicons name='close' size={24} color='black'/>
                        </TouchableOpacity>
                  <Text style={{
                          fontSize:25,
                          
                        }}>Comments</Text>
                  <FlatList
                    data={inspection.backSide.comments}
                    renderItem={renderComments}
                       
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{
                      flexGrow:1,
                       
                      }}
                  />
             
             
            </View>
        
        </Modal>

    </View>
    
  );
  
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgContainer: {
    width: '90%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnCamera: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#007AFF',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnComment: {
    position: 'absolute',
    bottom: 70,
    left: 5,
    backgroundColor: '#007AFF',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnArrowR: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    height: 150,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    textAlignVertical: 'top'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  buttonSave: {
    backgroundColor: '#4CAF50',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  viewButton: {
    marginLeft: 0, // Add some space between Submit and View Details buttons
    backgroundColor: primaryColor,
    button:20,
    top:2
     // Use the primary color for consistency
  },
});

export default Back_See;