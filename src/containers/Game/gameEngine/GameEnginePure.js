import { StatusBar } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import React from 'react';

import { Physics } from './systems';

class GameEnginePure extends React.Component {
  constructor() {
    super();
    this.gameEngine = null;
  }
  shouldComponentUpdate(nextProps) {
    return nextProps.running !== this.props.running;
  }
  render() {
    return (
      <GameEngine
        style={{ zIndex: 3 }}
        ref={(ref) => {
          this.gameEngine = ref;
        }}
        onEvent={this.props.onEvent}
        systems={[Physics]}
        running={this.props.running}
        entities={this.props.entities}
      >
        <StatusBar hidden />
      </GameEngine>
    );
  }
}
export default GameEnginePure;
