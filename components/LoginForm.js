import React, {Component} from 'react';
import {StyleSheet ,TextInput, Text, View, TouchableOpacity, Alert} from 'react-native';
import FirebaseUtils from '../firebaseUtils/FirebaseUtils'

export default class LoginForm extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''    
        }
    }

    async logIn() {
        if(!this.state.username || !this.state.password){
            alert('Please enter username and password.');
        }
        else{
            user = await FirebaseUtils.getUserByName(this.state.username);
            if(!user){
                alert('Wrong username or password.');
            }
            if(this.state.password != user.password){
                alert('Wrong username or password.');
            }
            else{
                alert('Successful login!');
            }
        }
    }
    render() {
        return (
            <View>
                <TextInput 
                    style={styles.container}
                    placeholder='username'
                    placeholderTextColor='white'
                    returnKeyType='next'
                    onSubmitEditing = {() => this.password.focus()}
                    onChangeText={(username) => this.setState({username})}
                    autoCapitalize='none'
                    autoCorrect={false}
                />
                <TextInput 
                    style={styles.container}
                    placeholder='password'
                    placeholderTextColor='white'
                    secureTextEntry
                    returnKeyType='go'
                    ref={(input) => this.password=input}
                    onChangeText={(password) => this.setState({password})}
                />
                <TouchableOpacity 
                    style={styles.buttonContainer}
                    onPress={this.logIn.bind(this)}
                >
                    <Text style={styles.buttonTextContainer}>
                        LOGIN
                    </Text>
                </TouchableOpacity>
            </View>   
            
        );
    }
}

const styles = StyleSheet.create({
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

