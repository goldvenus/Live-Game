import { Box } from "./renderers";
import Matter from "matter-js";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

let boxIds = 0;
let createFlag = false;
let spinPosition = {
  x: 0,
  y: 0
};
let propsSpinInfo = {};
/********************Control Creating & Get Mark Functions******************************/
const NewSpinShow = (targetPosition, spinInfoData) => {
  createFlag = true;
  spinPosition = targetPosition;
  propsSpinInfo = spinInfoData
};


/***********************************Physics Functions******************************************************/
const distance = ([x1, y1], [x2, y2]) =>
  Math.sqrt(Math.abs(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));

const Physics = (state, { touches, time }) => {
  let engine = state["physics"].engine;
  Matter.Engine.update(engine, time.delta);
  return state;
};

const CreateBox = (state, { touches, screen }) => {
  let world = state["physics"].world;
  let positionX = spinPosition.x;
  let positionY = spinPosition.y;
  let boxSize = Math.trunc(Math.max(screen.width, screen.height) * 0.075);
  world.gravity.y = -1;
  if (createFlag) {
    createFlag = false;
    let body = Matter.Bodies.rectangle(
      positionX,
      positionY,
      boxSize,
      boxSize,
      { frictionAir: 0.5 }
    );
    Matter.World.add(world, [body]);
    //	Matter.Body.translate([body], {x: 0, y: -2});
    state[++boxIds] = {
      body: body,
      size: [boxSize, boxSize],
      color: boxIds % 2 == 0 ? "black" : "#000000",
      spinInfoData: propsSpinInfo,
      renderer: Box
    };
  }
  return state;
};

const TargetHit = (state, { touches, dispatch }) => {
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
      let world = state["physics"].world;
      Matter.Composite.remove(world, state[boxId].body);
      delete state[boxId];
      dispatch({ type: "score-50" });
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

export { Physics, CreateBox, MoveBox, TargetHit, CleanBoxes, NewSpinShow };
