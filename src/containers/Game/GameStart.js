import React from "react";

import {
  Container,
  Content
} from "native-base";
import styles from "./styles";
import GameHeaderBar from "./components/GameHeaderBar";
import GameBottomBar from "./components/GameBottomBar";
import GameDashBoard from "./components/GameDashBoard";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";
import RigidBodies from "../../app/physics/rigid-bodies";
import { Image } from "react-native";

export default class GameStart extends React.Component {

  async _cacheResourcesAsync() {
    const images = [require("../../assets/images/game/Rectangle_50.png"), require("../../assets/images/game/fire-btn.png")];
    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  }

  state = {
    isReady: false
  };

  render() {
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
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.content}>
          <RigidBodies/>
          <GameDashBoard/>
          <GameHeaderBar/>
          <GameBottomBar/>
          <Image source={require('../../assets/images/game/fire-btn.png')}
                 style={{
                   width: 200,
                   height: 200,
                   position: 'absolute',
                   right:-44,
                   bottom:-44
                 }}/>
        </Content>
      </Container>
    );
  }
}