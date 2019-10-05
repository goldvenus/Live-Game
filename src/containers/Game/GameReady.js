import React from "react";
import { GLView } from "expo-gl";
import ExpoPixi, { PIXI } from "expo-pixi";

import {
  Container,
  Content
} from "native-base";
import styles from "./styles";
import GameHeaderBar from "./components/GameHeaderBar";
import GameBottomBar from "./components/GameBottomBar";
import GameDashBoard from "./components/GameDashBoard";

export default class GameReady extends React.Component {
  render() {
    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.content}>
          <GLView
            style={{ flex: 1 }}
            onContextCreate={async context => {
              const app = new PIXI.Application({ context, backgroundColor: 0x11111100 });
              const sprite = await PIXI.Sprite.fromExpoAsync(require("../../assets/images/game/Rectangle_50.png"));
              sprite.anchor.set(0.5);
              sprite.x = app.screen.width / 2;
              sprite.y = app.screen.height;
              sprite.width = app.screen.width / 4;
              sprite.height = app.screen.width / 4;
              app.stage.addChild(sprite);
              app.ticker.add((delta) => {
                sprite.y -= 3 * delta;
              });
              const fireBtn = await PIXI.Sprite.fromExpoAsync(require("../../assets/images/game/fire-btn.png"));
              fireBtn.anchor.set(0.5);
              const fireBtnSize = app.screen.width / 5;
              fireBtn.x = app.screen.width - fireBtnSize / 2 - 20;
              fireBtn.y = app.screen.height - fireBtnSize / 2 - 20;
              fireBtn.width = fireBtnSize;
              fireBtn.height = fireBtnSize;
              fireBtn.zIndex = 10;
              app.stage.addChild(fireBtn);
            }}
          />
          <GameHeaderBar/>
          <GameBottomBar/>
          <GameDashBoard/>
        </Content>
      </Container>
    );
  }
}