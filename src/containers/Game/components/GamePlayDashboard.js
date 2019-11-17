import React from "react";
import {
  Text
} from "native-base";
import {
  Image,
  View
} from "react-native";
import {styles} from "../styles";
import {connect} from "react-redux";
import AppMocData from "../../../share/data/MocData";
import {convertNumberWithCommas} from "../../../share/engine";

class GamePlayDashboard extends React.Component{
  shouldComponentUpdate (nextProps) {
    return nextProps.score !== this.props.score;
  }
  render () {
    const { score } = this.props;
    let getSpinCoin = 0;
    for (let i=0; i<= score.playerPassScore; i++) {
      getSpinCoin += i;
      if(i===12)
        break;
    }
    return (
      <View style={styles.game_dashboard_view}>
        <View style={styles.game_dashboard_top_view}>
          <View style={styles.game_wavescore_view}>
            <Image
              style={styles.game_wavescore}
              source={AppMocData.game.icon.waveScore}/>
            <Text style={styles.game_wavescore_text}>{convertNumberWithCommas(score.waveScore)}</Text>
          </View>
          <View style={styles.game_play_passed_view}>
            <Text style={styles.game_play_passed_num}>{score.playerPassScore}</Text>
            <Text style={styles.game_play_passed_title}>PLAYERS {"\n"} PASSED</Text>
          </View>
        </View>
        <View style={styles.game_dashboard_bottom_view}>
          <Text style={styles.game_spin_coins_title}>SPIN COINS WON</Text>
          <Text style={styles.game_spin_coins}>{getSpinCoin}</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    score: state.game.score
  };
};


export default connect(mapStateToProps, null)(GamePlayDashboard);
