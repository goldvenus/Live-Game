import React, { PureComponent } from "react";
import { AppRegistry, StyleSheet, StatusBar } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Target } from "./renderers";
import { MoveFinger } from "./systems"

export default class TargetMove extends PureComponent {
  constructor() {
    super();
  }

  render() {
    return (
      <GameEngine
        style={styles.container}
        systems={[MoveFinger]} //-- We can add as many systems as needed
        entities={{
          1: { position: [40,  200], renderer: <Target />}, //-- Notice that each entity has a unique id (required)
          2: { position: [100, 200], renderer: <Target />}, //-- and a map of components. Each entity has an optional
          3: { position: [160, 200], renderer: <Target />}, //-- renderer component. If no renderer is supplied with the
          4: { position: [220, 200], renderer: <Target />}, //-- entity - it won't get displayed.
          5: { position: [280, 200], renderer: <Target />}
        }}>

        <StatusBar hidden={true} />
      </GameEngine>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181818"
  }
});

AppRegistry.registerComponent("BestGameEver", () => BestGameEver);