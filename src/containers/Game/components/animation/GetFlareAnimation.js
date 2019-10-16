import { Image, View, Animated } from "react-native";
import React from "react";
import Images from "../../../../../MocData";
import { GameTypes } from "../../gameEngine/data/gameType";
import { heightPercentageToDP as hp, widthPercentageToDP as wp }
  from "react-native-responsive-screen";
import { Text } from "native-base";

function GetFlareBox({ size, body, spinInfoData }) {
  /* User State init */

  let rotateValue = new Animated.Value(0);
  let fadeValue = new Animated.Value(1);

  const animationStart=()=>{
    return Animated.parallel([
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.timing(fadeValue, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
      })
    ]).start();
  };

  React.useEffect(()=> {
    animationStart();
  }, [spinInfoData]);

  const width = size[0];
  const height = size[1];
  const x = body.position.x - width / 2;
  const y = body.position.y - height / 2;
  const { spinType, spinNumber, spinColor, spinSize, spinTextSize, megaType, userType } = spinInfoData;
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
      left: x,
      top: y,
      position: "absolute",
      zIndex: 4,
      width: width,
      height: height
    }}>
      <Animated.View style={{
        // transform: [
        //   {
        //       rotateY: rotateValue.interpolate({
        //       inputRange: [0, 1],
        //       outputRange: [6, 0]
        //     })
        //   }
        // ],
        opacity: fadeValue,
        display: "flex",
        justifyContent: "center",
        height: hp(spinSize),
        flexDirection: "row",
        marginTop: hp(spinSize / -6)
      }}>

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
      </Animated.View>
    </View>
  );
}

export { GetFlareBox };