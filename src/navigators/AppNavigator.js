/* eslint-disable react/prop-types */
import { connect } from 'react-redux';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import { Image } from 'react-native';
import { widthPercentageToDP as wp }
  from 'react-native-responsive-screen';
import HomeNavigator from './HomeNavigator';
import GameNavigator from './GameNavigator';
import Page2Navigator from './Page2Navigator';
import Page3Navigator from './Page3Navigator';
import Page4Navigator from './Page4Navigator';
import React from 'react';


const SwitchNavigator = createBottomTabNavigator(
  {
    Home: { screen: HomeNavigator },
    Game: { screen: GameNavigator },
    Page2: { screen: Page2Navigator },
    Page3: { screen: Page3Navigator },
    Page4: { screen: Page4Navigator },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      // eslint-disable-next-line no-unused-vars
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        switch (routeName) {
          case 'Home':
            return (
              <Image
                source={require('../../assets/images/bottom_nav_bar/wavescore.png')}
                style={{
                  width: wp('6'), height: wp('6'), marginTop: wp('10'), marginBottom: wp('10'),
                }}
              />
            );
          case 'Game':
            return (
              !focused ? (
                <Image
                  source={require('../../assets/images/bottom_nav_bar/game-normal.png')}
                  style={{
                    width: wp('6'), height: wp('6'), marginTop: wp('10'), marginBottom: wp('10'),
                  }}
              />
              )
                : (
                  <Image
                    source={require('../../assets/images/bottom_nav_bar/game-active.png')}
                    style={{
                      width: wp('10'), height: wp('10'), marginTop: wp('10'), marginBottom: wp('10'),
                    }}
                />
                )
            );
          case 'Page2':
            return (
              <Image
                source={require('../../assets/images/bottom_nav_bar/stats.png')}
                style={{
                  width: wp('6'), height: wp('6'), marginTop: wp('10'), marginBottom: wp('10'),
                }}
              />
            );
          case 'Page3':
            return (
              <Image
                source={require('../../assets/images/bottom_nav_bar/chat.png')}
                style={{
                  width: wp('6'), height: wp('6'), marginTop: wp('10'), marginBottom: wp('10'),
                }}
              />
            );
          case 'Page4':
            return (
              <Image
                source={require('../../assets/images/bottom_nav_bar/menu.png')}
                style={{
                  width: wp('6'), height: wp('6'), marginTop: wp('10'), marginBottom: wp('10'),
                }}
              />
            );
          default:
            return (
              <Image
                source={require('../../assets/images/bottom_nav_bar/wavescore.png')}
                style={{
                  width: wp('6'), height: wp('6'), marginTop: wp('10'), marginBottom: wp('10'),
                }}
              />
            );
        }
      },
    }),
    initialRouteName: 'Game',
    tabBarOptions: {
      activeBackgroundColor: '#111111',
      inactiveBackgroundColor: '#111111',
      showLabel: false,
    },
    style: {
      backgroundColor: '#111111',
      paddingTop: 15,
      paddingBottom: 15,
    },
  },
);

const RootNavigator = createAppContainer(SwitchNavigator);

const middleware = createReactNavigationReduxMiddleware(
  'root',
  (state) => state.navigation,
);

const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

const mapStateToProps = (state) => ({
  state: state.navigation,
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);


export { RootNavigator, AppNavigator, middleware };
