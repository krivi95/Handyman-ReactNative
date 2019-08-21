import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, AsyncStorage} from 'react-native';
import FirebaseUtils from '../firebaseUtils/FirebaseUtils';
import HandymanHomeInfo from './../components/HandymanHomeInfo'
import Comment from './../components/Comment'
import HandymanUserInfo from './../components/HandymanUserInfo'

export default class HomepageHandymanScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            commentsLoading: true,
            comments: [],
            user: null
        };            
        const { navigation } = this.props;
        this.handymanData = navigation.getParam('handymanData', 'ERROR');
        this.handymanInfoView = null;
    }

    async componentDidMount(){
        comments = await FirebaseUtils.getCommentsForHandyman(this.handymanData.username);
        user = await AsyncStorage.getItem("user"); 
        this.setState({
            commentsLoading: false,
            comments: comments,
            user: JSON.parse(user)
        }); 
    }
    
    render() {
        if(this.state.user != null){
            //handyman info with option for creating requests for hanyman (only for logged user)
            this.handymanInfoView = <HandymanUserInfo key={this.handymanData.username} handymanData={this.handymanData} navigation={this.props.navigation}/> ;
        }
        else{
            //just viewing handyman info without option for creating requests for hanyman (no logging needed)
            this.handymanInfoView = <HandymanHomeInfo key={this.handymanData.username} handymanData={this.handymanData}/> ;
        }
        if(this.state.commentsLoading){
            //while comment are loading
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>Handyman {this.handymanData.firstName}</Text>
                    {this.handymanInfoView}           
                    <Text style={styles.title}>Comments:</Text>
                    <ActivityIndicator/>
                    <Text style={{textAlign: 'center'}}>Loading comments...</Text>
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.goBack()}>
                        <Text style={styles.buttonTextContainer}>CANCEL</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        else{
            //when comments are loaded displaying them
            let commentsView = <Text>No comments...</Text>;
            if(this.state.comments){
                commentsView = this.state.comments.map((element, inex) => {
                    return <Comment key={element.user} comment={element} style={{width:'100%'}}/>
                }); 
            }
            return (
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={styles.title}>Handyman {this.handymanData.firstName}</Text>
                        {this.handymanInfoView}           
                        <Text style={styles.title}>Comments:</Text>
                        {commentsView}
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.goBack()}>
                            <Text style={styles.buttonTextContainer}>CANCEL</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                );
        }
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center'
    },
    title:{
        fontSize: 25,
        marginTop: 10,
        textAlign: 'center',
        opacity: 0.6
    },
    buttonContainer:{
        alignSelf: 'center',
        borderRadius: 5,
        padding: 10,
        width: 100,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#c0c0c0',
    },
    buttonTextContainer:{
        textAlign: 'center',
        color: 'white'
    }
});