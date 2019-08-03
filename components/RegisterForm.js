import React, {Component} from 'react';
import {StyleSheet ,TextInput, Text, View, TouchableOpacity, Picker, Alert} from 'react-native';
import FirebaseUtils from '../firebaseUtils/FirebaseUtils'        

export default class RegisterForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        number: '',
        address: '',
        type: ''    
    }
  }

  async register(){
    if(!this.state.username || !this.state.password || !this.state.firstName || !this.state.lastName ||
         !this.state.number || !this.state.address || !this.state.type){             
            alert('Please enter all the information.');
    }
    else{
        user = await FirebaseUtils.getUserByName(this.state.username);
        if(user){
            alert('Username already taken. Please chose another username.');
            return;
        }
        FirebaseUtils.createNewUser(this.state.username, this.state.password, this.state.firstName, this.state.lastName,
                                    this.state.number, this.state.address, this.state.type);
        alert('Successfully registered.');
    }
    
        
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TextInput 
            style={styles.topContainer}
            placeholder='Username'
            placeholderTextColor='white'
            returnKeyType='next'
            onSubmitEditing = {() => this.password.focus()}
            onChangeText={(username) => this.setState({username})}
            autoCapitalize='none'
            autoCorrect={false}
        />
        <TextInput 
            style={styles.container}
            placeholder='Password'
            placeholderTextColor='white'
            secureTextEntry
            returnKeyType='next'
            onSubmitEditing = {() => this.firstName.focus()}
            ref={(input) => this.password=input}
            onChangeText={(password) => this.setState({password})}
        />
        
        <TextInput 
            style={styles.container}
            placeholder='First name'
            placeholderTextColor='white'
            returnKeyType='next'
            onSubmitEditing = {() => this.lastName.focus()}
            ref={(input) => this.firstName=input}
            onChangeText={(firstName) => this.setState({firstName})}
            autoCapitalize='none'
            autoCorrect={false}
        />
        <TextInput 
            style={styles.container}
            placeholder='Last name'
            placeholderTextColor='white'
            returnKeyType='next'
            onSubmitEditing = {() => this.number.focus()}
            ref={(input) => this.lastName=input}
            onChangeText={(lastName) => this.setState({lastName})}
            autoCapitalize='none'
            autoCorrect={false}
        />
        <TextInput 
            style={styles.container}
            placeholder='Tel. number'
            placeholderTextColor='white'
            keyboardType='phone-pad'
            returnKeyType='next'
            onSubmitEditing = {() => this.address.focus()}
            ref={(input) => this.number=input}
            onChangeText={(number) => this.setState({number})}
            autoCapitalize='none'
            autoCorrect={false}
        />        
        <TextInput 
            style={styles.container}
            placeholder='Address'
            placeholderTextColor='white'
            returnKeyType='go'
            ref={(input) => this.address=input}
            onChangeText={(address) => this.setState({address})}
            autoCapitalize='none'
            autoCorrect={false}
        />
        <Picker
            selectedValue={this.state.type}
            style={styles.container}
            onValueChange={(itemValue, itemIndex) =>
                this.setState({type: itemValue})
            }>
            <Picker.Item label="Type of user" value="" />
            <Picker.Item label="I need help with fixing" value="user" />
            <Picker.Item label="I can fix it" value="handyman" />
        </Picker>
        <TouchableOpacity 
        style={styles.buttonContainer}        
        onPress={this.register.bind(this)}
        >
            <Text style={styles.buttonTextContainer}>
                REGISTER
            </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topContainer:{
    alignSelf:'center',
    opacity: 0.8,
    marginBottom: 15,
    marginTop: 35,
    height: 40,
    width: 230,
    paddingHorizontal: 10,
    color: 'white',
    backgroundColor: '#8cc0dd',
    borderRadius: 5,
  },  
  container:{
      alignSelf:'center',
      opacity: 0.8,
      marginBottom: 15,
      height: 40,
      width: 230,
      paddingHorizontal: 10,
      color: 'white',
      backgroundColor: '#8cc0dd',
      borderRadius: 5,   
  },
  buttonContainer:{
      alignSelf: 'center',
      backgroundColor: '#2283b7',
      borderRadius: 5,
      padding: 10,
      width: 100
  },
  buttonTextContainer:{
      textAlign: 'center',
      color: 'white',
  }
});
