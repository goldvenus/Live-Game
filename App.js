import React, { Component } from "react";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import * as Font from "expo-font";

import { AppNavigator } from "./src/navigators/AppNavigator";
import store from "./src/redux/store";
import AppLoading from "expo/build/launch/AppLoading";

class App extends Component {
  state = {
    fontLoaded: true
  };

  componentDidMount() {
    this.loadFont();
  }

  loadFont = async ()=> {
    await Font.loadAsync({
      "Antonio": require("./assets/fonts/Antonio-Light.ttf"),
      "Antonio Light": require("./assets/fonts/Antonio-Light.ttf"),
      "Antonio Bold": require("./assets/fonts/Antonio-Bold.ttf"),
      "Antonio-Bold": require("./assets/fonts/Antonio-Bold.ttf")
    });
    this.setState({ fontsLoaded: true })
  }

  render() {
    const { fontLoaded } = this.state;
    if (!fontLoaded)
      return (
        <AppLoading />
      );
    return (
      <Provider store={store}>
        <StatusBar barStyle="light-content"/>
        <AppNavigator/>
      </Provider>
    );
  }
}

export default App;

