import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppMocData from '@share/data/MocData';
import { styles } from './styles';
import RoundPannel from './RoundPannel';

function GameMegaRound(props) {
  const { megaSpinCount, navigation, getSpinListItems } = props;
  const gameRoundState = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  const j = megaSpinCount > 9 ? 9 : megaSpinCount;
  if (megaSpinCount === 9) {
    // setTimeout(() => {
    //   navigation.navigate("NikiQuestion");
    // }, 1500);
  }
  for (let i = 0; i < j; i += 1) {
    gameRoundState[i] = 1;
  }
  const resumeGame = () => {
    navigation.goBack(null);
  };
  return (
    <View style={styles.megaRoundParent}>
      <View style={styles.header_view}>
        {
          getSpinListItems.length > 0
            ? (
              <TouchableOpacity onPress={() => resumeGame()}>
                <Image
                  style={styles.header_arrow_btn}
                  source={AppMocData.public.close}
                />
              </TouchableOpacity>
            ) : <View />
        }

        <View style={styles.header_middle_view}>
          <Image
            style={styles.game_mark_icon}
            source={AppMocData.bottomBar.gameActive}
          />
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
        <Image
          source={AppMocData.game.page.mega.megaTopMark}
          style={styles.topMarkImage}
        />
        <Image
          source={AppMocData.game.page.mega.megaBig}
          style={styles.megaUnlockImage}
        />
        <Image
          source={AppMocData.game.page.roundBgRed}
          style={styles.topCirclebgImage}
        />
        <Text style={styles.topSectionTitle}>BLUZAG</Text>
        <Text style={styles.roundLocktxt}>49 / 1000 LEFT</Text>
      </View>
      <View style={styles.bottomRoundSection}>
        <View style={styles.bottomRoundText}>
          <Text style={styles.roundTitletext}>COLLECT ALL </Text>
          <Text style={styles.roundTitleBoldtext}>9 BADGES</Text>
          <Text style={styles.roundTitletext}> TO REDEEM YOUR PRIZE!</Text>
        </View>
        <RoundPannel roundState={gameRoundState} type="mega" />
      </View>
    </View>
  );
}

GameMegaRound.propTypes = {
  megaSpinCount: PropTypes.number.isRequired,
  getSpinListItems: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  megaSpinCount: state.game.score.lockSpin,
  getSpinListItems: state.game.getSpinListItems,
});

export default connect(mapStateToProps, null)(GameMegaRound);
