import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './styles';
import AppMocData from '@share/data/MocData';

const RoundPannel = ({ roundState, type }) => (
  <View style={styles.roundPannel}>
    {
      roundState.map((item, key) => {
        if (item === 1) {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <View key={key}>
              <Image
                source={type === 'mega' ? AppMocData.game.gameplay.target.circle.blue : AppMocData.game.gameplay.target.circle.orange}
                style={styles.roundImage}
              />
              <Image
                source={type === 'mega' ? AppMocData.game.page.mega.roundUnlock : AppMocData.game.gameplay.target.mega[type]}
                style={styles.roundlock}
              />
            </View>
          );
        }
        return (
          // eslint-disable-next-line react/no-array-index-key
          <View style={styles.roundImageUnlockView} key={key}>
            <Image
              source={AppMocData.game.page.roundLock}
              style={styles.roundlockImage}
            />
          </View>
        );
      })
    }
  </View>
);

RoundPannel.propTypes = {
  roundState: PropTypes.array,
  type: PropTypes.string
};

RoundPannel.defaultProps = {
  roundState: [],
  type: 'mega'
};

export default RoundPannel;
