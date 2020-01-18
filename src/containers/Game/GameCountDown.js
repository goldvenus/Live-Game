import React from 'react';
import {
  Container,
  Content,
  Text,
} from 'native-base';
import {
  View, Animated,
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp }
  from 'react-native-responsive-screen';
import { Audio } from 'expo-av';

import { styles } from './styles';
import GameHeaderBar from './components/GameHeaderBar';
import FlareSpin from './components/FlareSpin';
import { FlareType } from '@share/data/gamePlay/FlareType';
import AppMocData from '@share/data/MocData';
import { handleAndroidBackButton, removeAndroidBackButtonHandler } from '../../services/BackPress';

class GameCountDown extends React.Component {
  static propTypes = {

  };

  static defaultProps = {

  };

  constructor(props) {
    super(props);
    this.state = {
      downTime: 10,
      fadeAnim: new Animated.Value(0),
    };
    this.soundObject = new Audio.Sound();
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const { fadeAnim } = this.state;
    handleAndroidBackButton(() => {
      navigation.goBack(null);
    });
    await this.countDownSound();
    Animated.timing(
      // Uses easing functions
      fadeAnim,
      {
        toValue: 1,
        duration: 2000,
      },
    ).start();
    this.clockCountDown = setInterval(() => {
      this.decrementClock();
    }, 1000);
  }

  async countDownSound() {
    try {
      await this.soundObject.loadAsync(AppMocData.sound.countdownSound);
      await this.soundObject.playAsync();
      return true;
    } catch (error) { return false; }
  }

  async componentWillUnmount() {
    removeAndroidBackButtonHandler();
    try {
      await this.soundObject.stopAsync();
    // eslint-disable-next-line no-console
    } catch (e) { console.log(e); }
    clearInterval(this.clockCountDown);
  }

  decrementClock = () => {
    const { navigation } = this.props;
    const { downTime } = this.state;
    if (downTime < 1) {
      clearInterval(this.clockCountDown);
      navigation.replace('GamePlay');
    } else { this.setState((prevState) => ({ downTime: prevState.downTime - 1 })); }
  };

  render() {
    const { downTime, fadeAnim } = this.state;
    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.content}>
          <GameHeaderBar />
          <View style={{
            position: 'absolute',
            top: hp('30'),
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%',
          }}
          >
            <FlareSpin
              spinInfoData={{
                spinType: FlareType.spinType.triangle,
                megaType: FlareType.spinType.mega.apple,
                userType: FlareType.spinType.user.woman,
                spinNumber: 50,
                spinColor: FlareType.spinColor.green,
                shadowColor: FlareType.shadowColor.white,
                spinSize: 45,
                spinTextSize: 24,
              }}
              angle={0}
            />
          </View>
          {
            downTime < 10
            && (
            <Animated.Text style={{
              opacity: fadeAnim,
              position: 'absolute',
              display: 'flex',
              top: hp('50'),
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              textAlign: 'center',
              justifyContent: 'center',
              fontSize: wp('18'),
              color: 'white',
              fontFamily: 'Antonio-Bold',
            }}>
              {downTime + 1}
            </Animated.Text>
            )
          }
          <View style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            height: hp('30'),
          }}
          >
            <Text style={{
              fontSize: wp('8'),
              color: 'white',
              opacity: 0.4,
              paddingRight: wp('1'),
              fontFamily: 'Antonio',
            }}>
              FLARE SCORES
            </Text>
            <Text style={{
              fontSize: wp('8'),
              color: 'white',
              fontFamily: 'Antonio-Bold',
            }}>
              50 POINTS
            </Text>
          </View>
        </Content>
      </Container>
    );
  }
}

export default GameCountDown;
