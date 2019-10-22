import React from "react";
import {
  Text
} from "native-base";
import {
  Image,
  View
} from "react-native";
import { styles } from "../styles";
import Images from "../../../../MocData";


const GameHeaderBar = () => (
  <View style={styles.header_view}>
    <Image
      style={styles.header_arrow_btn}
      source={Images.game.header.amber}
    />
    <View style={styles.header_middle_view}>
      <Image
        style={styles.game_mark_icon}
        source={Images.bottomBar.gameActive}/>
      <Text style={styles.game_header_title}>
        ZENDUJA LIVE
      </Text>
    </View>
    <Image
      style={styles.header_user_img}
      source={Images.game.header.user}
    />
  </View>
);

export default GameHeaderBar;
