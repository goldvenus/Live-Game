import React from 'react';
import { GLView } from 'expo-gl';
import ExpoPixi,{ PIXI } from 'expo-pixi';

export default class GameReady extends React.Component {
  render() {
    return (
      <GLView
        style={{ flex: 1 }}
        onContextCreate={async context => {
          const sprite = await PIXI.Sprite.fromExpoAsync(require('../../assets/images/icon.png'));
          const app = new PIXI.Application({ context, backgroundColor: 0xffffff });
          app.stage.addChild(sprite);
          const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff', '#00ff99'], // gradient
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440,
          });
          const basicText = new ExpoPixi.Text('Basic text in pixi', style);
          basicText.x = 50;
          basicText.y = 100;
          app.stage.addChild(basicText);
        }}
      />
    );
  }
}