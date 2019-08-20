import React, {Component} from 'react';
import {StyleSheet ,Text, View, TouchableOpacity, TextInput, AsyncStorage, Alert} from 'react-native';
import FirebaseUtils from '../firebaseUtils/FirebaseUtils'

export default class FeedbackScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            comment: '',
            rating: ''
        };  
        const { navigation } = this.props;
        this.handymanUsername = navigation.getParam('handymanUsername', 'ERROR');  
    }
    
    async createNewComment(){
        user = await AsyncStorage.getItem("user");
        user = JSON.parse(user);
        FirebaseUtils.createNewComment(user.username, this.handymanUsername, this.state.comment);
        this.props.navigation.goBack();
        Alert.alert('Notification', 'Successfully posted comment for handyman ' + this.handymanUsername + '.');
    }

    render(){
        return(
        <View style={{flex:1, flexDirection:'column', alignItems:'center', marginTop:30}}>
            <Text style={styles.mainTitle}>Leave feedback</Text>
            <TouchableOpacity activeOpacity={1} style={styles.userDataBar}>
                <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
                    <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <View style={styles.inputContainer}>
                            <TextInput 
                                multiline={true}
                                numberOfLines={40}
                                placeholder='Write comment...'
                                style={styles.areaInputContainer}
                                onChangeText={(comment) => this.setState({comment})}
                            />
                        </View>
                    </View>
                    <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.textLabel}>Rating</Text>
                            <TextInput 
                                placeholder='5'
                                keyboardType='decimal-pad'
                                style={styles.textInputContainer}
                                onChangeText={(rating) => this.setState({rating})}
                            />
                        </View>
                    </View>
                    <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <TouchableOpacity 
                            style={styles.buttonCancelContainer} 
                            onPress={() => {this.props.navigation.goBack()}}>
                            <Text style={{textAlign: 'center'}}>CANCEL</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.buttonConfirmContainer} 
                            onPress={this.createNewComment.bind(this)}
                        >
                            <Text style={styles.buttonTextContainer}>POST</Text>
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
        height: 300,
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
        borderRadius: 10,
        marginTop: 18,
        padding: 15,
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
        minWidth: 40,
        borderBottomWidth: 2,
        borderBottomColor: '#ededed'  
    },
    areaInputContainer:{
        alignSelf: 'center',
        textAlign: 'center',
        opacity: 0.8,
        color: 'white',
        backgroundColor: '#0080ee',
        height: 100,
        width: 200,
        borderRadius: 15
    }
});
