import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RegisterForm from '../components/RegisterForm';        

export default class RegisterScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>        
        <KeyboardAwareScrollView>
          <RegisterForm/>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#50a5d8',
    justifyContent: 'center', 
    alignItems: 'center'
  
  },
  title:{
    color:'white',
    width: 200,
    textAlign: 'center',
    opacity: 0.6,
    marginTop: 25,
  },
  inputContainer:{
    flex:0.3
  }
})
