import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import AppMocData from "../../../share/data/MocData";
import { styles } from "./styles";
import RoundPannel from "./RoundPannel";

function GameNikiRound({ score, navigation, getSpinListItems }) {

  let nikeSpinNum = 0;
  const type = navigation.getParam('param', 'NO-ID');
  switch(type.param) {
    case 'niki':
      nikeSpinNum = score.nikeSpin;
      break;
    case 'apple':
      nikeSpinNum = score.appleSpin;
      break;
    case 'mega':
      nikeSpinNum = score.megaSpin;
      break;
    default:
      break;
  }
  let gameRoundState = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let j = nikeSpinNum > 9 ? 9 : nikeSpinNum;
  // if (nikeSpinNum >= 9) {
  //   setTimeout(() => {
  //     navigation.navigate("NikiQuestion");
  //   }, 1500);
  // }
  for (let i = 0; i < j; i++) {
    gameRoundState[i] = 1;
  }
  const resumeGame = () => {
    navigation.goBack(null);
  };

  return (
    <View style={styles.megaRoundParent}>
      <View style={styles.header_view}>
        {
          getSpinListItems.length>0 ?
          <TouchableOpacity onPress={()=>resumeGame()}>
            <Image
              style={styles.header_arrow_btn}
              source={AppMocData.public.close}
            />
          </TouchableOpacity> : <View/>
        }

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
      <View style={styles.topSection}>
        <Image source={AppMocData.game.page.niki.nikiShoe}
               style={styles.nikiUnlockImage}/>
        <Image source={AppMocData.game.page.roundBgOrange}
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
        <RoundPannel roundState={gameRoundState} type={type.param}/>
      </View>
    </View>
  );
}

const mapStateToProps = state => {
  return {
    score: state.game.score,
    getSpinListItems: state.game.getSpinListItems
  };
};

export default connect(mapStateToProps, null)(GameNikiRound);
