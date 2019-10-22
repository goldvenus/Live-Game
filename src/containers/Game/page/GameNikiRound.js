import React from "react";
import { View, Image, Text } from "react-native";
import { connect } from "react-redux";
import Images from "../../../../MocData";
import { styles } from "./styles";
import GameHeaderBar from "../components/GameHeaderBar";
import RoundPannel from "./RoundPannel";

function GameNikiRound(nikeSpinNum, navigation) {
  let gameRoundState = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let j = nikeSpinNum > 9 ? 9 : nikeSpinNum;
  if (nikeSpinNum === 9) {
    setTimeout(() => {
      navigation.navigate("MegaSpinWheel");
    }, 2000);
  }
  for (let i = 0; i < j; i++) {
    gameRoundState[i] = 1;
  }
  return (
    <View style={styles.megaRoundParent}>
      <GameHeaderBar/>
      <View style={styles.topSection}>
        <Image source={Images.game.page.niki.nikiShoe}
               style={styles.nikiUnlockImage}/>
        <Image source={Images.game.page.roundBgOrange}
               style={styles.topCirclebgNikiImage}/>
        <Text style={styles.topTitleNiki}>NIKE</Text>
        <Text style={styles.topSTitleNiki}>VAPORMAX</Text>
        <Text style={styles.roundLocktxt}>49 / 1000 LEFT</Text>
      </View>
      <View style={styles.bottomRoundSection}>
        <View style={styles.bottomRoundText}>
          <Text style={styles.roundTitletext}>COLLECT ALL </Text>
          <Text style={styles.roundTitleBoldtext}>9 BADGES</Text>
          <Text style={styles.roundTitletext}> TO REDEEM YOUR PRIZE!</Text>
        </View>
        <RoundPannel roundState={gameRoundState} type="niki"/>
      </View>
    </View>
  );
}

const mapStatetToProps = state => {
  return {
    nikeSpinNum: state.game.score.nikeSpin
  };
};

export default connect(mapStatetToProps, null)(GameNikiRound);
