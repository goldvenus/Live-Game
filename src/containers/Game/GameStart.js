import React from "react";

import {
  Container,
  Content
} from "native-base";
import { styles } from "./styles";
import GameHeaderBar from "./components/GameHeaderBar";
import GameBottomBar from "./components/GameBottomBar";
import GameDashBoard from "./components/GameDashBoard";
import GamePlay from "./gameEngine";
import LocationPulseLoader from "./components/animation/PulseLoader";
export default class GameStart extends React.Component {

  render() {
    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.content}>
          <GamePlay/>
          {/*<TargetCreate/>*/}
          {/*<TargetMove/>*/}
          {/*<GameDashBoard/>*/}
          {/*<GameHeaderBar/>*/}
          {/*<GameBottomBar/>*/}
          {/*<LocationPulseLoader/>*/}
        </Content>
      </Container>
    );
  }
}