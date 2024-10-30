import React, { useState, useEffect } from 'react';
import { View, TouchableWithoutFeedback, TouchableOpacity, Text, Alert,Dimensions, Modal, FlatList, StyleSheet} from 'react-native';
import Svg, { Path, Rect,Line,Circle } from 'react-native-svg';
import { AllStyles,primaryColor } from '../../../shared/AllStyles';
import { useRoute, useNavigation } from '@react-navigation/native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AntDesign from '@expo/vector-icons/AntDesign';


import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';



const Front_See=({aspectRatio = 900/900})=>{


const navigation= useNavigation();
const route =useRoute();
const { inspection } = route.params;

 
const colors = ['white','yellow', '#fa0707'];
const [dimensions, setDimensions] = useState(Dimensions.get('window'));


const [isCommentModalVisible, setCommentModalVisible] = useState(false);
  const [comment, setComment] = useState('');

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

return (
<View style={AllStyles.container}>
    <View style={{width:svgWidth+80, height:svgHeight+160, justifyContent: 'center',alignItems: 'center'}}>
        <Svg height="100%" width="100%" viewBox="0 0 710 560">

       
        {inspection.frontSide.parts.map((part) => (
            <TouchableWithoutFeedback key={part.id} >
              {part.label === 'windscreen 1' || part.label === 'windscreen 2' ? (
                <Path
                  d={part.d}
                  fill={colors[part.damageLvl]}
                  stroke="black"
                  strokeWidth="3"
                />
              ) :(
                <Path
                  d={part.d}
                  fill={colors[part.damageLvl]}
                  stroke="black"
                  strokeWidth="1"
                />
              )  }
            </TouchableWithoutFeedback>
          ))} 

        
         <Rect x= "100" y="250" width="110" height="30" rx="10" ry="10" fill={"none"} stroke ={"black"} strokeWidth={1}/>
        <Rect x= "160" y="120" width="90" height="30" rx="4" ry="4" fill={"none"} stroke={"black"} strokeWidth={1}/>
        <Circle cx="350" cy="360" r="8" fill="black" />
        <Line x1="175" y1="420" x2="515" y2="420" stroke={"black"} strokeWidth={1} />

        <Circle cx="95" cy="390" r="4" fill={"none"} stroke={"black"}strokeWidth={1}/>
        <Circle cx="115" cy="405" r="4" fill={"none"} stroke={"black"} strokeWidth={1}/>
        <Circle cx="140" cy="420" r="4"  fill={"none"} stroke={"black"} strokeWidth={1}/>


        <Circle cx="595" cy="390" r="4"  fill={"none"} stroke={"black"} strokeWidth={1}/>
    <Circle cx="565" cy="405" r="4"  fill={"none"} stroke={"black"} strokeWidth={1} />
     <Circle cx="540" cy="420" r="4"   fill={"none"} stroke={"black"} strokeWidth={1} />
        </Svg>

        
    
    </View>




    <TouchableOpacity style={styles.btnComment} onPress={handleCommentButtonPress}>
          <FontAwesome name="comment" size={30} color="white" />
          {Object.keys(inspection.frontSide.comments).length > 0 && (
                <View style={AllStyles.badgeContainer}>
                  <Text style={AllStyles.badgeText}>
                    {Object.keys(inspection.frontSide.comments).length}
                  </Text>
                </View>
              )}
        </TouchableOpacity>

 
      <TouchableOpacity style={AllStyles.btnArrowR}    onPress={() => {
                                                             
                                                              if (inspection.fleetNo === '101' || inspection.fleetNo === '102') {
                                                                navigation.navigate('PassengerWchair_See', {inspection});
                                                              } else {
                                                                navigation.navigate('Passenger_See', {inspection
                                                                });}
                                                            }}>
      <AntDesign name="arrowright" size={30} color="white" />
      </TouchableOpacity>

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
                    data={inspection.frontSide.comments}
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
    bottom: 20,
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
    borderRadius: 20,
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
});

export default Front_See;