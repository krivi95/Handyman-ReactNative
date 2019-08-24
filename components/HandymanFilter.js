import React, {Component} from 'react';
import {StyleSheet ,Text, View, TouchableOpacity, Picker, TextInput, Button} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from "react-native-modal-datetime-picker";
import FirebaseUtils from '../firebaseUtils/FirebaseUtils'

export default class HandymanFilter extends Component {

    constructor(props){
        super(props);
        this.state = {
            showFilterOptions: false,
            isDateTimePickerVisible: false,
            speciality: '',
            minJobsDone: '',
            priceFrom: '',
            priceTo: '',
            startDate: '',
            endDate: '',
            isCurrentDateStartDate: true
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

    async search(){
        if(this.state.priceFrom > this.state.priceTo){
            alert('Incorrect inputs.');
            return;
        }
        handymen = await FirebaseUtils.getUserByType("handyman");
        filteredHandymen = [];
        if(this.state.speciality != ''){
            filteredHandymen = handymen.filter(handyman => handyman.speciality == this.state.speciality); 
        };
        if(this.state.minJobsDone != ''){
            filteredHandymen = filteredHandymen.filter(handyman => handyman.jobsDone >= this.state.minJobsDone); 
        };
        if(this.state.priceFrom != ''){
            filteredHandymen = filteredHandymen.filter(handyman => handyman.wage >= this.state.priceFrom); 
        };
        if(this.state.priceTo != ''){    
            filteredHandymen = filteredHandymen.filter(handyman => handyman.wage <= this.state.priceTo); 
        };
        this.props.handymenHandler(filteredHandymen);
        this.setState({showFilterOptions: false});
    }

    render() {
        if(!this.state.showFilterOptions){
            return (
                <TouchableOpacity style={styles.filterBar} onPress={() => this.setState({showFilterOptions: true})}>
                    <View style={styles.filterBar}>
                        <Text style={styles.filterTextInactive}>FILTER </Text>
                        <Ionicons name='md-arrow-dropdown' size={24} color={'#0080ff'} style={styles.iconInactive}/>
                    </View>
                </TouchableOpacity>
            );
        }
        else{
            return(
                <View>
                    <TouchableOpacity style={styles.filterBar} onPress={() => this.setState({showFilterOptions: false})}>
                        <View style={styles.filterBar}>
                            <Text style={styles.filterTextActive}>FILTER </Text>
                            <Ionicons name='md-arrow-dropup' size={24} color={'#0080ff'} style={styles.iconActive}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={styles.filterDataBar}>
                        <View style={{flex:1, flexDirection:'column'}}>
                            <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                <Text>Speciality:</Text>
                                <Picker 
                                    selectedValue={this.state.speciality}
                                    style={{height: 50, width: 150}}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({speciality: itemValue})
                                    }>
                                    <Picker.Item label="General" value="general" />
                                    <Picker.Item label="Electrician" value="electrician" />
                                    <Picker.Item label="Plumber" value="plumber" />
                                    <Picker.Item label="Carpenter" value="carpenter" />
                                    <Picker.Item label="Painter" value="painter" />
                                    <Picker.Item label="Gardener" value="gardener" />
                                </Picker>
                            </View>
                            <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                <Text>Experience (min jobs done):</Text>
                                <TextInput 
                                    keyboardType='phone-pad'
                                    style={styles.textInputContainer}
                                    onChangeText={(minJobsDone) => this.setState({minJobsDone})}
                                />
                            </View>
                            <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                <Text>Price (from):</Text>
                                <TextInput 
                                    keyboardType='phone-pad'
                                    style={styles.textInputContainer}
                                    onChangeText={(priceFrom) => this.setState({priceFrom})}
                                />
                                <Text>Price (to):</Text>
                                <TextInput 
                                    keyboardType='phone-pad'
                                    style={styles.textInputContainer}
                                    onChangeText={(priceTo) => this.setState({priceTo})}
                                />
                            </View>
                            <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                <Text>Start date:</Text>
                                <TouchableOpacity style={styles.dateButton} title="Start date" onPress={this.showStartDateTimePicker}>
                                    <Text style={styles.datetextInputContainer}>{this.state.startDate}</Text>   
                                </TouchableOpacity>
                                <Text>End date:</Text>
                                <TouchableOpacity style={styles.dateButton} title="Start date" onPress={this.showEndDateTimePicker}>
                                    <Text style={styles.datetextInputContainer}>{this.state.endDate}</Text>
                                </TouchableOpacity>
                                <DateTimePicker
                                    isVisible={this.state.isDateTimePickerVisible}
                                    onConfirm={this.handleDatePicked.bind(this)}
                                    onCancel={this.hideDateTimePicker.bind(this)}
                                />
                            </View>
                            <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                <TouchableOpacity style={styles.buttonContainer} onPress={this.search.bind(this)}>
                                    <Text style={styles.buttonTextContainer}>SEARCH</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
    }
}



const styles = StyleSheet.create({
    filterBar: {
        position: 'absolute',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: 40,
        zIndex: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#ededed',
    },
    filterTextInactive: {
        position: 'absolute',
        left: '10%',
        fontSize: 18,
        fontWeight: '800',
        color: '#0080ff'
    },
    iconInactive:{
        position: 'absolute',
        left: '28%',
        fontSize: 18,
        fontWeight: '800',
        color: '#0080ff'
    },
    filterTextActive: {
        position: 'absolute',
        left: '10%',
        fontSize: 18,
        fontWeight: '800',
        color: '#ff0000'
    },
    iconActive:{
        position: 'absolute',
        left: '28%',
        fontSize: 18,
        fontWeight: '800',
        color: '#ff0000'
    },
    filterDataBar: {
        position: 'absolute',
        top: 40,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: 260,
        zIndex: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#ededed',
    },
    textInputContainer:{
        alignSelf: 'center',
        textAlign: 'center',
        opacity: 0.8,
        height: 40,
        width: 40,
        borderBottomWidth: 2,
        borderBottomColor: '#ededed'  
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
        height: 40,
        width: 80,
        borderBottomWidth: 2,
        borderBottomColor: '#ededed'  
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