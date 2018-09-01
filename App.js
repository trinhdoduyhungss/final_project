import React, { Component } from 'react';
import { Image, SafeAreaView, View, ScrollView, Text, StatusBar } from 'react-native';
import { createDrawerNavigator, createBottomTabNavigator, createStackNavigator, DrawerItems } from 'react-navigation';
import { reduxifyNavigator, createReactNavigationReduxMiddleware, createNavigationReducer } from 'react-navigation-redux-helpers';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga'
import ThreadScreen from '@thread/component/ThreadScreen';
import HomeScreen from '@home/components/HomeScreen';
import LoginScreen from '@login/components/LoginScreen';
import ProfileScreen from '@profile/components/ProfileScreen';
import { Provider, connect } from 'react-redux';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';
import iconsetting from "@assets/images/settings.png"
import { usersss } from "@login/components/LoginScreen";
import { avatarus } from "@login/components/LoginScreen";
import { t_friend } from "@login/components/LoginScreen";
import  data from "@reducers/datass";
import mysaga from "@saga/Fetchfriend";
const BottomTabNav = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: ({ focused }) => (
        focused
          ? <Image source={require('@assets/images/home.png')} />
          : <Image source={require('@assets/images/home.png')} />
      )
    }
  },
  Profile: { screen: ProfileScreen }
}, {
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      style: {
        backgroundColor: '#fff',
        height: 65
      },
    }
  })
const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{ height: 100, backgroundColor: 'white', flexDirection: 'row', borderBottomColor: '#EBEBEB' }}>
      <Image source={{ uri: avatarus }} style={{ height: 50, width: 50, borderRadius: 50, margin: 19, marginTop: StatusBar.currentHeight }} />
      <View style={{flexDirection: 'column', backgroundColor: 'white'}}> 
        <Text style={{ margin: 10, fontSize: 16, fontWeight: 'bold', marginTop: StatusBar.currentHeight}} >{usersss}</Text>
        <Text>{t_friend}</Text>
      </View>
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
)

const DrawerNav = createDrawerNavigator({
  BottomTab: {
    screen: BottomTabNav,
    navigationOptions: {
      drawerLabel: () => null
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      drawerIcon: (
        <Image source={iconsetting} style={{ height: 24, width: 24 }} />
      )
    }
  },
}, {
    contentComponent: CustomDrawerComponent
  })
const AppNavigator = createStackNavigator({
  ThreadScreen: { screen: ThreadScreen },
  LoginScreen: { screen: LoginScreen },
  Draw: { screen: DrawerNav }
}, {
    transitionConfig: getSlideFromRightTransition,
    headerMode: 'none',
  });
const navReducer = createNavigationReducer(AppNavigator)
const appReducer = combineReducers({
  nav: navReducer,
  data
})
const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);
const sagaMiddleware = createSagaMiddleware();
const MainApp = reduxifyNavigator(AppNavigator, "root");
const mapStateToProps = (state) => ({
  state: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(MainApp);
const store = createStore(
  appReducer,
  applyMiddleware(middleware, sagaMiddleware),
);
sagaMiddleware.run(mysaga)
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}