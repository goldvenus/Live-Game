import { Image, View } from "react-native";
import React from "react";
import { heightPercentageToDP as hp, widthPercentageToDP as wp }
  from "react-native-responsive-screen";
import Images from "../../../share/data/MocData";

const FireBullet = ({ angle }) => {
  return (
    <View style={{
      display: "flex",
      justifyContent: "center",
      height: hp("10"),
      flexDirection: "row",
      marginTop: hp("0"),
      transform: [{ rotate: -3.14/4 + "rad" }]
    }}>
      <Image source={Images.game.gameplay.shot.bullet.bulletShadow.green} style={{
        marginTop: wp("0"),
        width: wp("30"),
        height: wp("50"),
        opacity: 0.4,
        position: "absolute",
        resizeMode: "contain"
      }}/>

      <Image source={Images.game.gameplay.shot.bullet.bulletItem.green} style={{
        width: wp("10"),
        height: wp("10"),
      }}/>
    </View>
  );
};

export default FireBullet;
