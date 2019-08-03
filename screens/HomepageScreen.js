import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import Note from '../components/Handyman'
        

export default class HomepageScreen extends React.Component {
  render() {
    let handyman = {
      name: 'Marko Nikolic',
      rating: '4.8',
      jobs: '13',
      comments: '5'
    }
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Note val={handyman}/>
          <Note val={handyman}/>
          <Note val={handyman}/>
          <Note val={handyman}/>
          <Note val={handyman}/>
          <Note val={handyman}/>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer:{
    flex: 1,
    width: '100%'
  }
});