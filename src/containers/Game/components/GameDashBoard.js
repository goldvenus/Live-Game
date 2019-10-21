import React from "react";
import {
  Text
} from "native-base";
import {
  Image,
  View
} from "react-native";
import { styles } from "../styles";
import { connect } from 'react-redux';
import Images from "../../../../MocData";

class GameDashBoard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { score, passPlayers, addSpinCoin } = this.props;
    return (
      <View style={styles.game_dashboard_view}>
        <View style={styles.game_dashboard_top_view}>
          <View style={styles.game_wavescore_view}>
            <Image
              style={styles.game_wavescore}
              source={Images.game.icon.waveScore}/>
            <Text style={styles.game_wavescore_text}>63,234</Text>
          </View>
          <View style={styles.game_play_passed_view}>
            <Text style={styles.game_play_passed_num}>{passPlayers}</Text>
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

const mapStateToProps = state => {
  return {
    score: state.game.score
  }
};

export default connect(mapStateToProps, null)(GameDashBoard);
