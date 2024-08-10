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
      //  marginLeft: '20%'
        
    },
    btnSignIn:{
        width:'60%',
        borderRadius:10,
        backgroundColor: secondaryColor,
        padding: 10,
      //  marginLeft: '20%'

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
       // top:'3%',
        alignItems:'Center',
      //  margin:4,
        marginBottom:300
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
        marginBottom:'30%'
    },

    dropdownContainer: {
        width: '50%',
        borderColor: 'darkgrey',
        marginLeft:'15%',
        
      },
   
    Hi:{
       
        fontStyle:'italic',
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
       fontSize:19
    },
    leftLogo:{
        height:50,
        width:70,
        marginTop:20
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

      
    NavBar: {
        width:'100%',
        height:'10%',
        backgroundColor: '#fff',
        justifyContent:'Top',
        alignItems:'Center',
        flexDirection: 'row',  
    },
    rightLogo:{
        height:50,
        width:70,
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
        alignItems:'center',
        top:'3%',
        fontWeight:'bold'
    },
    Welkom:{
        fontStyle:'italic',
        fontSize:22,
        color: primaryColor,
    }


})

export { primaryColor, secondaryColor, AllStyles };
