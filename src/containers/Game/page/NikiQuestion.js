import React from "react";
import { View, StyleSheet, Image, Text,TouchableOpacity } from "react-native";
import GameHeaderBar from "../components/GameHeaderBar";
import Images from "../../../../MocData";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

class NikiQuestion extends React.Component {

  getFlare = ()=> {
    this.props.navigation.navigate('GetAnswerFlare');
  };
  render() {
    return (
      <View style={styles.container}>
        <GameHeaderBar/>
        <View style={styles.headerSection}>
          <Image source={Images.game.page.roundBgOrange} style={styles.headerImageCircle}/>
          <Image source={Images.game.gameplay.target.mega.niki} style={styles.headerMark}/>
        </View>
        <View style={styles.headerTitleSection}>
          <Text style={styles.headerSectionTitle}>WHAT SPORT DO YOU</Text>
          <Text style={styles.headerSectionTitle}>PLAY MOST?</Text>
        </View>
        <View style={styles.flaresSection}>
          {
            Object.keys(Images.game.page.nikiQuestion).map((image, index) =>
              <TouchableOpacity key={index} onPress={this.getFlare}>
                <Image source={Images.game.page.nikiQuestion[image]} style={styles.nikiImages}/>
              </TouchableOpacity>
            )
          }
        </View>
        <View style={styles.bottomSection}>
          <Text style={styles.bottomSectionTitle}>ANSWER AND SCORE</Text>
          <Text style={styles.bottomSectionScoreTitle}>3 FLARES</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181818"
  },
  headerSection: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    position: "relative"
  },
  headerMark: {
    width: wp("13"),
    top: hp("15"),
    position: "absolute",
    resizeMode: "contain"
  },
  headerImageCircle: {
    width: wp("30"),
    marginTop: hp("10"),
    resizeMode: "cover"
  },
  headerSectionTitle: {
    color: "white",
    fontSize: wp("7.5"),
    marginTop: hp("-1.5"),
    fontFamily: "Antonio-Bold"
  },
  headerTitleSection: {
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  },
  flaresSection: {
    justifyContent: "center",
    flexDirection: "row"
  },
  nikiImages: {
    width: wp("31"),
    height: hp("35"),
    resizeMode: "contain",
    marginTop: hp("5")
  },
  bottomSection: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    position: "relative"
  },
  bottomSectionTitle: {
    fontSize: wp("5.3"),
    color: "white",
    opacity: 0.4,
    fontFamily: "Antonio-Bold"
  },
  bottomSectionScoreTitle: {
    fontSize: wp("5.3"),
    color: "white",
    paddingLeft: wp("2"),
    fontFamily: "Antonio-Bold"
  }
});
export default NikiQuestion;