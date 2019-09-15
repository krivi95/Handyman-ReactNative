import React, {Component} from 'react';
import {StyleSheet ,Text, AsyncStorage, TouchableOpacity} from 'react-native';

export default class HandymanUserInfo extends Component {

  constructor(props){
      super(props);
  }

  navigateToCreateRequestScreen(){
      this.props.navigation.navigate('CreateRequestScreen', {
        handymanData: this.props.handymanData
      });
  }

  render() {
    return (
        <TouchableOpacity 
            key={this.props.keyvalue} 
            style={styles.handymanShortInfo}
        >
            <Text style={styles.handymanName}>{this.props.handymanData.username}</Text>            
            <Text style={styles.handymanText}>Wage: {this.props.handymanData.wage}$</Text>
            <Text style={styles.handymanText}>Speciality: {this.props.handymanData.speciality}</Text>            
            <Text style={styles.handymanText}>First name: {this.props.handymanData.firstName}</Text>
            <Text style={styles.handymanText}>Last name: {this.props.handymanData.lastName}</Text>            
            <Text style={styles.handymanText}>Tel. number: {this.props.handymanData.number}</Text>
            <Text style={styles.handymanText}>Address: {this.props.handymanData.address}</Text>
            <Text style={styles.handymanText}>Jobs done: {this.props.handymanData.jobsDone}</Text>
            <Text style={styles.handymanText}>Rating: {this.props.handymanData.rating}/5</Text>
            <TouchableOpacity 
                style={styles.buttonContainer} 
                onPress={() => {
                    this.props.navigation.navigate('CreateRequestScreen',{
                        handymanData: this.props.handymanData
                    });
                }}
            >
                <Text style={styles.buttonTextContainer}>CREATE REQUEST</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.handymanButton}>
                <Text style={styles.handymanButtonText}>{this.props.handymanData.speciality[0]}</Text>
            </TouchableOpacity>             
        </TouchableOpacity>      
    );
  }
}

const styles = StyleSheet.create({
    handymanShortInfo: {
        padding: 20,
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
        marginRight: '10%'
    },
    handymanName: {
        paddingLeft: '20%',
        fontWeight: 'bold',
        fontSize: 16,
    },
    handymanText: {
        fontSize: 16,
        paddingLeft: '20%',
        paddingTop: 2
    },
    handymanButton: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c0c0c0',
        padding: 10,
        top: '10%',
        left: '5%',
        borderRadius: 40,
        width: 45,
        height: 45
    },
    handymanButtonText: {
        color: 'white'
    },
    buttonContainer:{
        alignSelf: 'center',
        borderRadius: 5,
        padding: 10,
        width: 100,
        marginTop: 20,
        backgroundColor: '#2283b7',
    },
    buttonTextContainer:{
        textAlign: 'center',
        color: 'white'
    }
});

