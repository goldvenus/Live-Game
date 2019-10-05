import styles from "../styles";
import { Text } from "native-base";
import { View } from "react-native";
import React from "react";

const GameBottomBar = () => (
  <View style={styles.game_state_bottom_bar}>
    <Text style={styles.time_count_down}>00:09</Text>
    <Text style={styles.mark_text}>FLARE COUNT:</Text>
    <Text style={styles.game_mark}>29</Text>
  </View>
);
export default GameBottomBar;