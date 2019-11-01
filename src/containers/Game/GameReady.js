import React from "react";
import {
  Container,
  Content,
  Text
} from "native-base";
import {
  Image,
  TouchableOpacity,
  View,
  ScrollView
} from "react-native";
import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler
} from "../../services/BackPress";
import * as Animatable from 'react-native-animatable';
import { styles, ReadyStyles, GameGlobal } from "./styles";
import GameHeaderBar from "./components/GameHeaderBar";
import { heightPercentageToDP as hp, widthPercentageToDP as wp }
  from "react-native-responsive-screen";
import LightningEffect from "./components/animation/LightningEffect";
import CreateUserImage from "./components/CreateUserImage";
import Images from "../../../MocData";
import { Audio } from "expo-av";
import CountdownCircle from 'react-native-countdown-circle';

class GameReady extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      downTime: 15,
      unMount: false,
      soundObject: null
    };

  }

  async componentDidMount() {
    const { sound: soundObjectFive } = await Audio.Sound.createAsync(Images.sound.countdownSound, { shouldPlay: false });
    this.setState({soundObject: soundObjectFive});
    handleAndroidBackButton(() => this.props.navigation.goBack(null));
    this.clockCountDown = setInterval(() => {
      this.decrementClock();
    }, 1000);
  }

  componentWillUnmount() {
    //this.setState({unMount: true});
    removeAndroidBackButtonHandler();
    clearInterval(this.clockCountDown);
  }
   playSound = async() => {
     await this.state.soundObject.replayAsync();
  }
  decrementClock = () => {
    if(this.state.downTime < 7 && this.state.downTime>1) {
      this.playSound();
    }
    if (this.state.downTime < 2) {
      clearInterval(this.clockCountDown);
    }
    else
      this.setState((prevstate) => ({ downTime: prevstate.downTime - 1 }));
  };

  backButtonPress() {
    clearInterval(this.clockCountDown);
    this.props.navigation.goBack(null);
  }

  render() {
    const { downTime, unMount } = this.state;
    const fadeAnimation = {
      0: {
        opacity: 0
      },
      0.5: {
        opacity: 1
      }
    }
    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.content}>
          <GameHeaderBar/>
          <View style={ReadyStyles.GameReady_Container}>
            <View style={ReadyStyles.TopTitleView}>
              <TouchableOpacity
                style={ReadyStyles.Back_Button}
                onPress={() => this.backButtonPress()}>
                <Image source={Images.game.icon.arrow} style={ReadyStyles.Back_Button_Image}/>
              </TouchableOpacity>
              <View style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row"
              }}>
                <Text style={GameGlobal.h1}>WELCOME TO THE </Text>
                <Text style={{
                  fontFamily: "Antonio-Bold",
                  fontSize: wp("8"),
                  color: "white"
                }}>9PM</Text>
              </View>
            </View>
            {
              downTime > 5 ? <View style={ReadyStyles.GameReady_CountDown_View}>
                <View>
                  <Image style={ReadyStyles.flare_border}
                         source={Images.game.lightning.image}/>
                  <LightningEffect lightw={wp("17")} lighth={hp("28")} mx={wp("-4")} my={hp("0")} unMount={unMount}/>
                </View>
                <View style={{
                  width: wp(62),
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Text style={{
                    fontFamily: "Antonio",
                    fontSize: wp("6"),
                    color: "white",
                    opacity: 0.3,
                    marginTop: hp("-1")
                  }}>LIVE GAME BEGINS IN</Text>
                  <Text style={{
                    fontFamily: "Antonio-Bold",
                    fontSize: wp("15"),
                    color: "white",
                    paddingLeft: wp("12"),
                    paddingRight: wp("12"),
                    marginBottom: hp("-1")
                  }}>{`00:${downTime > 9 ? downTime : `0${downTime}`}`}</Text>
                </View>
                <View/>
                <View>
                  <Image style={ReadyStyles.flare_border_right}
                         source={Images.game.lightning.image} unMount={unMount}/>
                  <LightningEffect lightw={wp("17")} lighth={hp("28")} mx={wp("-2")} my={hp("0")}/>
                </View>
              </View>
                : <Animatable.View style={ReadyStyles.GameReady_CountDown_View} animation={fadeAnimation}>
                  <CountdownCircle
                    seconds={5}
                    radius= {wp('30')}
                    shadowColor="#303030"
                    borderWidth={wp('8')}
                    color="#BF66FB"
                    updateText={(elapsedSecs, totalSecs) => {
                      return (totalSecs - elapsedSecs)===0 ? (totalSecs + 1 - elapsedSecs).toString(): (totalSecs - elapsedSecs).toString();
                    }}
                    onTimeElapsed={() => setTimeout(()=> {
                      this.props.navigation.replace("GameStart")
                    }, 30)}
                    bgColor="#181818"
                    textStyle={{fontSize: wp("15"), color: 'white', fontFamily: 'Antonio-Bold'}}
                  />
                </Animatable.View>
            }

            <View style={ReadyStyles.Game_Members_Title}>
              <Text style={ReadyStyles.Game_Members_text1}>THERE ARE</Text>
              <Text style={ReadyStyles.Game_Members_text2}>127 PRO PLAYERS</Text>
              <Text style={ReadyStyles.Game_Members_text1}>COMPETING</Text>
            </View>
            <ScrollView horizontal={true}>
              <View style={ReadyStyles.Game_Join_users}>
                <CreateUserImage userImage={require('../../../assets/images/game/users/4.png')} userFlag={require('../../../assets/images/game/flag/JAP.png')}/>
                <CreateUserImage userImage={require('../../../assets/images/game/users/3.png')} userFlag={require('../../../assets/images/game/flag/USA.png')}/>
                <CreateUserImage userImage={require('../../../assets/images/game/users/4.png')} userFlag={require('../../../assets/images/game/flag/JAP.png')}/>
                <CreateUserImage userImage={require('../../../assets/images/game/users/3.png')} userFlag={require('../../../assets/images/game/flag/USA.png')}/>
                <CreateUserImage userImage={require('../../../assets/images/game/users/4.png')} userFlag={require('../../../assets/images/game/flag/JAP.png')}/>
                <CreateUserImage userImage={require('../../../assets/images/game/users/3.png')} userFlag={require('../../../assets/images/game/flag/USA.png')}/>
                <CreateUserImage userImage={require('../../../assets/images/game/users/4.png')} userFlag={require('../../../assets/images/game/flag/JAP.png')}/>
                <CreateUserImage userImage={require('../../../assets/images/game/users/3.png')} userFlag={require('../../../assets/images/game/flag/USA.png')}/>
              </View>
            </ScrollView>
          </View>
        </Content>
      </Container>
    );
  }
}

export default GameReady;
