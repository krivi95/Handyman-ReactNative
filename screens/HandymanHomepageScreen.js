import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator, AsyncStorage, ScrollView} from 'react-native';
import FirebaseUtils from '../firebaseUtils/FirebaseUtils';
import ArchivedRequest from './../components/ArchivedRequest'


export default class HandymanHomepageScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          isLoading: true,
          archivedRequests: []
        };    
    }

    async componentDidMount(){
        handyman = await AsyncStorage.getItem('user');
        handyman = JSON.parse(handyman);
        requests = await FirebaseUtils.getRequestsForHandyman(handyman.username);
        archivedRequests = requests.filter(request => request.status == 'rejected' || request.status == 'successful' || request.status == 'unsuccessful')
        this.setState({
          isLoading: false,
          archivedRequests: archivedRequests
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
            let archivedRequestsView = this.state.archivedRequests.map((element, inex) => {
              return <ArchivedRequest key={element.username + element.handyman} requestData={element}/>
            }); 
            
            return (
              <View style={{ flex: 1 }}>              
              <Text style={styles.mainTitle}>My jobs:</Text>
                <ScrollView style={{marginTop:15}}>
                  {archivedRequestsView}
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
    },
  });