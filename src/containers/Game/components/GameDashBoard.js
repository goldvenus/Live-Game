import React from "react";
import {
  Text
} from "native-base";
import {
  Image,
  View
} from "react-native";
import { styles } from "../styles";


const GameDashBoard = () => (
  <View style={styles.game_dashboard_view}>
    <View style={styles.game_dashboard_top_view}>
      <View style={styles.game_wavescore_view}>
        <Image
          style={styles.game_wavescore}
          source={require("../../../../assets/images/game/wavescore-icon.png")}/>
        <Text style={styles.game_wavescore_text}>63,234</Text>
      </View>
      <View style={styles.game_play_passed_view}>
        <Text style={styles.game_play_passed_num}>0</Text>
        <Text style={styles.game_play_passed_title}>PLAYERS {'\n'} PASSED</Text>
      </View>
    </View>
    <View style={styles.game_dashboard_bottom_view}>
      <Text style={styles.game_spin_coins_title}>SPIN COINS WON</Text>
      <Text style={styles.game_spin_coins}>28</Text>
    </View>
  </View>
);

export default GameDashBoard;
