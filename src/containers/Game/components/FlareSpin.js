import { Text } from "native-base";
import { Image, View } from "react-native";
import React from "react";
import { heightPercentageToDP as hp, widthPercentageToDP as wp }
  from "react-native-responsive-screen";
import Images from "../../../share/data/MocData";
import { FlareType } from "../../../share/data/gamePlay/FlareType";

const FlareSpin = ({ spinInfoData, angle, shadow=true, running = true }) => {
  const { spinType, spinNumber, spinColor, spinSize, spinTextSize, megaType, userType } = spinInfoData;
  const targetImage = Images.game.gameplay.target;
  let ty = spinSize / 8;
  if (spinType === FlareType.spinType.triangle)
    ty = spinSize / 20;
  else if (spinType === FlareType.spinType.ellipse) {
    ty = spinSize / 8;
  }
  if (spinNumber === 0 && megaType!=='lock') { ////mega type
    ty = spinSize / 6;
  } else if (spinNumber <= 0) {
    ty = spinSize / 8.6;
  }
  return (
    <View style={{
      display: "flex",
      justifyContent: "center",
      flexDirection: "row",
      marginTop: hp(spinSize/-8),
    }}>
      {
        shadow &&  <Image source={targetImage.shadow[spinColor]} style={{
          marginTop: wp(spinSize / 6),
          width: wp(spinSize * 2 / 3),
          height: hp(spinSize * 3 / 2),
          opacity: 0.4,
          position: "absolute",
          resizeMode: "contain"
        }}/>
      }

      <Image source={targetImage[spinType][spinColor]} style={{
        width: wp(spinSize),
        height: wp(spinSize),
        tintColor: (running && !shadow) ? 'gray': null,
        transform: [{ rotate: angle + "rad" }]
      }}/>
      {
        (spinNumber > 0) ?
          <Text style={{
            position: "absolute",
            fontSize: wp(spinTextSize),
            marginTop: hp(ty),
            fontFamily: "Antonio-Bold",
            color: "white",
            transform: [{ rotate: angle + "rad" }]
          }}>{spinNumber}</Text> :
          <Image
            source={spinNumber === 0 ? targetImage.mega[megaType] : Images.game.users[userType]}
            style={{
            position: "absolute",
            width: spinNumber === 0 && megaType!=='lock' ? wp(spinSize * 0.4) : wp(spinSize * 0.6),
            height: spinNumber === 0 && megaType!=='lock'? wp(spinSize * 0.4) : wp(spinSize * 0.6),
            marginTop: hp(ty),
            zIndex: 0,
            transform: [{ rotate: angle + "rad" }]
          }}/>
      }
    </View>
  );
};

export default FlareSpin;
