import React from 'react';
import {Text, View, ScrollView, StyleSheet, ActivityIndicator, AsyncStorage} from 'react-native';
import UserRequest from '../components/UserRequest'
import FirebaseUtils from '../firebaseUtils/FirebaseUtils';


export default class UserRequestsScreen extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      requests: []
    };    
  }
  
  async componentDidMount(){
    user = await AsyncStorage.getItem("user");
    user = JSON.parse(user);
    requests = await FirebaseUtils.getRequestsForUser(user.username);
    this.setState({
      isLoading: false,
      requests: requests
    }); 
  }

  async componentDidUpdate(prevProps){
    user = await AsyncStorage.getItem("user");
    user = JSON.parse(user);
    requests = await FirebaseUtils.getRequestsForUser(user.username);
    this.setState({
      isLoading: false,
      requests: requests
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
      let requestsView = this.state.requests.map((element, inex) => {
        return <UserRequest key={element.user + element.handyman} requestData={element} navigation={this.props.navigation}/>
      });
      return (
        <View style={{ flex: 1 }}>
        <Text style={styles.mainTitle}>My requests:</Text>
          <ScrollView style={{marginTop:10}}>
            {requestsView}
          </ScrollView>
        </View>
      );
    }
  }

}

const styles = StyleSheet.create({
  scrollContainer:{
    flex: 1,
    width: '100%'
  },
  waitingContainer:{
    flex: 1,
    marginTop: 50,
    justifyContent: 'center'
  },
  mainTitle:{
    fontSize: 25,
    marginTop: 10,
    textAlign: 'center',
    opacity: 0.6
  }
});