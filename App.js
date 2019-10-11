import React, { Component } from "react";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import { AppNavigator } from "./src/navigators/AppNavigator";
import store from "./src/redux/store";
import { Asset } from 'expo-asset';
import AppLoading from "expo/build/launch/AppLoading";

class App extends Component {
  state = {
    isLoadingComplete: false,
  };

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/game/fire-btn.png'),
        require('./assets/images/game/target_50.png'),
        require('./assets/images/game/FlareBg.png'),
        require('./assets/images/game/lightning_textBorder.png'),
        require('./assets/images/game/mega_spin.png'),
        require('./assets/images/game/Rectangle_50.png'),
        require('./assets/images/game/rule_objective.png'),
        require('./assets/images/game/shadow.png'),
        require('./assets/images/game/wavescore-icon.png'),
        require('./assets/images/bottom_nav_bar/chat.png'),
        require('./assets/images/bottom_nav_bar/game.png'),
        require('./assets/images/bottom_nav_bar/game1.png'),
        require('./assets/images/bottom_nav_bar/menu.png'),
        require('./assets/images/bottom_nav_bar/stats.png'),
        require('./assets/images/bottom_nav_bar/wavescore.png'),
        require('./assets/images/game/users/3.png'),
        require('./assets/images/game/users/4.png'),
        require('./assets/audio/countDown.mp3'),
        require('./assets/images/game/animation/lightning1.png'),
        require('./assets/images/game/animation/lightning2.png'),
        require('./assets/images/game/animation/lightning3.png'),
        require('./assets/images/game/animation/lightning4.png')
      ]),
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
          <StatusBar barStyle="light-content"/>
          <AppNavigator/>
        </Provider>
      );
    }
  }
}

export default App;

