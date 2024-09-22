import { StyleSheet, Dimensions } from "react-native";



const {height } = Dimensions.get('window');
const primaryColor= '#004aad';
const secondaryColor = '#ff5757' ;

 const AllStyles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff',
        alignItems:'center',
        color:'#fff'

    },

    btn:{
        //position: 'absolute',
        width:'50%',
        borderRadius:10,
        backgroundColor: primaryColor,
        padding: 10,
       // bottom: '%'
      },
      btnAdd:{
        position: 'absolute',
        alignItems: 'center',
        justifyContent:'center',
        right: '10%',
        bottom: '10%'
},

btnArrowR:{
    position: 'absolute',
    alignItems: 'center',
    justifyContent:'center',
    right: '5%',
    bottom: '7%',
    borderRadius:50,
    backgroundColor: primaryColor,
    padding:10
},

btnBackArrow:{
    position: 'absolute',
    alignItems: 'center',
    justifyContent:'center',
    left: '3%',
    top: '7%',
    borderRadius:50,
    backgroundColor: 'white',
    padding:10
},
btnCamera:{
    position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent:'center',
        right: '5%',
        bottom: '19%',


    borderRadius:50,
    backgroundColor: primaryColor,
    padding:10
},
btnClose: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  btnContainer:{
    position:'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor:'white',
    height:'10%',
    width:'100%',
    justifyContent:'center',
    alignItems:'center'
       },

    btnLogin:{
        width:'60%',
        top:'15%',
        borderRadius:10,
        backgroundColor: primaryColor,
        padding: 10,
        marginBottom:'10%',
      
        
    },
    btnSignIn:{
        width:'60%',
        top:'15%',
        borderRadius:10,
        backgroundColor: secondaryColor,
        padding: 10,
    

    }, 
    checklist:{
        flex:1,
        width:'100%',
        alignItems:'Center',
        padding:10
    
    },
    checkItem:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        //top:'15%',
        //left: '2%',
        justifyContent:'space-between'
        
    },
    dropdown: {
        width: '55%',
        borderColor: 'darkgrey',
        borderWidth: 1,
        borderRadius: 10,
        marginLeft:'15%',
        marginBottom:'20%',
        //marginTop:'5%',
    },

    dropdownContainer: {
        width: '55%',
        borderColor: 'darkgrey',
        marginLeft:'15%',
        
      },
   
    Hi:{
        fontSize:35,
        color:'#00308F',
    },

    Heading:{
        color:'#00308F',
        fontSize:22,
        top:30,
        left:'22%',
        
    }, 

    input:{
        height: 50,
        width:300,
        borderColor: 'darkgrey',
        borderWidth:1,
        paddingHorizontal: 15,
        borderRadius:10,
        marginBottom:'8%', 
        //marginLeft: '15%'

    },
    
    inspectItem:{
        width:'100%',
        height:'9%',
        top:'6%',
        backgroundColor: 'white',
        alignItems:'center',
        marginBottom:'3%',
        borderTopWidth:0.5,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    inspectionFeild:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:20
    },
    label:{
       // fontStyle:'italic',
       //marginRight:'5%',
       fontSize:19,
       width:'80%'
    },
    leftLogo:{
        height:'70%',
        width:'16%',
        marginTop:20
    },
    modal:{
        justifyContent:'flex-end',
        margin:0,  
    },
    modalContent: {
       
       height: height * 0.6,
        padding: 20,
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
          elevation: 5
      },

      
    NavBar: {
        width:'100%',
        height:'10%',
        backgroundColor: '#fff',
        justifyContent:'space-between',
        alignItems:'Center',
        flexDirection: 'row',  
        
    },

    pfp:{
       //borderRadius:100,
        width:145,
        height:145,
        marginBottom:'5%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'5%',
    
    },
    rightLogo:{
        height:'70%',
        width:'16%',
        marginTop:20,
        marginLeft:40
    },

    Role:{
        marginBottom:'2%',
       marginLeft: '-53%'
    },
    textBtn: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        
    },
    Salutations:{
        alignItems:'center',
        width:'100%',
        top:'2%',
        marginBottom:'20%'
    },
    section:{
        fontSize: 20,
        color:'black',
       // alignItems:'center',
        top:'3%',
        fontWeight:'bold',
       
        marginBottom:'8%'
    },
    Welkom:{
       
        fontSize:22,
        color: primaryColor,
    }


})

export { primaryColor, secondaryColor, AllStyles };
