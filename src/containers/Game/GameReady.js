import React from 'react';
import {
  Container,
  Content,
  Text,
} from 'native-base';
import {
  Image,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { heightPercentageToDP as hp, widthPercentageToDP as wp }
  from 'react-native-responsive-screen';
import CountdownCircle from 'react-native-countdown-circle';

import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler,
} from '../../services/BackPress';
import { styles, ReadyStyles, GameGlobal } from './styles';
import GameHeaderBar from './components/GameHeaderBar';
import LightningEffect from './animation/LightningEffect';
import CreateUserImage from './components/CreateUserImage';
import AppMocData from '@share/data/MocData';
import { soundPlay } from '@share/soundPlay';
import { soundPlayNames } from '@share/soundPlay/soundName';
import { userListData } from '@share/data/gamePlay/UserListData';

class GameReady extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      downTime: 15,
      unMount: false,
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    handleAndroidBackButton(() => navigation.goBack(null));
    this.clockCountDown = setInterval(() => {
      this.decrementClock();
    }, 1000);
  }

  componentWillUnmount() {
    // this.setState({unMount: true});
    removeAndroidBackButtonHandler();
    clearInterval(this.clockCountDown);
  }

  decrementClock = () => {
    const { downTime } = this.state;
    if (downTime < 7 && downTime > 1) {
      soundPlay(soundPlayNames.GamePlay.countDown);
    }
    if (downTime < 2) {
      clearInterval(this.clockCountDown);
    } else { this.setState((prevState) => ({ downTime: prevState.downTime - 1 })); }
  };

  backButtonPress() {
    const { navigation } = this.props;
    clearInterval(this.clockCountDown);
    navigation.goBack(null);
  }

  render() {
    const { downTime, unMount } = this.state;
    const { navigation } = this.props;
    const fadeAnimation = {
      0: {
        opacity: 0,
      },
      0.5: {
        opacity: 1,
      },
    };
    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.content}>
          <GameHeaderBar />
          <View style={ReadyStyles.GameReady_Container}>
            <View style={ReadyStyles.TopTitleView}>
              <TouchableOpacity
                style={ReadyStyles.Back_Button}
                onPress={() => this.backButtonPress()}
              >
                <Image source={AppMocData.game.icon.arrow} style={ReadyStyles.Back_Button_Image} />
              </TouchableOpacity>
              <View style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}
              >
                <Text style={GameGlobal.h1}>WELCOME TO THE </Text>
                <Text style={{
                  fontFamily: 'Antonio-Bold',
                  fontSize: wp('8'),
                  color: 'white',
                }}>
                  9PM
                </Text>
              </View>
            </View>
            {
              downTime > 5
                ? (
                  <View style={ReadyStyles.GameReady_CountDown_View}>
                    <View>
                      <Image
                        style={ReadyStyles.flare_border}
                        source={AppMocData.game.lightning.image}
                      />
                      <LightningEffect lightw={wp('17')} lighth={hp('28')} mx={wp('-4')} my={hp('0')} unMount={unMount} />
                    </View>
                    <View style={{
                      width: wp(62),
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    >
                      <Text style={{
                        fontFamily: 'Antonio',
                        fontSize: wp('6'),
                        color: 'white',
                        opacity: 0.3,
                        marginTop: hp('-1'),
                      }}>
                        LIVE GAME BEGINS IN
                      </Text>
                      <Text style={{
                        fontFamily: 'Antonio-Bold',
                        fontSize: wp('15'),
                        color: 'white',
                        marginBottom: hp('-1'),
                      }}>
                        {`00:${downTime > 9 ? downTime : `0${downTime}`}`}
                      </Text>
                    </View>
                    <View />
                    <View>
                      <Image
                        style={ReadyStyles.flare_border_right}
                        source={AppMocData.game.lightning.image}
                        unMount={unMount}
                      />
                      <LightningEffect lightw={wp('17')} lighth={hp('28')} mx={wp('-2')} my={hp('0')} />
                    </View>
                  </View>
                )
                : (
                  <Animatable.View
                    style={ReadyStyles.GameReady_CountDown_View}
                    animation={fadeAnimation}>
                    <CountdownCircle
                      seconds={5}
                      radius={wp('24')}
                      shadowColor="#303030"
                      borderWidth={wp('6')}
                      color="#BF66FB"
                      updateText={(elapsedSecs, totalSecs) => ((totalSecs - elapsedSecs) === 0
                        ? (totalSecs + 1 - elapsedSecs).toString()
                        : (totalSecs - elapsedSecs).toString())}
                      onTimeElapsed={() => setTimeout(() => {
                        navigation.replace('GamePlay');
                      }, 30)}
                      bgColor="#181818"
                      textStyle={{ fontSize: wp('15'), color: 'white', fontFamily: 'Antonio-Bold' }}
                    />
                  </Animatable.View>
                )
            }

            <View style={ReadyStyles.Game_Members_Title}>
              <Text style={ReadyStyles.Game_Members_text1}>THERE ARE</Text>
              <Text style={ReadyStyles.Game_Members_text2}>127 PRO PLAYERS</Text>
              <Text style={ReadyStyles.Game_Members_text1}>COMPETING</Text>
            </View>
            <ScrollView horizontal>
              <View style={ReadyStyles.Game_Join_users}>
                {
                  userListData.map((item, index) => (
                    <CreateUserImage
                      userImage={AppMocData.game.users[item.userImage]}
                      userFlag={AppMocData.game.flag[item.userFlag]}
                      // eslint-disable-next-line react/no-array-index-key
                      key={index} />
                  ))
                }
              </View>
            </ScrollView>
          </View>
        </Content>
      </Container>
    );
  }
}

export default GameReady;
