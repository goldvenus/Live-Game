/* eslint-disable quote-props */
/* eslint-disable global-require */
/* eslint-disable no-restricted-syntax */
import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import AppLoading from 'expo/build/launch/AppLoading';

import AppMocData from './src/share/data/MocData';
import store from './src/redux/store';
import { AppNavigator } from './src/navigators/AppNavigator';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingComplete: false,
    };
  }

  imageArray = [];

  loadAppMocDataUrl(obj) {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        this.loadAppMocDataUrl(obj[key]);
      } else {
        this.imageArray.push(obj[key]);
      }
    }
  }

  loadResourcesAsync = async () => {
    this.loadAppMocDataUrl(AppMocData);
    return Promise.all([
      Asset.loadAsync(this.imageArray),
      Font.loadAsync({
        'Antonio': require('./assets/fonts/Antonio-Light.ttf'),
        'Antonio-Bold': require('./assets/fonts/Antonio-Bold.ttf'),
        'Expo-Bold': require('./assets/fonts/exo-2-bold.ttf'),
      }),
    ]);
  };

  handleLoadingError = () => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
  };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    }
    return (
      <Provider store={store}>
        <StatusBar hidden />
        <AppNavigator />
      </Provider>
    );
  }
}

export default App;
