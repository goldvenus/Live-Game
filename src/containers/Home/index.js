import React from "react";
import {
  Container,
  Content,
  Text
} from "native-base";

import styles from "./styles";
import GameHeaderBar from "../Game/components/GameHeaderBar";
import GameDashBoard from "../Game/components/GameDashBoard";


const Home = () => (
  <Container style={styles.container}>
    <Content contentContainerStyle={styles.content}>
      <GameDashBoard/>
      <Text style={styles.text}>Home</Text>
    </Content>
  </Container>
);

export default Home;
