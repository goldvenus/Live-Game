import React from "react";

import {
  Container,
  Content
} from "native-base";
import { styles } from "./styles";

import GamePlay from "./gameEngine";
export default class GameStart extends React.Component {

  goPage = (pageName) => {
    this.props.navigation.navigate(pageName);
  }
  render() {
    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.content}>
          <GamePlay backPage={this.goPage}/>
        </Content>
      </Container>
    );
  }
}