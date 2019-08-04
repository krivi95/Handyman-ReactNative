import React, {Component} from 'react';
import {StyleSheet ,Text, View, TouchableOpacity} from 'react-native';

export default class Comment extends Component {
  render() {
    return (
        <TouchableOpacity 
            key={this.props.keyvalue} 
            style={styles.commentShortInfo}
        >
            <Text style={styles.commentName}>{this.props.comment.user}</Text>
            <Text style={styles.commentText}>{this.props.comment.text}</Text>
            <TouchableOpacity 
                style={styles.commentButton}
            >
                <Text style={styles.commentButtonText}>C</Text>
            </TouchableOpacity>
             
        </TouchableOpacity>      
    );
  }
}

const styles = StyleSheet.create({
    commentShortInfo: {
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
    commentName: {
        paddingLeft: '30%',
        fontWeight: 'bold',
        fontSize: 15,
    },
    commentText: {
        paddingLeft: '30%',
    },
    commentButton: {
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
    commentButtonText: {
        color: 'white'
    }
});

