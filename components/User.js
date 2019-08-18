import React, {Component} from 'react';
import {StyleSheet ,Text, View, TouchableOpacity, TextInput, AsyncStorage} from 'react-native';
import FirebaseUtils from '../firebaseUtils/FirebaseUtils'

export default class User extends Component {

    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            number: '',
            address: '',
            oldPassword: '',
            newPassword: '',
            newPasswordRepeated: ''
        };    
    }
    
    clearInputs(newUserData){
        this.setState({
            firstName: '',
            lastName: '',
            number: '',
            address: '',
            oldPassword: '',
            newPassword: '',
            newPasswordRepeated: ''
        });
        this.props.userData = newUserData;
    }

    shouldChangePassword(){
        if(this.state.oldPassword == '' || this.state.newdPassword == '' || this.state.newPasswordRepeated == ''){
            if(this.state.oldPassword != '' || this.state.newdPassword != '' || this.state.newPasswordRepeated != ''){
                alert('Please enter correcct password.');
            }
            return false;
        }
        return true;
    }

    validateNewPassword(){
        if(this.state.oldPassword != this.props.userData.password){
            alert('Please enter correct old password.');
            return false;
        }
        if(this.state.newPassword != this.state.newPasswordRepeated){
            alert('Please repeat new password twice.');
            return false;
        }
        return true;
    }

    changePassword(newUserData){
        if(this.shouldChangePassword()){
            if(this.validateNewPassword()){
                newUserData.password = this.state.newPassword;
            }
            else{
                return;
            }
        }
    }

    updateAccountData(newUserData){
        if(this.state.firstName != ''){
            newUserData.firstName = this.state.firstName;
        }
        if(this.state.lastName != ''){
            newUserData.lastName = this.state.lastName;
        }
        if(this.state.number != ''){
            newUserData.number = this.state.number;
        }
        if(this.state.address != ''){
            newUserData.address = this.state.address;
        }
        return newUserData;
    }

    async saveUserData(){
        let newUserData = this.props.userData;
        this.changePassword(newUserData);
        this.updateAccountData(newUserData);
        AsyncStorage.setItem("user", JSON.stringify(newUserData));
        FirebaseUtils.updateUser(newUserData);
        this.clearInputs(newUserData);
        alert('Successfully updated account information.');
    }

    render(){
        return(
        <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
            <Text style={styles.mainTitle}>Edit Account</Text>
            <TouchableOpacity activeOpacity={1} style={styles.userDataBar}>
                <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
                    <View style={styles.rowConntainer}>
                        <View style={styles.inputContainer}>
                            <TextInput 
                                value={this.state.firstName}
                                placeholder={this.props.userData.firstName} 
                                style={styles.textInputContainer}
                                onChangeText={(firstName) => this.setState({firstName})}
                            />
                            <Text style={styles.textLabel}>First name</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput 
                                value={this.state.lastName}
                                placeholder={this.props.userData.lastName} 
                                style={styles.textInputContainer}
                                onChangeText={(lastName) => this.setState({lastName})}
                            />
                            <Text style={styles.textLabel}>Last name</Text>
                        </View>
                    </View>
                    <View style={styles.rowConntainer}>
                        <View style={styles.inputContainer}>
                            <TextInput 
                                value={this.state.number}
                                placeholder={this.props.userData.number} 
                                style={styles.textInputContainer}
                                keyboardType = 'phone-pad'
                                onChangeText={(number) => this.setState({number})}
                            />
                            <Text style={styles.textLabel}>Number</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput 
                                value={this.state.address}
                                placeholder={this.props.userData.address} 
                                style={styles.textInputContainer}
                                onChangeText={(address) => this.setState({address})}
                            />
                            <Text style={styles.textLabel}>Address</Text>
                        </View>
                    </View>
                    <Text style={styles.subtitle}>Change password:</Text>
                    <TextInput 
                        style={styles.textInputContainer} 
                        placeholder='Old password' 
                        secureTextEntry 
                        onChangeText={(oldPassword) => this.setState({oldPassword})}
                    />
                    <TextInput 
                        style={styles.textInputContainer} 
                        placeholder='New password' 
                        secureTextEntry
                        onChangeText={(newPassword) => this.setState({newPassword})}
                    />
                    <TextInput 
                        style={styles.textInputContainer} 
                        placeholder='Repeat new password' 
                        secureTextEntry
                        onChangeText={(newPasswordRepeated) => this.setState({newPasswordRepeated})}
                    />
                    <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <TouchableOpacity 
                            style={styles.buttonCancelContainer} 
                            onPress={() => {this.props.navigation.navigate('HomeStack')}}>
                            <Text style={{textAlign: 'center'}}>CANCEL</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.buttonConfirmContainer} 
                            onPress={this.saveUserData.bind(this)}>
                            <Text style={styles.buttonTextContainer}>SAVE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
        );
    }
}

const styles = StyleSheet.create({ 
    rowConntainer:{
        flex:1, 
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent:'center'
    }, 
    inputContainer:{
        flexDirection:'column', 
        margin: 3
    },
    textLabel: {
        paddingLeft: 15,
        paddingRight: 15,
        fontSize: 12,
        textAlign: 'center'
    },
    userDataBar: {
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        width: '80%',
        height: 450,
        borderBottomWidth: 2,
        borderBottomColor: '#ededed',

        borderBottomWidth: 4,
        borderBottomColor: '#ededed',
        borderTopWidth: 2,
        borderTopColor: '#ededed',
        borderLeftWidth: 1,
        borderLeftColor: '#ededed',
        borderRightWidth: 1,
        borderRightColor: '#ededed',
        borderRadius: 5,
        marginTop: 10,
        marginLeft: '10%',
        marginRight: '10%',
        alignItems: 'center',
        alignContent: 'center'
    },
    mainTitle:{
        fontSize: 25,
        marginTop: 10,
        textAlign: 'center',
        opacity: 0.6
    },
    subtitle:{
        fontSize: 18,
        marginTop: 10,
        textAlign: 'center',
        opacity: 0.6
    },
    buttonConfirmContainer:{
        alignSelf: 'center',
        backgroundColor: '#2283b7',
        borderRadius: 5,
        padding: 10,
        margin: 10,
        width: 100
    },
    buttonCancelContainer:{
        alignSelf: 'center',
        backgroundColor: '#ededed',
        borderRadius: 5,
        padding: 10,
        width: 100
    },
    buttonTextContainer:{
        textAlign: 'center',
        color: 'white',
    },
    textInputContainer:{
        alignSelf: 'center',
        textAlign: 'center',
        opacity: 0.8,
        height: 40,
        minWidth: 80,
        borderBottomWidth: 2,
        borderBottomColor: '#ededed'  
    }
});
