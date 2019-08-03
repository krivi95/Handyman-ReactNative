import React, {Component} from 'react';
import {StyleSheet ,Text, View, TouchableOpacity} from 'react-native';

export default class Note extends Component {
  render() {
    return (
        <TouchableOpacity key={this.props.keyvalue} style={styles.note}>
            <Text style={styles.handymanName}>{this.props.val.name}</Text>
            <Text style={styles.noteText}>Rating: {this.props.val.rating}/5</Text>
            <Text style={styles.noteText}>Jobs done: {this.props.val.jobs}</Text>
            <Text style={styles.noteText}>Comments: {this.props.val.comments}</Text>
            <TouchableOpacity 
                onPress={this.props.deleteNote}
                style={styles.noteDelete}
            >
                <Text style={styles.noteDeleteText}>{this.props.val.name[0]}</Text>
            </TouchableOpacity>
             
        </TouchableOpacity>      
    );
  }
}

const styles = StyleSheet.create({
    note: {
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
    noteText: {
        paddingLeft: '30%',
    },
    noteDelete: {
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
    noteDeleteText: {
        color: 'white'
    }
});

