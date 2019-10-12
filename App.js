import React, { Component } from "react";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import { AppNavigator } from "./src/navigators/AppNavigator";
import store from "./src/redux/store";
import { Asset } from 'expo-asset';
import AppLoading from "expo/build/launch/AppLoading";
import Images from './MocData'
class App extends Component {
  state = {
    isLoadingComplete: false,
  };
  imageArray = [];
  loadImagesUrl(obj) {
    for (let key in obj) {
      if (typeof obj[key] === "object") {
        this.loadImagesUrl(obj[key]);
      } else {
        this.imageArray.push(obj[key]);
      }
    }
  }

  _loadResourcesAsync = async () => {
    this.loadImagesUrl(Images)
    return Promise.all([
      Asset.loadAsync(this.imageArray),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        //...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'Antonio': require('./assets/fonts/Antonio-Light.ttf'),
        'Antonio-Bold': require('./assets/fonts/Antonio-Bold.ttf')
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
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

