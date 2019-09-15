import React, {Component} from 'react';
import {StyleSheet ,Text, View, TouchableOpacity} from 'react-native';

export default class HandymanHome extends Component {
  render() {
    return (
        <TouchableOpacity 
            key={this.props.keyvalue} 
            style={styles.handymanShortInfo}
            onPress={() => this.props.navigation.navigate('HomepageHandymanScreen', {
                handymanData: this.props.handymanData
            })}
        >
            <Text style={styles.handymanName}>{this.props.handymanData.firstName}</Text>         
            <Text style={styles.handymanText}>Wage: {this.props.handymanData.wage}$</Text>
            <Text style={styles.handymanText}>Rating: {this.props.handymanData.rating}/5</Text>
            <Text style={styles.handymanText}>Jobs done: {this.props.handymanData.jobsDone}</Text>
            <Text style={styles.handymanText}>Comments: {this.props.handymanData.commentsNumber}</Text>
            <TouchableOpacity 
                style={styles.handymanButton}
            >
                <Text style={styles.handymanButtonText}>{this.props.handymanData.speciality[0]}</Text>
            </TouchableOpacity>
             
        </TouchableOpacity>      
    );
  }
}

const styles = StyleSheet.create({
    handymanShortInfo: {
        padding: 20,
        paddingRight: 100,
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
        paddingLeft: '30%',
        fontWeight: 'bold',
        fontSize: 15,
    },
    handymanText: {
        paddingLeft: '30%',
    },
    handymanButton: {
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
    handymanButtonText: {
        color: 'white'
    }
});

