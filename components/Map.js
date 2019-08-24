import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView, { Marker } from 'react-native-maps'
        

export default class Map extends React.Component {

    constructor(props){
        super(props);     
        if(this.props.latitude == ''){
            this.props.latitude = 44.7999281;
        }    
        if(this.props.longitude == ''){
            this.props.longitude = 20.4080255;
        }    
    }

    render() {
        let activeRequestsLocations = this.props.activeRequests.map((element, inex) => {
            return <Marker 
                        key={element.id} 
                        coordinate={{latitude: element.latitude, longitude: element.longitude}}
                        title={'user: ' + element.user}
                        description={'status: ' + element.status}
                    />
          }); 
        return (
            <View>
                <MapView 
                    style={styles.map}
                    initialRegion={{
                        latitude: this.props.latitude,
                        longitude: this.props.longitude,
                        latitudeDelta: 0.0422,
                        longitudeDelta: 0.0221,
                    }}>
                    <Marker pinColor='blue' coordinate={{latitude: this.props.latitude, longitude: this.props.longitude}} title={'My location'}/>
                    {activeRequestsLocations}
                </MapView>
        </View>
        );
  }
}

const styles = StyleSheet.create({
    mapContainer:{
        width: '100%',
        height: 200
    },
    map:{
        width: '100%',
        height: '100%'
    }
  });