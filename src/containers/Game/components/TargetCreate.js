import React from 'react';
import { GLView } from 'expo-gl';
import{ PIXI } from 'expo-pixi';

export default class TargetCreate extends React.Component {
  render() {
    return (
      <GLView
        style={{ flex: 1 }}
        onContextCreate={async context => {
          const app = new PIXI.Application({ context, backgroundColor: 0xffffff });
          const sprite = await PIXI.Sprite.fromExpoAsync(require('../../../../assets/images/game/Rectangle_50.png'));
          sprite.anchor.set(0.5);
          sprite.x = app.screen.width / 2;
          sprite.y = app.screen.height;
          app.stage.addChild(sprite);
          app.ticker.add((delta) => {
            sprite.y -= 3 * delta;
          });
        }}
      />
    );
  }
}