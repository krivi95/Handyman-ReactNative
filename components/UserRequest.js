import React, {Component} from 'react';
import {StyleSheet ,Text, View, TouchableOpacity} from 'react-native';
import FirebaseUtils from '../firebaseUtils/FirebaseUtils';
import Share from '../components//Share'

export default class UserRequest extends Component {

  async navigateToHandymanInfoScreen(){
    handymanInfo = await FirebaseUtils.getUserByName(this.props.requestData.handyman);
    this.props.navigation.navigate('HomepageHandymanScreen', {
        handymanData: handymanInfo,
        navigation: this.props.navigation
    });
  }

  getStatusStyle(status){
    switch(status){
        case 'pending':
            return styles.requestText;
            break;
        case 'successful':
            return styles.finishedStatusText;
            break;
        case 'unsuccessful':
            return styles.rejectedStatusText;
            break;
        case 'rejected':
            return styles.rejectedStatusText;
            break;
    }
  }

  render() {
    return (
        <TouchableOpacity 
            key={this.props.keyvalue} 
            style={styles.requestShortInfo}
            onPress={this.navigateToHandymanInfoScreen.bind(this)}
        >
            <Text style={styles.requestName}>{this.props.requestData.handyman}</Text>
            <Text style={styles.requestText}>Date (from): {this.props.requestData.startDate}</Text>
            <Text style={styles.requestText}>Date (to): {this.props.requestData.endDate}</Text>
            <Text style={styles.requestText}>Status: 
                <Text style={this.getStatusStyle(this.props.requestData.status)}> {this.props.requestData.status}</Text>
            </Text>
            <TouchableOpacity style={styles.requestButton}>
                <Text style={styles.requestButtonText}>{this.props.requestData.handyman[0]}</Text>
            </TouchableOpacity>
            <View>
                {this.props.requestData.status == 'successful' && (    
                <View>                
                    <View style={styles.separator}/>
                    <Share navigation={navigation=this.props.navigation} handymanUsername={this.props.requestData.handyman}/>
                </View>
                )
                }
            </View>
        </TouchableOpacity>      
    );
  }
}

const styles = StyleSheet.create({
    requestShortInfo: {
        padding: 20,
        paddingRight: 10,
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
        paddingLeft: '20%',
        fontWeight: 'bold',
        fontSize: 15,
    },
    requestText: {
        paddingLeft: '20%',
    },
    rejectedStatusText: {
        paddingLeft: '20%',
        color: 'red',
        fontWeight: 'bold'
    },
    finishedStatusText: {
        paddingLeft: '20%',
        color: 'green',
        fontWeight: 'bold'
    },
    requestButton: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c0c0c0',
        padding: 10,
        top: '30%',
        left: '5%',
        borderRadius: 40,
        width: 45,
        height: 45
    },
    requestButtonText: {
        color: 'white'
    },
    separator:{
        borderBottomColor: '#efefef',
        borderBottomWidth: 1,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5
    }
});

