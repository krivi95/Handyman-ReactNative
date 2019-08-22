import React, {Component} from 'react';
import { Text, View, Button } from 'react-native';
import { createBottomTabNavigator,createStackNavigator, createAppContainer } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
//importing screens
import {HandymanHomepageScreen, HandymanJobsScreen, AccountScreen, LogoutScreen, ProcessRequestScreen} from '../screens/Screens'
 

const HandymanHomeStack = createStackNavigator({
    HandymanHomepageScreen:{
        screen: HandymanHomepageScreen,
        navigationOptions:({navigation})=>{
            return{
              headerTitle: 'Find handyman',
              headerTintColor: 'white',
              headerTitleStyle:{
                  color: 'white'
              },
              headerStyle:{
                  backgroundColor: '#0080ff'
              }
            }  
          }
    },
    ProcessRequestScreen:{
      screen: ProcessRequestScreen,
      navigationOptions:({navigation})=>{
          return{
            headerTitle: 'Find handyman',
            headerTintColor: 'white',
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

  const HandymanJobsStack = createStackNavigator({
    HandymanJobsScreen:{
        screen: HandymanJobsScreen,
        navigationOptions:({navigation})=>{
            return{
              headerTitle: 'Find handyman',
              headerTintColor: 'white',
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

  const AccountStack = createStackNavigator({
    AccountScreen:{
        screen: AccountScreen,
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

  const LogoutStack = createStackNavigator({
    LogoutScreen:{
        screen: LogoutScreen,
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

const HandymanTabNavigator = createBottomTabNavigator({
    HandymanHomeStack: { 
      screen: HandymanHomeStack,
      navigationOptions:{
        title: 'Search',
        tabBarIcon : ({tintColor}) =>(
          <Ionicons name='ios-search' size={24} color={tintColor}/>
        )
      } 
    },
    HandymanJobsStack: { 
      screen: HandymanJobsStack,
      navigationOptions:{
        tabBarLabel: 'My jobs',
        tabBarIcon : ({tintColor}) =>(
          <Ionicons name='ios-build' size={24} color={tintColor}/>
        )
      }  
    },
    AccountStack: { 
      screen: AccountStack,
      navigationOptions:{
        tabBarLabel: 'My account',
        tabBarIcon : ({tintColor}) =>(
          <Ionicons name='ios-person' size={24} color={tintColor}/>
        )
      }  
    },
    LogoutStack: { 
        screen: LogoutStack,
        navigationOptions:{
          tabBarLabel: 'Logout',
          tabBarIcon : ({tintColor}) =>(
            <Ionicons name='ios-log-out' size={24} color={tintColor}/>
          )
        }  
      }  
  },
  {
    initialRouteName:'AccountStack',
    defaultNavigationOptions:{
      tabBarVisible: true
    }
  }
  );

  export default HandymanTabNavigator;

  