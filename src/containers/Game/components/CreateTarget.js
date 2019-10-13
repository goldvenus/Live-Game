import { Text } from "native-base";
import { Image, View } from "react-native";
import React from "react";
import { heightPercentageToDP as hp, widthPercentageToDP as wp }
  from "react-native-responsive-screen";
import Images from "../../../../MocData";
import { GameTypes } from "../gameEngine/data/gameType";

const CreateTarget = ({ spinInfoData }) => {
  const { spinType, spinNumber, spinColor, shadowColor, spinSize, spinTextSize, megaType, userType } = spinInfoData;
  const targetImage = Images.game.gameplay.target;
  let ty = spinSize / 8;
  if (spinType === GameTypes.spinType.triangle)
    ty = spinSize / 20;
  else if (spinType === GameTypes.spinType.ellipse) {
    ty = spinSize / 8;
  }
  if (spinNumber === 0) { ////mega type
    ty = spinSize / 6;
  } else if (spinNumber < 0) {
    ty = spinSize / 8.6;
  }
  return (
    <View style={{
      display: "flex",
      justifyContent: "center",
      height: hp(spinSize),
      flexDirection: "row",
      marginTop: hp(spinSize/-7),
    }}>
      <Image source={targetImage.shadow[spinColor]} style={{
        marginTop: wp(spinSize / 6),
        width: wp(spinSize * 2 / 3),
        height: hp(spinSize * 3 / 2),
        opacity: 0.4,
        position: "absolute",
        resizeMode: "contain"
      }}/>

      <Image source={targetImage[spinType][spinColor]} style={{
        width: wp(spinSize),
        height: wp(spinSize)
      }}/>
      {
        (spinNumber > 0) ?
          <Text style={{
            position: "absolute",
            fontSize: wp(spinTextSize),
            marginTop: hp(ty),
            fontFamily: "Antonio-Bold",
            color: "white"
          }}>{spinNumber}</Text> :
          <Image
                 source={spinNumber === 0 ? targetImage.mega[megaType] : Images.game.users[userType]} style={{
            position: "absolute",
            width: spinNumber === 0 ? wp(spinSize * 0.4) : wp(spinSize * 0.6),
            height: spinNumber === 0 ? wp(spinSize * 0.4) : wp(spinSize * 0.6),
            marginTop: hp(ty),
            zIndex: 0
          }}/>
      }
    </View>
  );
};

export default CreateTarget;