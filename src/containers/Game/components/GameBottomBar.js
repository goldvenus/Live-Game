import { styles } from "../styles";
import { Text } from "native-base";
import { Animated, View } from "react-native";
import React, { useRef } from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

function GameBottomBar({ bulletCount, gamePlayTime }) {
  const min = Math.floor(gamePlayTime / 60);
  const sec = gamePlayTime - 60 * min;
  let gamePlayMin = min;
  let gamePlaySec = sec;
  if (sec < 10)
    gamePlaySec = `0${sec}`;

  if (min < 10)
    gamePlayMin = `0${min}`;
  const color = gamePlayTime > 10 ? "#2EC760" : "#d21f3c";

  React.useEffect(()=> {
    if(gamePlayTime === 10) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleValue, {
            toValue: 1.5,
            duration: 500,
            useNativeDriver: true
          }),
          Animated.timing(scaleValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
          })
        ]),
        {
          iterations: 10
        }
      ).start();
    }
  }, [gamePlayTime])

  /*Animation Init*/
  const scaleValue = new useRef(new Animated.Value(1)).current;

  const saveScale = scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  return (
    <View style={styles.game_state_bottom_bar}>
      <Animated.Text style={{
        fontSize: wp("5"),
        fontFamily: "Antonio",
        textAlign: "center",
        color: color,
        textShadowColor: color,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: wp("2"),
        marginLeft: wp("10"),
        opacity: 1,
        transform: [
          {
            scale: saveScale
          }
        ]
      }}>{`${gamePlayMin}:${gamePlaySec}`}</Animated.Text>
      <Text style={styles.mark_text}>FLARE COUNT:</Text>
      <Text style={styles.game_mark}>{bulletCount>=0 ? bulletCount:0}</Text>
    </View>
  );
};
export default GameBottomBar;
