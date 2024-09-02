import { StyleSheet, Dimensions,  } from "react-native";



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

    backgroundImg:{
        flex:1,
        justifyContent: 'center',

    },

    buttonContainer: {
        height: 120,
        width:'100%',
        justifyContent:'space-evenly',
        alignItems: 'center',
    },

    btnLogin:{
    //     width:'60%',
    //     borderRadius:10,
    //     backgroundColor: primaryColor,
    //     padding: 10,
    //     marginBottom:'10%',
    //   //  marginLeft: '20%'
    height: '35%',
    width:'70%',
    backgroundColor: primaryColor,
    borderRadius: 20,
    justifyContent:'space-evenly',
    alignItems: 'center',
    marginVertical: 10, 
    },

    btnSignIn:{
    //     width:'60%',
    //     borderRadius:10,
    //     backgroundColor: secondaryColor,
    //     padding: 10,
    //   //  marginLeft: '20%'
        height: '35%',
        width:'70%',
        backgroundColor: secondaryColor,
        borderRadius: 20,
        justifyContent:'space-evenly',
        alignItems: 'center',
        marginVertical: 10, 

    },

    btnAdd:{
            position: 'absolute',
            width: 60,
            height: 60,
            alignItems: 'center',
            justifyContent:'center',
            right: 30,
            bottom: 50
    },
    btnClose: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
      },

    checklist:{
        flex:1,
        alignItems:'Center',
        marginBottom:30,
    },
    checkItem:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        top:'15%',
        left: '4%',
        justifyContent:'space-between'   
    },
    dropdown: {
        width: '50%',
        borderColor: 'darkgrey',
        borderWidth: 1,
        borderRadius: 10,
        marginLeft:'15%',
        marginBottom:'10%'
    },

    dropdownContainer: {
        width: '50%',
        borderColor: 'darkgrey',
        marginLeft:'15%',
        
      },
   
    Hi:{
       
        fontStyle:'Bold',
        fontSize:35,
        color:'#00308F',
    },

    Heading:{
        color:'#00308F',
        fontSize:22,
        top:7,
        // left:'22%',
        alignItems: 'center',
    }, 

    InputBoxes:{
        height: 132,
        width:'100%',
        justifyContent:'space-evenly',
        alignItems: 'center',
        paddingBottom: 10,
        
    },

    input:{
        // height: '6%',
        // width:'70%',
        // borderColor: 'darkgrey',
        // borderWidth:1,
        // paddingHorizontal: 15,
        // borderRadius:10,
        // marginBottom:'8%', 
        // //marginLeft: '15%'

        height: '30%',
        width: '85%',
        padding: 10,
        borderRadius: 20,
        justifyContent: 'space-evenly',
        marginVertical: '5%',
        borderColor: 'grey',
        borderWidth: 0.2,

    },
    inspectItem:{
        width:'95%',
        height:'7%',
        top:'6%',
        borderRadius:10,
        backgroundColor: primaryColor,
        justifyContent:'center',
        alignItems:'center'
    },
    label:{
       // fontStyle:'italic',
       //marginRight:'5%',
       fontSize:15
    },
   
    loader:{
        alignItems:'center',
        justifyContent: 'center'
    },
    loadText:{
        color:'yellow',
        fontSize:20
    },

    modal:{
        justifyContent:'flex-end',
        margin:0,
        
    },
    modalContent: {
       
        height: height * 0.7,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 15,
        borderWidth:1,
        borderColor:'grey',
      },

    // logoContainer:{
    //     height: 100,
    //     width:'100%',
    //     justifyContent: "space-evenly",
    //     alignItems: "center",
    // },


      leftLogo:{
        height:50,
        width:70,
        marginTop:5,
        
    },

    rightLogo:{
        height:50,
        width:70,
        marginTop:5,
        // marginLeft:40
    },
    
    NavBar: {
        // width:'100%',
        // height:'10%',
        // backgroundColor: '#fff',
        // justifyContent:'Top',
        // alignItems:'Center',
        // flexDirection: 'row',  

        flexDirection: 'row',  
        height: 100,
        width:'100%',
        justifyContent: "space-evenly",
        alignItems: "center",
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
        marginBottom:'10%'
    },
    section:{
        fontSize: 20,
        color:'black',
        alignItems:'center',
        top:'3%',
        fontWeight:'bold'
    },

    Welkom:{
        fontStyle:'bold',
        fontSize:18,
        color: primaryColor,
    }
})

export { primaryColor, secondaryColor, AllStyles };
