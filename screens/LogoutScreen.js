import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, AsyncStorage} from 'react-native';
        

export default class LogoutScreen extends React.Component {
  render() {
    return (
      <View style={{alignItems: 'center', width: '100%'}}>
        <TouchableOpacity style={styles.container}>
          <Text style={styles.titleContainer}>Are you sure you want to log out?</Text>
          <View style={{flexDirection: 'row', alignItems:'center'}}>
            <TouchableOpacity style={styles.buttonCancelContainer} onPress={() => 
              {this.props.navigation.navigate('HomeStack')}}>
                <Text style={{textAlign: 'center'}}>NO</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonConfirmContainer} onPress={() => {
                this.props.navigation.navigate('Home');
                AsyncStorage.removeItem('user');
                }}>
                <Text style={styles.buttonTextContainer}>YES</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
            
const styles = StyleSheet.create({
    container: {
      height: 150,
      padding: 30,
      borderBottomWidth: 4,
      borderBottomColor: '#ededed',
      borderTopWidth: 2,
      borderTopColor: '#ededed',
      borderLeftWidth: 1,
      borderLeftColor: '#ededed',
      borderRightWidth: 1,
      borderRightColor: '#ededed',
      borderRadius: 5,
      marginTop: '30%',
      marginLeft: '5%',
      marginRight: '5%'
    },
    titleContainer:{
      marginBottom: 20, 
      fontSize: 16,
      fontWeight: '600'
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
    }
});

