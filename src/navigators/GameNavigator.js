import { createStackNavigator } from "react-navigation";

import GameReady from "../containers/Game/GameReady";
import GameJoin from "../containers/Game/GameJoin";
import GameCountDown from "../containers/Game/GameCountDown";
import GameStart from "../containers/Game/GameStart";
import GameMegaRound from "../containers/Game/page/GameMegaRound";
import GameNikiRound from "../containers/Game/page/GameNikiRound";

const GameNavigator = createStackNavigator({

  GameJoin: {
    screen: GameJoin,
    navigationOptions: {
      header: null
    }
  },
  GameReady: {
    screen: GameReady,
    navigationOptions: {
      header: null
    }
  },
  GameStart: {
    screen: GameStart,
    navigationOptions: {
      header: null
    }
  },

  GameNikiRound: {
    screen: GameNikiRound,
    navigationOptions: {
      header: null
    }
  },

  GameMegaRound: {
    screen: GameMegaRound,
    navigationOptions: {
      header: null
    }
  }

});

GameNavigator.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let navigationOptions = {};

  if (routeName === "GameStart") {
    navigationOptions.tabBarVisible = false;
  }

  return navigationOptions;
};

export default GameNavigator;
