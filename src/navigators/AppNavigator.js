import {connect} from 'react-redux';
import {createAppContainer, createSwitchNavigator, createBottomTabNavigator} from 'react-navigation';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import { Image } from 'react-native';

import AuthNavigator from './AuthNavigator';
import HomeNavigator from './HomeNavigator';
import GameNavigator from './GameNavigator';
import Page2Navigator from './Page2Navigator';
import Page3Navigator from './Page3Navigator';
import Page4Navigator from './Page4Navigator';
import React from "react";


const SwitchNavigator = createBottomTabNavigator(
  {
    Home: {screen: HomeNavigator},
    Game: {screen: GameNavigator},
    Page2: {screen: Page2Navigator},
    Page3: {screen: Page3Navigator},
    Page4: {screen: Page4Navigator}
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        switch (routeName) {
          case 'Home':
            return (
              <Image
                source={require('../assets/images/bottom_nav_bar/wavescore.png')}
                style={{width: 23, height: 23}}/>
            );
          case 'Game':
            return (
              <Image
                source={require('../assets/images/bottom_nav_bar/game.png')}
                style={{width: 23, height: 23}}/>
            );
          case 'Page2':
            return (
              <Image
                source={require('../assets/images/bottom_nav_bar/stats.png')}
                style={{width: 23, height: 23, marginTop: 10, marginBottom: 10}}/>
            );
          case 'Page3':
            return (
              <Image
                source={require('../assets/images/bottom_nav_bar/chat.png')}
                style={{width: 23, height: 23, marginTop: 10, marginBottom: 10}}/>
            );
          case 'Page4':
            return (
              <Image
                source={require('../assets/images/bottom_nav_bar/menu.png')}
                style={{width: 23, height: 23, marginTop: 10, marginBottom: 10}}/>
            );
        }
      },
    }),
    initialRouteName: 'Home',
    tabBarOptions: {
      activeBackgroundColor: '#111111',
      inactiveBackgroundColor: '#111111',
      showLabel: false
    },
    style: {
      backgroundColor: '#111111',
    },
  }
);

const RootNavigator = createAppContainer(SwitchNavigator);

const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.navigation,
);

const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

const mapStateToProps = state => ({
  state: state.navigation,
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);


export {RootNavigator, AppNavigator, middleware};
