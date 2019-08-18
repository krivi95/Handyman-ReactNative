import React from 'react';
import { StyleSheet ,Text, View, Image, ActivityIndicator, KeyboardAvoidingView  } from 'react-native';
import LoginForm from '../components/LoginForm'
        

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image 
            style={styles.logo}
            source={require('../assets/toolbox.png')}  
          />
          <Text style={styles.title}>Find and book a handyman in just a few clicks...</Text>
        </View>
        <View style={styles.inputContainer}>
          <LoginForm navigation={this.props.navigation}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    //backgroundColor: '#3498DB',
    backgroundColor: '#50a5d8',
  
  },
  logoContainer:{
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo:{
    width: 130,
    height: 150,
    opacity: 0.9
  },
  title:{
    color:'white',
    marginTop: 10,
    width: 160,
    textAlign: 'center',
    opacity: 0.6
  },
  inputContainer:{
    flex:0.3
  }
})