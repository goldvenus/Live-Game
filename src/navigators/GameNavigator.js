import { createStackNavigator } from 'react-navigation';

import GameReady from '../containers/Game/GameReady';


const GameNavigator = createStackNavigator({
  Home: {
    screen: GameReady,
    navigationOptions: {
      header: null
    },
  },
});

export default GameNavigator;
