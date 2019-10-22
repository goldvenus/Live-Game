import React from "react";
import { View, Image, Text } from "react-native";
import { connect } from "react-redux";
import Images from "../../../../MocData";
import { styles } from "./styles";
import GameHeaderBar from "../components/GameHeaderBar";
import RoundPannel from "./RoundPannel";

function GameMegaRound(megaSpinCount, navigation) {
  let gameRoundState = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let j = megaSpinCount > 9 ? 9 : megaSpinCount;
  if (megaSpinCount === 9) {
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
        <Image source={Images.game.page.mega.megaTopMark}
               style={styles.topMarkImage}/>
        <Image source={Images.game.page.mega.megaBig}
               style={styles.megaUnlockImage}/>
        <Image source={Images.game.page.roundBgRed}
               style={styles.topCirclebgImage}/>
        <Text style={styles.topSectionTitle}>BLUZAG</Text>
        <Text style={styles.roundLocktxt}>49 / 1000 LEFT</Text>
      </View>
      <View style={styles.bottomRoundSection}>
        <View style={styles.bottomRoundText}>
          <Text style={styles.roundTitletext}>COLLECT ALL </Text>
          <Text style={styles.roundTitleBoldtext}>9 BADGES</Text>
          <Text style={styles.roundTitletext}> TO REDEEM YOUR PRIZE!</Text>
        </View>
        <RoundPannel roundState={gameRoundState} type="mega"/>
      </View>
    </View>
  );
}

const mapStateToProps = state => {
  return {
    megaSpinCount: state.game.score.megaSpin
  };
};

export default connect(mapStateToProps, null)(GameMegaRound);
