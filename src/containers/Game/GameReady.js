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

import { styles, ReadyStyles, GameGlobal } from "./styles";
import GameHeaderBar from "./components/GameHeaderBar";
import { heightPercentageToDP as hp, widthPercentageToDP as wp }
  from "react-native-responsive-screen";
import LightningEffect from "./components/animation/LightningEffect";
import CreateUserImage from "./components/CreateUserImage";
import Images from "../../../MocData";

class GameReady extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      downTime: 15,
      unMount: false
    };
  }

  componentDidMount() {
    this.clockCountDown = setInterval(() => {
      this.decrementClock();
    }, 1000);
  }

  componentWillUnmount() {
    //this.setState({unMount: true});
    clearInterval(this.clockCountDown);
  }

  decrementClock = () => {
    if (this.state.downTime < 12) {
      clearInterval(this.clockCountDown);
      this.setState({unMount: true});
      //this.props.navigation.goBack(null);
      this.props.navigation.replace("GameCountDown");
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
            <View style={ReadyStyles.GameReady_CountDown_View}>
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
