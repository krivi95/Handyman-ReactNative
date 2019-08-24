import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator, AsyncStorage, ScrollView, TouchableOpacity, Image} from 'react-native';
import FirebaseUtils from '../firebaseUtils/FirebaseUtils';
import ArchivedRequest from './../components/ArchivedRequest'
import RequestsFilter from './../components/RequestsFilter'
import { timingSafeEqual } from 'crypto';


export default class HandymanHomepageScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          isLoading: true,
          activeRequests: [],
          urgentFilter: false
        };    
    }

    setRequests(filteredRequests, urgentFilter){
      this.setState({
        activeRequests: filteredRequests,
        urgentFilter: urgentFilter
      }); 
    }

    showMap(){
      this.props.navigation.navigate('MapScreen', {
        activeRequests: this.state.activeRequests
      });
    }

    async componentDidMount(){
        handyman = await AsyncStorage.getItem('user');
        handyman = JSON.parse(handyman);
        requests = await FirebaseUtils.getRequestsForHandyman(handyman.username);
        activeRequests = requests.filter(request => request.status == 'pending' || request.status == 'confirmed');
        this.setState({
          isLoading: false,
          activeRequests: activeRequests
        });
        //for real-time user request updates
        this.interval = setInterval(this.userRequestUpdate.bind(this), 3000); 
    } 

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    async userRequestUpdate(){
      handyman = await AsyncStorage.getItem('user');
      handyman = JSON.parse(handyman);
      requests = await FirebaseUtils.getRequestsForHandyman(handyman.username);
      activeRequests = requests.filter(request => request.status == 'pending' || request.status == 'confirmed');
      //urgent filer has been set
      if(this.state.urgentFilter){
        activeRequests = activeRequests.filter(request => request.urgent);  
      }
      this.setState({
        isLoading: false,
        activeRequests: activeRequests
      });
    }

    /*
    async componentDidUpdate(prevProps, prevState){
      if(prevState.activeRequests !== this.state.activeRequests){
        handyman = await AsyncStorage.getItem('user');
        handyman = JSON.parse(handyman);
        requests = await FirebaseUtils.getRequestsForHandyman(handyman.username);
        activeRequests = requests.filter(request => request.status == 'pending' || request.status == 'confirmed');
        //urgent filer has been set
        if(this.state.urgentFilter){
          activeRequests = activeRequests.filter(request => request.urgent);  
        }
        this.setState({
          isLoading: false,
          activeRequests: activeRequests
        });
      }       
    } 
    */

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
            let activeRequestsView = this.state.activeRequests.map((element, inex) => {
              return <ArchivedRequest key={element.id} requestData={element} navigation={this.props.navigation}/>
            }); 
            
            return (
              <View style={{ flex: 1 }}>              
                <RequestsFilter requestsHandler={this.setRequests.bind(this)}/>
                <TouchableOpacity style={styles.addButton} onPress={this.showMap.bind(this)}>
                    <Image source={require('../assets/maps-icon.png')} style={styles.mapsLogo} />
                </TouchableOpacity>
                <ScrollView style={{marginTop:35}}>
                  {activeRequestsView}
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
    addButton:{
      position: 'absolute',
      bottom: 10,
      right: 10,
      zIndex: 10,
      width: 70,
      height: 70,
      borderRadius: 40,
      alignItems: 'center',
      justifyContent: 'center'
    },
    mapsLogo:{
      width: 65,
      height: 65,
    },
  });