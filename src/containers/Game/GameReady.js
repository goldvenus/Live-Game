import React from "react";
import { GLView } from "expo-gl";
import ExpoPixi, { PIXI } from "expo-pixi";
import {
  View
} from "react-native";

import {
  Container,
  Content,
  Text
} from "native-base";
import styles from "./styles";

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
              const fireBtnSize = app.screen.width / 4;
              fireBtn.x = app.screen.width - fireBtnSize / 2 - 20;
              fireBtn.y = app.screen.height - fireBtnSize / 2 - 20;
              fireBtn.width = fireBtnSize;
              fireBtn.height = fireBtnSize;
              app.stage.addChild(fireBtn);
            }}
          />
          <View style={styles.game_state_bottom_bar}>
            <Text style={styles.time_count_down}>00:09</Text>
            <Text style={styles.mark_text}>FLARE COUNT:</Text>
            <Text style={styles.game_mark}>29</Text>
          </View>
        </Content>
      </Container>
    );
  }
}