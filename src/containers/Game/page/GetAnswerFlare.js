import React from "react";
import { ImageBackground, TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import AppMocData from "../../../share/data/MocData";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

class GetAnswerFlare extends React.Component {
  onBackButtonEvent = () => {
    // const { params } = this.props.navigation.state;
    // params.getFlare(3);
    this.props.navigation.goBack(null);
  };
  render() {
    return (
      <ImageBackground source={AppMocData.game.page.flareAnswer.background}
                       style={styles.container}>
        <TouchableOpacity style={styles.getFlareButton} onPress={this.onBackButtonEvent}>
          <Image source={AppMocData.game.page.flareAnswer.first} style={styles.button}/>
          <Text style={styles.flareButtonText}>GET 3 FLARES</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'relative'
  },
  getFlareButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('5')
  },
  button: {
    width: wp('50'),
  },
  flareButtonText: {
    color: 'white',
    fontSize: wp('5'),
    fontFamily: 'Antonio-Bold',
    position: 'absolute',
    textAlign: 'center'
  }
});
export default GetAnswerFlare;
