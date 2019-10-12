import React from "react";
import {
  Container,
  Content,
  Text
} from "native-base";
import {
  Image,
  View,
  TouchableOpacity
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { joinStyles, styles, GameGlobal } from "./styles";
import GameHeaderBar from "./components/GameHeaderBar";
import LightningEffect from "./components/animation/LightningEffect";

class GameJoin extends React.Component {

  onJoinButtonPress() {
    this.props.navigation.navigate("GameReady");
  }

  onFlareSpinPress() {

  }

  onRuleObjectPress() {

  }

  render() {
    const RandomFlare = (Math.random() * 100).toFixed(0);
    const GameJoinTime = Math.floor(Math.random()*100) % 25;
    let startTime = 9;
    let AMPM = 'PM';
    if(GameJoinTime>12) {
      startTime = 24 - GameJoinTime;
      AMPM = 'PM';
    } else {
      startTime = GameJoinTime;
      AMPM = 'AM'
    }
    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.content}>
          <GameHeaderBar/>
          <View style={joinStyles.bodyContainer}>
            <View style={joinStyles.join_top_view}>
              <View>
                <Image style={joinStyles.flare_border}
                       source={require("../../../assets/images/game/lightning/lightning-cover.png")}/>
                <LightningEffect lightw={wp("15")} lighth={hp("25")} mx={wp("-4")} my={hp("0")}/>
              </View>
              <View style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Text style={{
                  fontFamily: "Antonio-Bold",
                  fontSize: wp("15"),
                  color: "white",
                  paddingLeft: wp("12"),
                  paddingRight: wp("12"),
                  marginBottom: hp("-1")
                }}>100</Text>
                <Text style={{
                  fontFamily: "Antonio",
                  fontSize: wp("7"),
                  color: "white",
                  opacity: 0.3,
                  marginTop: hp("-1")
                }}>Flares</Text>
              </View>
              <View>
                <Image style={joinStyles.flare_border_right}
                       source={require("../../../assets/images/game/lightning/lightning-cover.png")}/>
                <LightningEffect lightw={wp("15")} lighth={hp("25")} mx={wp("-2")} my={hp("0")}/>
              </View>
            </View>
            <View style={joinStyles.join_bottom_view}>
              <View style={{
                display: "flex",
                flexDirectionRow: "row",
                alignItems: "center",
                justifyContent: "center",
                width: "50%"
              }}>
                <Text style={GameGlobal.h4}>{RandomFlare.toString()}</Text>
                <Text style={GameGlobal.h6}>Spin Coins</Text>
              </View>
              <View style={{
                width: 1,
                backgroundColor: "#ffffff4f",
                height: hp("6")
              }}/>
              <View style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "50%"
              }}>
                <Text style={GameGlobal.h4}>1</Text>
                <Text style={GameGlobal.h6}>Mega Spin Credits</Text>
              </View>
            </View>
          </View>
          <View stlye={joinStyles.game_setting}>
            <View style={joinStyles.setting_JoinItem}>
              <View style={{
                display: "flex",
                flexDirection: "row"
              }}>
                <Text style={GameGlobal.h5}>NEXT LIVE GAME</Text>
                <Text style={{
                  fontFamily: "Antonio-Bold",
                  paddingLeft: wp("1"),
                  fontSize: wp("5"),
                  color: "white"
                }}>{startTime+AMPM}</Text>
              </View>
              <TouchableOpacity
                style={joinStyles.joinButton}
                onPress={() => this.onJoinButtonPress()}>
                <Text style={joinStyles.joinButton_Title}>JOIN</Text>
              </TouchableOpacity>
            </View>
            <View style={joinStyles.game_flareSpin_item}>
              <Image style={joinStyles.game_flareSpin_item_image}
                     source={require("../../../assets/images/game/gameplay/target/triangular/target-bg-green-3.png")}/>
              <View style={joinStyles.setting_item_list}>
                <Text style={GameGlobal.h5}>Flare Spins</Text>
                <View style={joinStyles.setting_item_right_view}>
                  <Text style={joinStyles.setting_item_right_textBox}>2</Text>
                  <TouchableOpacity
                    style={joinStyles.flare_spins_btn}
                    onPress={this.onFlareSpinPress}>
                    <Image source={require("../../../assets/images/game/icon/arrow.png")} style={{
                      width: wp("2"),
                      height: wp("3")
                    }}/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={joinStyles.game_MegaSpin_item}>
              <Image style={joinStyles.game_flareSpin_item_image}
                     source={require("../../../assets/images/game/icon/mega-spin.png")}/>
              <View style={joinStyles.setting_mega_item_list}>
                <Text style={GameGlobal.h5}>Mega Spins</Text>
                <View style={joinStyles.setting_item_right_view}>
                  <Text style={joinStyles.setting_item_right_textBox}>1</Text>
                  <TouchableOpacity
                    style={joinStyles.flare_spins_btn}
                    onPress={this.onFlareSpinPress}>
                    <Image source={require("../../../assets/images/game/icon/arrow.png")} style={{
                      width: wp("2"),
                      height: wp("3")
                    }}/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={joinStyles.game_MegaSpin_item}>
              <Image style={{
                width: wp("6"),
                height: wp("6"),
                marginRight: wp("1"),
                marginLeft: wp("1")
              }} source={require("../../../assets/images/game/icon/rule-objective.png")}/>
              <View style={joinStyles.setting_mega_item_list}>
                <Text style={GameGlobal.h5}>Rules and Objective</Text>
                <View style={joinStyles.setting_item_right_view}>
                  <TouchableOpacity
                    style={joinStyles.flare_spins_btn}
                    onPress={this.onRuleObjectPress}>
                    <Image source={require("../../../assets/images/game/icon/arrow.png")} style={{
                      width: wp("2"),
                      height: wp("3")
                    }}/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

export default GameJoin;
