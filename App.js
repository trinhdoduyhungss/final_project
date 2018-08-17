import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import ThreadScreen from '@thread/component/ThreadScreen';
import HomeScreen from '@home/components/HomeScreen';
import LoginScreen from '@login/components/LoginScreen'
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';
const AppNavigator = createStackNavigator({
  ThreadScreen: { screen: ThreadScreen },
  LoginScreen: { screen: LoginScreen },
  HomeScreen: { screen: HomeScreen }
},{
      transitionConfig: getSlideFromRightTransition,
      headerMode:'none',
});

export default class App extends Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}