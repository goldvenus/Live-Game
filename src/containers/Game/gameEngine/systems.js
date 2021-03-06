/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-properties */

import Matter from 'matter-js';
import { heightPercentageToDP as hp, widthPercentageToDP as wp }
  from 'react-native-responsive-screen';
import { FlareType } from '@share/data/gamePlay/FlareType';
import { Box, Bullet } from './renderers';

let boxIds = 0;
let createFlag = false;
let ShotBullet = false;
let BulletSpeed = 10;
let SpinSpeed = 10;
let spinPosition = {
  x: 0,
  y: 0,
};

const BulletPosition = {
  x: wp('83'),
  y: hp('91'),
  size: wp('2'),
};
let propsSpinInfo = {};
/** ******************Control Creating & Get Mark Functions***************************** */
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


/** *********************************Physics Functions************************************ */
const distance = ([x1, y1], [x2, y2]) => Math.sqrt(Math.abs(
  Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)
));

// Physics.propTypes = {
//   state: PropTypes.object.isRequired
// };

const Physics = (state, { touches, time, dispatch }) => {
  const { engine } = state.physics;
  const { world } = state.physics;
  Matter.Engine.update(engine, time.delta);
  world.gravity.y = 0;

  const positionX = spinPosition.x;
  const positionY = spinPosition.y;


  if (ShotBullet) {
    ShotBullet = false;
    const body = Matter.Bodies.rectangle(
      BulletPosition.x,
      BulletPosition.y,
      BulletPosition.size,
      BulletPosition.size,
    );
    Matter.World.add(world, [body]);
    boxIds += 1;
    state[boxIds] = {
      body,
      bullet: true,
      size: [BulletPosition.size, BulletPosition.size],
      renderer: Bullet,
    };
  } else if (createFlag) {
    createFlag = false;
    const body = Matter.Bodies.rectangle(
      positionX,
      positionY,
      propsSpinInfo.spinSize,
      propsSpinInfo.spinSize,
    );

    Matter.World.add(world, [body]);
    boxIds += 1;
    state[boxIds] = {
      body,
      bullet: false,
      size: [wp(propsSpinInfo.spinSize * (2 / 3)), wp(propsSpinInfo.spinSize * (2 / 3))],
      color: boxIds % 2 === 0 ? 'black' : '#000000',
      spinInfoData: propsSpinInfo,
      renderer: Box,
    };
  }


  // / Clean Object
  Object.keys(state)
    .filter((key) => state[key].body && state[key].body.position.y < 0)
    .forEach((key) => {
      Matter.Composite.remove(world, state[key].body);
      delete state[key];
    });


  /* hit the target the bullet */
  Object.keys(state)
    .filter((key) => state[key].bullet === true)
    .forEach((key) => {
      const startPos = [state[key].body.position.x, state[key].body.position.y];
      TargetShotFillter(startPos, state, dispatch, key);
    });

  // / Goal Target
  const start = touches.find((x) => x.type === 'start' || x.type === 'end' || x.type === 'press');
  if (start) {
    const startPos = [start.event.pageX, start.event.pageY];
    TargetShotFillter(startPos, state, dispatch);
  }

  // / Move
  Object.keys(state)
    .filter((key) => state[key].body)
    .forEach((key) => {
      if (state[key].bullet) {
        Matter.Body.setVelocity(state[key].body, {
          x: -1 * BulletSpeed,
          y: -1 * BulletSpeed,
        });
      } else {
        Matter.Body.setVelocity(state[key].body, {
          x: 0,
          y: -1 * SpinSpeed,
        });
      }
    });
  return state;
};

const TargetShotFillter = (startPos, state, dispatch, bulletKey = -1) => {
  let targetCollection = 0.7;
  if (bulletKey === -1) targetCollection = 1;
  const boxId = Object.keys(state).find((key1) => {
    const { body } = state[key1];
    return (
      body
      && distance([body.position.x, body.position.y], startPos)
      < state[key1].size[0] * targetCollection);
  });
  if (boxId && state[boxId].bullet === false) {
    const { world } = state.physics;
    const targetSpin = state[boxId].spinInfoData;
    const targetSpinType = state[boxId].spinInfoData.megaType;
    dispatch({ type: 'goal-target', data: state[boxId] });
    if (bulletKey !== -1) {
      Matter.Composite.remove(world, state[bulletKey].body);
      delete state[bulletKey];
    }
    Matter.Composite.remove(world, state[boxId].body);
    delete state[boxId];
    if (targetSpin.spinType === FlareType.spinType.survey) {
      dispatch({ type: 'goal-survey' });
    } else if (bulletKey === -1) {
      if (targetSpin.spinNumber > 0) {
        dispatch({ type: `score-${targetSpin.spinNumber}` });
      } else if (targetSpin.spinNumber === 0) {
        dispatch({ type: `goal-${targetSpinType}` });
      } else if (targetSpin.spinNumber === -1) {
        dispatch({ type: 'goal-user' });
      }
    } else if (targetSpin.spinNumber > 0) {
      dispatch({ type: `score-${targetSpin.spinNumber}-tap` });
    } else if (targetSpin.spinNumber === 0) {
      dispatch({ type: `goal-${targetSpinType}-tap` });
    } else if (targetSpin.spinNumber === -1) {
      dispatch({ type: 'goal-user-tap' });
    }
  } else if (bulletKey === -1) {
    dispatch({ type: 'no-goal' });
  }
};

export { Physics, NewSpinShow, NewFire };
