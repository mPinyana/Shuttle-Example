import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View,ScrollView, TouchableWithoutFeedback, TouchableOpacity,Animated, Text, Alert, Dimensions, FlatList, Modal, StyleSheet } from 'react-native';
import Svg, { Path, Rect, Circle, Polyline, Line, Text as SvgText, TSpan } from 'react-native-svg';
import { AllStyles,primaryColor } from '../../../shared/AllStyles';
import { useRoute } from '@react-navigation/native';


import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Passenger_See = ({ navigation, aspectRatio = 300 / 100 }) => {

    
  const route =useRoute();
  const { inspection} = route.params;
  

  const translation = useRef(new Animated.Value(-100)).current;
  const [headerShown, setHeaderShown] = useState(false);




  useEffect(() => {
    Animated.timing(translation, {
      toValue: headerShown ? 0 : -100,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [headerShown]);


  const colors = ['white', 'yellow', '#fa0707']; // Define the color sequence
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));



  const [isCommentModalVisible, setCommentModalVisible] = useState(false);
  const [comment, setComment] = useState(inspection.passengerSide.comment || '');

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  const screenWidth = dimensions.width;
  const screenHeight = dimensions.height;



 





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
         <ScrollView 
      onScroll={(event) => {
        const scrolling = event.nativeEvent.contentOffset.y;
        
        if (scrolling > 100) {
          setHeaderShown(true);
        } else {
          setHeaderShown(false);
        }
      }}
      // onScroll will be fired every 16ms
      scrollEventThrottle={16}
      style={{ flex: 1 }}
    >
        <Animated.View
        style={{
          pointerEvents:"box-none",
          position: 'absolute',
          alignItems:'center',
          justifyContent:'center',
          flexDirection:'row',
        //alignContent:'space-between',
          top: 0,
          left: 0,
          right: 0,
          borderBottomWidth:1,
          borderBottomColor:'grey',
          height: 70,
          width:'130%',
          backgroundColor: 'white',
          marginBottom:'3%',
          transform: [
            { translateX: translation },
          ],
        }}
      >
        
       
        <Text
        style={{
          color:primaryColor,
          fontSize:25,
          marginTop:'4%'
          //fontWeight:'bold',
         //S flexWrap: 'wrap'
        }}
        >
          Passenger's Side
        </Text>
      </Animated.View>

      <TouchableOpacity
          onPress={()=> navigation.navigate('Front_See', {
            inspection
          })}
          style={{
            padding: 10, // Make sure there is enough space to touch
          }}
        >
        <Ionicons name="arrow-back" size={26} color="black"
        style={{
          marginRight:'5%',
          marginTop:'4%',
          //paddingLeft:'10%',
        }} 
        />
        </TouchableOpacity>

      <View style={{ width: screenWidth, height: screenHeight, justifyContent: 'center', alignItems: 'center'}}>
        <Svg height="100%" width="100%" viewBox="-50 120 600 600">

          {inspection.passengerSide.parts.map((part) => (
            <TouchableWithoutFeedback key={part.id} onPress={() => handlePress(part.id)}>
              {part.d ? (
                <Path
                  d={part.d}
                  fill={colors[part.damageLvl]}
                  stroke="black"
                  strokeWidth="1"
                />
              ) : part.cx ? (
                <Circle
                  cx={part.cx}
                  cy={part.cy}
                  r={part.r}
                  fill={colors[part.damageLvl]}
                  stroke="black"
                  strokeWidth="1"
                />
              ) : part.label == 'Passenger door left' || part.label == 'Passenger door right'  ?(
                <Rect
                  x={part.x}
                  y={part.y}
                  width={part.width}
                  height={part.height}
                  rx={part.rx}
                  ry={part.ry}
                  fill={colors[part.damageLvl]}
                  stroke="black"
                  strokeWidth="4"
                />
              ) : (
                <Rect
                  x={part.x}
                  y={part.y}
                  width={part.width}
                  height={part.height}
                  rx={part.rx}
                  ry={part.ry}
                  fill={colors[part.damageLvl]}
                  stroke="black"
                  strokeWidth="1"
                />
              ) }
            </TouchableWithoutFeedback>
          ))}

          {/* Non-interactive elements */}
          <Path d="M 365 1050 Q 365 1085, 360 1080 Q 350 1090 , 325 1080 H 360" fill="none" stroke="black" strokeWidth="1" />
         
          <Rect x="220" y="870" width="20" height="50" fill={"none"} stroke={"black"} strokeWidth={2}/>

          <Polyline points="160,450 200,400 245,450" fill="none" stroke="#8c8f91" strokeWidth="4" />
          <SvgText font-family="Arial" fill="#8c8f91" transform="rotate(90 260,510)">
                <TSpan x="240" y="575" fontSize="25">UCT Shuttle</TSpan>
                <TSpan x="260" y="600" fontSize="18">Services</TSpan>
        </SvgText>
            <Polyline points="160,650 200,700 245,650"
                        fill="none" stroke="#8c8f91" strokeWidth="4" />
          
          <Line x1="160" y1="170" x2="90" y2="170" stroke="black" stroke-width="2" />
            <Line x1="160" y1="180" x2="90" y2="180" stroke="black" stroke-width="2" />
            <Line x1="160" y1="190" x2="90" y2="190" stroke="black" stroke-width="2" />
            <Line x1="160" y1="200" x2="90" y2="200" stroke="black" stroke-width="2" />
            <Line x1="160" y1="210" x2="90" y2="210" stroke="black" stroke-width="2" />
            <Line x1="160" y1="220" x2="90" y2="220" stroke="black" stroke-width="2" />
            <Line x1="160" y1="230" x2="90" y2="230" stroke="black" stroke-width="2" />
            <Line x1="160" y1="240" x2="90" y2="240" stroke="black" stroke-width="2" />
            <Line x1="160" y1="250" x2="90" y2="250" stroke="black" stroke-width="2" />
        <Path d="M 80 320 A 35,30 0 0,1 80,440" fill={"none"} stroke={"black"} />
        <Path d="M 80 800 A 35,30 0 0,1 80,920" fill={"none"} stroke='black'/>
        <Circle cx="80" cy="380" r="5" style="fill:black;stroke:black;stroke-width:1;" />
        <Circle cx="80" cy="860" r="5" style="fill:black;stroke:black;stroke-width:1;" />

        
        <Rect x="135" y="625" width="10" height="20" fill={"none"} stroke={"black"} strokeWidth={1.5}/>
        <Rect x="90" y="660" width="15" height="5" fill={"none"} stroke={"black"} strokeWidth={1.5} />
        <Rect x="90" y="750" width="15" height="5" fill={"none"} stroke={"black"} strokeWidth={1.5}/>

        <Line x1="80" y1="1050" x2="80" y2="920" stroke="black" stroke-width="1" />

        <Path d="M 80 930 H 150" fill="none" stroke="black" strokeWidth="1" /> 
        </Svg>

   
      </View>
      </ScrollView>


       

      <TouchableOpacity style={styles.btnComment} onPress={handleCommentButtonPress}>
          <FontAwesome name="comment" size={30} color="white" />
          {Object.keys(inspection.passengerSide.comments).length > 0 && (
                <View style={AllStyles.badgeContainer}>
                  <Text style={AllStyles.badgeText}>
                    {Object.keys(inspection.passengerSide.comments).length}
                  </Text>
                </View>
              )}
        </TouchableOpacity>

      <TouchableOpacity 
        style={AllStyles.btnArrowR}    
        onPress={() => {
         
          navigation.navigate('Back_See', {
            inspection
          });
        }}
      >
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
                    data={inspection.passengerSide.comments}
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
    left: 90,
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

export default Passenger_See;