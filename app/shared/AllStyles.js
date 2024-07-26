import { StyleSheet } from "react-native";


export const AllStyles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'white',
        alignItems:'center'

    },

    btnLogin:{
        width:'60%',
        borderRadius:10,
        backgroundColor: '#004aad',
        padding: 10,
        marginBottom:'10%',
        marginLeft: '20%'
        
    },

    btnSignIn:{
        width:'60%',
        borderRadius:10,
        backgroundColor: '#ff5757',
        padding: 10,
        marginLeft: '20%'

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
        width: '40%',
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
        marginLeft: '15%'

    },
    inspectItem:{
        width:'95%',
        height:'7%',
        top:'6%',
        borderRadius:10,
        backgroundColor: '#004aad',
        justifyContent:'center',
        alignItems:'center'
    },
    label:{
        fontStyle:'italic',
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
    NavBar: {
        width:'100%',
        height:'10%',
        backgroundColor: 'white',
        justifyContent:'Top',
        alignItems:'Center',
       // borderBottomWidth: 2,
      // borderBottomColor: 'darkgrey', 
        flexDirection: 'row',  
    },
    rightLogo:{
        height:50,
        width:70,
        marginTop:20,
        marginLeft:30
    },

    Role:{
        marginBottom:'2%',
       // marginRight:'50%'
       marginLeft: '15%'
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
        color: '#004aad',
    }

      





})