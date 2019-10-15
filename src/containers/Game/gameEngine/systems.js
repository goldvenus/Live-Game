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

const Physics = (state, { touches, time }) => {
  let engine = state["physics"].engine;
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
  Matter.Engine.update(engine, time.delta);
  return state;
};

const CreateBox = (state) => {
  let world = state["physics"].world;
  world.gravity.y = -0.1;
  let positionX = spinPosition.x;
  let positionY = spinPosition.y;

  if (createFlag) {
    createFlag = false;
    let body = Matter.Bodies.rectangle(
      positionX,
      positionY,
      propsSpinInfo.spinSize,
      propsSpinInfo.spinSize,
      { frictionAir: 0}
    );

    Matter.World.add(world, [body]);
    //	Matter.Body.translate([body], {x: 0, y: -2});
    state[++boxIds] = {
      body: body,
      bullet: false,
      size: [wp(propsSpinInfo.spinSize*2/3), wp(propsSpinInfo.spinSize*2/3)],
      color: boxIds % 2 == 0 ? "black" : "#000000",
      spinInfoData: propsSpinInfo,
      renderer: Box
    };
  }
  return state;
};

const CreateFire = (state) => {
  let world = state["physics"].world;
  let body;
  if (ShotBullet) {
    ShotBullet = false;
    body = Matter.Bodies.rectangle(
      wp('85'),
      hp('89'),
      wp("3"),
      wp("3"),
      { frictionAir: 0}
    );
    Matter.World.add(world, [body]);
    state[++boxIds] = {
      body: body,
      bullet: true,
      size: [wp("3"), wp("3")],
      renderer: Bullet
    };
  }
  return state;
};

const TargetHit = (state, { touches, dispatch }) => {
  let start = touches.find(x => x.type === "press");
  if (start) {
    let startPos = [start.event.pageX, start.event.pageY];
    let boxId = Object.keys(state).find(key => {
      let body = state[key].body;
      return (
        body &&
        distance([body.position.x, body.position.y], startPos) < state[key].size[0]*3/5);
    });
    if (boxId) {
      let world = state["physics"].world;
      let targetSpin = state[boxId]["spinInfoData"];
      let targetSpinType = state[boxId]["spinInfoData"].megaType;
      Matter.Composite.remove(world, state[boxId].body);
      delete state[boxId];

      if(targetSpin.spinNumber>0) {
        dispatch({ type: `score-${targetSpin.spinNumber}` });
      } else if (targetSpin.spinNumber === 0) {
        if (targetSpinType==='niki' || targetSpinType==='apple')
          dispatch({type: 'goal-niki'});
        else
          dispatch({type: 'goal-mega'});
      } else if (targetSpin.spinNumber === -1) {
        dispatch({type:"goal-user"});
      }
    }
  }
  return state;
};

const MoveBox = (state, { touches }) => {
  let constraint = state["physics"].constraint;
  //-- Handle start touch
  let start = touches.find(x => x.type === "start");

  if (start) {
    let startPos = [start.event.pageX, start.event.pageY];
    let boxId = Object.keys(state).find(key => {
      let body = state[key].body;
      return (
        body &&
        distance([body.position.x, body.position.y], startPos) < 25
      );
    });
    if (boxId) {
      constraint.pointA = { x: startPos[0], y: startPos[1] };
      constraint.bodyB = state[boxId].body;
      constraint.pointB = { x: 0, y: 0 };
      constraint.angleB = state[boxId].body.angle;
    }
  }
  //-- Handle move touch
  let move = touches.find(x => x.type === "move");

  if (move) {
    constraint.pointA = { x: move.event.pageX, y: move.event.pageY };
  }

  //-- Handle end touch
  let end = touches.find(x => x.type === "end");

  if (end) {
    constraint.pointA = null;
    constraint.bodyB = null;
    constraint.pointB = null;
  }
  return state;
};

const CleanBoxes = (state, { touches, screen }) => {
  let world = state["physics"].world;

  Object.keys(state)
    .filter(key => state[key].body && state[key].body.position.y < 0)
    .forEach(key => {
      Matter.Composite.remove(world, state[key].body);
      delete state[key];
    });

  return state;
};

export { Physics, CreateBox, CreateFire, TargetHit, CleanBoxes, NewSpinShow, NewFire };
