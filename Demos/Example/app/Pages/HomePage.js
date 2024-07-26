import { Button, StyleSheet, Text, View, } from 'react-native';

function HomeScreen({navigation}) {
    return (
      <View style={styles.container}>
  
        <View style={styles.heading}>
        <Text style = {styles.pageHeading}>  </Text>
        </View>
        
        <View style={styles.body}>
        <Button style = {styles.button} title= "Inspection" onPress = {() => navigation.navigate("Inspection")}/>
        </View>
  
      </View>
    );
  }
  
  const styles = StyleSheet.create({
  
    container: { 
      flex: 1,
      alignItems: 'center',
    },
  
    heading:{
      marginTop: 20,
    },
  
    pageHeading: {
      alignItems: 'center',
    },
  
    body:{
      justifyContent: 'center',
      marginTop: 150,
    },
  
    button: {
      flex: 1,
      border: 1,
      backgroundColor: 'blue',
      width: 100,
      height: 100,
    },
  
  });
  export default HomeScreen
