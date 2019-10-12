import React from "react";
import {
  Text
} from "native-base";
import {
  Image,
  View
} from "react-native";
import { styles } from "../styles";


class GameDashBoard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { addSpinCoin } = this.props;
    return (
      <View style={styles.game_dashboard_view}>
        <View style={styles.game_dashboard_top_view}>
          <View style={styles.game_wavescore_view}>
            <Image
              style={styles.game_wavescore}
              source={require("../../../../assets/images/game/icon/wavescore.png")}/>
            <Text style={styles.game_wavescore_text}>63,234</Text>
          </View>
          <View style={styles.game_play_passed_view}>
            <Text style={styles.game_play_passed_num}>0</Text>
            <Text style={styles.game_play_passed_title}>PLAYERS {"\n"} PASSED</Text>
          </View>
        </View>
        <View style={styles.game_dashboard_bottom_view}>
          <Text style={styles.game_spin_coins_title}>SPIN COINS WON</Text>
          <Text style={styles.game_spin_coins}>{addSpinCoin}</Text>
        </View>
      </View>
    );
  }
}

export default GameDashBoard;
