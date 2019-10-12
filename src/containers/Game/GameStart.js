import React from "react";

import {
  Container,
  Content
} from "native-base";
import { styles } from "./styles";

import GamePlay from "./gameEngine";
export default class GameStart extends React.Component {

  render() {
    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.content}>
          <GamePlay/>
        </Content>
      </Container>
    );
  }
}