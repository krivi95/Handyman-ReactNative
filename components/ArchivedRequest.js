import React, {Component} from 'react';
import {StyleSheet ,Text, TouchableOpacity} from 'react-native';

export default class ArchivedRequest extends Component {

    getStatusStyle(status){
      //possible statuses: rejected, successful, unsuccessful
      if(status == 'pending'){
          return styles.greyStatus;
      }
      else if(status == 'successful' || status == 'confirmed'){
          return styles.greenStatus;
      }
      else{
          return styles.redStatus;
      }

    }

    processRequest(){
        if(this.props.requestData.status == 'pending' || this.props.requestData.status == 'confirmed'){
            this.props.navigation.navigate('ProcessRequestScreen', {
                requestData: this.props.requestData
            });
        }
    }
    
  render() {
    return (
        <TouchableOpacity 
            key={this.props.keyvalue} 
            style={styles.requestShortInfo}
            onPress={this.processRequest.bind(this)}
        >
            <Text style={styles.requestName}>{this.props.requestData.user}</Text>
            <Text style={styles.requestText}>Start date: {this.props.requestData.startDate}/5</Text>
            <Text style={styles.requestText}>End date: {this.props.requestData.endDate}</Text>
            <Text style={styles.requestText}>Address: {this.props.requestData.address}</Text>
            <Text style={styles.requestText}>Number: {this.props.requestData.number}</Text>
            <Text style={styles.requestText}>Urgent: {this.props.requestData.urgent? 'yes' : 'no'}</Text>
            <Text style={styles.requestText}>Status: 
                <Text style={this.getStatusStyle(this.props.requestData.status)}> {this.props.requestData.status}</Text>
            </Text>
            <TouchableOpacity style={styles.requestButton}>
                <Text style={styles.requestButtonText}>{this.props.requestData.user[0]}</Text>
            </TouchableOpacity>             
        </TouchableOpacity>      
    );
  }
}

const styles = StyleSheet.create({
    requestShortInfo: {
        padding: 15,
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
    requestName: {
        paddingLeft: '25%',
        fontWeight: 'bold',
        fontSize: 15,
    },
    requestText: {
        paddingLeft: '25%' 
    },
    greyStatus:{
        paddingLeft: '25%',
        fontWeight: 'bold'        
    },
    greenStatus:{
        paddingLeft: '25%',
        color: 'green',
        fontWeight: 'bold'        
    },
    redStatus:{
        paddingLeft: '25%',
        color: 'red',
        fontWeight: 'bold'        
    },
    requestButton: {
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
    requestButtonText: {
        color: 'white'
    }
});

