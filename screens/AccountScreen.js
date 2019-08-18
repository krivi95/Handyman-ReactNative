import React from 'react';
import {Text, View, ActivityIndicator, StyleSheet, AsyncStorage} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import User from './../components/User';
        

export default class AccountScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      user: ''
    };    
  }

  async componentDidMount(){    
    user = await AsyncStorage.getItem("user");
    this.setState({
      isLoading: false,
      user: JSON.parse(user)
    }); 
  } 

  render() {
    if(this.state.isLoading){
      return (
        <View style={styles.waitingContainer}>
          <ActivityIndicator/>
          <Text style={{textAlign: 'center'}}>Loading...</Text>
        </View>
        );
    }
    else{
      return (
        <View>
          <KeyboardAwareScrollView>
            <User userData={this.state.user} navigation={this.props.navigation}/>
          </KeyboardAwareScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  waitingContainer:{
    flex: 1,
    marginTop: 50,
    justifyContent: 'center'
  }
});
