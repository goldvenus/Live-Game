import { styles } from "../styles";
import { Text } from "native-base";
import { View } from "react-native";
import React from "react";

const GameBottomBar = ({bulletCount, gamePlayTime}) => {
  const min = Math.floor(gamePlayTime/60);
  const sec = gamePlayTime - 60*min;
  let gamePlayMin = min;
  let gamePlaySec = sec;
  if (sec < 10)
    gamePlaySec = `0${sec}`;

  if (min < 10)
    gamePlayMin = `0${min}`;
  return (
    <View style={styles.game_state_bottom_bar}>
      <Text style={styles.time_count_down}>{`${gamePlayMin}:${gamePlaySec}`}</Text>
      <Text style={styles.mark_text}>FLARE COUNT:</Text>
      <Text style={styles.game_mark}>{bulletCount}</Text>
    </View>
  )
};
export default GameBottomBar;