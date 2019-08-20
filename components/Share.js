import React, {Component} from 'react';
import {StyleSheet ,Text, View, TouchableOpacity, Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Share extends Component {
    constructor(props){
        super(props);
    }

    navigateToFeedbackScreen(){
        this.props.navigation.navigate('FeedbackScreen',{
            handymanUsername: this.props.handymanUsername
        });
      }

    render(){
        return (
            <View style={{flex:1, flexDirection:'row', alignSelf:'center'}}>
                <TouchableOpacity 
                    style={styles.socialMediaButtons}
                    onPress={() => {Alert.alert('Notification', 'Shared on facebook!');}}
                >
                    <Ionicons name='logo-facebook' size={50} color={'#0080ff'}/>                
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.socialMediaButtons}                    
                    onPress={() => {Alert.alert('Notification', 'Shared on twitter!');}}
                >
                    <Ionicons name='logo-twitter' size={50} color={'#0080ff'}/>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.socialMediaButtons}
                    onPress={this.navigateToFeedbackScreen.bind(this)}
                >
                    <Text style={{textAlign:'center', paddingTop:'5%'}}>Rate handyman</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    socialMediaButtons:{
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5
    }
});