import { styles } from "../styles";
import { Text } from "native-base";
import { View } from "react-native";
import React from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Audio } from "expo-av";
import Images from "../../../../MocData";

function GameBottomBar ({ bulletCount, gamePlayTime }) {
  const min = Math.floor(gamePlayTime / 60);
  const sec = gamePlayTime - 60 * min;
  let gamePlayMin = min;
  let gamePlaySec = sec;
  if (sec < 10)
    gamePlaySec = `0${sec}`;

  if (min < 10)
    gamePlayMin = `0${min}`;
  const color = gamePlayTime > 9 ? "#2EC760" : "#d21f3c";
  if(gamePlayTime===11) {
    Audio.Sound.createAsync(Images.sound.countdownSound, { shouldPlay: true });
  };
  return (
    <View style={styles.game_state_bottom_bar}>
      <Text style={{
        fontSize: wp("5"),
        fontFamily: "Antonio",
        display: "flex",
        color: color,
        textShadowColor: color,
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: wp("2"),
        paddingLeft: wp("10"),
        opacity: 1,
      }}>{`${gamePlayMin}:${gamePlaySec}`}</Text>
      <Text style={styles.mark_text}>FLARE COUNT:</Text>
      <Text style={styles.game_mark}>{bulletCount}</Text>
    </View>
  );
};
export default GameBottomBar;