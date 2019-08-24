import React from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';
import Map from './../components/Map'
        

export default class MapScreen extends React.Component {

    constructor(props){
        super(props);         
        const { navigation } = this.props;
        this.activeRequests = navigation.getParam('activeRequests', 'ERROR');    
        this.state = {
            isLoading: true,
            longitude: '',
            latitude: ''
        }
    }

    async getCurrentPosition() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                position => resolve(position.coords),
                error => reject(error)
            )});
    }

    async getUserLocation() {    
        return await this.getCurrentPosition();
    }

    /*
    async getUserLocation(position){
        this.state.longitude = await position.coords.longitude;
        this.state.latitude = await position.coords.latitude;
        console.log(this.state.longitude);
        console.log(this.state.latitude);
    }*/

    async componentDidMount(){
        let location = await this.getUserLocation();
        this.state.longitude = location.longitude;
        this.state.latitude = location.latitude;
        this.setState({isLoading: false});
    }
        
    
    render() {
        if(this.state.isLoading){
            return(
            <View style={styles.waitingContainer}>
                <ActivityIndicator/>
                <Text style={{textAlign: 'center'}}>Loading...</Text>
            </View>
              );
        }
        else{
            return (
            <View>
                <Map longitude={this.state.longitude} latitude={this.state.latitude}  activeRequests={this.activeRequests }/>
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
