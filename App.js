import React, { Component } from "react";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import * as Font from "expo-font";

import { AppNavigator } from "./src/navigators/AppNavigator";
import store from "./src/redux/store";
import { Text } from "native-base";


class App extends Component {
  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      "Antonio": require("./assets/fonts/Antonio-Light.ttf"),
    });
    await Font.loadAsync({
      "Antonio-Bold": require("./assets/fonts/Antonio-Bold.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    const { fontLoaded } = this.state;
    if (!fontLoaded)
      return (
        <Text>Loading.....</Text>
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

