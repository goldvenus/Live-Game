import { Text } from "native-base";
import { Image, View } from "react-native";
import React from "react";
import { heightPercentageToDP as hp, widthPercentageToDP as wp }
  from "react-native-responsive-screen";

class AniTargetCreate extends React.Component {
  render() {
    const { bodyHeight, bSize, tFontSize, tY, tnumber } = this.props
    return (
      <View style={{
        display: "flex",
        justifyContent: "center",
        height: hp(bodyHeight),
        flexDirection: 'row'
      }}>
        <Image source={require("../../../../assets/images/game/shadow.png")} style={{
          marginTop: wp(bSize/4),
          width: wp(bSize*2/3),
          height: hp(bSize*3/2),
          opacity: 0.4,
          position: 'absolute',
          resizeMode: 'contain'
        }}/>
        <Image source={require("../../../../assets/images/game/target_50.png")} style={{
          width: wp(bSize),
          height: wp(bSize)
        }}/>
        <Text style={{
          position: 'absolute',
          fontSize: wp(tFontSize),
          marginTop: hp(tY),
          fontFamily: 'Antonio-Bold',
          color: 'white'
        }}>{tnumber}</Text>
      </View>
    );
  }
}

export default AniTargetCreate;