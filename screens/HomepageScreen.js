import React from 'react';
import { Text, View, ScrollView, StyleSheet, ActivityIndicator} from 'react-native';
import HandymanHome from '../components/Handyman'       
import FirebaseUtils from '../firebaseUtils/FirebaseUtils';
import HandymanFilter from './../components/HandymanFilter'

export default class HomepageScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      handymen: []
    };    
  }

  setHandymen(filteredHandymen){
    this.setState({
      handymen: filteredHandymen
    }); 
  }

  async componentDidMount(){
    handymen = await FirebaseUtils.getUserByType("handyman");
    this.setState({
      isLoading: false,
      handymen: handymen
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
      let handymenView = this.state.handymen.map((element, inex) => {
        return <HandymanHome key={element.username} handymanData={element} navigation={this.props.navigation}/>
      }); 
      return (
        <View style={{ flex: 1 }}>
          <HandymanFilter handymenHandler={this.setHandymen.bind(this)}/>
          <ScrollView style={{marginTop:38}}>
            {handymenView}
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
  }
});