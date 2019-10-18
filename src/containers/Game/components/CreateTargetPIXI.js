import React from 'react';
import { GLView } from 'expo-gl';
import{ PIXI } from 'expo-pixi';

export default class CreateTargetPIXI extends React.Component {
  render() {
    return (
      <GLView
        style={{ flex: 1 }}
        onContextCreate={async context => {
          const app = new PIXI.Application({ context, backgroundColor: 0x181818 });
          //const sprite = await PIXI.Sprite.fromExpoAsync(require('../../../../assets/images/game/Rectangle_50.png'));
          const sprite1 = await PIXI.Sprite.fromExpoAsync(require('../../../../assets/images/game/gameplay/target/shadow/target-trace-white-3.png'));
          sprite.anchor.set(0.5);
          sprite.width = app.screen.width/3;
          sprite.height = app.screen.width/3;
          sprite.x = app.screen.width / 2;
          sprite.y = app.screen.height;

          sprite1.anchor.set(0.5);
          sprite1.width = app.screen.width/4;
          sprite1.height = app.screen.height/3;
          sprite1.x = app.screen.width / 2;
          sprite1.y = app.screen.height;

          app.stage.addChild(sprite1);
          app.stage.addChild(sprite);
          app.ticker.add((delta) => {
            sprite.y -= 3 * delta;
          });
        }}
      />
    );
  }
}