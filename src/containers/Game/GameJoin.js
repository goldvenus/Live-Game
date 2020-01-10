import React from 'react';
import {
  Container,
  Content,
  Text,
} from 'native-base';
import {
  Image,
  View,
  TouchableOpacity, Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';

import { joinStyles, styles, GameGlobal } from './styles';
import GameHeaderBar from './components/GameHeaderBar';
import LightningEffect from './animation/LightningEffect';
import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler,
} from '../../services/BackPress';
import AppMocData from '@share/data/MocData';
import { soundEffectInit } from '@share/soundPlay';

function GameJoin(props) {
  const { spinToken, score, bulletFlare, navigation } = props;
  React.useEffect(() => {
    handleAndroidBackButton(() => false);
    soundEffectInit();
    return () => {
      removeAndroidBackButtonHandler();
    };
  }, []);
  const disableShowSpinePage = () => {
    Alert.alert(
      'Access denied',
      'You can play the game for getting the token.',
      [
        {
          text: 'OK',
        },
      ],
      { cancelable: false },
    );
  };
  const onJoinButtonPress = () => {
    navigation.navigate('GameReady');
  };

  const onFlareSpinPress = () => {
    if (spinToken.flareSpin < 1) {
      disableShowSpinePage();
    } else { navigation.navigate('FlareSpinWheel'); }
  };

  const onRuleObjectPress = () => {
    navigation.navigate('NikiQuestion');
  };
  const onMegaSpinPress = () => {
    if (score.megaSpin < 1) {
      disableShowSpinePage();
    } else { navigation.navigate('MegaSpinWheel'); }
  };

  const GameJoinTime = Math.floor(Math.random() * 100) % 25;
  let startTime = 9;
  let AMPM = 'PM';
  if (GameJoinTime > 12) {
    startTime = 24 - GameJoinTime;
    AMPM = 'PM';
  } else {
    startTime = GameJoinTime;
    AMPM = 'AM';
  }
  return (
    <Container style={styles.container}>
      <Content contentContainerStyle={styles.content}>
        <GameHeaderBar />
        <View style={joinStyles.bodyContainer}>
          <View style={joinStyles.join_top_view}>
            <View>
              <Image
                style={joinStyles.flare_border}
                source={AppMocData.game.lightning.image}
              />
              <LightningEffect lightw={wp('15')} lighth={hp('25')} mx={wp('-4')} my={hp('0')} />
            </View>
            <View style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text style={{
                fontFamily: 'Antonio-Bold',
                fontSize: wp('15'),
                color: 'white',
                paddingLeft: wp('12'),
                paddingRight: wp('12'),
                marginBottom: hp('-1'),
              }}>
                {bulletFlare}
              </Text>
              <Text style={{
                fontFamily: 'Antonio',
                fontSize: wp('7'),
                color: 'white',
                opacity: 0.3,
                marginTop: hp('-1'),
              }}>
                Flares
              </Text>
            </View>
            <View>
              <Image
                style={joinStyles.flare_border_right}
                source={AppMocData.game.lightning.image}
              />
              <LightningEffect lightw={wp('15')} lighth={hp('25')} mx={wp('-2')} my={hp('0')} />
            </View>
          </View>
          <View style={joinStyles.join_bottom_view}>
            <View style={{
              display: 'flex',
              flexDirectionRow: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '50%',
            }}
            >
              <Text style={GameGlobal.h4}>{score.spinCoins}</Text>
              <Text style={GameGlobal.h6}>Spin Coins</Text>
            </View>
            <View style={{
              width: 1,
              backgroundColor: '#ffffff4f',
              height: hp('6'),
            }}
            />
            <View style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '50%',
            }}
            >
              <Text style={GameGlobal.h4}>{score.megaSpin}</Text>
              <Text style={GameGlobal.h6}>Mega Spin Credits</Text>
            </View>
          </View>
        </View>
        <View stlye={joinStyles.game_setting}>
          <View style={joinStyles.setting_JoinItem}>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
            }}
            >
              <Text style={GameGlobal.h5}>NEXT LIVE GAME</Text>
              <Text style={{
                fontFamily: 'Antonio-Bold',
                paddingLeft: wp('1'),
                fontSize: wp('5'),
                color: 'white',
              }}>
                {startTime + AMPM}
              </Text>
            </View>
            <TouchableOpacity
              style={joinStyles.joinButton}
              onPress={() => onJoinButtonPress()}
            >
              <Text style={joinStyles.joinButton_Title}>JOIN</Text>
            </TouchableOpacity>
          </View>
          <View style={joinStyles.game_flareSpin_item}>
            <Image
              style={joinStyles.game_flareSpin_item_image}
              source={AppMocData.game.gameplay.target.triangular.green}
            />
            <TouchableOpacity
              style={joinStyles.setting_item_list}
              onPress={onFlareSpinPress}
              activeOpacity={0.4}
            >
              <Text style={GameGlobal.h5}>Flare Spins</Text>
              <View style={joinStyles.setting_item_right_view}>
                <Text style={joinStyles.setting_item_right_textBox}>{spinToken.flareSpin}</Text>
                <View
                  style={joinStyles.flare_spins_btn}
                >
                  <Image
                    source={AppMocData.game.icon.arrow}
                    style={{
                      width: wp('2'),
                      height: wp('3'),
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={joinStyles.game_MegaSpin_item}>
            <Image
              style={joinStyles.game_flareSpin_item_image}
              source={AppMocData.game.icon.megaSpin}
            />
            <TouchableOpacity
              style={joinStyles.setting_mega_item_list}
              onPress={onMegaSpinPress}
              activeOpacity={0.4}
            >
              <Text style={GameGlobal.h5}>Mega Spins</Text>
              <View style={joinStyles.setting_item_right_view}>
                <Text style={joinStyles.setting_item_right_textBox}>{score.megaSpin}</Text>
                <View
                  style={joinStyles.flare_spins_btn}
                >
                  <Image
                    source={AppMocData.game.icon.arrow}
                    style={{
                      width: wp('2'),
                      height: wp('3'),
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={joinStyles.game_MegaSpin_item}>
            <Image
              style={{
                width: wp('6'),
                height: wp('6'),
                marginRight: wp('1'),
                marginLeft: wp('1'),
              }}
              source={AppMocData.game.icon.ruleObject}
            />
            <TouchableOpacity
              style={joinStyles.setting_mega_item_list}
              onPress={onRuleObjectPress}
              activeOpacity={0.4}
            >
              <Text style={GameGlobal.h5}>Rules and Objective</Text>
              <View style={joinStyles.setting_item_right_view}>
                <View
                  style={joinStyles.flare_spins_btn}
                >
                  <Image
                    source={AppMocData.game.icon.arrow}
                    style={{
                      width: wp('2'),
                      height: wp('3'),
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Content>
    </Container>
  );
}

GameJoin.propTypes = {
  spinToken: PropTypes.object.isRequired,
  score: PropTypes.object.isRequired,
  bulletFlare: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
  spinToken: state.game.spinToken,
  score: state.game.score,
  bulletFlare: state.game.bulletFlare,
});

export default connect(mapStateToProps, null)(GameJoin);
