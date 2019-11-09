import React from "react";
import {
  Text
} from "native-base";
import {
  Image,
  View
} from "react-native";
import { styles } from "../styles";
import AppMocData from "../../../share/data/MocData";


const GameHeaderBar = () => (
  <View style={styles.header_view}>
    <Image
      style={styles.header_arrow_btn}
      source={AppMocData.game.header.amber}
    />
    <View style={styles.header_middle_view}>
      <Image
        style={styles.game_mark_icon}
        source={AppMocData.bottomBar.gameActive}/>
      <Text style={styles.game_header_title}>
        ZENDUJA LIVE
      </Text>
    </View>
    <Image
      style={styles.header_user_img}
      source={AppMocData.game.header.user}
    />
  </View>
);

export default GameHeaderBar;
