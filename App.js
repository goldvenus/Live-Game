import React, { Component } from "react";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import { AppNavigator } from "./src/navigators/AppNavigator";
import store from "./src/redux/store";
import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';

class App extends Component {
  cacheImages(images) {
    return images.map(image => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  }

  cacheFonts(fonts) {
    return fonts.map(font => Font.loadAsync(font));
  }
  render() {
    const { fontLoaded } = this.state;
    return (
      <Provider store={store}>
        <StatusBar barStyle="light-content"/>
        <AppNavigator/>
      </Provider>
    );
  }
}

export default App;

