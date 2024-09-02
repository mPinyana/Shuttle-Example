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

    btnLogin:{
        width:'60%',
        borderRadius:10,
        backgroundColor: primaryColor,
        padding: 10,
        marginBottom:'10%',
      
        
    },
    btnSignIn:{
        width:'60%',
        borderRadius:10,
        backgroundColor: secondaryColor,
        padding: 10,
    

    },
    btnAdd:{
            position: 'absolute',
            width: 60,
            height: 60,
            alignItems: 'center',
            justifyContent:'center',
            right: 30,
            bottom: 80
    },
    btnClose: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
      },
      btn:{
        //position: 'absolute',
        width:'50%',
        borderRadius:10,
        backgroundColor: primaryColor,
        padding: 10,
       // bottom: '%'
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
        width: '50%',
        borderColor: 'darkgrey',
        borderWidth: 1,
        borderRadius: 10,
        marginLeft:'15%',
        marginBottom:'30%'
    },

    dropdownContainer: {
        width: '50%',
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
        height: '6%',
        width:'70%',
        borderColor: 'darkgrey',
        borderWidth:1,
        paddingHorizontal: 15,
        borderRadius:10,
        marginBottom:'8%', 
        //marginLeft: '15%'

    },
    
    inspectItem:{
        width:'95%',
        height:'9%',
        top:'6%',
        //borderRadius:10,
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
       
        height: height * 0.8,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 15,
        borderWidth:2,
        borderColor:'#6495ED',
      },

      
    NavBar: {
        width:'100%',
        height:'10%',
        backgroundColor: '#fff',
        justifyContent:'space-between',
        alignItems:'Center',
        flexDirection: 'row',  
        
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
