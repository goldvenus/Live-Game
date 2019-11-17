import React, { Component } from "react";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import { AppNavigator } from "./src/navigators/AppNavigator";
import store from "./src/redux/store";
import { Asset } from 'expo-asset';
import AppLoading from "expo/build/launch/AppLoading";
import AppMocData from './src/share/data/MocData'
class App extends Component {
  state = {
    isLoadingComplete: false,
  };
  imageArray = [];
  loadAppMocDataUrl(obj) {
    for (let key in obj) {
      if (typeof obj[key] === "object") {
        this.loadAppMocDataUrl(obj[key]);
      } else {
        this.imageArray.push(obj[key]);
      }
    }
  }

  _loadResourcesAsync = async () => {
    this.loadAppMocDataUrl(AppMocData)
    return Promise.all([
      Asset.loadAsync(this.imageArray),
      Font.loadAsync({
        'Antonio': require('./assets/fonts/Antonio-Light.ttf'),
        'Antonio-Bold': require('./assets/fonts/Antonio-Bold.ttf'),
        'Expo-Bold': require('./assets/fonts/exo-2-bold.ttf')
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <StatusBar hidden/>
          <AppNavigator/>
        </Provider>
      );
    }
  }
}

export default App;

