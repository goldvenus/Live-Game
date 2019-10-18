import React from "react";
import {
  Container,
  Content,
  Text
} from "native-base";
import {
  View
} from "react-native";
import { styles } from "./styles";
import GameHeaderBar from "./components/GameHeaderBar";
import { heightPercentageToDP as hp, widthPercentageToDP as wp }
  from "react-native-responsive-screen";
import { Audio } from "expo-av";
import CreateTarget from "./components/CreateTarget";
import { GameTypes } from "./gameEngine/data/gameType";
import Images from "../../../MocData";

class GameCountDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { downTime: 10 };
    this.soundObject = new Audio.Sound();
  }

  async componentDidMount() {
    await this.countDownSound();
    this.clockCountDown = setInterval(() => {
      this.decrementClock();
    }, 1000);
  }

  async countDownSound() {
    try {
      await this.soundObject.loadAsync(Images.sound.countdownSound);
      await this.soundObject.playAsync();
    } catch (error) {
      console.log(error);
    }
  }

  async componentWillUnmount() {
    try {
      await this.soundObject.stopAsync();
    } catch (e) {

    }
    clearInterval(this.clockCountDown);
    // this.props.navigation.goBack(null);
    // if(this.playbackObject.isPlaying) {
    //   this.playbackObject.stopAsync();
    // }
  }

  decrementClock = () => {
    if (this.state.downTime < 1) {
      clearInterval(this.clockCountDown);
      //this.props.navigation.goBack(null);
      this.props.navigation.replace("GameStart");
    }
    else
      this.setState((prevstate) => ({ downTime: prevstate.downTime - 1 }));
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.content}>
          <GameHeaderBar/>
          <CreateTarget spinInfoData = {{
            spinType:GameTypes.spinType.triangle,
            megaType:GameTypes.spinType.mega.apple,
            userType:GameTypes.spinType.user.woman,
            spinNumber:50,
            spinColor:GameTypes.spinColor.green,
            shadowColor:GameTypes.shadowColor.white,
            spinSize: 45,
            spinTextSize: 24
          }} angle={0}/>

          <View style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            height: hp("30")
          }}>
            <Text style={{
              fontSize: wp("8"),
              color: "white",
              opacity: 0.4,
              paddingRight: wp("1"),
              fontFamily: "Antonio"
            }}>FLARE SCORES</Text>
            <Text style={{
              fontSize: wp("8"),
              color: "white",
              fontFamily: "Antonio-Bold"
            }}>50 POINTS</Text>
          </View>
        </Content>
      </Container>
    );
  }
}

export default GameCountDown;
