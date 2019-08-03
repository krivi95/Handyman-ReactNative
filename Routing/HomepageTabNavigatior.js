import React, {Component} from 'react';
import { Text, View, Button } from 'react-native';
import { createBottomTabNavigator,createStackNavigator, createAppContainer } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
//importing screens
import {HomepageScreen, LoginScreen, RegisterScreen} from '../screens/Screens'


const HomeStack = createStackNavigator({
    HomepageScreen:{
        screen: HomepageScreen,
        navigationOptions:({navigation})=>{
            return{
              headerTitle: 'Find handyman',
              headerTitleStyle:{
                  color: 'white'
              },
              headerStyle:{
                  backgroundColor: '#0080ff'
              }
            }  
          }
    } 
  });  

  const LoginStack = createStackNavigator({
    LogineScreen:{
        screen: LoginScreen,
        navigationOptions:({navigation})=>{
            return{
              headerTitle: 'Login',
              headerTitleStyle:{
                  color: 'white'
              },
              headerStyle:{
                  backgroundColor: '#0080ff'
              }
            }  
          }
    } 
  });

  const RegisterStack = createStackNavigator({
    LogineScreen:{
        screen: RegisterScreen,
        navigationOptions:({navigation})=>{
            return{
              headerTitle: 'Register',
              headerTitleStyle:{
                  color: 'white'
              },
              headerStyle:{
                  backgroundColor: '#0080ff'
              }
            }  
          }
    } 
  });

const HomepageTabNavigator = createBottomTabNavigator({
    HomeStack: { 
      screen: HomeStack,
      navigationOptions:{
        title: 'Search',
        tabBarIcon : ({tintColor}) =>(
          <Ionicons name='ios-search' size={24} color={tintColor}/>
        )
      } 
    },
    Login: { 
      screen: LoginScreen,
      navigationOptions:{
        tabBarLebel: 'Login',
        tabBarIcon : ({tintColor}) =>(
          <Ionicons name='ios-log-in' size={24} color={tintColor}/>
        )
      }  
    },
    Register: { 
      screen: RegisterStack,
      navigationOptions:{
        tabBarLebel: 'Register',
        tabBarIcon : ({tintColor}) =>(
          <Ionicons name='ios-person-add' size={24} color={tintColor}/>
        )
      }  
    }  
  },
  {
    initialRouteName:'HomeStack',
    defaultNavigationOptions:{
      tabBarVisible: true
    }
  }
  );

  export default HomepageTabNavigator;

  