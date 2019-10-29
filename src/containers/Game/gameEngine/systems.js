import { Box, Bullet } from "./renderers";
import Matter from "matter-js";
import { heightPercentageToDP as hp, widthPercentageToDP as wp }
  from "react-native-responsive-screen";

let boxIds = 0;
let createFlag = false;
let ShotBullet = false;
let BulletSpeed = 10;
let SpinSpeed = 10;
let spinPosition = {
  x: 0,
  y: 0
};

let BulletPosition = {
  x: wp('83'),
  y: hp('91'),
  size: wp('2')
}
let propsSpinInfo = {};
/********************Control Creating & Get Mark Functions******************************/
const NewSpinShow = (targetPosition, spinInfoData, speed) => {
  createFlag = true;
  spinPosition = targetPosition;
  propsSpinInfo = spinInfoData;
  SpinSpeed = speed;
};

const NewFire = (speed) => {
  ShotBullet = true;
  BulletSpeed = speed;
};


/***********************************Physics Functions******************************************************/
const distance = ([x1, y1], [x2, y2]) =>
  Math.sqrt(Math.abs(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));

const Physics = (state, { touches, time, dispatch }) => {
  let engine = state["physics"].engine;
  let world = state["physics"].world;
  Matter.Engine.update(engine, time.delta);
  world.gravity.y = 0;

  let positionX = spinPosition.x;
  let positionY = spinPosition.y;


  if (ShotBullet) {
    ShotBullet = false;
    let body = Matter.Bodies.rectangle(
      BulletPosition.x,
      BulletPosition.y,
      BulletPosition.size,
      BulletPosition.size,
    );
    Matter.World.add(world, [body]);
    state[++boxIds] = {
      body: body,
      bullet: true,
      size: [BulletPosition.size, BulletPosition.size],
      renderer: Bullet
    };
  } else  if (createFlag) {
    createFlag = false;
    let body = Matter.Bodies.rectangle(
      positionX,
      positionY,
      propsSpinInfo.spinSize,
      propsSpinInfo.spinSize,
    );

    Matter.World.add(world, [body]);
    state[++boxIds] = {
      body: body,
      bullet: false,
      size: [wp(propsSpinInfo.spinSize * 2 / 3), wp(propsSpinInfo.spinSize * 2 / 3)],
      color: boxIds % 2 == 0 ? "black" : "#000000",
      spinInfoData: propsSpinInfo,
      renderer: Box
    };
  }


  /// Clean Object
  Object.keys(state)
    .filter(key => state[key].body && state[key].body.position.y < 0)
    .forEach(key => {
      Matter.Composite.remove(world, state[key].body);
      delete state[key];
    });


  /// Goal Target
  let start = touches.find(x => x.type === "press");
  if (start) {
    let startPos = [start.event.pageX, start.event.pageY];
    let boxId = Object.keys(state).find(key => {
      let body = state[key].body;
      return (
        body &&
        distance([body.position.x, body.position.y], startPos) < state[key].size[0] * 5 / 7);
    });
    if (boxId) {
      let world = state["physics"].world;
      let targetSpin = state[boxId]["spinInfoData"];
      let targetSpinType = state[boxId]["spinInfoData"].megaType;
      dispatch({ type: "goal-target", data: state[boxId] });
      Matter.Composite.remove(world, state[boxId].body);
      delete state[boxId];

      if (targetSpin.spinNumber > 0) {
        dispatch({ type: `score-${targetSpin.spinNumber}` });
      } else if (targetSpin.spinNumber === 0) {
        dispatch({ type: `goal-${targetSpinType}`})
      } else if (targetSpin.spinNumber === -1) {
        dispatch({ type: "goal-user" });
      }
    }
  }

  /// Move
  Object.keys(state)
    .filter(key => state[key].body)
    .forEach(key => {
      if (state[key].bullet)
        Matter.Body.setVelocity(state[key].body, {
          x: -1 * BulletSpeed,
          y: -1 * BulletSpeed
        });
      else {
        Matter.Body.setVelocity(state[key].body, {
          x: 0,
          y: -1 * SpinSpeed
        });
      }
    });
  return state;
};

export { Physics, NewSpinShow, NewFire };
