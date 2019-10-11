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
    fontLoaded: true,
    isReady: false,
  };

  async _cacheResourcesAsync() {
    const images = [
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
    ];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  }

  componentDidMount() {
    this.loadFont();
  }

  loadFont = async ()=> {
    await Font.loadAsync({
      "Antonio": require("./assets/fonts/Antonio-Light.ttf"),
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
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return (
      <Provider store={store}>
        <StatusBar barStyle="light-content"/>
        <AppNavigator/>
      </Provider>
    );
  }
}

export default App;

