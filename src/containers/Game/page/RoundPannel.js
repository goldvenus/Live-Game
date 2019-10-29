import React from "react";
import { View, Image } from "react-native";
import { styles } from "./styles";
import Images from "../../../../MocData";

const RoundPannel = ({ roundState, type }) => {
  return (
    <View style={styles.roundPannel}>
      {
        roundState.map((item, key) => {
          if (item === 1)
            return (
              <View key={key}>
                <Image source={type==='mega'?Images.game.gameplay.target.circle.blue: Images.game.gameplay.target.circle.orange}
                       style={styles.roundImage}/>
                <Image source={type==='mega'?Images.game.page.mega.roundUnlock:Images.game.gameplay.target.mega[type]}
                       style={styles.roundlock}/>
              </View>);
          else
            return (
              <View style={styles.roundImageUnlockView} key={key}>
                <Image source={Images.game.page.roundLock}
                       style={styles.roundlockImage} />
              </View>);
        })
      }
    </View>
  );

};

export default RoundPannel;
