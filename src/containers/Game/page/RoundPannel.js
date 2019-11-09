import React from "react";
import { View, Image } from "react-native";
import { styles } from "./styles";
import AppMocData from "../../../share/data/MocData";

const RoundPannel = ({ roundState, type }) => {
  return (
    <View style={styles.roundPannel}>
      {
        roundState.map((item, key) => {
          if (item === 1)
            return (
              <View key={key}>
                <Image source={type==='mega'?AppMocData.game.gameplay.target.circle.blue: AppMocData.game.gameplay.target.circle.orange}
                       style={styles.roundImage}/>
                <Image source={type==='mega'?AppMocData.game.page.mega.roundUnlock:AppMocData.game.gameplay.target.mega[type]}
                       style={styles.roundlock}/>
              </View>);
          else
            return (
              <View style={styles.roundImageUnlockView} key={key}>
                <Image source={AppMocData.game.page.roundLock}
                       style={styles.roundlockImage} />
              </View>);
        })
      }
    </View>
  );

};

export default RoundPannel;
