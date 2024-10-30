import React, { useState, useEffect, useRef } from 'react';
import { View,ScrollView, TouchableWithoutFeedback, TouchableOpacity,Animated, Text, Alert, Dimensions,FlatList, Modal, StyleSheet} from 'react-native';
import Svg, { Path, Rect, Circle, Polyline, Line, Text as SvgText, TSpan } from 'react-native-svg';
import { AllStyles, primaryColor } from '../../../shared/AllStyles';
import { useRoute, useNavigation } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';



const Driver_See = () => {

    
    const navigation= useNavigation();
    const route =useRoute();
    const { inspection} = route.params;

    const { vehicle} = route.params;
  
   
 
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
    const [comment, setComment] = useState(inspection.driverSide.comment || '');
  
  
  
  
    const screenWidth = dimensions.width;
    const screenHeight = dimensions.height;
    //const svgWidth = Math.min(screenWidth * 0.9, screenHeight * 0.9 * aspectRatio);
   //const svgHeight = svgWidth / aspectRatio;
  
  
  

  
  
  
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
            Driver's View
          </Text>
        </Animated.View>
        
      {/*   previous page navigation */}
        <TouchableOpacity
            onPress={()=>navigation.navigate('details', {vehicle})}
            style={{
              padding: 10, // Make sure there is enough space to touch
            }}
          >
          <Ionicons name="arrow-back" size={26} color="black"
          style={{
            marginRight:'5%',
            marginTop:'4%'
          }} 
          />
          </TouchableOpacity>
  
  
        <View style={{ width: screenWidth, height: screenHeight, justifyContent: 'center', alignItems: 'center'}}>
          <Svg height="100%" width="100%" viewBox="200 100 600 600">
  
            {inspection.driverSide.parts.map((part) => (
              <TouchableWithoutFeedback key={part.id} >
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
                ) : part.label == 'driver Door' ?(
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
            <Path d="M 630 1000 Q 630 1035, 625 1030 Q 615 1040, 590 1030 H 625" fill="none" stroke="black" strokeWidth="1" />
            <Path d="M 415 810 V 1000" fill="none" stroke="black" strokeWidth="1" /> 
  
            <Polyline points="495,380 465,350 435,380" fill="none" stroke="#8c8f91" strokeWidth="4" />
            <SvgText font-family="Arial" fill="#8c8f91" transform="rotate(90 465,395)">
                  <TSpan x="460" y="395" fontSize="25">UCT Shuttle</TSpan>
                  <TSpan x="493" y="422" fontSize="18">Services</TSpan>
          </SvgText>
              <Polyline points="495,530 465,560 435,530"
                          fill="none" stroke="#8c8f91" strokeWidth="4" />
            
          <Line x1="425" y1="120" x2="355" y2="120" stroke="black" stroke-width="2" />
          <Line x1="425" y1="130" x2="355" y2="130" stroke="black" stroke-width="2" />
          <Line x1="425" y1="140" x2="355" y2="140" stroke="black" stroke-width="2" />
          <Line x1="425" y1="150" x2="355" y2="150" stroke="black" stroke-width="2" />
          <Line x1="425" y1="160" x2="355" y2="160" stroke="black" stroke-width="2" />
          <Line x1="425" y1="170" x2="355" y2="170" stroke="black" stroke-width="2" />
          <Line x1="425" y1="180" x2="355" y2="180" stroke="black" stroke-width="2" />
          <Line x1="425" y1="190" x2="355" y2="190" stroke="black" stroke-width="2" />
          <Line x1="425" y1="200" x2="355" y2="200" stroke="black" stroke-width="2" />
          <Path d="M 345 270 A 35,30 0 0,1 345,390" fill={"none"} stroke={"black"} />
          <Path d="M 345 750 A 35,30 0 0,1 345,870" fill={"none"} stroke='black'/>
          <Circle cx="345" cy="330" r="5" style="fill:black;stroke:black;stroke-width:1;" />
          <Circle cx="345" cy="810" r="5" style="fill:black;stroke:black;stroke-width:1;" />
          <Rect x="400" y="575" width="10" height="20" fill={"none"} stroke={"black"} strokeWidth={1.5}/>
          <Rect x="355" y="610" width="15" height="5" fill={"none"} stroke={"black"} strokeWidth={1.5} />
          <Rect x="355" y="700" width="15" height="5" fill={"none"} stroke={"black"} strokeWidth={1.5}/>
          </Svg>
  
     
        </View>
        </ScrollView>
  
        <TouchableOpacity style={styles.btnComment} onPress={handleCommentButtonPress}>
          <FontAwesome name="comment" size={30} color="white" />
          {Object.keys(inspection.driverSide.comments).length > 0 && (
                <View style={AllStyles.badgeContainer}>
                  <Text style={AllStyles.badgeText}>
                    {Object.keys(inspection.driverSide.comments).length}
                  </Text>
                </View>
              )}
        </TouchableOpacity>
  
  
        <TouchableOpacity 
          style={AllStyles.btnArrowR}    
          onPress={() => navigation.navigate('Front_See',{inspection})}
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
                    data={inspection.driverSide.comments}
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
  
  
  export default Driver_See;