import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, TextInput, Alert, TouchableOpacity} from 'react-native';
import FirebaseUtils from './../firebaseUtils/FirebaseUtils'

export default class ProcessRequestScreen extends Component {

    constructor(props){
        super(props);         
        const { navigation } = this.props;
        this.requestData = navigation.getParam('requestData', 'ERROR');  
    }

    getButtonLabelForRejecting(){
        if(this.requestData.status == 'pending'){
            return 'REJECT'
        }
        else if(this.requestData.status == 'confirmed'){
            return 'UNSUCCESSFUL'
        }
    }

    getButtonLabelForApproving(){
        if(this.requestData.status == 'pending'){
            return 'CONFIRM'
        }
        else if(this.requestData.status == 'confirmed'){
            return 'SUCCESSFUL'
        }
    }
    async approveRequest(){
        updatedRequestData = this.requestData;
        if(this.requestData.status == 'pending'){
            updatedRequestData.status = 'confirmed';
            await FirebaseUtils.updateRequest(updatedRequestData);
            Alert.alert('Notification', 'You have confirmed user request.');
            this.props.navigation.goBack();
        }
        else if(this.requestData.status == 'confirmed'){
            updatedRequestData.status = 'successful';
            await FirebaseUtils.updateRequest(updatedRequestData);
            Alert.alert('Notification', 'You have successfully finished the job.');
            this.props.navigation.navigate('HandymanJobsScreen');
        }
    }

    async rejectRequest(){
        updatedRequestData = this.requestData;
        if(this.requestData.status == 'pending'){
            updatedRequestData.status = 'rejected';
            await FirebaseUtils.updateRequest(updatedRequestData);
            Alert.alert('Notification', 'You have rejected user request.');
            this.props.navigation.navigate('HandymanJobsScreen');

        }
        else if(this.requestData.status == 'confirmed'){
            updatedRequestData.status = 'unsuccessful';
            await FirebaseUtils.updateRequest(updatedRequestData);
            Alert.alert('Notification', 'You have unsuccessfully finished the job.');
            this.props.navigation.navigate('HandymanJobsScreen');
        }

    }
    
    render() {
        return (
            <ScrollView>
              <Text style={styles.mainTitle}>Active request</Text>
              <View style={styles.requestShortInfo}>
                  <Text style={styles.requestName}>{this.requestData.user}</Text>
                  <Text style={styles.requestText}>Buyer</Text>
                  <TouchableOpacity style={styles.requestButton}>
                      <Text style={styles.requestButtonText}>{this.requestData.user[0]}</Text>
                  </TouchableOpacity> 
              </View>
              <View style={styles.separator}/>
              <View>
              <TouchableOpacity activeOpacity={1} style={styles.userDataBar}>
                      <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
                          <View style={styles.rowConntainer}>
                              <View style={styles.inputContainer}>
                                  <TextInput 
                                      editable={false}
                                      placeholder={this.requestData.number}
                                      style={styles.textInputContainer}
                                  />
                                  <Text style={styles.textLabel}>Tel. number</Text>
                              </View>
                              <View style={styles.inputContainer}>
                                  <TextInput 
                                      editable={false}
                                      placeholder={this.requestData.address} 
                                      style={styles.textInputContainer}
                                  />
                                  <Text style={styles.textLabel}>Address</Text>
                              </View>
                          </View>
                          <View style={styles.rowConntainer}>
                              <View style={styles.inputContainer}>
                                  <TextInput 
                                      editable={false}
                                      placeholder={this.requestData.startDate} 
                                      style={styles.textInputContainer}
                                  />
                                  <Text style={styles.textLabel}>Start date</Text>
                              </View>
                              <View style={styles.inputContainer}>
                                  <TextInput 
                                      editable={false}
                                      placeholder={this.requestData.endDate} 
                                      style={styles.textInputContainer}
                                  />
                                  <Text style={styles.textLabel}>Finish date</Text>
                              </View>
                          </View>
                          <View style={styles.rowConntainer}>
                              <View style={styles.inputContainer}>
                                  <TextInput 
                                      editable={false}
                                      placeholder={this.requestData.payment} 
                                      style={styles.textInputContainer}
                                  />
                                  <Text style={styles.textLabel}>Payment type</Text>
                              </View>
                              <View style={styles.inputContainer}>
                                  <TextInput 
                                      editable={false}
                                      placeholder={this.requestData.urgent? 'yes' : 'no' } 
                                      style={styles.textInputContainer}
                                  />
                                  <Text style={styles.textLabel}>Urgent</Text>
                              </View>
                          </View>
                          <View style={styles.rowConntainer}>
                              <Text>Status: <Text style={{fontWeight:'bold'}}>{this.requestData.status}</Text></Text>
                          </View>
                          <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                              <TouchableOpacity 
                                  style={styles.buttonRejectContainer} 
                                  onPress={this.rejectRequest.bind(this)}
                              >
                                  <Text style={styles.buttonTextContainer}>{this.getButtonLabelForRejecting()}</Text>
                              </TouchableOpacity>
                              <TouchableOpacity 
                                  style={styles.buttonConfirmContainer}
                                  onPress={this.approveRequest.bind(this)} 
                              >
                                  <Text style={styles.buttonTextContainer}>{this.getButtonLabelForApproving()}</Text>
                              </TouchableOpacity>
                          </View>
                          <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                              <TouchableOpacity 
                                  style={styles.buttonCancelContainer} 
                                  onPress={() => {this.props.navigation.goBack();}}
                              >
                                  <Text style={{textAlign: 'center'}}>CANCEL</Text>
                              </TouchableOpacity>
                          </View>
                      </View>
                  </TouchableOpacity>
              </View>
            </ScrollView>
          );
    }
}


const styles = StyleSheet.create({
    requestShortInfo: {
        padding: 15,
        paddingRight: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ededed',
        borderTopWidth: 1,
        borderTopColor: '#ededed',
        borderLeftWidth: 1,
        borderLeftColor: '#ededed',
        borderRightWidth: 1,
        borderRightColor: '#ededed',
        borderRadius: 5,
        marginTop: 10,
        marginLeft: '20%',
        marginRight: '20%'
    },
    separator:{
        borderBottomColor: '#efefef',
        borderBottomWidth: 1,
        marginTop: 5,
        marginLeft: '15%',
        marginRight: '15%'
    },
    mainTitle:{
        fontSize: 25,
        marginTop: 10,
        textAlign: 'center',
        opacity: 0.6
    },
    requestButton: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c0c0c0',
        padding: 10,
        top: '35%',
        left: '5%',
        borderRadius: 40,
        width: 45,
        height: 45
    },
    requestButtonText: {
        color: 'white'
    },
    requestName: {
        paddingLeft: '25%',
        fontWeight: 'bold',
        fontSize: 15,
    },
    requestText: {
        paddingLeft: '25%',
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
        borderRadius: 5,
        marginTop: 10,
        marginLeft: '10%',
        marginRight: '10%',
        alignItems: 'center',
        alignContent: 'center'
    },
    rowConntainer:{
        flex:1, 
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent:'center'
    }, 
    inputContainer:{
        flex: 0.5,
        flexDirection:'column', 
        margin: 3
    },
    textLabel: {
        paddingLeft: 15,
        paddingRight: 15,
        fontSize: 12,
        textAlign: 'center'
    },
    textInputContainer:{
        alignSelf: 'center',
        textAlign: 'center',
        opacity: 0.8,
        height: 40,
        minWidth: 80,
        borderBottomWidth: 2,
        borderBottomColor: '#ededed'  
    },
    buttonConfirmContainer:{
        alignSelf: 'center',
        backgroundColor: '#2283b7',
        borderRadius: 5,
        padding: 10,
        margin: 10,
        minWidth: 100
    },
    
    buttonRejectContainer:{
        alignSelf: 'center',
        backgroundColor: '#ea2f2f',
        borderRadius: 5,
        padding: 10,
        margin: 10,
        minWidth: 100
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
    dateButton:{
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        width: 100
    },
    datetextInputContainer:{
        alignSelf: 'center',
        textAlign: 'center',
        opacity: 0.8,
        height: 30,
        width: 80,
        borderBottomWidth: 2,
        borderBottomColor: '#ededed'  
    },
});

