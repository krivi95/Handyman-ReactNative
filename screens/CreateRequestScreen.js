import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Picker, CheckBox, AsyncStorage} from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
import FirebaseUtils from './../firebaseUtils/FirebaseUtils'
        

export default class CreateRequest extends React.Component {

  constructor(props){
    super(props);         
    const { navigation } = this.props;
    this.handymanData = navigation.getParam('handymanData', 'ERROR');    
    this.state = {
        isDateTimePickerVisible: false,
        isCurrentDateStartDate: true,
        startDate: '',
        endDate: '',
        address: '',
        number: '',
        urgent: false,
        paymentType: ''
    };
  }

  showStartDateTimePicker = () => {
    this.setState({ 
        isDateTimePickerVisible: true, 
        isCurrentDateStartDate: true
        });
    };

    showEndDateTimePicker = () => {
        this.setState({ 
            isDateTimePickerVisible: true,
            isCurrentDateStartDate: false 
        });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        if(this.state.isCurrentDateStartDate){
            this.setState({startDate: date.toString().substring(4,15)});
        }
        else{
            this.setState({endDate: date.toString().substring(4,15)});
        }
        this.hideDateTimePicker();
    };

    async createNewhandymanRequest(){
        user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);
        FirebaseUtils.createNewHandymanRequest(user.username, this.handymanData.username, 'pending', this.state.startDate, this.state.endDate, this.state.urgent, this.state.address, this.state.number, this.state.paymentType);
        this.props.navigation.navigate('UserRequestsScreen');
    }

  render() {
    return (
      <ScrollView>
        <Text style={styles.mainTitle}>Create request</Text>
        <View style={styles.requestShortInfo}>
            <Text style={styles.requestName}>{this.handymanData.username}</Text>
            <Text style={styles.requestText}>Type: {this.handymanData.speciality}</Text>
            <Text style={styles.requestText}>Daily rate: {this.handymanData.wage} EUR</Text>
            <TouchableOpacity style={styles.handymanButton}>
                <Text style={styles.handymanButtonText}>{this.handymanData.speciality[0]}</Text>
            </TouchableOpacity> 
        </View>
        <View style={styles.separator}/>
        <View>
        <TouchableOpacity activeOpacity={1} style={styles.userDataBar}>
                <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
                    <View style={styles.rowConntainer}>
                        <View style={styles.inputContainer}>
                            <TextInput 
                                placeholder='number' 
                                keyboardType='phone-pad'
                                style={styles.textInputContainer}
                                onChangeText={(number) => this.setState({number})}
                            />
                            <Text style={styles.textLabel}>Tel. number</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput 
                                placeholder='address' 
                                style={styles.textInputContainer}
                                onChangeText={(address) => this.setState({address})}
                            />
                            <Text style={styles.textLabel}>Address</Text>
                        </View>
                    </View>
                    <View style={styles.rowConntainer}>
                        <View style={styles.inputContainer}>
                            <TouchableOpacity style={styles.dateButton} title="Start date" onPress={this.showStartDateTimePicker}>
                                <Text style={styles.datetextInputContainer}>{this.state.startDate}</Text>   
                            </TouchableOpacity>
                            <Text style={styles.textLabel}>Start date</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TouchableOpacity style={styles.dateButton} title="Finish date" onPress={this.showEndDateTimePicker}>
                                <Text style={styles.datetextInputContainer}>{this.state.endDate}</Text>   
                            </TouchableOpacity>
                            <Text style={styles.textLabel}>Finish date</Text>
                        </View>
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this.handleDatePicked.bind(this)}
                            onCancel={this.hideDateTimePicker.bind(this)}
                        />
                    </View>
                    <Picker                                     
                        style={{height: 50, width: 170}}
                        onValueChange={(itemValue, itemIndex) => this.setState({paymentType: itemValue})}
                    >
                        <Picker.Item label="Payment type" value="payment" />
                        <Picker.Item label="Cash" value="cash" />
                        <Picker.Item label="Credit card" value="card" />
                    </Picker>
                    <View style={styles.rowConntainer}>
                        <Text>Urgent: </Text>
                        <CheckBox onValueChange={(urgent) => this.setState({urgent})}/>
                    </View>
                    <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <TouchableOpacity 
                            style={styles.buttonCancelContainer} 
                            onPress={() => {this.props.navigation.goBack();}}>
                            <Text style={{textAlign: 'center'}}>CANCEL</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.buttonConfirmContainer} 
                            onPress={this.createNewhandymanRequest.bind(this)}>
                            <Text style={styles.buttonTextContainer}>CREATE REQUEST</Text>
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
        borderBottomWidth: 2,
        borderBottomColor: '#ededed',
        borderTopWidth: 2,
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
    handymanButton: {
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
    handymanButtonText: {
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