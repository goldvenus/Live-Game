import React from "react";
import {
  Text
} from "native-base";
import {
  Image,
  View
} from "react-native";
import { styles } from "../styles";


const GameHeaderBar = () => (
  <View style={styles.header_view}>
    <Image
      style={styles.header_arrow_btn}
      source={require("../../../../assets/images/game/header/amber.png")}
    />
    <View style={styles.header_middle_view}>
      <Image
        style={styles.game_mark_icon}
        source={require("../../../../assets/images/bottom_nav_bar/game-active.png")}/>
      <Text style={styles.game_header_title}>
        ZENDUJA LIVE
      </Text>
    </View>
    <Image
      style={styles.header_user_img}
      source={require("../../../../assets/images/game/header/ava.png")}
    />
  </View>
);

export default GameHeaderBar;
